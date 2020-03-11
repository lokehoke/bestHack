const axios = require('axios');
const config = require('config');

const url = 'http://localhost:3000/register';

(async function() {
    try {
        const res1 = await axios({
            method: 'post',
            url: url,
            data: {
                email: 'sergey.ampo@gmail.com',
                password: 'seregamw1',
            }
        });

        const res2 = await axios({
            method: 'post',
            url: url,
            data: {
                email: 'personal@sergeyampo.ru',
                password: 'seregamw1',
            }
        });
        console.log(res1);
        console.log(res2);
    }
    catch(err){
        console.log(err);
    }

})();