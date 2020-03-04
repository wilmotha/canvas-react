const express = require('express');
const request = require('request');
const app = express();
const port = process.env.PORT || 5000;

// change this
const TOKEN = '1002~NiVAMEPbELRGTgFmM2HtrSfGHrTSSAabLtvsGNHwuWRq0Ac7uqs0kPN35ahn3k7r';

app.listen(port, () => console.log(`Listening on port ${port}`));

// set the token given by the user
app.post('/setToken', (req, res) => {

}); 

// make get requests to the canvas api
app.get('/canvas/*', (req, res) => {
    console.log("fetch: ", req.params);
    request({
        url: `https://canvas.instructure.com/api/v1/${req.params[0]}`,
        headers: {
            'Authorization': `Bearer ${TOKEN}`,
        }
        }, 
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                console.log("body: ", body);
                res.send({ results: body});
            } else {
                console.log("error: ", response.statusCode);
            }
        }
    );
});