const fs = require('fs')

module.exports = class FileSystem {
  static read(path) {
    console.log(path)
    console.log('something')
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) return reject(err)
        console.log(data, 'read')
        resolve(data)
      })
    })
  }

  static write(path, content) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, content.toString(), (err) => {
        if (err) return reject(err)
        resolve()
      })
    })
  }
}
