////////////////////////////////////////
//
//[SECTION] FOR UTILITY FUNCTIONS
//
////////////////////////////////////////

function show(id) {

  const element = document.getElementById(id)
  element.classList.remove('isHidden')

}

function hide(id) {

  const element = document.getElementById(id)
  element.classList.add('isHidden')

}

////////////////////////////////////////
//
//[SECTION] FOR USER INTERFACE
//
////////////////////////////////////////

let pageInView = 'home'

const homeNavBtn = document.getElementById('homeNavBtn')
const databaseNavBtn = document.getElementById('databaseNavBtn')
const crewlistNavBtn = document.getElementById('crewlistNavBtn')
const othersNavBtn = document.getElementById('othersNavBtn')

homeNavBtn.addEventListener('click', function() {

  pageInView = 'home'
  navBarVisualSelector()

  show('inputHomeDiv')
  hide('fullDatabaseParentDiv')
  hide('crewlistGeneratorParentDiv')
  hide('otherFunctionsDiv')

})

databaseNavBtn.addEventListener('click', function() {

  pageInView = 'database'
  navBarVisualSelector()

  hide('inputHomeDiv')
  show('fullDatabaseParentDiv')
  hide('crewlistGeneratorParentDiv')
  hide('otherFunctionsDiv')

})

crewlistNavBtn.addEventListener('click', function() {

  pageInView = 'crewlist'
  navBarVisualSelector()

  hide('inputHomeDiv')
  hide('fullDatabaseParentDiv')
  show('crewlistGeneratorParentDiv')
  hide('otherFunctionsDiv')

})

othersNavBtn.addEventListener('click', function() {

  pageInView = 'others'
  navBarVisualSelector()

  hide('inputHomeDiv')
  hide('fullDatabaseParentDiv')
  hide('crewlistGeneratorParentDiv')
  show('otherFunctionsDiv')

})

function navBarVisualSelector() {

  if (pageInView === 'home') {

    homeNavBtn.style.background = 'gainsboro'
    databaseNavBtn.style.background = ''
    crewlistNavBtn.style.background = ''
    othersNavBtn.style.background = ''

  } else if (pageInView === 'database') {

    homeNavBtn.style.background = ''
    databaseNavBtn.style.background = 'gainsboro'
    crewlistNavBtn.style.background = ''
    othersNavBtn.style.background = ''

  } else if (pageInView === 'crewlist') {

    homeNavBtn.style.background = ''
    databaseNavBtn.style.background = ''
    crewlistNavBtn.style.background = 'gainsboro'
    othersNavBtn.style.background = ''

  } else if (pageInView === 'others') {

    homeNavBtn.style.background = ''
    databaseNavBtn.style.background = ''
    crewlistNavBtn.style.background = ''
    othersNavBtn.style.background = 'gainsboro'

  }

}

navBarVisualSelector()

////////////////////////////////////////
//
//[SECTION] FOR INPUT PROCESSING
//
////////////////////////////////////////

//constant variables declaration 
const familyNameInput = document.getElementById('familyNameInput')
const givenNameInput = document.getElementById('givenNameInput')
const rankInput = document.getElementById('rankInput')
const birthdayInput = document.getElementById('birthdayInput')
const birthPlaceInput = document.getElementById('birthPlaceInput')
const genderInput = document.getElementById('genderInput')
const idNumInput = document.getElementById('idNumInput')
const idExpiryInput = document.getElementById('idExpiryInput')
const embarkationInput = document.getElementById('embarkationInput')
const disembarkationInput = document.getElementById('disembarkationInput')
const returneeInput = document.getElementById('returneeInput')

const inputPreviewBtn = document.getElementById('inputPreviewBtn')

const previewTableBody = document.getElementById('previewTableBody')

//event listeners
inputPreviewBtn.addEventListener('click', function() {
  console.log('function called')
  //acquire the values of input
  acquireInputValues()

  //check if the date formatting is consistent
  //* for embarkation dates
  const isEmbarkationDateFormatConsistent = checkForConsistentDateFormatting(embarkationArray)

  if (!isEmbarkationDateFormatConsistent) {
    console.log("embarkation date inconsistent")
    return

  }


  //* for disembarkation dates
  const isDisembarkationDateFormatConsistent = checkForConsistentDateFormatting(disembarkationArray)

  if (!isDisembarkationDateFormatConsistent) {
    console.log("disembarkation date inconsistent")
    return

  }


  //convert the embarakation and disembarkation dates to appropriate format

  formatDate(embarkationArray, 'embarkation')
  formatDate(disembarkationArray, 'disembarkation')


  //convert embarkation and disembarkation dates to date objects and push into their respective arrays

  toUnixEpoch()

  //check and compare if every arrays have the same length
  const isSameLength = checkArrayLengths()

  if (!isSameLength) {

    return

  };


  combineAllInfo()

  //generate the content for html table for previewing

  generateInputPreviewContent()

  //Lastly, show the table
  show('inputPreviewParentDiv')
  show('inputPreviewDiv')

})

//functions

let familyNameArray = []
let givenNameArray = []
let rankArray = []
let birthdayArray = []
let birthPlaceArray = []
let genderArray = []
let idNumArray = []
let idExpiryArray = []
let embarkationArray = []
let disembarkationArray = []
let returneeArray = []

let chronEmbarkationArray = []
let chronDisembarkationArray = []

let readableEmbarkationArray = []
let readableDisembarkationArray = []

let combinedInfoArray = []

//to get the values from input fields
function acquireInputValues() {
  ////////////////////////////////////////
  //first: check if any of the inputs are empty
  ////////////////////////////////////////

  //TBA

  ////////////////////////////////////////
  //second: reset all arrays
  ////////////////////////////////////////

  resetBatchInputArrays()

  ////////////////////////////////////////
  //third: acquire the values from various inputs
  ////////////////////////////////////////

  const familyNameStr = familyNameInput.value
  const givenNameStr = givenNameInput.value
  const rankStr = rankInput.value
  const birthdayStr = birthdayInput.value
  const birthPlaceStr = birthPlaceInput.value
  const genderStr = genderInput.value
  const idNumStr = idNumInput.value
  const idExpiryStr = idExpiryInput.value
  const embarkationStr = embarkationInput.value
  const disembarkationStr = disembarkationInput.value
  const returneeStr = returneeInput.value

  ////////////////////////////////////////
  //fourth: separate the data
  ////////////////////////////////////////

  //for family name
  separateBatchData(familyNameStr, familyNameArray)

  //for given name
  separateBatchData(givenNameStr, givenNameArray)

  //for rank
  separateBatchData(rankStr, rankArray)

  //for birthday
  separateBatchData(birthdayStr, birthdayArray)

  //for birth place
  separateBatchData(birthPlaceStr, birthPlaceArray)

  //for gender
  separateBatchData(genderStr, genderArray)

  //for id number
  separateBatchData(idNumStr, idNumArray)

  //for id expiration
  separateBatchData(idExpiryStr, idExpiryArray)

  //for embarkation date
  separateBatchData(embarkationStr, embarkationArray)

  //for disembarkation date
  separateBatchData(disembarkationStr, disembarkationArray)

  //for returnee identifier
  separateBatchData(returneeStr, returneeArray)

}

//to reset all arrays of batch input

function resetBatchInputArrays() {

  familyNameArray = []
  givenNameArray = []
  rankArray = []
  birthdayArray = []
  birthPlaceArray = []
  genderArray = []
  idNumArray = []
  idExpiryArray = []
  embarkationArray = []
  disembarkationArray = []
  returneeArray = []

  chronEmbarkationArray = []
  chronDisembarkationArray = []

  readableEmbarkationArray = []
  readableDisembarkationArray = []

}

function separateBatchData(string, array) {

  //to store the position of # symbols
  let hashIndicesArray = []

  //find # in global (full) string
  const regex = /#/g

  let match;

  while ((match = regex.exec(string)) !== null) {

    hashIndicesArray.push(match.index)

  }

  //extract the string detail based on the position of # separators

  hashIndicesArray.forEach((stringIndex, i) => {

    if (hashIndicesArray[i + 1] !== null) {

      //+1 to exclude # symbol before every string detail
      const startIndex = stringIndex + 1
      //+1 to get the next index
      const endIndex = hashIndicesArray[i + 1]

      const stringDetail = string.substring(startIndex, endIndex)

      array.push(stringDetail)

    }

  })

}

function binaryDecoder(string, array) {

  for (let i = 0; i < string.length; i++) {

    if (string[i] === '0') {

      array.push(false)

    } else if (string[i] === '1') {

      array.push(true)

    }

  }

}

//check if the array lengths are equal to one another

function checkArrayLengths() {

  let identical = true

  let length = null

  const arrayOfArrays = [familyNameArray, givenNameArray, rankArray, birthdayArray, birthPlaceArray, genderArray, idNumArray, idExpiryArray, embarkationArray, disembarkationArray, returneeArray, chronEmbarkationArray, chronDisembarkationArray, readableEmbarkationArray, readableDisembarkationArray]

  arrayOfArrays.forEach((array, i) => {

    if (length === null) {

      length = array.length

    } else if (length !== null && array.length !== length) {

      identical = false

    }

  })
  console.log(identical)
  
  return identical

}

function checkForConsistentDateFormatting(dataArray) {

  let isConsistent = true


  dataArray.forEach((date, i) => {

    //check if the date provided has 11 characters
    if (date.length !== 11) {

      isConsistent = false

    }

    //check if any of the first three letters matches the month abrrev

    let didMatched = false

    const monthAbbrev = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

    monthAbbrev.forEach((month, i) => {

      const firstThreeLetters = `${date[0]}${date[1]}${date[2]}`


      if (firstThreeLetters === month) {

        didMatched = true

      }


    });

    if (!didMatched) {

      isConsistent = false

    }

    //check if the fourth and seventh characters are space characters

    if (date[3] !== ' ' && date[6] !== ' ') {

      isConsistent = false

    }

    //check if the fifth and sixth characters are <= 31

    const dateStr = `${date[4]}${date[5]}`
    const dateInt = parseInt(dateStr)

    if (dateInt < 0 || dateInt > 31 || dateInt === NaN) {

      isConsistent = false

    }

    //check if the eighth, nineth, tenth, eleventh characters are > 0

    const yearStr = `${date[7]}${date[8]}${date[9]}${date[10]}`
    const yearInt = parseInt(yearStr)

    if (yearInt <= 0 || yearInt === NaN) {

      isConsistent = false

    }


  })

  return isConsistent

}

function formatDate(dataArray, arrayType) {

  //convert the MMM-DD-YYYY format to YYYY-MM-DD

  dataArray.forEach((date, i) => {

    let year;
    let month;
    let day;

    year = `${date[7]}${date[8]}${date[9]}${date[10]}`
    day = `${date[4]}${date[5]}`

    const firstThreeLetters = `${date[0]}${date[1]}${date[2]}`

    const monthAbbrev = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

    monthAbbrev.forEach((obj, i) => {

      if (obj === firstThreeLetters) {

        const monthNumber = i + 1
        month = monthNumber.toString()


      }

    })

    //prevent ambiguous formatting by adding leading 0s

    if (month.length === 1) {

      month = `0${month}`

    }

    if (day.length === 1) {

      day = `0${month}`

    }


    //combine and replace
    if (arrayType === 'embarkation') {

      readableEmbarkationArray.push(dataArray[i])

    } else if (arrayType === 'disembarkation') {

      readableDisembarkationArray.push(dataArray[i])

    }

    //replace the dates
    dataArray[i] = `${year}-${month}-${day}`

  })

}

function toUnixEpoch() {

  //for embarkation
  embarkationArray.forEach((obj, i) => {

    const epoch = new Date(obj)

    chronEmbarkationArray.push(epoch)

  });

  //for disembarkation
  disembarkationArray.forEach((obj, i) => {

    const epoch = new Date(obj)

    chronDisembarkationArray.push(epoch)

  })

}

function combineAllInfo() {
  //empty the array
  combinedInfoArray = []

  //create empty objects in the array
  for (let i = 0; i < familyNameArray.length; i++) {

    combinedInfoArray.push({})

  }


  familyNameArray.forEach((famName, i) => {

    const slot = combinedInfoArray[i]

    slot.familyName = famName
    slot.givenName = givenNameArray[i]
    slot.rank = rankArray[i]
    slot.birthday = birthdayArray[i]
    slot.birthPlace = birthPlaceArray[i]
    slot.gender = genderArray[i]
    slot.idNum = idNumArray[i]
    slot.idExpiry = idExpiryArray[i]
    slot.embarkation = embarkationArray[i]
    slot.disembarkation = disembarkationArray[i]
    slot.returnee = returneeArray[i]

    slot.chronEmbarkation = chronEmbarkationArray[i]
    slot.chronDisembarkation = chronDisembarkationArray[i]

    slot.readableEmbarkation = readableEmbarkationArray[i]
    slot.readableDisembarkation = readableDisembarkationArray[i]

  })

}

function generateInputPreviewContent() {

  //clear first the table
  previewTableBody.innerHTML = ''

  combinedInfoArray.forEach((obj, i) => {

    previewTableBody.innerHTML += `
    
    <tr>
      <td>${obj.familyName}</td>
      <td>${obj.givenName}</td>
      <td>${obj.rank}</td>
      <td>${obj.birthday}</td>
      <td>${obj.birthPlace}</td>
      <td>${obj.gender}</td>
      <td>${obj.idNum}</td>
      <td>${obj.idExpiry}</td>
      <td>${obj.readableEmbarkation}</td>
      <td>${obj.readableDisembarkation}</td>
      <td>${obj.returnee}</td>
    </tr>
    
    `
  })

}

////////////////////////////////////////
//
//[SECTION] FOR CHECKING FOR DUPLICATES
//
////////////////////////////////////////

const pushToDatabaseBtn = document.getElementById('pushToDatabaseBtn')

const inputDupTableBody = document.getElementById('inputDupTableBody')
const databaseDupTableBody = document.getElementById('databaseDupTableBody')

pushToDatabaseBtn.addEventListener('click', function() {
  
  checkForInputDuplicates()
  hide('inputPreviewParentDiv')
  hide('inputPreviewDiv')

  show('duplicateReviewParentDiv')
  show('duplicateReviewDiv')

  if (foundInputDuplicatesArray.length === 0) {

    show('noInputDupText')
    hide('inputDupTable')

  } else if (foundInputDuplicatesArray.length > 0) {

    hide('noInputDupText')
    show('inputDupTable')

    generateInputDupTable()

  }

  ///////////)

  if (foundDatabaseDuplicatesArray.length === 0) {

    show('noDatabaseDupText')
    hide('databaseDupTable')

  } else if (foundDatabaseDuplicatesArray.length > 0) {

    hide('noDatabaseDupText')
    show('databaseDupTable')

    generateDatabaseDupTable()

  }

  if (foundInputDuplicatesArray.length === 0 && foundDatabaseDuplicatesArray.length === 0) {

    show('closeDupReviewBtn')

  }

})

const closeDupReviewBtn = document.getElementById('closeDupReviewBtn')

closeDupReviewBtn.addEventListener('click', function() {

  show('duplicateReviewParentDiv')
  hide('duplicateReviewDiv')
  hide('duplicateReviewParentDiv')

})

let MAINDATABASEARRAY = []

let nonDuplicatesArray = []
let foundInputDuplicatesArray = []
let foundDatabaseDuplicatesArray = []


function checkForInputDuplicates() {

  //reset the arrays
  nonDuplicatesArray = []
  foundInputDuplicatesArray = []
  foundDatabaseDuplicatesArray = []

  let nonInputDuplicatesArray = []

  combinedInfoArray.forEach((comparing, i) => {

    let count = 0

    combinedInfoArray.forEach((comparedTo, j) => {

      if (comparing.familyName === comparedTo.familyName && comparing.givenName === comparedTo.givenName) {

        count++

      }

    })

    if (count === 1) {

      nonInputDuplicatesArray.push(comparing)

    } else if (count > 1) {

      foundInputDuplicatesArray.push(comparing)

    } else {

      console.error('unrecognized input count')

    }

  })

  //to call database duplicate checker function

  checkForDatabaseDuplicates(nonInputDuplicatesArray)

}

function checkForDatabaseDuplicates(passedArray) {

  passedArray.forEach((comparing, i) => {

    if (MAINDATABASEARRAY.length === 0) {

      nonDuplicatesArray.push(comparing)

    } else if (MAINDATABASEARRAY.length > 0) {

      let count = 0

      MAINDATABASEARRAY.forEach((comparedTo, j) => {

        if (comparing.familyName === comparedTo.familyName && comparing.givenName === comparedTo.givenName) {

          count++

        }

      });

      if (count === 0) {

        nonDuplicatesArray.push(comparing)

      } else if (count > 0) {

        foundDatabaseDuplicatesArray.push(comparing)

      } else {

        console.error('unrecognized duplicate count')

      }

    }


  })

  pushValidEntriesToDatabase()

}

function pushValidEntriesToDatabase() {

  nonDuplicatesArray.forEach((obj, i) => {

    MAINDATABASEARRAY.push(obj)

  })

  nonDuplicatesArray = []

}

function generateInputDupTable() {

  inputDupTableBody.innerHTML = ''

  if (foundInputDuplicatesArray.length === 0) {

    show('noInputDupText')
    hide('inputDupTable')
    hide('inputDupHead')

  } else if (foundInputDuplicatesArray.length > 0) {

    hide('noInputDupText')
    show('inputDupTable')
    show('inputDupHead')

  }

  if (foundDatabaseDuplicatesArray.length === 0) {

    show('noDatabaseDupText')
    hide('databaseDupTable')
    hide('databaseDupHead')

  } else if (foundDatabaseDuplicatesArray.length > 0) {

    hide('noDatabaseDupText')
    show('databaseDupTable')
    show('databaseDupHead')

  }

  if (foundInputDuplicatesArray.length === 0 && foundDatabaseDuplicatesArray.length === 0) {

    show('closeDupReviewBtn')

  }

  foundInputDuplicatesArray.forEach((obj, i) => {

    inputDupTableBody.innerHTML += `
      
      <tr>
        <td>${obj.familyName}</td>
        <td>${obj.givenName}</td>
        <td>${obj.readableEmbarkation}</td>
        <td>${obj.readableDisembarkation}</td>
        <td>${obj.returnee}</td>
        <td>
          <button onclick='manualAddInputDup(${i})'>Add</button>
        </td>
      </tr>
      
      `

  })

}

function manualAddInputDup(i) {

  let toTestForDatabase = []

  toTestForDatabase.push(foundInputDuplicatesArray[i])

  //test for dup im database
  checkForDatabaseDuplicates(toTestForDatabase)
  //re-generate database dup table
  generateDatabaseDupTable()

  //then splice 
  foundInputDuplicatesArray.splice(i, 1)

  generateInputDupTable()

}

function generateDatabaseDupTable() {

  databaseDupTableBody.innerHTML = ''

  if (foundInputDuplicatesArray.length === 0) {

    show('noInputDupText')
    hide('inputDupTable')
    hide('inputDupHead')

  } else if (foundInputDuplicatesArray.length > 0) {

    hide('noInputDupText')
    show('inputDupTable')
    show('inputDupHead')

    generateInputDupTable()

  }

  if (foundDatabaseDuplicatesArray.length === 0) {

    show('noDatabaseDupText')
    hide('databaseDupTable')
    hide('databaseDupHead')

  } else if (foundDatabaseDuplicatesArray.length > 0) {

    hide('noDatabaseDupText')
    show('databaseDupTable')
    show('databaseDupHead')

  }

  if (foundInputDuplicatesArray.length === 0 && foundDatabaseDuplicatesArray.length === 0) {

    show('closeDupReviewBtn')

  }

  foundDatabaseDuplicatesArray.forEach((obj, i) => {

    databaseDupTableBody.innerHTML += `
      
      <tr>
        <td>${obj.familyName}</td>
        <td>${obj.givenName}</td>
        <td>${obj.readableEmbarkation}</td>
        <td>${obj.readableDisembarkation}</td>
        <td>${obj.returnee}</td>
        <td>
          <button onclick='manualAddDatabaseDup(${i})'>Add</button>
        </td>
      </tr>
      
      `

  })

}

function manualAddDatabaseDup(i) {

  MAINDATABASEARRAY.push(foundDatabaseDuplicatesArray[i])

  //then splice 
  foundDatabaseDuplicatesArray.splice(i, 1)
  //re-generate database dup table
  generateDatabaseDupTable()

}

////////////////////////////////////////
//
//[SECTION] FOR SHOWING AND SAVING DATABASE
//
////////////////////////////////////////

const fullDatabaseBtn = document.getElementById('fullDatabaseBtn')

const fullDatabaseTableBody = document.getElementById('fullDatabaseTableBody')

const closeFullDatabaseBtn = document.getElementById('closeFullDatabaseBtn')

const downloadDatabaseBtn = document.getElementById('downloadDatabaseBtn')

fullDatabaseBtn.addEventListener('click', function() {

  generateFullDatabase()
  show('fullDatabaseTable')
  hide('fullDatabaseBtn')
  show('closeFullDatabaseBtn')
  show('downloadDatabaseBtn')

})

closeFullDatabaseBtn.addEventListener('click', function() {

  hide('fullDatabaseTable')
  show('fullDatabaseBtn')
  hide('closeFullDatabaseBtn')
  hide('downloadDatabaseBtn')


})

downloadDatabaseBtn.addEventListener('click', function() {

  saveJson()

})

function generateFullDatabase() {

  const tbody = fullDatabaseTableBody

  tbody.innerHTML = ''

  MAINDATABASEARRAY.forEach((obj, i) => {

    tbody.innerHTML += `
    
    <tr>
      <td>${obj.familyName}</td>
      <td>${obj.givenName}</td>
      <td>${obj.rank}</td>
      <td>${obj.birthday}</td>
      <td>${obj.birthPlace}</td>
      <td>${obj.gender}</td>
      <td>${obj.idNum}</td>
      <td>${obj.idExpiry}</td>
      <td>${obj.readableEmbarkation}</td>
      <td>${obj.readableDisembarkation}</td>
      <td>${obj.returnee}</td>
    </tr>
    
    `
  })

}




//TO SAVE THE DATABASE ARRAY AS A JSON

function saveJson() {

  const json = JSON.stringify(MAINDATABASEARRAY, null, 2); //Stringify with pretty printing

  const blob = new Blob([json], { type: "application/json" }); // Create the Blob

  const url = URL.createObjectURL(blob); // Create a URL for the Blob

  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = "MAINCREWLISTDATABASE.json";
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url); // Clean up

}




//TO LOAD JSON DATABASE FILE

const databaseUploadInput = document.getElementById('databaseUploadInput')

const loadFileBtn = document.getElementById('loadFileBtn')

loadFileBtn.addEventListener('click', function() {

  loadJson()

})

function loadJson() {

  const file = databaseUploadInput.files[0]

  const reader = new FileReader()

  reader.onload = function(e) {

    MAINDATABASEARRAY = JSON.parse(e.target.result)

    //to convert the JSON string into date objects
    MAINDATABASEARRAY.forEach((obj, i) => {

      obj.chronEmbarkation = new Date(obj.chronEmbarkation)
      obj.chronDisembarkation = new Date(obj.chronDisembarkation)

    })

  }

  reader.readAsText(file)

}



//TO GENERATE REQUESTED CREWLIST

const crewlistDatePickerInput = document.getElementById('crewlistDatePickerInput')

const generatedCrewlistTableBody = document.getElementById('generatedCrewlistTableBody')

const crewlistGeneratorBtn = document.getElementById('crewlistGeneratorBtn')

crewlistGeneratorBtn.addEventListener('click', function() {

  filterBasedOnDate()
  organizeEntriesByEmbarkDate()
  generateCrewlist()
  show('generatedCrewlistTable')
  show('saveTxtBtn')

})

let crewlistToBeGeneratedArray = []

function filterBasedOnDate() {
  //clear the array
  crewlistToBeGeneratedArray = []

  MAINDATABASEARRAY.forEach((obj, i) => {


    const crewListDate = new Date(crewlistDatePickerInput.value)

    if (obj.chronEmbarkation <= crewListDate && obj.chronDisembarkation >= crewListDate) {
      
      crewlistToBeGeneratedArray.push(obj)

    };
    


  })

}

//organize the ordering of entries

let organizedByDateArray = []
let uncategorizedPeople = []

function organizeEntriesByEmbarkDate() {

  let toBeTestedFurtherArray = []
  uncategorizedPeople = []

  //call the first iteration 
  determineOldest()

  function determineOldest() {

    //determine the current oldest
    let oldestDate = null;


    crewlistToBeGeneratedArray.forEach((obj, i) => {

      if (oldestDate === null) {

        oldestDate = obj.chronEmbarkation

      } else if (oldestDate !== null && obj.chronEmbarkation < oldestDate) {

        oldestDate = obj.chronEmbarkation

      }

    })

    //another loop to push the ones with similar dates to the oldestDate
    
    crewlistToBeGeneratedArray.forEach((obj, i) => {
      
      const comparandum = obj.chronEmbarkation.toLocaleDateString()
      const referent = oldestDate.toLocaleDateString()
      
      if (obj.chronEmbarkation > oldestDate) {
        //to save the remaining entries temporarily 
        toBeTestedFurtherArray.push(obj)

      } else if (comparandum === referent) {
        
        organizedByDateArray.push(obj)

      } else {
        
        uncategorizedPeople.push(obj)
        
      }

    });

    //delete the current crewlistToBeGenerated

    crewlistToBeGeneratedArray = []

    //push all elements in toBeTestedFurtherArray to crewlistToBeGeneratedArray

    toBeTestedFurtherArray.forEach((obj, i) => {
      
      crewlistToBeGeneratedArray.push(obj)

    })

    //reset the toBeTestedFurtherArray

    toBeTestedFurtherArray = []

    //call the function again if there are still left in crewlistToBeGeneratedArray

    if (crewlistToBeGeneratedArray.length > 0) {

      determineOldest()

    }

  }
  
  if (uncategorizedPeople.length > 0) {
    
    const body = document.body 
    
    body.style.background = 'red'
    
  }

}

//organize by rankings

let organizedByRankArray = []

function organizeEntriesByRank() {

  //loop for MASTER

  organizedByDateArray.forEach((obj, i) => {

    if (obj.rank === 'MASTER') {

      organizedByRankArray.push(obj)

    }

  })

  //loop for CHIEF OFFICER

  organizedByDateArray.forEach((obj, i) => {

    if (obj.rank === 'CHIEF OFFICER') {

      organizedByRankArray.push(obj)

    }

  })

  //loop for DECK OFFICER 1

  organizedByDateArray.forEach((obj, i) => {

    if (obj.rank === 'DECK OFFICER 1') {

      organizedByRankArray.push(obj)

    }

  })

  //loop for DECK OFFICER 2

  organizedByDateArray.forEach((obj, i) => {

    if (obj.rank === 'DECK OFFICER 2') {

      organizedByRankArray.push(obj)

    }

  })

  //loop for DECK RATING 1

  organizedByDateArray.forEach((obj, i) => {

    if (obj.rank === 'DECK RATING 1') {

      organizedByRankArray.push(obj)

    }

  })


}


//to generate the crewlist

function generateCrewlist() {

  generatedCrewlistTableBody.innerHTML = ''

  organizedByDateArray.forEach((obj, i) => {

    generatedCrewlistTableBody.innerHTML += `
    
    <tr>
      <td>${i + 1}</td>
      <td>${obj.familyName}</td>
      <td>${obj.givenName}</td>
      <td>${obj.rank}</td>
      <td>FILIPINO</td>
      <td>${obj.birthday}</td>
      <td>${obj.birthPlace}</td>
      <td>${obj.gender}</td>
      <td>SIRB/SRB</td>
      <td>${obj.idNum}</td>
      <td>PHILIPPINES</td>
      <td>${obj.idExpiry}</td>
      <td>${obj.readableEmbarkation}</td>
      <td>${obj.readableDisembarkation}</td>
      <td>${obj.returnee}</td>
    </tr>
    
    `
  })
  
  console.log(organizedByDateArray)
  organizedByDateArray = []

}

//FOR SAVING AS TXT FILE

const saveTxtBtn = document.getElementById('saveTxtBtn')

saveTxtBtn.addEventListener('click', function() {

  saveTxt()

})

function saveTxt() {
  let text = ''

  organizedByDateArray.forEach((obj, i) => {

    text += `${i + 1}\t${obj.familyName}\t${obj.givenName}\t${obj.rank}\tFILIPINO\t${obj.birthday}\t${obj.birthPlace}\t${obj.gender}\tSIRB/SRB\t${obj.idNum}\tPHILIPPINES\t${obj.idExpiry}\n`

  })

  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = "txtCrewlist.txt";
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
}

////////////////////////////////////////
//
//[SECTION] FOR MISC FUNCTIONS
//
////////////////////////////////////////

const columnForFormulaInput = document.getElementById('columnForFormulaInput')

const rowStartForFormulaInput = document.getElementById('rowStartForFormulaInput')

const rowEndForFormulaInput = document.getElementById('rowEndForFormulaInput')

const formulaClipboard = document.getElementById('formulaClipboard')

const generateFormulaBtn = document.getElementById('generateFormulaBtn')

generateFormulaBtn.addEventListener('click', function() {

  generateExcelFormula()

})

//to generate the formula

function generateExcelFormula() {

  formulaClipboard.innerHTML = ''

  //acquire the values

  const column = columnForFormulaInput.value
  const rowStart = rowStartForFormulaInput.value
  const rowEnd = rowEndForFormulaInput.value

  const start = parseInt(rowStart)
  const end = parseInt(rowEnd)

  //start of formula:

  formulaClipboard.innerHTML += '=CONCATENATE('

  for (let i = start; i <= end; i++) {

    if (i !== end) {

      formulaClipboard.innerHTML += `"#", ${column}${i},`

    } else if (i === end) {

      formulaClipboard.innerHTML += `"#", ${column}${i}`

    }

  }

  formulaClipboard.innerHTML += ')'

}
