
const addPersonBtn = document.getElementById('addPersonBtn')

addPersonBtn.addEventListener('click', function() {
  
  addToDatabase()
  
})

//array of all the people and their data

let crewlistDatabase = []

//function to add people to the database

function addToDatabase() {
  
  const name = document.getElementById('nameInput')
  const embark = document.getElementById('embarkInput')
  const disembark = document.getElementById('disembarkInput')
  
  const nameAcquired = name.value
  const embarkAcquired = embark.value
  const disembarkAcquired = disembark.value
  
  const embarkDate = new Date(embarkAcquired)
  const disembarkDate = new Date(disembarkAcquired)
  
  let inDatabase = false
  
  //to check if inputs are invalid
  
  if (nameAcquired === '' || embarkAcquired === '' || disembarkAcquired === '') {
    
    console.log('insufficient data!')
    return
    
  }
  
  if (disembarkDate < embarkDate) {
    
    console.log('invalid dates!')
    return
    
  }
  
  //logic to add in database
  
  crewlistDatabase.forEach((obj, i) => {
    
    if (obj.name === nameAcquired) {
      
      inDatabase = true
      
    }
    
  })
  
  if (!inDatabase) {
    
    crewlistDatabase.push({name: nameAcquired, embark: embarkAcquired, disembark: disembarkAcquired, chronEmbark: embarkDate, chronDisembark: disembarkDate})
    
    console.log(crewlistDatabase)
    
  } else{
    
    console.log('Already in the database!')
    
  }
  
  //to reset the input fields
  
  name.value = ''
  embark.value = ''
  disembark.value = ''
  
}

//FOR GENERATING LIST

const crewListDateQuery = document.getElementById('crewListDateInput')

const generateListBtn = document.getElementById('generateListBtn')

const resetBtn = document.getElementById('resetBtn')

const list = document.getElementById('list')

//event listeners

generateListBtn.addEventListener('click', function() {
  
  generateList()
  
})

resetBtn.addEventListener('click', function() {
  
  resetList()
  
})

function generateList() {
  
  resetList()
  
  crewlistDatabase.forEach((obj, i) => {
    
    const crewListDate = new Date(crewListDateQuery.value)
    
    if (obj.chronEmbark <= crewListDate && obj.chronDisembark >= crewListDate) {
      
      list.innerHTML += `${obj.name} ${obj.embark} - ${obj.disembark}<br>`
      
    }
    
    
  })
  
}

function resetList() {
  
  list.innerHTML = ''
  
}




const saveJsonBtn = document.getElementById('saveJsonBtn')

saveJsonBtn.addEventListener('click', function() {
  
  saveJson()
  
})

//TO SAVE THE DATABASE ARRAY AS A JSON

function saveJson() {
  
  const json = JSON.stringify(crewlistDatabase, null, 2); //Stringify with pretty printing
  
  const blob = new Blob([json], { type: "application/json" }); // Create the Blob
  
  const url = URL.createObjectURL(blob); // Create a URL for the Blob
  
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = "crewlistDatabase.json";
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url); // Clean up
  
}

//TO LOAD THE JSON AND POPULATE THE ARRAY

const databaseUploadInput = document.getElementById('databaseUploadInput')
const loadFileBtn = document.getElementById('loadFileBtn')

loadFileBtn.addEventListener('click', function() {
  
  loadJson()
  
})

function loadJson() {
  
  const file = databaseUploadInput.files[0]
  
  const reader = new FileReader()
  
  reader.onload = function(e) {
    
    crewlistDatabase = JSON.parse(e.target.result)
    
    //to convert the JSON string into date objects
    crewlistDatabase.forEach((obj, i) => {
      
      obj.chronEmbark = new Date(obj.chronEmbark)
      obj.chronDisembark = new Date(obj.chronDisembark)
      
    })
    
  }
  
  reader.readAsText(file)
  
}

//test function for txt saving

const testArray = 
[
  {name: 'Mendoza', embark: '21-Jan-2024', disembark: '21-Feb-2024'}, 
  {name: 'Rogador', embark: '03-Jan-2024', disembark: '13-Mar-2024'},
  {name: 'Evin', embark: '19-Jan-2024', disembark: '09-Feb-2024'}, 
  {name: 'Sacayanan', embark: '21-Feb-2024', disembark: '03-Mar-2024'}
]

const printTxtBtn = document.getElementById('printTxtBtn')

printTxtBtn.addEventListener('click', function() {
  
  saveTxt()
  
})

function saveTxt() {
  let text = ''
  
  testArray.forEach((obj, i) => {
    
    text += `${obj.name}\t${obj.embark}\t${obj.disembark}\n`
    
  })

  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = "testArray.txt";
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
}


