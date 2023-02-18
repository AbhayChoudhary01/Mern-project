const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises)) //after we find all the exercises from the database
        .catch(err => res.status(400).json('Error: ' + err)); //we will take those exercises and return them as json or else throw err
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.username);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        time,
    });

    newExercise.save()
        .then(() => res.json('Exercise added!'))   //ye promise hai agar save hai to return kar json added
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;