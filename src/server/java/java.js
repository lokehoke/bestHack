'use string';

const fs = require('fs');

module.exports = class JavaCompiler {
    constructor(code, errF, outF) {
        this._code     = code;
        this._errF     = errF;
        this._outF     = outF;
        this._child    = null;
        this._data     = [];
        this._err      = [];
        this._filename = '';
    }

    compile() {
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
        const base = fs.readFileSync('/server/java/chunk/base.java', 'utf8');
        const main = fs.readFileSync('/server/java/chunk/main.java', 'utf8');
        fs.writeFileSync(this._filename = `/server/java/temp/${Date.now()}.java`, base + code + main);
    }
}
