const Router = require("express");
const S4HanaOnPremiseInterfaceRouter = Router();
const ConfigInterface = require("../../helpers/configInterface");
const OnPremDestinationRouter = require("./Interface/OnPremDestinationRouter");
const OnPremDestinationAuthRouter = require("./Auth/OnPremDestinationAuthRouter");

const getInterfaceMappingConfig = function (req, res, next) {
  console.log("Inside get interface mapping for onprem");
  const params = req.baseUrl.split("/");
  const systemName = params[2];
  const interfaceName = params[3];

  ConfigInterface.getInterfaceMappingConfig(
    "objectMappingConfig.json",
    req.logger
  )
    .then((interfaceMapping) => {
      console.log(
        "Interface config received for OnPrem: ",
        interfaceMapping[systemName][interfaceName]
      );
      req.interfaceMapping = interfaceMapping[systemName][interfaceName];
      next();
    })
    .catch((error) => {
      console.log(error);
    });
};

S4HanaOnPremiseInterfaceRouter.use(
  "/Destination",
  getInterfaceMappingConfig,
  OnPremDestinationAuthRouter,
  OnPremDestinationRouter
);

module.exports = S4HanaOnPremiseInterfaceRouter;
