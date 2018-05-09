// *** Burger Model
// =============================================================

module.exports = function(sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {
        burger_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {len: [1, 50]}
        },
        devoured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        EaterId: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        timestamps: false
    });

    Burger.associate = function(models) {
        Burger.belongsTo(models.Eater, {
            foreignKey: {
                allowNull: true
            }
        });
    };

    return Burger;
};