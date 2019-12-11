const enviroments = {};

enviroments.development = {
  name: "development",
  port: 2000,
  db: {
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rems'
  }
}

enviroments.staging = {
  name: "staging",
  port: 3000,
  db: {
    connectionLimit: 100,
    host: 'rems_staging',
    user: 'root',
    password: '',
    database: 'rems'
  }
}

enviroments.production = {
  name: "production",
  port: 4000,
  db: {
    connectionLimit: 100,
    host: 'rems_production',
    user: 'root',
    password: '',
    database: 'rems'
  }
}

const enviromentName = typeof (process.env.NODE_ENV) === "string" ?
  process.env.NODE_ENV.toLocaleLowerCase() : "";

const enviromentToExport = typeof (enviroments[enviromentName]) === "object" ?
  enviroments[enviromentName] : enviroments.development;

console.log(enviromentToExport);
module.exports = enviromentToExport;