const mongoose = require ('mongoose');

const clienteSchema = mongoose.Schema({

  titulo: {type: String, required: true},
  autor: {type: String, required: false, default: '00000000'},
  paginas: {type: String, required: true}
});

module.exports = mongoose.model ('Cliente', clienteSchema);
