var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
    console.log(req.url);
    var body = '';
    var temp = '';
    res.setHeader('Access-Control-Allow-Origin', '*');
    req.on('data', function(chunk) {
        console.log(chunk);
        body += chunk;
    })
    req.on('end', function() {
        //temp.push(currentData);
        console.log('on end', body);

        if (req.url == '/create') {
            console.log('------------create------------')


            fs.readFile('test.json', 'utf8', function(err, chunk) {
                let currentData = JSON.parse(body);
                currentData['id'] = Date.now();

                temp = [];
                if (chunk)
                    temp = JSON.parse(chunk);

                temp.push(currentData);

                fs.writeFile("test.json", JSON.stringify(temp),
                    function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('saved success');
                        }
                        res.end('created', temp)
                    })
            })


        } else if (req.url == '/update') {

            console.log('---------update---------')

            let bodyJson = JSON.parse(body);

            fs.readFile('test.json', 'utf8', function(err, chunk) {
                let temp = JSON.parse(chunk);
                for (i = 0; i < temp.length; i++) {
                    if (temp[i].id == bodyJson.id) {
                        temp[i].name = bodyJson['name']
                        temp[i].age = bodyJson['age']
                        temp[i].ph = bodyJson['ph']
                        break;
                    }
                }
                fs.writeFile("test.json", JSON.stringify(temp),
                    function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('saved success');
                        }

                    })
            })
        } else if (req.url == '/delete') {

            console.log('---------delete----------')
            let bodyJson = JSON.parse(body);
            fs.readFile('test.json', 'utf8', function(err, chunk) {
                temp = JSON.parse(chunk)

                for (i = 0; i < temp.length; i++) {
                    if (temp[i].id == bodyJson.id) {
                        temp.splice(i, 1);
                        break;
                    }

                }
                fs.writeFile("test.json", JSON.stringify(temp),
                    function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('saved success');
                        }
                        res.end('deleted')
                    })


            });

            res.end();

        } else {

            console.log('-----------Read------------')
            fs.readFile('test.json', 'utf8', function(err, chunk) {
                res.end(chunk);

            });


        }



    })
})
server.listen(4501);
console.log('server started')