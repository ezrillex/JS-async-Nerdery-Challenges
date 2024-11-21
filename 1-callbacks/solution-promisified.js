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
const util = require("node:util");

async function solution() {
    // you get your 5 names here
    const names = ["Carlos", "Andrea", "Miguel", "Juan", "Richard"];

    // extra challange #1 read from terminal arguments
    if(process.argv.length > 2){
        // just add them, so that I don't have to type a bunch in terminal. 
        names.push(...process.argv.slice(2));
    }

    // Extra challenge #2. Here I am not promisifyiing the callback only, I tried but it was too confusing. 
    // Assuming promisifying the whole funciton is valid. And this is following the "error first pattern". 
    // I think I understood wrong, I thought initially the callback was the only one to be wrapped in a promise. 
    // But this makes more sense since I pass it a callback and promisify wrapper adds a callback to receive the value.
    const promValidateUser = util.promisify(validateUser);

    const validationPromises = [];
    // iterate the names array and validate them with the method
    for (let index = 0; index < names.length; index++) {
        // so callback that we used to pass is now passed by the promisified wrapper.
        // because my callback was just receivieng and pushing to results array the results.
        // this is done automatically by promisified callback. thus only passing names. 
        validationPromises.push(promValidateUser(names[index]))  ;
    }
    const data = await Promise.allSettled(validationPromises);
    showResults();

    // log the final result
    function showResults(){
        console.log("Success");
        data.filter(item=>item.status === "fulfilled").forEach(item => console.log(`Id: ${item.value.id}\nName: ${item.value.name}`));
        console.log("\nFailure");
        data.filter(item=>item.status === "rejected").forEach(item => console.log(item.reason.message));
    }


    
}

solution();


