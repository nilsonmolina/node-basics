module.exports = {
  apps: [{
    name: 'NodeJS API',
    script: 'index.js',
    instance_var: 'INSTANCE_ID',
    instances: 2,
    autorestart: true,
    output: './logs/output.log',
    error: './logs/error.log',
    max_memory_restart: '300M',
    env: {
      NODE_ENV: 'development',
      watch: true,
    },
    env_production: {
      NODE_ENV: 'production',
      watch: false,
    },
  }],
};
