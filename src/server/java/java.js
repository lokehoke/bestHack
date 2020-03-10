'use string';

const fs = require('fs');

class JavaCompiler {
    constructor(errF, outF) {
        this._code      = '';
        this._errF      = errF;
        this._outF      = outF;
        this._child     = null;
        this._data      = [];
        this._err       = [];
        this._filename  = '';
        this._className = '';
    }

    compile(code) {
        this._code      = ` ${code} `;
        this._prepare(this._code);
        this._child = require('child_process').spawn('java', [this._filename]);

        this._child.stdout.on('data', data => {
            this._data.push(`${data}`);
        });

        this._child.stderr.on('data', err => {
            this._err.push(`${err}`);
        });

        this._child.on('close', code => {
            if (code) {
                this._errF(code, this._err);
            } else {
                this._outF(this._data);
            }
        });
    }

    _prepare(code) {
        const base = fs.readFileSync('chunk/base.java', 'utf8');
        const main = fs.readFileSync('chunk/main.java', 'utf8');
        this._defClassName();
        const test = this._getTest();
        this._filename = `temp/${Date.now()}.java`;
        fs.writeFileSync(this._filename, ` ${main} ${test} }} ${base} ${code} `);
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

        this._className = this._code.substr(index, end - index);
    }

    _getTest() {
        return ``;
    }

}

if (require.main === module) {
    const java = new JavaCompiler((code, arr) => {
        console.log(code);
        console.log(arr);
    }, arr => {
        console.log(arr);
    });

    const code = fs.readFileSync('test/1.java', 'utf8');
    java.compile(code);
}

module.exports = JavaCompiler;
