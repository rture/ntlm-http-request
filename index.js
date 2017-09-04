"use strict";
console.log('Loading node-sharepoint-client function');
 
const PromiseBluebird = require("bluebird"),
    httpreq = PromiseBluebird.promisify(require('./httpRequest').post),
    ntlm = require('httpntlm').ntlm,
    HttpsAgent = require('agentkeepalive').HttpsAgent,
    keepaliveAgent = new HttpsAgent();
 
 
function post(params) {
    let options = {
        url: params.serviceUrl,
        username: params.userName,
        password: params.password,
        workstation: 'choose.something',
        domain: params.domain
    };
    console.log('Accessing to: ' + params.serviceUrl);
    let type1msg = ntlm.createType1Message(options);
    let resheaders = '';
    return httpreq(options.url, {
        parameters: params.parameters,
       // files: { file: [params.fileName, params.file] },
        headers: {
            'Connection': 'keep-alive',
            'Authorization': type1msg
        },
        agent: keepaliveAgent
    }).then(function(res){
      resheaders = res.headers;
    })
    .then(setImmediatePromise)
    .then(function (res) {
        if (!resheaders['www-authenticate'])
        { return new Error('www-authenticate not found on response of second request'); }
 
        let type2msg = ntlm.parseType2Message(resheaders['www-authenticate']);
        let type3msg = ntlm.createType3Message(type2msg, options);
           return httpreq(options.url, {
            parameters: params.parameters,
            //files: { file: [params.fileName, params.file] },
            headers: {
                'Connection': 'Close',
                'Authorization': type3msg
            },
            allowRedirects: false,
            agent: keepaliveAgent
        });
    }).then(function (response) {
        console.log('Response: ' + response.statusCode);
        return response;
    }).catch(function (err) {
        console.error(" Error Message: " + err.message + ", Error: " + err.stack);
        return err;
    });
}
 
function setImmediatePromise() {
  return new Promise(function(resolve) {
    setImmediate(resolve);
  });
}
 
 
module.exports = {
    post: post
};