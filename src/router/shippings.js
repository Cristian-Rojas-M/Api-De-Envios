require("dotenv").config();
const server = require("express").Router();
const { Shippings } = require("../db");
const haversine = require("haversine");

server.get("/ViewShipmentSstatus/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      let shipping = await Shippings.findByPk(id);
      if (shipping.status === "Entregado") {
        res.status(200).json({
          customer: shipping.customer,
          description: shipping.descrip,
          status: shipping.status,
          aprox_distance: 0,
        });
      } else {
        res.status(200).json({
          customer: shipping.customer,
          description: shipping.descrip,
          status: shipping.status,
          aprox_distance: `la distancia es de ${shipping.aprox_distance} km`,
        });
      }
    } else {
      res.status(400).send("missing data");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

server.post("/createShipping", async (req, res) => {
  const {
    customer,
    descrip,
    status,
    origin_lat,
    origin_long,
    end_lat,
    end_log,
  } = req.body;

  try {
    if (
      customer &&
      descrip &&
      status &&
      origin_lat &&
      origin_long &&
      end_lat &&
      end_log
    ) {
      const start = {
        latitude: origin_lat,
        longitude: origin_long,
      };
      const end = {
        latitude: end_lat,
        longitude: end_log,
      };
      let aprox_distance = haversine(start, end).toString().slice(0, 4);
      aprox_distance = parseFloat(aprox_distance);

      const order = await Shippings.findOrCreate({
        where: {
          customer,
          descrip,
          status,
          origin_lat,
          origin_long,
          end_lat,
          end_log,
          aprox_distance,
        },
      });

      res.status(200).json({
        order,
        aprox_distance: `${aprox_distance} km away`,
      });
    } else {
      res.status(400).send("lack of data");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

server.put("/updateSend", async (req, res) => {
  const { id, current_lat, current_long } = req.body;
  try {
    if (id && current_long && current_lat) {
      const shipping = await Shippings.findByPk(id);
      const newLocation = { latitude: current_lat, longitude: current_long };
      const end = { latitude: shipping.end_lat, longitude: shipping.end_log };

      shipping.aprox_distance = haversine(newLocation, end)
        .toString()
        .slice(0, 4);

      shipping.aprox_distance = parseFloat(shipping.aprox_distance);

      await Shippings.update(
        {
          current_lat,
          current_long,
          aprox_distance: shipping.aprox_distance,
          status: "En proceso",
        },
        { where: { id } }
      );
      let updateShipping = await Shippings.findByPk(id);

      res.status(200).json({
        status: `el estado del envio esta  ${updateShipping.status}`,
        distance: `el envio esta a ${updateShipping.aprox_distance} km`,
      });
    } else {
      res.status(400).send("missing data  ");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

server.put("/shippingDelivered", async (req, res) => {
  const { id, status } = req.body;
  try {
    if (id && status === "Entregado") {
      await Shippings.update(
        { status, aprox_distance: 0, finish_at: new Date() },
        { where: { id } }
      );
      let updateShipping = await Shippings.findByPk(id);
      res.status(200).json(updateShipping);
    } else {
      res.status(400).send("missing data");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = server;
