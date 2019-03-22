const express = require('express');

const redis = require('redis');

const request = require('superagent');
redisport = 6379; 

const client = redis.createClient(redisport);

const app = express();

const ages = {
    john: '20',
    shiv:'21',
    amy: '23'
    
}

const getAgeFromDb = (name, cb) => setTimeout(() => {
    console.log('Fetching from db')
    const age = ages[name] || 'Does not exist'
    cb(age)
  }, 1000)

  

const  ageService = (name, cb) => {

 
    client.get(name, (err, age) => {
      if (age !== null) {
        return cb(age)
      }
  
      getAgeFromDb(name, age => {
        client.set(name, age, () => {

          cb(age)
        })
      })
    })
  }
app.get('/', function(req, res){
    const {name} = req.query
    ageService(name, age => {
        //console.log("\ntime taken : %{time_total}\n");
        res.end(age)
    })
      
});
app.listen(5003, () => console.log('Server Started'));
