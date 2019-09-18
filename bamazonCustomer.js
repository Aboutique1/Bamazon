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

       console.log(answer.Quantity)
        if (parseInt(answer.Quantity) > 10) {
            console.log('Our stock inventory is lower than the number of quantity requested.')
        }
        else{
            console.log('We have enough. Your order will be completed.')
        }
    }).catch(function(error){
        console.log(error) 
});   


        console.log("You've selected item " + answer['Select Product'])
        console.log("You've selected a total of " + answer['Quantity'])
        var array = []
        
        function getQuantity(){
            return new Promise(function(resolve, reject){
                connection.query(`SELECT stock_quantity FROM products WHERE \`item_id\` = ${parseInt(answer['Select Product'])}`, function(error2, quantity){
                        if(error2){
                        reject(new Error('Ooops, something broke!'));

                    } 
                
                        console.log(quantity[0].stock_quantity)
                        resolve(quantity[0].stock_quantity)                      
                    
                    
                })
            }) 
        }
        
             getQuantity().then(function(trueQuantity){

             if(10 > parseInt(trueQuantity)){
                   console.log('Our stock inventory is lower than the number of quantity requested.')
              }
              else{
                 console.log('We have enough. Your order will be completed.')
              }
         }).catch(function(error){
             console.log(error)
         })
        

    






