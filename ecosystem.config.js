module.exports = {
  apps: [{
    name: 'digeratiexperts-site',
    script: 'dist/index.js',
    cwd: '/root/Replit-Site',
    env: {
      NODE_ENV: 'production',
      PORT: 3300
    },
    node_args: '--env-file=.env'
  }]
};
