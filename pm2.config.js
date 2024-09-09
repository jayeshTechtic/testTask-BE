module.exports = {
  apps: [
    {
      name: 'test-task:3000',
      script: 'dist/main.js',
      instances: 1, // Or a number of instances
      autorestart: true,
      watch: false,
      exec_mode: 'fork',
    },
  ],
};
