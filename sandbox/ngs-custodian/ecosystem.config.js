module.exports = {
  apps: [{
    name: 'API',
    script: 'server.js',
    instance_var: 'INSTANCE_ID',
    instances: 1,
    autorestart: true,
    watch: false,
    output: './logs/output.log',
    error: './logs/error.log',
    max_memory_restart: '300M',
    env: {
      NODE_ENV: 'development',
      DEBUG: 'app:files',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }],
};
