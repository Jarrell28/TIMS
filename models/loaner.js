module.exports = function (sequelize, DataTypes) {
    var Loaner = sequelize.define("Loaner", {
        // Giving the Author model a name of type STRING
        model: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        serialNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        expenseNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        customerId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        checkedOut: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        checkoutDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        checkoutIn: {
            type: DataTypes.DATE,
            allowNull: true
        }

    });

    Loaner.associate = function (models) {
        models.Loaner.belongsTo(models.User, {
            as: "tech"
        });
    };

    return Loaner;
};
