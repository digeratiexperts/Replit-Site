module.exports = {
  apps: [{
    name: 'digerati',
    cwd: '/root/Replit-Site',
    script: 'dist/index.js',
    env: {
      NODE_ENV: 'production',
      PORT: '5000',
      // Load DB URL via env file below OR set it here directly.
    },
    node_args: ['--env-file=.env']
  }]
}
