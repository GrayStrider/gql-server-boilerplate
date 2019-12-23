const {POSTGRES_URL, POSTRGRES_DATABASE, POSTRGRES_PASSWORD, POSTRGRES_PORT, POSTRGRES_USERNAME} = require("./config/consts")

module.exports =  {
  "name": "default",
  "type": "postgres",
  "host": POSTGRES_URL,
  "port": POSTRGRES_PORT,
  "username": POSTRGRES_USERNAME,
  "password": POSTRGRES_PASSWORD,
  "database": POSTRGRES_DATABASE,
  "synchronize": true,
  "logging": true,
  "entities": [
    "src/entity/*.*"
  ]
}
