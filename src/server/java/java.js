'use string';

const fs = require('fs');
const path = require('path');

class JavaCompiler {
    constructor(cbEmitter) {
        this._code      = '';
        this._child     = null;
        this._data      = [];
        this._err       = [];
        this._filename  = '';
        this._className = '';
        this._cbEmitter = cbEmitter;
    }

    compile(code) {
        this._mkdirTemp();
        this._code      = ` ${code} `;
        this._prepare(this._code);
        this._child = require('child_process').spawn('java', [path.join(__dirname, this._filename)]);

        this._child.stdout.on('data', data => {
            this._data.push(`${data}`);
        });

        this._child.stderr.on('data', err => {
            this._err.push(`${err}`);
        });

        this._child.on('close', code => {
            const outputData = (+code === 0 ? this._data : this._err);
            this._cbEmitter(code, outputData[0], this._className);
        });
    }

    _mkdirTemp(){
        if(!fs.existsSync(path.join(__dirname, '/temp'))){
            fs.mkdirSync(path.join(__dirname, '/temp'));
        }
    }

    _prepare(code) {
        const base = fs.readFileSync(path.join(__dirname, './chunk/base.java'), 'utf8');
        const main = fs.readFileSync(path.join(__dirname, './chunk/main.java'), 'utf8');
        this._defClassName();
        const test = JavaCompiler._getTest();
        this._filename = `temp/${Date.now()}.java`;
        fs.writeFileSync(path.join(__dirname, this._filename), ` ${main} ${test} }} ${base} ${code} `);
    }

    _defClassName() {
        let reg = new RegExp('\\sclass\\s');
        let arr = reg.exec(this._code);
        let {index} = arr;
        index += 1;

        while(this._code[index] != ' ') {
            ++index;
        }

        while (this._code[index] == ' ') {
            ++index;
        }

        let end = index;
        while (this._code[end] != ' ') {
            ++end;
        }

        this._className = this._code.substr(index, end - index); //Classname
    }

    static _getTest() {
        return ``;
    }

}

if (require.main === module) {
    const events = require('events');
    const compileEmitter = new events.EventEmitter();
    const codeExecute = async function(code){
        return new Promise((resolve, reject) => {

            const cbCompileEmitter = (statusCode, msg, name) => {
                const status = (statusCode === 0 ? 'success' : 'failed');
                compileEmitter.emit(status, msg[0], name);
            };

            compileEmitter.on('succcess', (msg, name) => {
                resolve({message: msg, name: name});
            });

            compileEmitter.on('failed', (msg, name) => {
                reject({message: msg, name: name});
            });

            const compiler = new JavaCompiler(cbCompileEmitter);
            compiler.compile(code);
        });
    };
    const code = fs.readFileSync('test/1.java', 'utf8');
    codeExecute(code).then((obj) => {
        console.log(obj);
    }).catch((obj) => {
       console.log(obj);
    });

}

module.exports = JavaCompiler;
