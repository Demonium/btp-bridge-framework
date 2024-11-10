const axios = require("axios");
// import config from  with { type: "json" };

class ConfigInterface {
  getInterfaceMappingConfig(path, logger) {
    return new Promise((resolve, reject) => {
      console.log(
        "Inside get interface mapping",
        process.env.configServerBackendUrl,
        path
      );
      const config = global.myCache.get(path);
      if (config) {
        logger.info("InterfaceMappingConfig cached", path);
        resolve(config);
      } else {
        console.log(__dirname);
        logger.info("InterfaceMappingConfig retrieved", path);
        const configServerFile =
          "../" + process.env.configServerBackendUrl + path;
        const configServer = require(configServerFile);

        global.myCache.set(path, configServer);
        resolve(configServer);
      }
    });
  }
}

module.exports = new ConfigInterface();
