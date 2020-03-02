const scpClient = require("scp2");
const ora = require("ora");
const chalk = require("chalk");
const server = require("./config");
const spinner = ora(
  `正在发布到${server.name}...`
);
spinner.start();
scpClient.scp(
  "dist/",
  {
    host: server.host,
    port: server.port,
    username: server.username,
    password: server.password,
    path: server.path
  },
  function(err) {
    spinner.stop();
    if (err) {
      console.log(chalk.red(`发布到${server.name}失败.\n`));
      throw err;
    } else {
      console.log(
        chalk.green(
          `Success! 成功发布到${server.name}! \n`
        )
      );
    }
  }
);
