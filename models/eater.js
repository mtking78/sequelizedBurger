// *** Eater Model
// =============================================================

module.exports = function(sequelize, DataTypes) {
    var Eater = sequelize.define("Eater", {
        eater_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {len: [1, 50]}
        }
    }, {
        timestamps: false
    });

    Eater.associate = function(models) {
        Eater.hasMany(models.Burger, {
            onDelete: "cascade"
        });
    };

    return Eater;
};