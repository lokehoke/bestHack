'use strict';

const events = require('events');
const JavaCompiler = require('../../java/java');

const compileEmitter = new events.EventEmitter();

class CodeMiddleware{
    static codeCheck(req, res, next){
        if(req.body.code.length === 0) {
            return next(new Error('Invalid data was passed!'));
        }
        else{
            next();
        }
    }

    //Look it's async/await + EventEmitter example
    //Compile code and set all the recieved data to the request object
    static async as_codeCompile(req, res, next){
        req.compiled = {};
        try{
          const { message, name } = await CodeMiddleware._as_codeExecute(req.body.code);

          req.compiled.msg = message;
          req.compiled.name = name;
          req.compiled.is = true;
        }
        catch(resObjErr){
            req.compiled.is = false;
          if(!resObjErr) {
              const {message, name} = resObjErr;
              req.compiled.msg = message;
              req.compiled.name = name;
          }
        }
      next();
    }

    //if the code was successfully compiled -> next
    //else call error handling mw
    static isCodeCompiled(req, res, next){
        if(req.compiled.is) {
            return next();
        }
        else{
            return next(new Error(`Code couldn't be compiled!`));
        }
    }

    static sendCode(req, res){
        res.status(200).json({code: req.code, name: req.name});
    }

    static async _as_codeExecute(code){
        return new Promise((resolve, reject) => {

            const cbCompileEmitter = (statusCode, msg, name) => {
                const status = (statusCode === 0 ? 'success' : 'failed');
                compileEmitter.emit(status, msg, name);
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
    }

    static sendUUID(req, res) {
        res.status(200).json({UUID: req.UUID});
        console.log(`Sent UUID: ${req.UUID} to the ${req.signedCookies['user']}!`);
    }

    static sendAll(req, res){
        res.status(200).json(req.allData);
        console.log(`All data: ${req.allData} were successfully sent to the ${req.user.email}`);
    }

}

module.exports = CodeMiddleware;
