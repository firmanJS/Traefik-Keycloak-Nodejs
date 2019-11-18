'use strict'
const express = require('express')
const app = express()
const path = require('path')
const indexHTML = path.join(__dirname, 'user.html')
const keycloakJSON = path.join(__dirname, 'keycloak-user.json')
const jwt = require('jsonwebtoken')
app.get('/user', function (req, res) {
  if (!req.headers['authorization']) return res.json({msg:'unauthorized'})
  let encToken = req.headers['authorization'].replace(/Bearer\s/, '')
  let decToken = jwt.decode(encToken)
  let clientAccess = decToken.aud.includes('demo-client')
  if (clientAccess)
    res.json({user:['user1', 'user2', 'user3']})
  else
    res.json({msg:'no access allowed !'})
});
app.post('/user', function (req, res) {
  if (!req.headers['authorization']) return res.json({msg:'unauthorized'})
  let encToken = req.headers['authorization'].replace(/Bearer\s/, '')
  let decToken = jwt.decode(encToken)
  let clientAccess = decToken.resource_access['user-client']
  if (clientAccess && clientAccess.roles.includes('access_save'))
    res.json({msg:'succes !'})
  else
    res.json({msg:'no access !'})
});
app.get('/user/:id', function (req, res) {
  if (!req.headers['authorization']) return res.json({msg:'unauthorized'})
  let encToken = req.headers['authorization'].replace(/Bearer\s/, '')
  let decToken = jwt.decode(encToken)
  let clientAccess = decToken.resource_access['user-client']
  if (clientAccess && clientAccess.roles.includes('access_edit'))
    res.json({car:['bmw', 'mercedes', 'honda']})
  else
    res.json({msg:'no access !'})
});
app.patch('/user/:id', function (req, res) {
  if (!req.headers['authorization']) return res.json({msg:'unauthorized'})
  let encToken = req.headers['authorization'].replace(/Bearer\s/, '')
  let decToken = jwt.decode(encToken)
  let clientAccess = decToken.resource_access['user-client']
  if (clientAccess && clientAccess.roles.includes('access_patch'))
    res.json({msg:'success updated'})
  else
    res.json({msg:'no access !'})
});
app.delete('/user/:id', function (req, res) {
  if (!req.headers['authorization']) return res.json({msg:'unauthorized'})
  let encToken = req.headers['authorization'].replace(/Bearer\s/, '')
  let decToken = jwt.decode(encToken)
  let clientAccess = decToken.resource_access['user-client']
  if (clientAccess && clientAccess.roles.includes('access_delete'))
    res.json({msg:'success deleted'})
  else
    res.json({msg:'no access !'})
});

app.get('/', function (req, res) {
  res.json({msg:'no access !'})
})

app.get('/keycloak-user.json', function (req, res) {
  res.sendFile(keycloakJSON)
})

app.listen(3001);
console.log('app running in port 3001');