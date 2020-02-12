module.exports = function (sequelize, DataTypes) {
    var Request = sequelize.define("Request", {
        // Giving the Author model a name of type STRING
        status: {
            type: DataTypes.STRING,
            defaultValue: "pending"
        },
        approvedDate: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    });

    Request.associate = function (models) {
        models.Request.belongsTo(models.User, {
            as: "userRequest"
        });

        models.Request.belongsTo(models.User, {
            as: "userApprove"
        });

        models.Request.belongsTo(models.Equipment);

        models.Request.belongsTo(models.Loaner);
    };

    return Request;
};

