const { Router } = require("express");
const shippingsRouter = require("./shippings");
const router = Router();

router.use("/shippings", shippingsRouter);

module.exports = router;
