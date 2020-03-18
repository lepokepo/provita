const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const moment = require('moment');
const app = express();
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employees',
})

connection.connect(function (err) {
    if (err) {
        console.error('Erro conectando banco: ', err)
        return;
    }

    console.log('Banco conectado :D')
})
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
const path = require('path');


//Rotas

app.get('/getmediasal', function (req, res) {
    connection.query('select extract(year from from_date) as ano, ceil(avg(salary))as media from salaries group by extract(year from from_date) order by media asc;',
        function (error, results, fields) {
            if (error)
                res.json;
            else {
                res.json(results);
                console.log('executou /getmediasal')
            }

        })
});


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));

})

app.listen(80, function () {
    console.log('Server escutou\n')
});