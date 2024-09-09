module.exports = {
  apps: [
    {
      name: 'employee-training-platform',
      script: 'dist/main.js',
      instances: 1, // Or a number of instances
      autorestart: true,
      watch: false,
      exec_mode: 'fork',
    },
  ],
};
