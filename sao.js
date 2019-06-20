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
            default: ':folderName:',
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
            '_.nvmrc' : '.nvmrc',
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
        const run = spawn.sync('nvm', ['use'], {
            cwd: folderPath,
            stdio: 'inherit',
        })
        npmInstall()

        console.log()


        const run = spawn.sync('npm', ['run', 'dev'], {
            cwd: folderPath,
            stdio: 'inherit',
        })
        run.stderr.on('data', (data) => {
            console.log(`${data}`);
        })
    }
}
