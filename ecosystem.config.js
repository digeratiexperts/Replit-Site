module.exports = {
  apps: [{
    name: 'digerati',
    script: 'dist/index.js',
    cwd: '/root/Replit-Site',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    node_args: '--env-file=.env'
  }]
};
