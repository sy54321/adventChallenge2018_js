const fs = require('fs');
const util = require('util');
// Convert fs.readFile into Promise version of same    
const readFile = util.promisify(fs.readFile);
let fileName = 'dataDay2.txt';
let twoSameLetterBoxIds = []
let threeSameLetterBoxIds = []
async function getFile() {
    return await readFile(fileName);
}

getFile().then(data => {
    /*let myLetters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];*/
    let myLetters = 'abcdefghijklmnopqrstuvwxyz'
    console.log(myLetters);
    let boxIds = (data.toString());
    boxIds = (boxIds.split('\n'));
    console.log(boxIds);
    for (boxId of boxIds) {
        console.log(`Checking box ID ${boxId}`);
        foundLetterCount = new Array(26);
        foundLetterCount = foundLetterCount.fill(0);
        for (i=0; i<boxId.length; i++) {
            foundLetterCount[myLetters.search(boxId[i])] += 1;
        }
        if (foundLetterCount.includes(2)) {
            twoSameLetterBoxIds.push(boxId)
        }
        if (foundLetterCount.includes(3)) {
            threeSameLetterBoxIds.push(boxId)
        }
    }
    console.log(`Box IDs with two of the same letter: ${twoSameLetterBoxIds.length}`)
    console.log(`Box IDs with three of the same letter: ${threeSameLetterBoxIds.length}`)
    checksum = twoSameLetterBoxIds.length * threeSameLetterBoxIds.length;
    console.log(`The checksum is: ${checksum}\nThe program is finished.`);
});