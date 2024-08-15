const mongoose = require('mongoose')

const AlunosSchema = new mongoose.Schema({
    nome: {
        type: String, 
        require : true        
    },
    idade: {
        type: Number
    },
    notaPrimeiroSemestre: {
        type: Number
    },
    notaSegundoSemestre: {
        type: Number
    },
    nomeProfessor: {
        type: String
    },
    numeroDaSala: {
        type: Number
    }
});

module.exports = mongoose.model('Alunes', AlunosSchema)