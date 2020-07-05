const swapiService = require('../services/swapiService');
const service = require('../services/vehicleService');

exports.getItems = async (event) => {

    var items;

    items = await swapiService.invokeVehicles(); 
    
    items = JSON.stringify(items);

    const response = {
        statusCode: 200,
        headers: {
            "myHeader": "test",
            "Access-Control-Allow-Headers": "Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: items
    };

    return response;
}


exports.postItems = async (event) => {
    var items,result;

    items = event.body;
    result = await service.registerVehicle(items);
    result = JSON.stringify(result);

    const response = {
        statusCode: 200,
        headers: {
            "myHeader": "test",
            "Access-Control-Allow-Headers": "Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: result
    };

    return response;
}
