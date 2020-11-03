const request = require('request')

const forecast = (latitude,longitude,callback) =>
{
    const url = 'https://api.darksky.net/forecast/038dd2b5e7310e2dbb0b6ad6d19ba8b1/' + latitude + ',' + longitude+'?units=si'
    request({ url,json: true},(error, {body }) =>{
        if(error)
        {
            callback('Impossible de se connecter aux services', undefined)
        }
        else if(body.error)
        {
            callback('Localité non trouvée.', undefined)
        }
        else{
            callback(undefined, {
                icon: body.daily.data[0].icon,
                summary: body.daily.data[0].summary + ' Il fait actuellement ' + body.currently.temperature + ' degré. La plus forte température aujourd\'hui est ' + body.daily.data[0].temperatureHigh+ ' et la plus faible est '+ body.daily.data[0].temperatureLow + '. Il y a ' + body.currently.precipProbability + '% de chance de pluie aujourdhui.'
            })
        }
    })
}


module.exports = forecast

