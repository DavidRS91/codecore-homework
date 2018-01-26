//hello object serves as structure to hold all boards, lists and cards
const hello = {
    'Tester Board': {
      'To Do': ['Laundry', 'Buy Apples', 'Pay Phone Bill'],
      'Doing': ['Laundry', 'Studying Javascript', 'Studying HTML', 'Studying Ruby'],
      'Done': ['Laundry']
    },
    'Dreams': {
      'Wish List': ['Conquer the Seven Kingdoms', 'Get my baby back', 'My hand needs to chill'],
    }
};


// Returns a list of existing boards in the hello object
function listBoards () {
  let i = 1
  for (b in hello) {
    console.log('--------------------');
    console.log(i + " - " + b);
    i += 1
  }
  console.log('--------------------');
}

// Adds a new board to the hello object
function createBoard (boardName) {
  if (hello[boardName] === undefined) {
    console.log(`Board '${boardName}'' was created`);
    hello[boardName] = {}
  } else {
    console.log("Board already exists");
  }
}

// Remove a specified board from the hello object
function removeBoard (boardName) {
  if (hello[boardName] === undefined) {
    console.log("Board doesn't exist");
  } else {
    delete hello[boardName]
    console.log(`Board '${boardName}' was removed`);
  }
}

//Display all lists and cards of a specified board
function displayBoard (boardName) {
  if (hello[boardName] === undefined) {
    console.log("Board doesn't exist");
  } else {
    for (let category in hello[boardName]) {
      console.log('--------------------');
      console.log(category);
      console.log('--------------------');
      for (let item of hello[boardName][category]) {
        console.log("> " + item);
      }
    }
    console.log('--------------------');
  }
}

// Add list to specified board in hello object
function createList (boardName,listName) {
  if (hello[boardName] === undefined) {
    console.log("Board doesn't exist");
  } else if (hello[boardName][listName] !== undefined) {
    console.log("List name already exists");
  } else {
    hello[boardName][listName] = []
    console.log('List has been created');
  }
}

// Add card to specified list of specified board in hello object (allows for duplicates)
function createCard (boardName,listName,cardName) {
  if (hello[boardName] === undefined) {
    console.log("Board doesn't exist");
  } else if (hello[boardName][listName] === undefined) {
    console.log("List doesn't exist");
  } else {
    hello[boardName][listName].push(cardName)
    console.log("Card added");
  }
}

//remove list
function removeList (boardName,listName) {
  if (hello[boardName] === undefined) {
    console.log("Board doesn't exist");
  }  else if (hello[boardName][listName] === undefined) {
      console.log("List doesn't exist in specified board");
  } else {
      delete hello[boardName][listName]
      console.log('List has been removed');
  }
}
//remove card
function removeCard (boardName, listName, cardIndex) {
  if (hello[boardName] === undefined) {
    console.log("Board doesn't exist");
  } else if (hello[boardName][listName] === undefined) {
    console.log("List doesn't exist in specified board");
  } else if (hello[boardName][listName][cardIndex] === undefined) {
    console.log("There is no card at that index");
  } else {
     hello[boardName][listName].splice(cardIndex,1)
     console.log('Card has been removed');
  }
}

//move card
function moveCard (boardName, fromList, toList, fromCardIndex, toCardIndex) {
  if (hello[boardName] === undefined) {
    console.log("Board doesn't exist");
  } else if (hello[boardName][fromList] === undefined) {
    console.log("'fromList' doesn't exist in specified board");
  } else if (hello[boardName][toList] === undefined) {
    console.log("'toList' doesn't exist in specified board");
  } else if (hello[boardName][fromList][fromCardIndex] === undefined) {
    console.log("There is no card at that index");
  } else if (hello[boardName][toList].length < toCardIndex) {
    console.log(`The list is not that long, please select a 'toCardIndex' between 0 and ${hello[boardName][toList].length}`);
  } else {
    hello[boardName][toList][toCardIndex] = hello[boardName][fromList][fromCardIndex]
    hello[boardName][fromList].splice(fromCardIndex,1)
    console.log('Card has been moved');
  }
}
