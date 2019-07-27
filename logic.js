//users are able to:
    //create an item, task, job, or project
    //bid on it (and others already added)

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "greatBayDB"
});

connection.connect(function(err) {
    if (err) throw err;

    startInquiry();
})

function startInquiry() {
    inquirer.prompt([
        {
            type: "list",
            message: "Welcome to Great Bay! Choose an action item from below:",
            choices: ["[POST]", "[BID]", "[EXIT]"],
            name: "openingPrompt"
        }
    ])
    .then(function(inquirerResponses) {
        var openPrompt = inquirerResponses.openingPrompt;

        if (openPrompt === "[POST]") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "Name of the item?",
                    name: "itemName"
                },
                {
                    type: "input",
                    message: "What category does this fall under (may only fall under the following categories: Collectables, Items, Services)?",
                    name: "itemCategory"
                },
                {
                    type: "input",
                    message: "What is the starting price of the item (bids must be greater than this amount to be valid)",
                    name: "startingBid",
                    validate: function(value) {
                        if (isNaN(value) === false) {
                          return true;
                        }
                        return false;
                      }
                }
            ]).then(function(inquirerResponses) {
                var itemName = inquirerResponses.itemName;
                var itemCategory = inquirerResponses.itemCategory;
                var startingBid = inquirerResponses.startingBid;

                connection.query("INSERT INTO products SET ?",
                [
                    {
                        itemName: itemName,
                        category: itemCategory,
                        price: startingBid
                    }
                ], function(err) {
                    if (err) throw err;
                    
                    console.log(`${itemName} added to database!`);
                })

                startInquiry();
            })
        } else if (openPrompt === "[BID]") {
            inquirer.prompt([
                {
                    type: "list",
                    message: "Choose a category to bid on:",
                    choices: ["[Collectables]", "[Services]", "[Items]" ],
                    name: "categorySelection"
                }
            ]).then(function(inquirerResponses) {
                var selection = inquirerResponses.categorySelection;
                if (selection === "[Collectables]") {
                    
                    connection.query("SELECT * FROM products WHERE ?", 
                    [
                        {
                            category: "Collectables"
                        }
                    ], function(err, res){
                        if (err) throw err;
                
                        inquirer.prompt([
                            
                            {
                                type: "list",
                                message: "Choose an item from below to bid on:",
                                choices: function() {
                                    var choiceArray = [];
                                    for (var i = 0; i < res.length; i++) {
                                        choiceArray.push(res[i].itemName);
                                    }
                                    return choiceArray;
                                },
                                name: "bidChoices"
                                
                            }
                            
                        ]).then(function(answer) {
                            
                            
                            console.log(`chosen: ${answer.bidChoices}`);
                        })
                    });
                    
                } else if (selection === "[Services]") {

                    connection.query("SELECT * FROM products WHERE ?",
                    [
                        {
                            category: "Services"
                        }
                    ], function(err, res) {
                        if (err) throw err;
                        for (var i = 0; i < res.length; i++) {
                            inquirer.prompt([

                            ])
                        }
                        
                    });

                } else if (selection === "[Items]") {

                    connection.query("SELECT * FROM products WHERE ?",
                    [
                        {
                            category: "Items"
                        }
                    ], function(err, res) {
                        if (err) throw err;

                        console.log(res);
                    });
                }

                
            })
            
        } else if (openPrompt === "[EXIT]") {
            console.log(`BYEEEE`);
            connection.end();
        }
    })
}

    


    //[BID]
        
        //inquirer list of items within the chosen category they can bid on
        //once an item is selected to bid on:
            //inquirer prompt: "how much would you like to bid?"
                //compare bid to the starting price/previous high bid
                    //if their bid is higher
                        //inform user of success
                        //replace old bid with this bid amount
                    //if their bid is lower or equal
                        //inform user of loss
                        //return to main inquirer prompt




