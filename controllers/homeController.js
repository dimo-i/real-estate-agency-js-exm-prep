
const router = require('express').Router();

const housingService = require('../services/housingService');



router.get('/', async (req, res) => {
    const housings = await housingService.getAll().lean()
    let houses = []
    if (housings.length != 0) { 
        for (let i=0; i<3; i++){
        houses.push(housings.pop())
        }
    }

    //visualise last 3 items - wooden type


    res.render('home', {houses});

})



module.exports = router;


