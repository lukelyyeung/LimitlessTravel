const expressSession = require('express-session');

module.exports = (app)=>{
    const settings = {
        secret: "supersecret",
        cookie: { "path": '/', "httpOnly": true, "secure": false,  "maxAge": null }
    }
    app.use(expressSession(settings));
}