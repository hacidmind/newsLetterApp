const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html')
});

app.post('/', (req, res) => {
    
    let firstName = req.body.fName;
    let lastName = req.body.lName;
    let email = req.body.email;

    let data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    let jsonData = JSON.stringify(data)

    // console.log(firstName, lastName, email);

    let options = {
        url: 'https://us4.api.mailchimp.com/3.0/lists/296eb10162',
        method: 'POST',
        headers: {
            'Authorization': 'hafeez1 1cf1c12ee71c2ea6778af5018064b841-us4'
        },
        body: jsonData
    };

    request(options, (error, response, body) => {
        if (error) {
            res.sendFile(__dirname + '/failure.html');
        } else {
            if (response.statusCode === 200) {
                res.sendFile(__dirname + '/success.html');
            } else {
                res.sendFile(__dirname + '/failure.html');
            }
        }
    });

});

app.post('/failure', (req, res) => {
    res.redirect('/')
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
});


// API key
// 1cf1c12ee71c2ea6778af5018064b841 - us4

// Audience ID
// 296eb10162