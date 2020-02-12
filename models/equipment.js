module.exports = function (sequelize, DataTypes) {
    var Equipment = sequelize.define("Equipment", {
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
        warrantyExpiration: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        checkedOut: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Equipment.associate = function (models) {
        models.Equipment.belongsTo(models.Category);
    };

    return Equipment;
};
