const Account = require('./Account')
const CommandLine = require('./CommandLine.js')

async function main() {
  const accountName = await CommandLine.ask('what is the question ?0')
  const account = await Account.find(accountName)
  if (account == null) {
    const account = await promptCreateAccount(accountName)
  }
  if (account == null) await promptTask(account)
}

async function promptCreateAccount(accountName) {
  const response = await CommandLine.ask(
    'that Account Does Not exist, Would you like craete it? (yes/no)'
  )
  if (response === 'yes') {
    return await Account.create(accountName)
  }
}

async function promptTask(account) {
  const response = await CommandLine.ask(
    'what would you like to do? (view/deposite/withdraw)'
  )

  if (response === 'deposite') {
    const amount = await CommandLine.ask('how much?')
    await Account.deposite(amount)
  }
}

main()
