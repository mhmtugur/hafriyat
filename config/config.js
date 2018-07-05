module.exports = {
    development: {
        username: "root",//process.env.DB_USERNAME,
        password: 123456,//process.env.DB_PASSWORD,
        database: "hafriyat",//process.env.DB_NAME,
        host: "localhost",//process.env.DB_HOSTNAME,
        dialect: 'mysql',
    },
    production: {
      username: "root",//process.env.DB_USERNAME,
      password: 123456,//process.env.DB_PASSWORD,
      database: "hafriyat",//process.env.DB_NAME,
      host: "localhost",//process.env.DB_HOSTNAME,
      dialect: 'mysql',
    }
  };