#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bold("\n#####################################################"));
console.log(chalk.bold("====================================================="));
console.log(chalk.bold("\tWelcome To Rimsha Naz ATM Machine"));
console.log(chalk.bold("====================================================="));
console.log(chalk.bold("#####################################################"));
console.log("\n");
let myBalance = 10000;
let savePin = 3221;
let correctPin = await inquirer.prompt([{
        type: "number",
        name: "pin",
        message: chalk.bold.hex("#00BFFF")("Enter your Pin Code ")
    }]);
if (correctPin.pin === savePin) {
    let operationAns = await inquirer.prompt([{
            type: "list",
            name: "operation",
            message: chalk.bold.hex('#FF005D')("Please Select Option "),
            choices: ["Withdraw Money", "Deposit Money", "Check Balance", "Fast Cash"]
        }]);
    if (operationAns.operation === "Withdraw Money") {
        let subAmountAns = await inquirer.prompt([{
                type: "number",
                name: "subamount",
                message: chalk.bold.hex('#ffffff')("Enter Amount "),
            }]);
        if (subAmountAns.subamount > myBalance) {
            console.log(chalk.bold.hex("#FF0400")("Balance is insufficient"));
        }
        else {
            myBalance -= subAmountAns.subamount;
            console.log(chalk.bold.hex('#33EB00')(`Your Remaning Bank Balance is ${myBalance}`));
        }
    }
    if (operationAns.operation === "Deposit Money") {
        let addAmountAns = await inquirer.prompt([{
                type: "number",
                name: "addamount",
                message: "Enter Amount ",
            }]);
        if (addAmountAns.addamount > 2500) {
            console.log(chalk.bold.hex("#FF0400")("You Deposit only 5000 at a Time"));
        }
        else {
            myBalance += addAmountAns.addamount;
            console.log(chalk.bold.hex('#33EB00')(`Your Current Bank Balance is ${myBalance}`));
        }
    }
    if (operationAns.operation === "Check Balance") {
        console.log(chalk.bold.hex("#FFAE00")(`Your Remaning Balance is ${myBalance}`));
    }
    if (operationAns.operation === "Fast Cash") {
        let fastCashAns = await inquirer.prompt([{
                type: "list",
                name: "fastCash",
                message: chalk.bold.hex('#FF005D')("Select Fast Cash "),
                choices: ["500", "1000", "5000", "7000", "10000"]
            }]);
        if (fastCashAns.fastCash > myBalance) {
            console.log(chalk.bold.hex("#FF0400")("Balance is insufficient"));
        }
        else {
            myBalance -= fastCashAns.fastCash;
            console.log(chalk.bold.hex("#33EB00")(`Your Remaning Bank Balance is ${myBalance}`));
        }
    }
}
else {
    console.log(chalk.bold.hex("#FF0400")("Pin Code Not Correct!!!"));
}
