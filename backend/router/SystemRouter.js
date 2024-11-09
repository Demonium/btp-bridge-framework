const Router = require("express");

const SystemRouter = Router();

const S4HanaOnPremInterfaceRouter = require("./S4HanaOnPrem/S4HanaOnPremInterfaceRouter");

SystemRouter.use("/S4HanaOnPrem", S4HanaOnPremInterfaceRouter);

module.exports = SystemRouter;
