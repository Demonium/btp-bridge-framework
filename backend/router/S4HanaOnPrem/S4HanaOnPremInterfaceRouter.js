const Router = require("express");
const S4HanaOnPremiseInterfaceRouter = Router();

const OnPremIntegrationSuiteAuthRouter = require("./OnPremIntegrationSuiteAuthRouter");
const OnPremIntegrationSuiteRouter = require("./OnPremIntegrationSuiteRouter");
const OnPremDestinationAuthRouter = require("./OnPremDestinationAuthRouter");
const OnPremDestinationRouter = require("./OnPremDestinationRouter");
const ConfigInterface = require("../../helpers/configInterface");

const getInterfaceMappingConfig = function (req, res, next) {
  const params = req.baseUrl.split('/');
  const systemName = params[2];
  const interfaceName = params[3];
  ConfigInterface.getInterfaceMappingConfig(systemName, interfaceName, req.logger).then((interfaceMapping) => {
    req.interfaceMapping = interfaceMapping;
    next();
  });
}

S4HanaOnPremiseInterfaceRouter.use("/IntegrationSuite", getInterfaceMappingConfig, OnPremIntegrationSuiteAuthRouter, OnPremIntegrationSuiteRouter);
S4HanaOnPremiseInterfaceRouter.use("/Destination", getInterfaceMappingConfig, OnPremDestinationAuthRouter, OnPremDestinationRouter);

module.exports = S4HanaOnPremiseInterfaceRouter;