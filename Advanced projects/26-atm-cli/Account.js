const FileSystem = require('./Filesystem.js')

module.exports = class Account {
  constructor(name) {
    this.#name = name
  }

  #name
  #balance

  get name() {
    return this.#name
  }

  get balance() {
    return this.#balance
  }

  get filePath() {
    return `accounts/${this.name}.txt`
  }

  static async #load(account) {
    console.log(this.filePath)
    this.#balance = parseFloat(await FileSystem.read(account.filePath))
  }

  static async deposite(amount) {
    console.log('working')
    await FileSystem.write(this.filePath, this.#balance + amount)
    this.#balance = this.#balance + amount
  }

  static async find(accountname) {
    console.log('find')
    const account = new Account(accountname)
    try {
      await account.#load(account)
      return account
    } catch (error) {
      return
    }
  }

  static async create(accountname) {
    const account = new Account(accountname)
    await FileSystem.write(account.filePath, 0)

    return account
  }
}
