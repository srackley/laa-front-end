const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const https = require('https');
const cors = require('cors')({ origin: true });

admin.initializeApp(functions.config().firebase);

const VERSION = 'v1';
const API_BASE = `https://api.propublica.org/congress/${VERSION}`;
const API_KEY = functions.config().api.key;

const instance = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'X-API-Key': API_KEY,
    'Access-Control-Allow-Origin': '*'
  },
  crossDomain: true
});


exports.fetchRecentVotes = functions.https.onRequest((req, res) => {
  const recentConfig = {
    method: 'get',
    url: `${API_BASE}/both/votes/recent.json`,
    httpsAgent: new https.Agent({ keepAlive: true })
  };

  instance.request(recentConfig).then((response) => {
    cors(req, res, () => {
      const bills = response.data.results.votes;
      bills.forEach((el) => {
        const voteId = `${el.congress}-${el.chamber}-${el.session}-${el.roll_call}`;
        admin.database().ref('bills/').update({
          [voteId]: {
            url: el.vote_uri,
            result: el.result,
            number: el.bill.number || null,
            description: el.bill.title || null,
            date: el.date
          }
        });
      });
    });
    const date = new Date();
    res.status(200).send(`Checked for updated votes at ${date}`);
  }).catch(err => console.log(err));
});


exports.fetchSpecifics = functions.database.ref('/bills/{voteId}').onCreate((event) => {
  const voteUri = event.data.val();

  instance.request({
    method: 'get',
    url: voteUri
  }).then((response) => {
    const data = response.data.results.votes.vote;
    admin.database().ref('votess/').update({ [event.params.voteId]: data.positions });
  }).catch(err => console.log(err));
});

exports.fetchDistrict = functions.https.onRequest((req, res) => {

});

exports.addUser = functions.auth.user().onCreate((event) => {
  const userRef = admin.database().ref('/users').child(user.uid);
  const user = event.data;
  const phone = user.phoneNumber;
  console.log('A new user signed in for the first time: ', user);

  return userRef.update(user);
});
