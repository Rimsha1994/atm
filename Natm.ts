import inquirer from 'inquirer';
import chalk from 'chalk';

let accountBalance = 100000;
const accountHistory: any[] = [];

async function atmMachine() {
  while (true) {
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'option',
        message: 'Select an option:',
        choices: [
          'Add cash',
          'Withdraw cash',
          'Fast cash',
          'Check balance',
          'Check account history',
          'Transfer funds',
          'Exit'
        ]
      }
    ]);

    switch (answer.option) {
      case 'Add cash':
        const addAmount = await inquirer.prompt([
          {
            type: 'number',
            name: 'amount',
            message: 'Enter amount to add:'
          }
        ]);
        accountBalance += addAmount.amount;
        accountHistory.push(`Added ${addAmount.amount} to your account.`);
        console.log(chalk.green(`Added ${addAmount.amount} to your account. New balance: ${accountBalance}`));
        break;
      case 'Withdraw cash':
        const withdrawAmount = await inquirer.prompt([
          {
            type: 'number',
            name: 'amount',
            message: 'Enter amount to withdraw:'
          }
        ]);
        if (withdrawAmount.amount > accountBalance) {
          console.log(chalk.red('Insufficient balance'));
        } else {
          accountBalance -= withdrawAmount.amount;
          accountHistory.push(`Withdrew ${withdrawAmount.amount} from your account.`);
          console.log(chalk.green(`Withdrawal successful. New balance: ${accountBalance}`));
        }
        break;
      case 'Fast cash':
        const fastCashAmount = 500;
        if (fastCashAmount > accountBalance) {
          console.log(chalk.red('Insufficient balance'));
        } else {
          accountBalance -= fastCashAmount;
          accountHistory.push(`Withdrew ${fastCashAmount} from your account using fast cash.`);
          console.log(chalk.green(`Fast cash withdrawn. New balance: ${accountBalance}`));
        }
        break;
      case 'Check balance':
        console.log(chalk.blue(`Your account balance is: ${accountBalance}`));
        break;
      case 'Check account history':
        console.log(chalk.yellow(accountHistory.join('\n')));
        break;
      case 'Transfer funds':
        const transferAmount = await inquirer.prompt([
          {
            type: 'number',
            name: 'amount',
            message: 'Enter amount to transfer:'
          }
        ]);
        const transferTo = await inquirer.prompt([
          {
            type: 'input',
            name: 'account',
            message: 'Enter account number to transfer to:'
          }
        ]);
        if (transferAmount.amount > accountBalance) {
          console.log(chalk.red('Insufficient balance'));
        } else {
          accountBalance -= transferAmount.amount;
          accountHistory.push(`Transferred ${transferAmount.amount} to account ${transferTo.account}`);
          console.log(chalk.green(`Transfer successful. New balance: ${accountBalance}`));
        }
        break;
      case 'Exit':
        console.log(chalk.red('Exiting ATM machine'));
        return;
    }
  }
}

atmMachine()