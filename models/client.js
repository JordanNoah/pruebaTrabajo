module.exports = (db,DataTypes) => {
    const client = db.define('client',{
        idClient:{ type: DataTypes.INTEGER, primaryKey:true, allowNull:false, autoIncrement:true },
        primerNombre:{ type:DataTypes.STRING(100), allowNull:false, validate:{notNull:{msg:"El campo primer nombre es requerido"}} },
        segundoNombre:{ type:DataTypes.STRING(100), allowNull:true },
        apellidos:{ type:DataTypes.STRING(100), allowNull:false, validate:{notNull:{msg:"El campo apellidos es requerido"}} },
        identificacion:{ type:DataTypes.STRING(100), allowNull:false, validate:{notNull:{msg:"El campo identificacion es requerido"}} },
        correo:{ type:DataTypes.TEXT('LONG'), allowNull:false, validate:{notNull:{msg:"El campo correo es requerido"}} },
        estado:{ type:DataTypes.INTEGER, allowNull:false, defaultValue:1 },
    });
    return client;
}