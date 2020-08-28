var mongoose  =  require('mongoose');  
  
var csvSchema = new mongoose.Schema({  
    _id: mongoose.Schema.Types.ObjectId,
    numero: String,
    descripcion: String,
    marca: String,
    modelo: String,
    serie: String,
    ubicacion: String,
    no_trabajador: String,
    custodio: String,
    cve_depen: String,
    dependencia: String,
    custodio2: String,
    observaciones: String
});  
  
module.exports = mongoose.model('studentsrecords',csvSchema);  