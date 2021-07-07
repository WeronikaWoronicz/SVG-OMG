const fs  = require('fs')

class CustomHelper extends Helper {
  constructor(config: any) {
       super(config)
  }
  getFileInfo(filePath: String) {
    return fs.statSync(filePath)
  }
}

export = CustomHelper