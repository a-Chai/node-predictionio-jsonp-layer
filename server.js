let express = require('express');
let app = express();
let router = express.Router();
let urllib = require('url');

//banner url
router.post('/form', function(req, res, next) {

    var data = {
        firstName: req.body.firstName || null,
        lastName: req.body.lastName || null
    };
    console.log('you posted: First Name: ' + req.body.firstName + ', Last Name: ' + req.body.lastName);

    var params = urllib.parse(req.url, true);
    //console.log('Request 1:' + params);

    if (params.query && params.query.callback) {

        //console.log('Request 2:' + params.query);
        var str = params.query.callback + '(' + JSON.stringify(data) + ')'; //jsonp
        res.send(str);


    } else {

        res.send(JSON.stringify(data)); //json
    }
});

app.use(express.static('html'));
app.use(router);

app.listen(9900, function() {
    console.log('Example app listening on port 9900!')
})
