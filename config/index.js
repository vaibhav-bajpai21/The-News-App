const convict = require('convict');

// Define a schema
let config = convict({
    port: {
      doc: 'The port to bind.',
      format: 'port',
      default: 5000,
      env: 'PORT',
      arg: 'port'
    },
    db: {
      host: {
        doc: 'MongoDB URL',
        env:"DB_URL",
        default: ""
      }
    }
  });
  
  // Load environment dependent configuration
  config.loadFile(path.join(__dirname,"../config.json"));
  
  // Perform validation
  config.validate({allowed: 'strict'});
  
  module.exports = config._instance;