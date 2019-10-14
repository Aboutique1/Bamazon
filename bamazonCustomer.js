// update bamazon set stock_quantity = 
var mysql = require('mysql')
require('dotenv').config()
var arrayToTable = require('array-to-table')
var inquirer = require('inquirer')
var Promise = require('bluebird')


var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME

})

connection.connect()


var questions = [{
        type: 'input',
        name: 'Select Product',
        message: 'Which product do you want? (item_id)'

    },
    {
        type: 'input',
        name: 'Quantity',
        message: 'How many do you want? (stock_quantity)'
    }
]
var quantityrequested
var productidrequested

connection.query('SELECT * FROM products', function (error, results, fields) {
    if (error) throw error
  //  console.log (results) 
    
    console.log(arrayToTable(results))
    inquirer.prompt(questions).then(function (answer) {

        
        var productselected = results[answer["Select Product"]-1]
        console.log (productselected.product_name )
        console.log(answer.Quantity)
        var instock = productselected.stock_quantity
        if (parseInt(answer.Quantity) > instock) {
            console.log('Our stock inventory is lower than the number of quantity requested.')
        } else {
            console.log('We have enough. Your order will be completed.')
            var price= productselected.cost 
            var orderCost= price * answer.Quantity
            console.log ("Your Order Cost is $" + orderCost.toFixed(2))
            var newQuantity= instock - answer.Quantity
            connection.query ('update products set stock_quantity = ' + newQuantity + " where item_id = " + productselected.item_id + ";")
        }
        

        console.log("You've selected item " + answer["Select Product"])
        console.log("You've selected a total of " + answer["Quantity"])
        var array = []
        

       
    });
});