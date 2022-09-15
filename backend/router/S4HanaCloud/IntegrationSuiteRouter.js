const Router = require("express");
const IntegrationSuite = require("../../sap/integrationSuite");
const ResponseFormatter = require("../../helpers/responseFormatter");
const IntegrationSuiteRouter = Router();

// get collection of first level object
IntegrationSuiteRouter.get("/:obj1", (req, res) => {
  const paramPathArray = [req.params.obj1];
  IntegrationSuite.searchObject(paramPathArray, req.query, req.interfaceMapping, req.commonConfig).then((response) => {
    return ResponseFormatter.formatTableData(response, req.logger);
  }).then((response) => {
    res.send(response);
  }).catch((error) => {
    res.send(error);
  });
});

// get collection of second level object
IntegrationSuiteRouter.get("/:obj1/:id1/:obj2", (req, res) => {
  const paramPathArray = [req.params.obj1, req.params.id1, req.params.obj2];
  IntegrationSuite.searchObject(paramPathArray, req.query, req.interfaceMapping, req.commonConfig).then((response) => {
    return ResponseFormatter.formatTableData(response, req.logger);
  }).then((response) => {
    res.send(response);
  }).catch((error) => {
    res.send(error);
  });
});

// get single first level object
IntegrationSuiteRouter.get("/:obj1/:id1", (req, res) => {
  const paramPathArray = [req.params.obj1, req.params.id1];
  IntegrationSuite.getObject(paramPathArray, req.interfaceMapping, req.commonConfig).then((response) => {
    res.send(response.data.d);
  }).catch((error) => {
    res.send(error);
  });
});

// get single second level object
IntegrationSuiteRouter.get("/:obj1/:id1/:obj2/:id2", (req, res) => {
  const paramPathArray = [req.params.obj1, req.params.id1, req.params.obj2, req.params.id2];
  IntegrationSuite.getObject(paramPathArray, req.interfaceMapping, req.commonConfig).then((response) => {
    res.send(response.data.d);
  }).catch((error) => {
    res.send(error);
  });
});

// update single first level object
IntegrationSuiteRouter.patch("/:obj1/:id1", (req, res) => {
  const paramPathArray = [req.params.obj1, req.params.id1];
  IntegrationSuite.getObject(paramPathArray, req.interfaceMapping, req.commonConfig).then((response) => {
    return IntegrationSuite.updateObject(paramPathArray, req.interfaceMapping, req.commonConfig, response, req.body);
  }).then((response) => {
    res.send(ResponseFormatter.successMessage(response));
  }).catch((error) => {
    res.status(error.response.status);
    res.send(ResponseFormatter.errorMessage(req, error, req.logger));
  });
});

// update single second level object
IntegrationSuiteRouter.patch("/:obj1/:id1/:obj2/:id2", (req, res) => {
  const paramPathArray = [req.params.obj1, req.params.id1, req.params.obj2, req.params.id2];
  IntegrationSuite.getObject(paramPathArray, req.interfaceMapping, req.commonConfig).then((response) => {
    return IntegrationSuite.updateObject(paramPathArray, req.interfaceMapping, req.commonConfig, response, req.body);
  }).then((response) => {
    res.send(ResponseFormatter.successMessage(response));
  }).catch((error) => {
    res.status(error.response.status);
    res.send(ResponseFormatter.errorMessage(req, error, req.logger));
  });
});

module.exports = IntegrationSuiteRouter;