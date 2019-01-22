module.exports = {
  apps: [{
    name: 'API',
    script: 'server.js',
    instance_var: 'INSTANCE_ID',
    instances: 1,
    autorestart: true,
    max_memory_restart: '300M',
    watch: false,
    output: './logs/output.log',
    error: './logs/error.log',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }],
};
