const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define  paths for Express config
const pathPublic = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and viewss location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(pathPublic))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Météo',
        name: 'Amédée DERA'
    })
})

app.get('/a-propos', (req, res) => {
    res.render('a-propos',{
        title: 'A propos',
        name: 'Amédée DERA'
    })
})

app.get('/aide', (req, res) => {
    res.render('aide', {
        message: 'Cette app vous permet d\'avoir les infos sur la météo selon votre localité........!!!',
        contact: 'Contact mail id: dera.amedee@gmail.com',
        title: 'Aide',
        name:'Amédée DERA'
    })
})

app.get('/météo',  (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Entrer une localité...'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, {icon, units, summary}) => {
                  if(error){
                      return res.send({error})
                  }

                  res.send({
                      summary,
                      icon,
                      location,
                      address: req.query.address
                  })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
       return res.send({
            error: 'Vous devez entrer un mot clé'
        })
    }
    console.log(req.query)
    res.send({
        product: []
    })
})

app.get('/aide/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Amédée DERA',
        errorMessage: 'Article d\'aide non trouvé.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Amédée DERA',
        errorMessage:'Page web non trouvée!'
    })
})

app.listen(port, () =>{
    console.log('Le serveur a démarré au port '+ port)
})