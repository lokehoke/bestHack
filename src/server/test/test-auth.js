const axios = require('axios');

const url = 'http://localhost:3000/auth';

(async function() {
    try {
        console.log(await axios({
            method: 'post',
            url: url,
            data: {
                email: 'sergey.ampo@gmail.com',
                password: 'seregamw1',
            }
        }));

        console.log(await axios({
            method: 'post',
            url: url,
            data: {
                email: 'personal@sergeyampo.ru',
                password: 'seregamw1',
            }
        }));
    }
    catch(err){
        console.log(err);
    }

})();
