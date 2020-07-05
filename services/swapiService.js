const service = require('./vehicleService');
var http = require("https");

class swapiService{
    
    static async invokeVehiclesBd(){
        var response = {};
        
        try{
            var results = [];
            results = await service.getvehicles();
            results = JSON.parse(results);
            response = {
                results : results,
                message : 'success'
            }
            
        }catch(err){
            response = {
                results : 0,
                message : err.message
            }            
        }
        
        return response;
            
    }
    
    static convertToModel(){
        return new Promise((resolve, reject) => {
            var body = [];
            var results = [];
            var resultConverted = [];
            
            const options = {
              "method": "GET",
              "hostname":  process.env.LAMBDA_URL_SWAPI,
              "port": null,
              "path": "/api/vehicles/",
              "headers": {
                "cache-control": "no-cache"
              }
            };
            const req = http.request(options, (res) => {

                res.on('data', function(chunk) {
                    body.push(chunk);
                });
                res.on('end', async function() {
                    try {
                        body = JSON.parse(Buffer.concat(body).toString());
                        results = body.results;
                        resultConverted = await service.convertModel(results);
                        resolve(resultConverted);
                    } catch(e) {
                        console.log(e.message);
                    }
                });
            });
        
            req.on('error', (e) => {
              console.log(e.message);
            });
            req.end();   
        });
    }

    static async invokeVehicles(){
            var merged = [];
            var resultConverted = [];

            // CONVERT TO MODEL
            await this.convertToModel().then(res => {
                resultConverted = res
            });
            
            
            // BASE DE DATOS DYNAMODB
            var resultsDB = [];
            resultsDB = await service.getvehicles();
            resultsDB = JSON.parse(resultsDB);
            
            // MERGE
            for(let i=0; i<resultsDB.length; i++) {
              merged.push(resultsDB[i]);
            }               
            for(let i=0; i<resultConverted.length; i++) {
              merged.push(resultConverted[i]);
            }            
            
            return merged;
            
    }
    
}

module.exports = swapiService