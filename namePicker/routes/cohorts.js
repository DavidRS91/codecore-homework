var express = require('express');
var router = express.Router();
const _ = require('lodash');
const knex = require('../db')

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

router.get('/new', function(req, res, next) {
  res.render('cohorts/new');
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


router.post('/:id', (req, res, next) => {
  const num = req.body.num
  const sortType = req.body.sortType
  const teamId = req.params.id;
  const teams = sorter ()
  knex
  .first() // replace select with first when you only want one row
  .from('teams')
  .where({id: teamId})
  .then(team => {
    res.render('cohorts/show', {team: team || {}, num: num});
  })
})


function sorter (str, num, sortType) {
 let arr = str.split(',')
 arr = _.shuffle(arr)
  if (sortType === "Team Count") {
    let tm = Math.ceil(arr.length/num)
    return _.chunk(arr,tm)
  } else {
    return _.chunk(arr,num)
  }
}



// Posts#show PATH: /posts/:id VERB: GET
// Display a single post from the db
router.get('/:id', (req, res, next) => {
  // Paths that have `:` in their name will ne stored as a key value
  // in req.params. Use it to the `id` of a post.
  console.log(req.params);
  console.log(req.query);
  const teamId = req.params.id;
  const num = parseInt(req.query.num);
  const sortType = req.query.sortType;
  let output = undefined



  if (isNaN(parseInt(teamId, 10))) {
    return res.redirect('/')
  }

  knex
  .first() // replace select with first when you only want one row
  .from('teams')
  .where({id: teamId})
  .then(team => {

    if (num != undefined && sortType != undefined) {
      output = sorter(team.teamMembers, num, sortType)
    }
    res.render('cohorts/show', {team: team, output: output, num: num, sortType: sortType});
  })




});


module.exports = router;
