module.exports = {
  apps: [
    {
      name: "shici",
      port: "4000",
      exec_mode: "cluster",
      instances: "max",
      script: "./build/index.js",
      env: {
        DATABASE_URL: "file:/var/www/namesfang/shici.cli.life/prisma/app.db",
        REDIS_URL: "redis://:123456@192.168.9.66/3"
      }
    },
  ],
};