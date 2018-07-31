module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'API',
      script    : 'index.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    },

    // Second application
    {
      name      : 'scheduler',
      script    : 'scheduler.js'
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
        key: 'keys/asset_managment.pem',
        user : 'ubuntu',
        host : 'ims-tool.westagilelabs.com',
        ref  : 'origin/master',
        repo : 'git@github.com:keshav0016/inventory-server.git',
        path : '/home/ubuntu/apps/production',
        'post-deploy' : 'source /home/ubuntu/.bashrc && npm install && pm2 reload ecosystem.config.js --env production',
	env: {
          NODE_ENV: 'production'	  
	}
    },
    dev : {
      key: 'keys/asset_managment.pem',
      user : 'ubuntu',
      host : 'qa-ims-tool.westagilelabs.com',
      ref  : 'origin/master',
      repo : 'git@github.com:keshav0016/inventory-server.git',
      path : '/home/ubuntu/apps/production',
      'post-deploy' : 'source /home/ubuntu/.bashrc && npm install && pm2 reload ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
};
