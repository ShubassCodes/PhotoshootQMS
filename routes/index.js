var express = require('express');
var router = express.Router();
// Added
var namelist = require('../public/javascripts/namelist.js');
// Database
const pool = require('../models/db_config.js');
// const listener = require('../models/db_listener.js');
// const MySQLEvents = require('@rodrigogs/mysql-events');

// databaseChangesListener()
//   .then(() => console.log('Waiting for database events...'))
//   .catch(console.error);

// async function databaseChangesListener() {

//   await listener.start();

//   listener.addTrigger({
//     name: 'TEST',
//     expression: '*',
//     statement: MySQLEvents.STATEMENTS.ALL,
//     onEvent: (event) => { // You will receive the events here
//       console.log(event);
//       //  Web socket omit here



//       // KANAGES REF
//     }
//   });

//   listener.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
//   listener.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
// };

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Photoshoot' });
});

// Dropdown auto complete setup
router.get("/autocomplete", (req, res) => {
  const query = req.query.q.toLowerCase();
  const filteredUsernames =  Object.keys(namelist.usernames).filter(key => key.toLowerCase().includes(query));
  res.json(filteredUsernames);
});

router.post('/login', (req, res) => {
  // Booth Status
  var boothStatus = {0: "TBA", 1: "Photobooth 1", 2: "Photobooth 2", 3: "Makeupbooth 1", 4: "Makeupbooth 2", 5: "Makeupbooth 3", 6: "Makeupbooth 4", 7: "Waiting", 8: "Finished"};
  var nameInput = req.body.nameInput.trim();

  if(nameInput.toLowerCase() != "admin" && !(nameInput in namelist.usernames)){
    // pop up error message box saying error not found
    res.render('index', { errorMessage: 'Please select your name from the suggestion box.' });
    return;
    // message: please select your name from suggestion bo
  }

  getBoothData().then((boothRes) => {
    if(nameInput.toLowerCase() == "admin"){
      // For admin side
      res.render('queue', {
        name: "ADMIN", 
        queueNumber: "-", 
        hasHairdo: false, 
        hasMakeup: false, 
        boothNum: "Not Applicable",
        boothOneQueue: boothRes[0].queueNumber,
        boothOneName: boothRes[0].name,
        boothTwoQueue: boothRes[1].queueNumber,
        boothTwoName: boothRes[1].name,
        boothThreeQueue: boothRes[2].queueNumber,
        boothThreeName: boothRes[2].name,
        boothFourQueue: boothRes[3].queueNumber,
        boothFourName: boothRes[3].name,
        boothFiveQueue: boothRes[4].queueNumber,
        boothFiveName: boothRes[4].name,
        boothSixQueue: boothRes[5].queueNumber,
        boothSixName: boothRes[5].name,
      });
    } else { 
      // For user side
      // get name from collection
      getUserDetails(nameInput.toUpperCase()).then((userRes) => {
        res.render('queue', {
          name: userRes.name,
          queueNumber: userRes.queueNumber, 
          hasHairdo: userRes.hasHairdo, 
          hasMakeup: userRes.hasMakeup, 
          boothNum: boothStatus[userRes.boothNum],
          boothOneQueue: boothRes[0].queueNumber,
          boothOneName: boothRes[0].name,
          boothTwoQueue: boothRes[1].queueNumber,
          boothTwoName: boothRes[1].name,
          boothThreeQueue: boothRes[2].queueNumber,
          boothThreeName: boothRes[2].name,
          boothFourQueue: boothRes[3].queueNumber,
          boothFourName: boothRes[3].name,
          boothFiveQueue: boothRes[4].queueNumber,
          boothFiveName: boothRes[4].name,
          boothSixQueue: boothRes[5].queueNumber,
          boothSixName: boothRes[5].name,
        });
      });
    }
  });
});

router.post("/getDataInterval", (req, res) => {
  var boothStatus = {0: "TBA", 1: "Photobooth 1", 2: "Photobooth 2", 3: "Makeupbooth 1", 4: "Makeupbooth 2", 5: "Makeupbooth 3", 6: "Makeupbooth 4", 7: "Waiting", 8: "Finished"};
  let queryRes = [];
  // get user details first
  var username = req.body["name"];
  if(username === "ADMIN"){
    getBoothData().then((boothRes) => {
      res.json({
        currName: "ADMIN",
        currQueueNumber: "NOT APPLICABLE",
        currBoothNum: "-",
        boothOneName: boothRes[0].name,
        boothOneQueueNumber: boothRes[0].queueNumber,
        boothTwoName: boothRes[1].name,
        boothTwoQueueNumber: boothRes[1].queueNumber,
        boothThreeName: boothRes[2].name,
        boothThreeQueueNumber: boothRes[2].queueNumber,
        boothFourName: boothRes[3].name,
        boothFourQueueNumber: boothRes[3].queueNumber,
        boothFiveName: boothRes[4].name,
        boothFiveQueueNumber: boothRes[4].queueNumber,
        boothSixName: boothRes[5].name,
        boothSixQueueNumber: boothRes[5].queueNumber,
      });
    }).catch((err) => console.log(err));
  } else {
    getUserDetails(username).then((userRes) => {
      queryRes.push({
        currUsername: userRes.name,
        queueNumber: userRes.queueNumber, 
        hasHairdo: userRes.hasHairdo, 
        hasMakeup: userRes.hasMakeup, 
        boothNum: boothStatus[userRes.boothNum],
      });
      // get other photobooth details
      getBoothData().then((boothRes) => {
        res.json({
          currName: userRes.name,
          currQueueNumber: userRes.queueNumber,
          currBoothNum: boothStatus[userRes.boothNum],
          boothOneName: boothRes[0].name,
          boothOneQueueNumber: boothRes[0].queueNumber,
          boothTwoName: boothRes[1].name,
          boothTwoQueueNumber: boothRes[1].queueNumber,
          boothThreeName: boothRes[2].name,
          boothThreeQueueNumber: boothRes[2].queueNumber,
          boothFourName: boothRes[3].name,
          boothFourQueueNumber: boothRes[3].queueNumber,
          boothFiveName: boothRes[4].name,
          boothFiveQueueNumber: boothRes[4].queueNumber,
          boothSixName: boothRes[5].name,
          boothSixQueueNumber: boothRes[5].queueNumber,
        });
      }).catch((err) => console.log(err));
    });
  }
});

async function getBoothData() {
  let queryRes = [];
  
  // get data for photobooth and makeupbooth
  queryRes.push(await getPhotoboothData(1));  // Get data for photobooth 1
  queryRes.push(await getPhotoboothData(2));  // Get data for photobooth 2
  queryRes.push(await getPhotoboothData(3)); // Get data for makeupbooth 1
  queryRes.push(await getPhotoboothData(4)); // Get data for makeupbooth 2
  queryRes.push(await getPhotoboothData(5)); // Get data for makeupbooth 3
  queryRes.push(await getPhotoboothData(6)); // Get data for makeupbooth 4
 
  return queryRes;
}

// Function to get photobooth data
async function getPhotoboothData(photoboothNum) {
  // Photobooth Collection
  var [queryRes] = await pool.query(`SELECT username, gender, hasMakeup, hasHairdo, queueNum, boothNum from photobooths WHERE boothNum = '${photoboothNum}'`);
    if(queryRes[0] == null) {
      return {
        name: "Empty",
        boothNum: -1,
        gender: "empty",
        hasHairdo: false,
        hasMakeup: false,
        queueNumber: 0,
      };
    } else {
      return {
        name: queryRes[0].username,
        boothNum: queryRes[0].boothNum,
        gender: queryRes[0].gender,
        hasHairdo: queryRes[0].hasHairdo,
        hasMakeup: queryRes[0].hasMakeup,
        queueNumber: queryRes[0].queueNum,
      };
    }
}

async function getUserDetails(username){
  var [queryRes] = await pool.query(`SELECT username, gender, hasMakeup, hasHairdo, queueNum, boothNum from photobooths WHERE username = '${username}'`);
  if(queryRes[0] == null) {
    return {
      name: "Empty",
      boothNum: -1,
      gender: "empty",
      hasHairdo: false,
      hasMakeup: false,
      queueNumber: 0,
    };
  } else {
    return {
      name: queryRes[0].username,
      boothNum: queryRes[0].boothNum,
      gender: queryRes[0].gender,
      hasHairdo: queryRes[0].hasHairdo,
      hasMakeup: queryRes[0].hasMakeup,
      queueNumber: queryRes[0].queueNum,
    };
  }
}

// When someone clicks 
router.patch('/updateQueueComplete', (req, res) => {
  var username = req.body["name"];
  var boothType = req.body["boothType"];
  var queueNumber = req.body["queueNum"];
  var boothNum = req.body["boothNum"];
  // Update Queue number
  updateBoothComplete(username, boothType).then(async () => await updateNextPerson(boothType, queueNumber, boothNum).then(() => res.sendStatus(200))).catch((err) => console.log(err));
});

// Admin reset the queue
router.patch('/resetQueue', (req, res) => {
  updateAllQueue().then(() => res.sendStatus(200)).catch((err) => {
    console.log(err);
    res.sendStatus(400);
  });
});
  
// User cancel the queue
router.patch('/cancelQueue', (req, res) => {
  var username = req.body["name"];
  var boothType = req.body["boothType"];
  var queueNumber = req.body["queueNum"];
  var boothNum = req.body["boothNum"];
  putLastQueue(username).then(async () => {
    // Currently their turn boothNum = 1, 2, 3, 4, 5, 6
    // So assign booth to another person
    if(boothNum != 0 && boothNum != 7 && boothNum != 8){ // Dont update next person if user == 8 or 7 or 1
      await updateNextPerson(boothType, queueNumber, boothNum).then(() => res.sendStatus(200));
    }
  }).catch((err) => console.log(err));;
});

// Update Whole Queue
async function updateAllQueue(){
  for (const [key, value] of Object.entries(namelist.usernames)) {
    await pool.query(`UPDATE photobooths SET boothNum = ${value[0]}, queueNum = ${value[1]} WHERE username = '${key}'`);
  }
}

async function putLastQueue(username){
  // Check if the person is photobooth or makeupbooth
  var [typeBooth] = await pool.query(`SELECT hasMakeup, hasHairdo from photobooths WHERE username = '${username}'`);
  if(typeBooth[0] == null) return;
  // Photobooth
  if(typeBooth[0].hasHairdo == 0 && typeBooth[0].hasMakeup == 0) {
    // Get Last Queue Number in Photobooth
    var [lastPerson] = await pool.query(`SELECT username, queueNum from photobooths WHERE hasHairdo = 0 AND hasMakeup = 0 ORDER BY queueNum DESC LIMIT 1`);
    // If the person click is the last person
    if(lastPerson[0].username == username) return;
    // Assign Last booth number
    else {
      await pool.query(`UPDATE photobooths SET boothNum = 0, queueNum = ${lastPerson[0].queueNum + 1} WHERE username = '${username}'`);
    }
  } // Makeupbooth
  else {
    // Get Last Queue Number in Photobooth
    var [lastPerson] = await pool.query(`SELECT username, queueNum from photobooths WHERE hasHairdo = 1 OR hasMakeup = 1 ORDER BY queueNum DESC LIMIT 1`);
    // If the person click is the last person
    if(lastPerson[0].username == username) return;
    // Assign Last booth number
    else {
      await pool.query(`UPDATE photobooths SET boothNum = 0, queueNum = ${lastPerson[0].queueNum + 1} WHERE username = '${username}'`);
    }
  }
}

async function updateBoothComplete(username, boothType) {
  if(boothType === "Photobooth"){
    await pool.query(`UPDATE photobooths SET boothNum = 8 WHERE username = '${username}'`);
  } else {
    await pool.query(`UPDATE photobooths SET boothNum = 7 WHERE username = '${username}'`);
  }
}

async function updateNextPerson(boothType, queueNumber, currBooth) {'${username}'
  // Get queue for photobooth
  if(boothType === "Photobooth"){
    // Find lowest queue number with boothnum = 7 - waiting
    var [nextPerson] = await pool.query(`
      UPDATE photobooths AS p1
      JOIN (
          SELECT username
          FROM photobooths
          WHERE boothNum = 7
          ORDER BY queueNum ASC
          LIMIT 1
      ) AS p2 ON p1.username = p2.username
      SET p1.boothNum = '${currBooth}'`);
      // await pool.query(`UPDATE photobooths SET boothNum = '${currBooth}' WHERE username IN 
      //   (SELECT username from photobooths WHERE boothNum = 7 ORDER BY queueNum ASC LIMIT 1)`);

    if(nextPerson.affectedRows === 0) {
      // if no then find someone with hashairdo and hasmakeup = false
      var [nextPerson] = await pool.query(`UPDATE photobooths AS p1
        JOIN (
            SELECT username
            FROM photobooths
            WHERE hasHairdo = 0
              AND hasMakeup = 0
              AND boothNum = 0
            ORDER BY queueNum ASC
            LIMIT 1
        ) AS p2 ON p1.username = p2.username
        SET p1.boothNum = '${currBooth}'`);
    }
  } else {  // Get queue for makeupbooth
    // Assign next person for makeup which hasHairdo = true || hasMakeup = true
    await pool.query(`UPDATE photobooths AS p1
      JOIN (
          SELECT username
          FROM photobooths
          WHERE (hasHairdo = 1 OR hasMakeup = 1)
            AND boothNum = 0
          ORDER BY queueNum ASC
          LIMIT 1
      ) AS p2 ON p1.username = p2.username
      SET p1.boothNum = '${currBooth}'`);
  }
}

module.exports = router;
