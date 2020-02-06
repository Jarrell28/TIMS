module.exports = function (sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  // Add a belongsTo association to Authors here
  Post.associate = function (models) {
    models.Post.belongsTo(models.Author, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  // Example: https://github.com/sequelize/express-example/blob/master/models/task.js
  return Post;
};
