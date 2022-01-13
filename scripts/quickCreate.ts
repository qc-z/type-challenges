const inquirer = require('inquirer')
const fs = require('fs')
const chalk = require('chalk')

const templates = ['template.ts', 'test-cases.ts', 'README.md']

inquirer
  .prompt([
    {
      type: 'input',
      name: 'folder',
      message: '请输入文件夹名字',
      default: new Date().getTime().toString(),
      validate: (value) => {
        if (!fs.existsSync(value)) {
          return true
        }
        return '已有相同名字的文件夹！请修改名字'
      }
    }
  ])
  .then((answers) => {
    const { folder } = answers
    fs.mkdirSync(folder, { recursive: true })
    templates.forEach((template) => {
      const path = `${folder}/${template}`
      writefile(path, template)
    })
  })
// 写入文件
function writefile(path, file) {
  console.log(path)
  console.log(file)
  fs.writeFile(path, file, function (errs) {
    if (errs) {
      console.log(errs)
    } else {
      console.log(`${chalk.cyan(`✨ ${chalk.green(file)}`)} - build successfully`)
    }
  })
}
