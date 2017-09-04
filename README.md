Make Ntlm authenticated http requests from Node.js

Usage is as following, for now it only supports post request.

let param = {
        serviceUrl: 'https://service-url',
        userName: 'user',
        password: 'password',
        domain: 'domainname',
        parameters: {
            id: 'ertw67',
            title: 'Test',
            'content':''
        }
    }

post(param).then(function(response){

 }
);