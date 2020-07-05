const modelVehicle = require('../models/modelVehicle');
const AWS = require('aws-sdk');
AWS.config.update({region: process.env.LAMBDA_AWS_REGION});
// const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08"});


class vehicleService{
    
    static getDateToday(date){
        var strDate;
        strDate = date.getFullYear() + '-' + (date.getMonth()+1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0') + date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0') + ':' + date.getSeconds()
        return strDate;
    }
    
    static convertModel(results){
        var converted = [];
        for(let i=0; i<results.length; i++) {
            var position = results[i];
            var ReqmodelVehicle = new modelVehicle(
                position.name, 
                position.model, 
                position.vehicle_class, 
                position.capacidad_carga, 
                position.consumables, 
                position.cost_in_credits, 
                position.created, 
                position.crew, 
                position.edited, 
                position.length,                 
                position.manufacturer, 
                position.max_atmosphering_speed, 
                position.passengers, 
                position.pilots, 
                position.films,
                position.url)
            converted.push(ReqmodelVehicle);                
        }  
        
        return converted;
    }
    
    static async getvehicles(){
        
        const documentClient = new AWS.DynamoDB.DocumentClient({region: process.env.LAMBDA_AWS_REGION});
        
        var items;
        
        const params = {
            TableName: "vehicle"
        }
        
        try {
            const data = await documentClient.scan(params).promise();
            items = JSON.stringify(data.Items);
                  
        } catch (err) {
            items = [];
        }
        
        return items;
    }

    static registerVehicle(items){
        return new Promise(async (resolve, reject) => {
            var response;
            let date = new Date();
            const documentClient = new AWS.DynamoDB.DocumentClient({ region: process.env.LAMBDA_AWS_REGION});
            
            items = JSON.parse(items);
            
            let ReqmodelVehicle = new modelVehicle(
                items.nombre, 
                items.modelo, 
                items.clase_vehiculo, 
                items.capacidad_carga, 
                items.consumibles, 
                items.costo_en_creditos, 
                null, 
                items.tripulacion, 
                items.editado, 
                items.longitud,                 
                items.fabricante, 
                items.max_atmosfera, 
                items.pasajeros, 
                items.pilotos, 
                items.peliculas,
                items.url)
            

            const params = {
                TableName: "vehicle",
                Item: {
                    nombre : ReqmodelVehicle.nombre,
                    modelo : ReqmodelVehicle.modelo,
                    clase_vehiculo: ReqmodelVehicle.clase_vehiculo,
                    capacidad_carga: ReqmodelVehicle.capacidad_carga,
                    consumibles: ReqmodelVehicle.consumibles,
                    costo_en_creditos: ReqmodelVehicle.costo_en_creditos,
                    creado: this.getDateToday(date),
                    tripulacion: ReqmodelVehicle.tripulacion,
                    editado: this.getDateToday(date),
                    longitud: ReqmodelVehicle.longitud,
                    fabricante: ReqmodelVehicle.fabricante,
                    max_atmosfera: ReqmodelVehicle.max_atmosfera,
                    pasajeros: ReqmodelVehicle.pasajeros,
                    pilotos: ReqmodelVehicle.pilotos,
                    peliculas: ReqmodelVehicle.peliculas,
                    url: ReqmodelVehicle.url                    
                }
            }  
            
   

            try {
                const data = await documentClient.put(params).promise();
                
                response = {
                    responseBody :"success",
                    statusCode : 200
                }        
                resolve(response);            
            } catch (err) {
                response = {
                    responseBody : err.message,
                    statusCode : 403
                }
                reject(response);
            }
                
            
        })
    }
}

module.exports = vehicleService