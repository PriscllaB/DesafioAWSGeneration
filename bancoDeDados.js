const mongoose = require('mongoose')
require('dotenv').config()

async function conectaBandoDeDados() {
    try {
        console.log('Conexão com o banco de dados iniciou')

    await mongoose.connect('mongodb+srv://priscillatech:nvRJy098bw9x5eGe@clusteraluno.qhw7q.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAluno')
    
    console.log('Conexão com o banco de dados feita com sucesso!')
    } catch(erro){
        console.log(erro)
    }
}

module.exports = conectaBandoDeDados