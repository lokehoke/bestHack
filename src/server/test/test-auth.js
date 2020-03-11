const axios = require('axios');

const url = 'http://localhost:3000/auth';

(async function() {
    try {
        const res = await axios({
            method: 'post',
            url: url,
            data: {
                email: 'sergey.ampo@gmail.com',
                password: 'seregamw1',
            }
        });
    }
    catch(err){
        console.log(err);
    }

})();
