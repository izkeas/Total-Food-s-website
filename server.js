require('dotenv').config();
const path = require('path')

const express = require('express');
const app = express()

const mongoose = require('mongoose');
const routes = require('./routes/routes')

// static files
app.use(express.static(path.resolve(__dirname,'public')))
// routes
app.use(routes)
// views
app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs')

// Connect mongoose
mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => { 
        app.emit("Mongoose_ready")
    })
    .catch( 
        e => console.log(e)
    );

// Start server when mongoose is ready
app.on("Mongoose_ready", () =>{
    var port = 8080;

    app.listen(port, '0.0.0.0', () => {
        console.log(`Server started at port ${port}`);
        console.log(`Acces with http://127.0.0.1:${port}`)
    })
});
