const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("shippings", {
    customer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descrip: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["Pendiente ", "En proceso", "Entregado"],
    },
    origin_lat: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    origin_long: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    current_lat: {
      type: DataTypes.DOUBLE,
    },
    current_long: {
      type: DataTypes.DOUBLE,
    },
    end_lat: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    end_log: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    aprox_distance: {
      type: DataTypes.FLOAT,
    },
    finish_at: {
      type: DataTypes.DATE,
    },
  });
};
