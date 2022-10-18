const express = require('express');
const cors = require('cors');

const db = require('./db');

const app = express();

// Add standard middleware
app.use(express.json());
app.use(cors());

// app routes

app.get('/', (req, res) => res.send('The tracker app: tracking the unknown.'));

app.get('/incidents', async (req, res) => {
  try {
    const data = await db.query(`
    SELECT *
    FROM incident`);
    res.status(200).send(data.rows);
  } catch (error) {
    res.status(400);
    console.log(error);
  }
});

app.get('/assassin/:assassinName', async (req, res) => {

  const assassinName = capitalize(req.params.assassinName);
  console.log(assassinName);

  try {
    const data = await db.query(`SELECT * FROM incident JOIN assassin ON incident.assassin_id = assassin.assassin_id WHERE assassin.assassin_name = $1`, [assassinName]);
    res.status(200).send(data.rows);
  } catch (error) {
    res.status(400);
    console.log(error);
  }
})

app.get('/place/:placeName', async (req, res) => {

  const placeName = capitalize(req.params.placeName);
  console.log(placeName);

  try {
    const data = await db.query(`SELECT * FROM incident JOIN place ON incident.place_id = place.place_id WHERE place.place_name = $1`, [placeName]);
    res.status(200).send(data.rows);
  } catch (error) {
    res.status(400);
    console.log(error);
  }
})

function capitalize(str) {
const str2 = str.charAt(0).toUpperCase() + str.slice(1);
return str2
}

app.patch('/place/:incidentId', async (req, res) => {
  const incidentId = req.params.incidentId;
  
  try {
    const data = await req.body;
    const placeId = data.placeId;
    const patchData = db.query(
      `UPDATE incident SET place_id = $1 WHERE incident_id = $2`, [placeId, incidentId]
    )
    res.status(200)
  } catch (error) {
    console.log(error)
    res.status(400)
  }
})

app.patch('/assassin/:incidentId', async (req, res) => {
  const incidentId = req.params.incidentId;
  
  try {
    const data = await req.body;
    console.log(data);
    const assassinId = data.assassinId;
    const patchData = db.query(
      `UPDATE incident SET assassin_id = $1 WHERE incident_id = $2`, [assassinId, incidentId]
    )
    res.status(200)
  } catch (error) {
    console.log(error)
    res.status(400)
  }
})

app.post('/incidents', async (req, res) => {
  try {
    const data = await req.body;
    const assassin_id = data.assassin_id;
    const place_id = data.place_id;
    const description = data.description;
    const assassinated = data.assassinated;
    const revenged = data.revenged;
    const time_of_incident = data.time_of_incident;
    const severity_level = data.severity_level;
    console.log(data);
    const postData = db.query(
      `INSERT INTO incident (assassin_id, place_id, description, assassinated, revenged, time_of_incident, severity_level) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [assassin_id, place_id, description, assassinated, revenged, time_of_incident, severity_level]
        
    );
    res.send(postData).status(200);
  } catch (error) {
    res.status(400);
    console.log(error);
  }
});

app.post('/assassin', async (req, res) => {
  try {
    const data = await req.body;
    const assassin_name = data.assassin_name
    console.log(data);
    const postData = db.query(
      `INSERT INTO assassin (assassin_name) VALUES ($1)`, [assassin_name]
    );
    res.send(postData).status(200);
  } catch (error) {
    res.status(400);
    console.log(error);
  }
})

app.post('/place', async (req, res) => {
  try {
    const data = await req.body;
    const place_name = data.place_name
    console.log(data);
    const postData = db.query(
      `INSERT INTO place (place_name) VALUES ($1)`, [place_name]
    );
    res.send(postData).status(200);
  } catch (error) {
    res.status(400);
    console.log(error);
  }
})
module.exports = app;

// assassin_id,
//         place_id,
//         description,
//         assassinated,
//         revenged,
//         time_of_incident,
//         severity_level
//       ]


// SELECT * 
// FROM incident 
// JOIN assassin
// ON incident.assassin_id = assassin.assassin_id
// JOIN place
// ON place.place_id = incident.place_id
// WHERE assassin.assassin_name = 'Ezio' OR
// place.place_name = 'Rome'
