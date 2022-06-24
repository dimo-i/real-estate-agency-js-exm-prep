const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware');
const { preloadHousing, isHousingOwner } = require('../middlewares/housingMiddleware')

const housingService = require('../services/housingService');
const userService = require('../services/userService');

const { getErrorMessage } = require('../utils/errorHelpers')


router.get('/', async (req, res) => {
    const housings = await housingService.getAll().lean()

    res.render('housing/aprt-for-recent', { housings })
})


router.get('/:housingId/details', async (req, res) => {
    const housing = await housingService.getOneDetailed(req.params.housingId).lean()
    const isOwner = housing.owner._id == req.user?._id;

    const available = housing.availablePieces > 0

    const isRented = housing.rentedHome.some(x => x._id == req.user?._id)
    const ifRented = housing.rentedHome

    const tenants = housing.rentedHome.map(x => x.fullName).join(', ');

    res.render('housing/details', { ...housing, isOwner, isRented, ifRented, tenants, available })
});



router.get('/:housingId/edit', isAuth, preloadHousing, isHousingOwner, (req, res) => {

    res.render('housing/edit', { ...req.housing })
});

router.post('/:housingId/edit', isAuth, preloadHousing, isHousingOwner, async (req, res) => {
    try {
        await housingService.updateOne(req.params.housingId, req.body);
        res.redirect(`/housings/${req.params.housingId}/details`)
    } catch (error) {
        res.render('housing/edit', { ...req.body, error: getErrorMessage(error) })
    }   


});

router.get('/:housingId/delete', isAuth, preloadHousing, isHousingOwner, async (req, res) => {
    await housingService.delete(req.params.housingId);

    res.redirect('/housings')
});


router.get('/create', isAuth, (req, res) => {

    res.render('housing/create');
});

router.post('/create', isAuth, async (req, res) => {
    const housingData = { ...req.body, owner: req.user._id }

    try {
        const housing = await housingService.create(housingData);
        await userService.addHousing(req.user._id, housing._id)
        res.redirect('/housings')

    } catch (error) {
        res.render('housing/create', { ...req.body, error: getErrorMessage(error) })
    }

    res.render('housing/create');
});


router.get('/:housingId/rent', isAuth, async (req, res) => {
   const housing = await housingService.getOne(req.params.housingId);
   const user = await userService.getOne(req.user._id);

   housing.rentedHome.push(user);
   user.rentedProperties.push(housing);

   housing.availablePieces -= housing.rentedHome.length

   await housing.save();
   await user.save();

   res.redirect('/')

})

module.exports = router;
