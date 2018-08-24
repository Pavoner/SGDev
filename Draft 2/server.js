
const express = require('express') 
const bodyParser = require('body-parser')
const routes = require('./routes')
const expressMongoDb = require('./mongoUtils.js')
const serveStatic = require('serve-static')
const coll = 'dev'



const app = express()

app.use(serveStatic('public', {'index': ['index2.html', 'index2.htm']}))
app.use((req, res, next)=> {
    //res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Content-Type", "application/json");
    next();
})
app.use(bodyParser.json())
app.use(expressMongoDb('mongodb://localhost:27017/pitRecorderDev', { useNewUrlParser: true }))



app.get('/pitList', routes.pits.getPits),
app.get('/pitList/:pitId', routes.pits.getPits),
app.post('/pitList', routes.pits.addPit),
app.put('/pitList/:pitId', routes.pits.updatePit),
app.delete('/pitList/:pitId', routes.pits.removePit),

app.get('/pitList/:pitId/results', routes.results.getPitResults),
app.get('/pitList/:pitId/results/resultId', routes.results.getPitResults),
app.post('/pitList/:pitId/results', routes.results.addPitResult),
app.put('/pitList/:pitId/results/resultId', routes.results.updatePitResult),
app.delete('/pitList/:pitId/results/resultId', routes.results.removePitResult),

app.listen(3000)

console.log('\n\nServer Running...\n')
