const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(express.json());

app.use('/api',routes);

let port =  3000


app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})