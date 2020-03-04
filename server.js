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
    request({
        url: `https://canvas.instructure.com/api/v1/${req.params[0]}`,
        headers: {
            'Authorization': `Bearer ${req.cookies.token}`,
        }
        }, 
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                res.send({ results: body});
            } else {
                console.log("error: ", response.statusCode);
            }
        }
    );
});