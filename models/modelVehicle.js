class ReqVehicle {
    constructor(nombre = null,
        modelo = null,
        clase_vehiculo = null,
        capacidad_carga = null,
        consumibles = null,
        costo_en_creditos = null,
        creado = null,
        tripulacion = null,
        editado = null,
        longitud = null,
        fabricante = null,
        max_atmosfera = null,
        pasajeros = null,
        pilotos = null,
        peliculas = null,
        url = null
    ) {

        this.nombre = nombre;
        this.modelo = modelo;
        this.capacidad_carga = capacidad_carga;
        this.clase_vehiculo = clase_vehiculo;
        this.consumibles = consumibles;
        this.costo_en_creditos = costo_en_creditos;
        this.creado = creado;
        this.editado = editado;
        this.fabricante = fabricante;
        this.longitud = longitud;
        this.max_atmosfera = max_atmosfera;
        this.pasajeros = pasajeros;
        this.peliculas = peliculas;
        this.pilotos = pilotos;
        this.tripulacion = tripulacion;
        this.url = url;
    }
}

module.exports = ReqVehicle;