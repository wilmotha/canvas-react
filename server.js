const express = require('express');
const request = require('request');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 5000;

const TOKEN = 'token';

const userToken = ''

app.use(cookieParser());
app.use(express.json());

// store login in redux, and reset this on every call to server, if fails
// redirect to login.


app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/loggedIn', (req, res) => {
    console.log(req.cookies[TOKEN]);
    if ((TOKEN in req.cookies) && req.cookies[TOKEN] != null) {
        res.status(200).send(true);
    } else {
        res.send(false);
    }
});

// set the token given by the user
app.post('/login', (req, res) => {
    // secure would be set to secure in a production version of this to protect
    // the token but because secure requres https we cant use it with localhost
    // path is set to '/' by default which means this can be used by any path in
    // the website
    // httpOnly limits the cookie to being accessed only on the server
    // expires in 3 days represented by milliseconds * seconds * minutes * hours * days
    res.cookie(TOKEN, req.body.token,  
        { expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 3)), httpOnly: true, sameSite: "none"});
    res.send(true);
});


app.get('/logout', (req, res) => {
    console.log("cookies before: ", req.cookies);
    res.clearCookie(TOKEN, { httpOnly: true, sameSite: "none"});  
    console.log("cookies after: ", req.cookies);
    res.send(false);
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
        query = query.replace(',', '');

        // get rid of the trailing & that the above code adds
        query = query.slice(0, -1);
    }
    return query;
}

// make get requests to the canvas api
app.get('/get/*', (req, res) => {

    // handle any querys that are part of the api call
    let query = stringifyQuery(req.query);

    console.log(`\nRequest made for: https://canvas.instructure.com/api/v1/${req.params[0]}${query}`);

    request({
        url: `https://canvas.instructure.com/api/v1/${req.params[0]}${query}`,
        headers: {
            'Authorization': `Bearer ${req.cookies[TOKEN]}`,
        }
        }, 
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                res.status(200).send({ results: body});
                console.log("Success: ", response.statusCode);
            } else {
                res.status(response.statusCode);
                console.log("Error: ", response.status);
            }
        }
    );
});

app.post('/post/*', (req, res) => {
    console.log(`\nRequest made for: https://canvas.instructure.com/api/v1/${req.params[0]}`);
    console.log("body: ", req.body);

    request({
        url: `https://canvas.instructure.com/api/v1/${req.params[0]}`,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${req.cookies[TOKEN]}`,
        },
        body: JSON.stringify(req.body)
    },
    (error, response, body) => {
        if(!error && response.statusCode == 200) {
            console.log("Success: ", response.statusCode);
            res.status(response.statusCode).end();
        } else {
            console.log("Error: ", response.statusCode);
            res.status(response.statusCode).end();
        }
    });
});

// #7986CB
app.post('/put/*', (req, res) => {
    console.log(`\nRequest made for: https://canvas.instructure.com/api/v1/${req.params[0]}`);
    console.log("body: ", req.body);

    request({
        url: `https://canvas.instructure.com/api/v1/${req.params[0]}`,
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${req.cookies[TOKEN]}`,
        },
        body: JSON.stringify(req.body)
    },
    (error, response, body) => {
        if(!error && response.statusCode == 200) {
            console.log("Success: ", response.statusCode);
            res.status(response.statusCode).end();
        } else {
            console.log("Error: ", response.statusCode);
            console.log("Body: ", body);
            res.status(response.statusCode).end();
        }
    });
});
