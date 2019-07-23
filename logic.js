//users are able to:
    //create an item, task, job, or project
    //bid on it (and others already added)


var inquirer = require("inquirer");


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
        console.log(`post hit`);
    } else if (openPrompt === "[BID]") {
        console.log(`bid hit`);
    } else if (openPrompt === "[EXIT]") {
        console.log(`BYEEEE`);
    }
})

    //[POST]
        //inquirer prompt:
            //NAME
            //CATEGORY
            //STARTING PRICE
        //this info is added to the database
    //return to main inquirer prompt
    


    //[BID]
        //inquirer list of category to bid on
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




