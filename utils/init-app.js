const express = require('express');
const bodyParser = require('body-parser');
const hb = require('express-handlebars');
const session = require('express-session');



module.exports = () => {
    let app = express();
    let server = require('http').Server(app);
    app.engine('handlebars', hb({ defaultLayout: 'main' }));
    app.set('view engine', 'handlebars');
    app.use(session({
        secret: 'supersecret'
    }));
    app.use(express.static("public"));
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json());

    return {
        app: app,
        server: server
    }
}