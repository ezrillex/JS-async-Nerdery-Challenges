/*
INSTRUCTIONS

1. create an array that contains 5 names, include 1 or more of the allowed usernames located in validate-user.js
2. iterate the array, keep an eye on performance, and validate every username with the function exported in validate-user.js
3. process and format every result, so that the program console.log the success results in a group, and the failure results in a group

Example:

Success

id:1
name: John

id:2
name: Mary

Failure

User Michael not allowed
User Benjamin not allowed

4. if you want to challenge yourself, add the needed logic so the program can read the array of names from the terminal
** check about node.js process.argv **

Example:

node solution.js name1,name2,name3, or
node solution.js name1 name2 name3

5. another challenge is: after you solve the challenge using callback style, in another file promisify the callback and solve it again
** give a look to node.js util.promisify, avoid to alter the validate-user.file **
*/
const validateUser = require("./validate-user.js");

// you get your 5 names here
const names = ["Carlos", "Andrea", "Miguel", "Juan", "Richard"];
const authorizedUsers = [];
const unauthorizedUsers = [];
let cbCount = 0 ; // console results are shown before all cbs finish, so I will add logic to avoid showing until last cb


function solution() {
    // extra challange #1 read from terminal arguments
    // eslint-disable-next-line no-undef
    if(process.argv.length > 2){
        // just add them, so that I don't have to type a bunch in terminal. 
        // eslint-disable-next-line no-undef
        names.push(...process.argv.slice(2));
    }
    
    // iterate the names array and validate them with the method
    for(const name of names){
        validateUser(name, cbValidationResult);
    }

}

const cbValidationResult = (...params)=>{ // expand because if is in list it sends 2
    if(params[0] instanceof Error){
        unauthorizedUsers.push( params[0].message);
    }
    else {
        authorizedUsers.push(params[1]);
    }
    cbCount++;

    if(cbCount === names.length){
        showResults();
    }

};

// log the final result
function showResults(){
    console.log("Success");
    authorizedUsers.forEach(item => console.log(`Id: ${item.id}\nName: ${item.name}`));
    console.log("\nFailure");
    unauthorizedUsers.forEach(item => console.log(item));
}

solution();


