const glob = require('glob')
const { join } = require('path')
const spawn = require('cross-spawn')

const rootDir = __dirname

const move = (from, to = '') => {
    const result = {}
    const options = { cwd: join(rootDir, 'template'), nodir: true, dot: true }
    for (const file of glob.sync(`${from}/**`, options)) {
        result[file] = (to ? to + '/' : '') + file.replace(`${from}/`, '')
    }
    return result
}

module.exports = {
    prompts: {
        name: {
            message: 'Project name',
            default: ':folderName',
        },
        description: {
            message: 'Description',
            default: 'A mola-nuxt-app'
        },
        author: {
            type: 'string',
            message: 'Author name',
            default: ':gitUser:',
            store: true
        },
    },
    move(answers) {
        const moveable = {
            gitignore: '.gitignore',
            '_package.json': 'package.json',
            '_.eslintrc.js': '.eslintrc.js',
        }
        return Object.assign(
            moveable,
            move('nuxt')
        )
    },
    post(
        { npmInstall, gitInit, chalk, isNewFolder, folderName, folderPath },
        { meta }
    ) {
        gitInit()
        npmInstall()

        const cd = () => {
            if (isNewFolder) {
                console.log(`\t${chalk.cyan('cd')} ${folderName}`)
            }
        }
        spawn.sync('npm', ['run', 'lint', '--', '--fix'], {
            cwd: folderPath,
            stdio: 'inherit',
        })

        console.log()
        console.log(chalk.bold(`\tTo get started:\n`))
        cd()
        console.log(`\t ${meta.answers.pm} run dev\n`)
        console.log(chalk.bold(`  To build & start for production:\n`))
        cd()
        console.log(`\t ${meta.answers.pm} run build`)
        console.log(`\t ${meta.answers.pm} start`)
        console.log()
    }
}
