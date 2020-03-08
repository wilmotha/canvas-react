const express = require('express');
const request = require('request');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

// set the token given by the user
app.post('/setToken', (req, res) => {
    // secure would be set to secure in a production version of this to protect
    // the token but because secure requres https we cant use it with localhost
    res.cookie('token', req.body.token, 
        { expires: new Date(Date.now() + 259200000), httpOnly: true, sameSite: "none"});
    res.send(true);
});

// make get requests to the canvas api
app.get('/canvas/*', (req, res) => {

    // handle any querys that are part of the api call
    let query = stringifyQuery(req.query);

    console.log(`\nRequest made for: https://canvas.instructure.com/api/v1/${req.params[0]}${query}`);

    request({
        url: `https://canvas.instructure.com/api/v1/${req.params[0]}${query}`,
        headers: {
            'Authorization': `Bearer ${req.cookies.token}`,
        }
        }, 
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                res.send({ results: body});
                console.log("Success: ", response.statusCode);
            } else {
                console.log("error: ", response.statusCode);
            }
        }
    );
});


// handle any querys that are part of the api call
function stringifyQuery(queryArray) {
    let query = "";

    // check if query paramerters actually exist
    if (Object.keys(queryArray).length !== 0) {
        query = "?";
        // sort through each one and convert it to string
        Object.keys(queryArray).map(key => {
            // array querys need to be handled a little diffrent
            if (Array.isArray(queryArray[key])) {
                query += queryArray[key].map(elem => `${key}[]=${elem}&`);
                // this is to get rid of a random , that keeps showing up
                // no idea why
                query = query.replace(',', '');
            } else {
                query += `${key}=${queryArray[key]}&`
            }
        });
        // get rid of the trailing & that the above code adds
        query = query.slice(0, -1);
    }
    return query;
}