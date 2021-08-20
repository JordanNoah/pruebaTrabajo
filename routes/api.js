const express = require('express')
const app = express()
const router = express.Router();
const db = require('../models');
app.model = (model) => db[model];

router.post('/createClient', async (req,res)=>{
    const response = new Object();
    var body = req.body;
    console.log(body)
    //insert con check de identificacion
    try {
        const [client,created] = await db.client.findOrCreate({
            where:{identificacion:body.identificacion},
            defaults:{
                primerNombre:body.primerNombre,
                segundoNombre:body.segundoNombre,
                apellidos:body.apellidos,
                identificacion:body.identificacion,
                correo:body.mail
            }
        });
        if(!created){
            response.procesoExitoso=false;
            response.id=client.idClient;
            response.message="Cliente ya existe";
        }else{
            response.procesoExitoso=true;
            response.id=client.idClient;
        }
    } catch (error) {
        response.procesoExitoso=false;
        response.message=error.message.split(':')[1].substring(1);
    }
    res.send(response);
})

router.get('/consultClient/:identificacion', async (req,res)=>{
    const response = new Object();

    var identificacion = req.params;
    var clients = null;

    if (identificacion.identificacion != 'null') {
        clients = await db.client.findOne({where:{identificacion:identificacion.identificacion}})
        if(clients != null){
            response.client=clients;
        }else{
            response.procesoExitoso = false;
            response.message = "No existe cliente con dicha identificacion";
        }
    } else {
        clients = await db.client.findAll();
        response.client=clients;
    }
    res.send(response);
})

router.get('/anularCliente/:id', async (req,res)=>{
    const response = new Object();

    if (req.params.id == 'null') {
        response.procesoExitoso=false;
        response.message="El campo id es obligatorio";
    }else{

    var updateclient = await db.client.update({
        estado:0
    },{where:{
        idClient:req.params.id
    }})
    if(updateclient){
        response.procesoExitoso=true;
        response.id=req.params.id;
    }else{
        response.procesoExitoso=false;
        response.message="El cliente ya se encuentra inactivo";
    }
        
    }
    console.log(response)
})

module.exports = router;