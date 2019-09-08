var mysql = require('mysql')
require('dotenv').config()
var arrayToTable = require('array-to-table')
var inquirer = require('inquirer')

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME

})

connection.connect()

var questions = [{
    type:'input',
    name:'Select Product',
    message:'Which product do you want? (item_id)'

},
{
    type:'input',
    name:'Quantity',
    message:'How many do you want? (stock_quantity)'
}
]


connection.query('SELECT * FROM products', function(error,results,fields){
    if(error) throw error

    console.log(arrayToTable(results))
    inquirer.prompt(questions).then(function(answer){
        console.log("You've selected item " + answer['Select Product'])
        console.log("You've selected a total of " + answer['Quantity'])

    })
})

connection.end()


