const config = require("./Config.json");

const defaultConfig = config.gateway;       //change this to config.localhost for development

module.exports = defaultConfig;