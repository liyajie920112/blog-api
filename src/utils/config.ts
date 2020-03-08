process.env["NODE_CONFIG_DIR"] = process.cwd() + '/src/config/'
const config = require("config")

export {
  config
}