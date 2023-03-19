const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("Platform", {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: { 
            type: DataTypes.STRING,
        },
    },
        { timestamps: false }
    );
};