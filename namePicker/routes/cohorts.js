var express = require('express');
var router = express.Router();
const knex = require('../db')



router.get('/:id', (req, res, next) => {
  // Paths that have `:` in their name will ne stored as a key value
  // in req.params. Use it to the `id` of a post.
  console.log(req.params);
  const teamId = req.params.id;

  if (isNaN(parseInt(teamId, 10))) {
    return res.redirect('/')
  }

  knex
    .first() // replace select with first when you only want one row
    .from('teams')
    .where({id: teamId})
    .then(team => {
      res.render('cohorts/show', {team: team || {}});
    })
});

router.post('/', (req,res,next) => {
  const teamName = req.body.teamName;
    const pictureUrl = req.body.pictureUrl;
    const teamMembers = req.body.teamMembers;

    knex
      .insert({
        teamName: teamName,
        pictureUrl: pictureUrl,
        teamMembers: teamMembers

      })
      .into('teams')
      .then(() => {
        res.redirect('cohorts/index', {teams: teams})
      })
      // res.send(req.body)
});



router.get('/new', function(req, res, next) {
  res.render('cohorts/new');
});

router.get('/', function(req, res) {

  knex
  .select()
  .from('teams')
  .orderBy('created_at', 'DESC')
  .then(teams => {
    res.render('cohorts/', {teams: teams});
  });

  // res.render('cohorts')
});


// Posts#show PATH: /posts/:id VERB: GET
// Display a single post from the db


module.exports = router;
