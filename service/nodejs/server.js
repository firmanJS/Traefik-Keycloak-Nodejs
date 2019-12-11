const Keycloak = require('keycloak-connect')
const express = require('express')
const session = require('express-session')
const path = require('path')
const app = express()

const memoryStore = new session.MemoryStore()
const keycloak = new Keycloak({ store: memoryStore })

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Register '.mustache' extension with The Mustache Express
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(session({                                 
  secret:'JDSsecretKey',                         
  resave: false,                         
  saveUninitialized: true,                         
  store: memoryStore                       
}));
app.use(keycloak.middleware())

app.get('/', keycloak.protect(), function (req, res) {
  const token = JSON.parse(req.session['keycloak-token']);
  token['logout_url'] = `<a class="btn btn-warning" href="http://${req.headers.host}/logout">Logout</a>`;
  res.render('index',{
    status:200,
    request:token,
    rule:[]
  })
})

app.get('/logout', function (req, res, next) {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        return next(err)
      } else {
        return res.redirect('/')
      }
    })
  }
})

const server = app.listen(3001, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})