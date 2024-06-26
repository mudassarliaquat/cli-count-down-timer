#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { differenceInSeconds } from "date-fns";
console.log(chalk.bold.cyan.italic("<<<", "-".repeat(50), ">>>"));
console.log(chalk.bold.yellow.italic(`Welcome to Countdown Timer`));
console.log(chalk.bold.cyan.italic("<<<", "-".repeat(50), ">>>"));
const res = await inquirer.prompt([
    {
        name: "input",
        type: "number",
        message: "Enter the Amount of seconds Under 60",
        validate: (input) => {
            if (isNaN(input)) {
                return chalk.bold.red("Please Enter a Valid Number");
            }
            else if (input > 60) {
                return chalk.bold.red("Seconds must be in 60 Seconds");
            }
            else {
                return true;
            }
        },
    },
]);
let input = res.input;
const setTimer = (val) => {
    const intialTime = new Date().setSeconds(new Date().getSeconds() + val);
    const interalTime = new Date(intialTime);
    setInterval(() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(interalTime, currentTime);
        if (timeDiff <= 0) {
            console.log(chalk.bold.italic.gray("Timer has Expired"));
            process.exit();
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
    }, 1000);
};
setTimer(input);
