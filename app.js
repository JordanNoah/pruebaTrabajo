const express = require("express");
const app = express();
const PORT = process.env.PORT || 3002;
const db = require("./models");
const apiRoute = require('./routes/api')
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', apiRoute)

app.use(function(req,res){
    res.status(404).send("error 404 no existe esta pagina");
});

db.sequelize.sync({}).then(()=>{
    app.listen(PORT, () => {
        console.log(`Escuchando el puerto *:${PORT}`)
       })
})