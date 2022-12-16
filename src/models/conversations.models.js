const {DataTypes} = require('sequelize');
const db = require('../utils/database');
const Users = require('./users.models')

const Conversations = db.define('conversations', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    tittle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imgUrl:{
        type: DataTypes.STRING,
    },
    userId: { //! Esto es una llave Foranea -- las llaves foraneas se agradecen mejor en CamelCase.
        type: DataTypes.UUID,
        allowNull: false,
        references: { //! Esta parte de references hace la conexion foranea con la tabla de users.
            key: 'id', //! Esto es como se llama la llave primaria de la otra tabla.
            model: Users //! Indica el Modelo de donde sacaremos la foranea.
        }
    }
})

module.exports = Conversations