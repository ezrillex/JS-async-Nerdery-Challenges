/*
INSTRUCTIONS

1. using async/await API consume products and prices methods
2. don't use .then(), .catch() or .finally() here
3. both, products and prices methods expect a positive integer id
4. use Promise.all() and Promise.allSettled() to consume both methods in parallel
5. to generate the id do the following: invoke Date.now(), and take the last two digits, this will be your id
6. log the results with console.log(), the format is up to you, but it must include id, product and price

Example:
{
 id:100,
 product:'paper',
 price:1
}

7. both methods include some conditions to fail, at the end you should console.log() the errors, the format is up to you
8. add any needed adjustment to solution() function
9. as extra challenge: add Promise.race() and Promise.any(), and try to get the idea of what happens
*/
import prices from "./prices.js"
import products from "./products.js"

async function solution() {
    // is this a bad practice? declaring but no initalization of variables that will eventually have a value in all logic branches?
    let allResult, settledResult, raceResult, anyResult

    // You generate your id value here
    const rng = parseInt(Date.now().toString().slice(-2))

    // Yes, here we generate new promises for each method, 
    // we could remove the awaits and wrap the promises in another promise
    // but that is too meta for this exercise for now. 

    // You use Promise.all() here
    try {
        allResult = await Promise.all([prices(rng), products(rng)])
    }
    catch (error) {
        allResult = error
    }

    // You use Promise.allSettled() here
    try {
        settledResult = await Promise.allSettled([products(rng), prices(rng)])
    }
    catch (error) {
        settledResult = error
    }

    // Promise.race
    try {
        raceResult = await Promise.race([prices(rng), products(rng)])
    }
    catch (error) {
        raceResult = error
    }

    // Promise.any
    try {
        anyResult = await Promise.any([prices(rng), products(rng)])
    }
    catch (error) {
        anyResult = error
    }

    // Log the results, or errors, here

    // If all has any errors we won't get any results even if other one succeded. 
    console.log(`All = Id: ${rng} `, allResult instanceof Error ? `Error: ${allResult.message}` :
        `Product: ${allResult[1]} Prices: ${allResult[0]}`)

    console.log("Settled = ")
    console.table(settledResult.map((item, index) => {
        if (item.status === 'rejected') {
            return ({
                status: item.status,
                name: index === 1 ? "Price" : "Product",
                value: item.reason.message, // to have only one output column for each line
            })
        }
        else {
            return ({
                status: item.status,
                name: index === 1 ? "Price" : "Product",
                value: item.value,
            })
        }
    }))

    console.log(`Race = Id: ${rng} `, raceResult instanceof Error ? `Error: ${raceResult.message}` :
        (typeof raceResult === "number" ? `Prices: ${raceResult} ` : `Product: ${raceResult} `))

    console.log(`Any = Id: ${rng} `, anyResult instanceof Error ? `Error: ${anyResult.message}` :
        (typeof anyResult === "number" ? `Prices: ${anyResult} ` : `Product: ${anyResult} `))


}

await solution()
