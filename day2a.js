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

async function checkLetters(box1Id, box2Id) {
    let differentLetters = 0;
    for (i=0; i < box1Id.length; i++) {
        if (box1Id[i] != box2Id[i]) {
            differentLetters +=1;
        }
    }
    return differentLetters;
}

getFile().then(data => {
    /*let myLetters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];*/
    let myLetters = 'abcdefghijklmnopqrstuvwxyz'
    //console.log(myLetters);
    let boxIds = (data.toString());
    boxIds = (boxIds.split('\n'));
    console.log(boxIds);
    for (boxId of boxIds) {
        //console.log(`Checking box ID ${boxId}`);
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
    //console.log(`Box IDs with two of the same letter: ${twoSameLetterBoxIds.length}\n${twoSameLetterBoxIds}`)
    //console.log(`Box IDs with three of the same letter: ${threeSameLetterBoxIds.length}\n${threeSameLetterBoxIds}`)
    checksum = twoSameLetterBoxIds.length * threeSameLetterBoxIds.length;
    console.log(`The checksum is: ${checksum}\nPart I complete.\n\n`);
    correctBoxes = [];

    

    for (j=0; j < twoSameLetterBoxIds.length; j++) {
        for (k=0; k < twoSameLetterBoxIds.length; k++) {
            (function(j, k) {
                if (twoSameLetterBoxIds[j] === twoSameLetterBoxIds[k]) {
                    //console.log(`Box 1 ID ${twoSameLetterBoxIds[j]} is the same as Box 2 ID ${twoSameLetterBoxIds[k]}`);
                } else {
                    checkLetters(twoSameLetterBoxIds[j], twoSameLetterBoxIds[k]).then( differentLetterCount => {
                        if (differentLetterCount == 1) {
                            if (correctBoxes.includes(twoSameLetterBoxIds[j]) === false) {
                                correctBoxes.push(twoSameLetterBoxIds[j]);
                                correctBoxes.push(twoSameLetterBoxIds[k]);
                                console.log(`Correct Box List: \n${correctBoxes}`);
                                console.log(`Matching Letters in correct Boxes:`);
                                matchingLetters = '';
                                for (l=0; l < twoSameLetterBoxIds[j].length; l++) {
                                    if (twoSameLetterBoxIds[j][l] == twoSameLetterBoxIds[k][l]) {
                                        matchingLetters += twoSameLetterBoxIds[j][l];
                                    }
                                }
                                console.log(matchingLetters);
                            }
                        }
                    });
                }
            })(j,k);  
        }
    }



    for (j=0; j < threeSameLetterBoxIds.length; j++) {
        for (k=0; k < threeSameLetterBoxIds.length; k++) {
            (function(j, k) {
                if (threeSameLetterBoxIds[j] == threeSameLetterBoxIds[k]) {
                    //console.log(`Box 1 ID ${threeSameLetterBoxIds[j]} is the same as Box 2 ID ${threeSameLetterBoxIds[k]}`);
                } else {
                    checkLetters(threeSameLetterBoxIds[j], threeSameLetterBoxIds[k]).then( differentLetterCount => {
                        if (differentLetterCount === 1) {
                            correctBoxes.push(threeSameLetterBoxIds[j]);
                            correctBoxes.push(threeSameLetterBoxIds[k]);
                            console.log(`Correct Box List: \n${correctBoxes}`)
                        }
                    });
                }
            })(j,k);  
        }
    }
    console.log('Program complete')
});