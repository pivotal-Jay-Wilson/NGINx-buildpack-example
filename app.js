const axios = require('axios').default;
const https = require('node:https');
// let str =makeid();

// console.log(str + ": " + str.length + " characters, " + Buffer.byteLength(str, 'utf8') + " bytes");

(async () => {
    try {
        let head1 = makeid();
        let head2 = makeid();
        let head3 = makeid();
        //let cookie = `cookie1=${head1}; cookie2=${head2}; cookie3=${head3};`
        //let cookie = `cookie1=${head1}; cookie2=${head2}`;
        let cookie = `cookie1=${head1}`
        console.log("head: " + cookie.length + " characters, " + (Buffer.byteLength(cookie, 'utf8')/1028) + " ");
        const instance = axios.create({
            baseURL: 'https://ng-test32k.cfapps-03.slot-34.tanzu-gss-labs.vmware.com/',
            timeout: 1000,
            // headers: { 'X-Custom-Header1': head1, 
            //            'X-Custom-Header2': head2,  
            //            'X-Custom-Header3': head3,
            //            Cookie: `cookie1=${head1}; cookie2=${head2}; cookie3=${head3};`
            //          },
            //headers: {'X-Custom-Header1': head1, Cookie: cookie },
            headers: {Cookie: cookie },
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        });
        let resp = await instance.get('/')
        //console.log(resp.data);
        console.log(resp.headers);

    } catch (error) {
        console.error(error.code, error.request.res.statusCode);
        console.error(error);
    }
})();

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    //32k passed at 15100 
    //8k failed at 15100 passed at 8100
    for (var i = 0; i < 16000; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
