const fs = require('fs');
const util = require('util');
let fileName = 'dataDay1.txt';

// Convert fs.readFile into Promise version of same    
const readFile = util.promisify(fs.readFile);

let currentFrequency = 0
let seenFrequencies = []
let foundMatch = false
async function getFile() {
  return await readFile(fileName);
}

// Can't use `await` outside of an async function so you need to chain
// with then()
getFile().then(data => {
    myData = (data.toString());
    myData = (myData.split('\n'));
    console.log(myData[0]);
    let intList = [];
    for (i of myData) {
        intList.push(Number(i));
    }
    console.log(intList);
    async function searchList() {
        for (i=0; i< intList.length; i++) {
            seenFrequencies.push(currentFrequency);
            currentFrequency += intList[i];
            if (seenFrequencies.includes(currentFrequency)) {
                console.log(`The answer is ${currentFrequency}`);
                foundMatch = true;
                break;
            }
        }
    }
    while (foundMatch == false) {
        searchList();
    }
    console.log('The program is complete.')    
})