/*
INSTRUCTIONS

1. using promise API, i.e. only .then() .catch() and .finally() methods, consume the methods in firstnames.js and lastnames.js
2. don't use any async/await here
3. lastnames.js method expects a positive integer id, it returns a lastname, if the id is multiple of 5 it returns a nonexistent lastname
4. firstnames.js method expects a lastname generated by the method above, it returns a name
5. methods should be consumed sequentially, i.e. lastnames method first, and its results will serve as argument for firstnames method
6. implement a randomizing logic that provides you an id for lastnames method,
this value type must be a positive integer between 0-100, or something that is not a positive integer
The point here is getting correct and incorrect values to get successful and failing promises results from lastnames method

Example:
const id = yourRandomMethod() //first run
 -- id gets a value of undefined, or you can get a null, boolean, string, whatever different to a positive integer

const id = yourRandomMethod() //second run
 -- id gets a value of 31

const id = yourRandomMethod() //third run
-- id gets a value of 10

6. use promise chaining accordingly, don't forget error handling
7. log the resultant fullname, or the error, at the end
*/

import firstnames from "./firstnames.js"
import lastnames from "./lastnames.js"

function solution() {
    // YOUR SOLUTION GOES HERE
    let first = ""
    let last = ""

    // You generate your id value here
    const rng = Math.round(Math.random() * 100) * (Math.round(Math.random()) === 1 ? 1 : -1) // randomly make it negative

    // You call the lastnames method with your id
    lastnames(rng)

    // You call the firstname method
    .then((lastname)=>{
        last = lastname
        return firstnames(lastname)
    })
    .then(firstname=>{
        first = firstname
    })
    
    // You log the fullname, or error, here
    .then(() =>{
        console.log(`The full name is ${first} ${last}.`)
    })
    .catch(err=>{
        console.log("There was an error. Message = ", err.message)
    })

}

solution()
