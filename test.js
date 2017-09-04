
const test = require('./index');
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

test.post(param).then(function(response){
 console.log(response);
}
);