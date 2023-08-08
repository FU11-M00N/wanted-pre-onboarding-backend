module.exports = [
   {
      script: 'app.js',
      name: 'express-app',
      exec_mode: 'cluster',
      instances: 1,
      env: {
         NODE_ENV: 'production',
      },
   },
];
