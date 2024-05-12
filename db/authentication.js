const sequelize = require('./database')
async function authentication() {
  try {
    await sequelize.authenticate();
    console.log("connection perfect");
  } catch (e) {
    console.log(e);
  }
}

module.exports = authentication;