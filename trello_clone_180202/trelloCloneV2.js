class Task {
  constructor(task, assignee = undefined) {
    this.task = task;
    this.assignee = assignee;
  }

  render () {
    let str = this.task
    if (this.assignee !== undefined) {str = str.concat(" • " + this.assignee)}
    return str
  }
}

class List {
  constructor(name, list = []) {
    this.name = name;
    this.list = list;
  }

  addTask(task) {
    if (task.constructor === Task) {
      this.list.push(task)
      return this
    } else {
      console.log("ERROR: Please pass a Task object into this function.");
    }
  }

  removeTask (taskName) {
    for (let i = 0; i < this.list.length; i += 1) {
      if (this.list[i].task === taskName) {
        this.list.splice(i,1)
        return this;
        break;
      }
    }
    return "ERROR: No such task exists in this list."
  }

  render () {
    let str = ''
    str = str.concat(`|-------------\n|${this.name}\n|-------------\n`);
    for (let i = 0; i < this.list.length; i += 1) {
      str = str.concat(`|${i}> ${this.list[i].render()}\n`);
    }
    str = str.concat(`|\n`)
    return str
  }
}


class Board {
  constructor(name) {
    this.name = name
    this.board = {}
  }
  addList (listName) {
    if (listName.constructor === List) {
      this.board[listName.name] = listName.list
      return this
    } else {
      return `ERROR: ${listName} is not a list.`
    }
  }

  removeList (listName) {
    if (this.board[listName]) {
      delete this.board[listName]
      return this
    } else {
      return "ERROR: No such list exists in this board."
    }
  }

  render () {
    let str = ''
    str = str.concat(`**************\n * ${this.name} *\n**************\n`);
    for (let list in this.board) {
      str = str.concat(new List (list, this.board[list]).render())
    }
    return str
  }

  moveTaskTo (task,source,target) {
    for (let i = 0; i < this.board[source].length; i += 1) {
      console.log(this.board[source][i].task);
      console.log(task);
      if (this.board[source][i].task === task) {
        this.board[target].push(this.board[source][i])
        this.board[source].splice(i,1)
        return this;
        break;
      }
    }
    return "ERROR: No such task exists in the specified list."
  }
}

const toDoList = new List('To Do')
  .addTask(new Task('Laundry', 'You'))
  .addTask(new Task('Buy Apples'))
  .addTask(new Task('Pay Phone Bill', 'Me'));

const doingList = new List('Doing')
  .addTask(new Task('Laundry'))
  .addTask(new Task('Study JavaScript', 'Jill'))
  .addTask(new Task('Study HTML', 'Jill'))
  .addTask(new Task('Study Ruby', 'Me'));

const doneList = new List('Done')
  .addTask(new Task('Laundry'))
  .addTask(new Task('Ruby Exercises Homework'));

const myBoard = new Board('My Board')
  .addList(toDoList)
  .addList(doingList)
  .addList(doneList);







// // Original Trello Clone
//
//
//
// //hello object serves as structure to hold all boards, lists and cards
// const hello = {
//     'Tester Board': {
//       'To Do': ['Laundry', 'Buy Apples', 'Pay Phone Bill'],
//       'Doing': ['Laundry', 'Studying Javascript', 'Studying HTML', 'Studying Ruby'],
//       'Done': ['Laundry']
//     },
//     'Dreams': {
//       'Wish List': ['Conquer the Seven Kingdoms', 'Get my baby back', 'My hand needs to chill'],
//     }
// };
//
//
// // Returns a list of existing boards in the hello object
// function listBoards () {
//   let i = 1
//   for (b in hello) {
//     console.log('--------------------');
//     console.log(i + " - " + b);
//     i += 1
//   }
//   console.log('--------------------');
// }
//
// // Adds a new board to the hello object
// function createBoard (boardName) {
//   if (hello[boardName] === undefined) {
//     console.log(`Board '${boardName}'' was created`);
//     hello[boardName] = {}
//   } else {
//     console.log("Board already exists");
//   }
// }
//
// // Remove a specified board from the hello object
// function removeBoard (boardName) {
//   if (hello[boardName] === undefined) {
//     console.log("Board doesn't exist");
//   } else {
//     delete hello[boardName];
//     console.log(`Board '${boardName}' was removed`);
//   }
// }
//
// //Display all lists and cards of a specified board
// function displayBoard (boardName) {
//   if (hello[boardName] === undefined) {
//     console.log("Board doesn't exist");
//   } else {
//     for (let category in hello[boardName]) {
//       console.log('--------------------');
//       console.log(category);
//       console.log('--------------------');
//       for (let item of hello[boardName][category]) {
//         console.log("> " + item);
//       }
//     }
//     console.log('--------------------');
//   }
// }
//
// // Add list to specified board in hello object
// function createList (boardName,listName) {
//   if (hello[boardName] === undefined) {
//     console.log("Board doesn't exist");
//   } else if (hello[boardName][listName] !== undefined) {
//     console.log("List name already exists");
//   } else {
//     hello[boardName][listName] = []
//     console.log('List has been created');
//   }
// }
//
// // Add card to specified list of specified board in hello object (allows for duplicates)
// function createCard (boardName,listName,cardName) {
//   if (hello[boardName] === undefined) {
//     console.log("Board doesn't exist");
//   } else if (hello[boardName][listName] === undefined) {
//     console.log("List doesn't exist");
//   } else {
//     hello[boardName][listName].push(cardName)
//     console.log("Card added");
//   }
// }
//
// //remove list
// function removeList (boardName,listName) {
//   if (hello[boardName] === undefined) {
//     console.log("Board doesn't exist");
//   }  else if (hello[boardName][listName] === undefined) {
//       console.log("List doesn't exist in specified board");
//   } else {
//       delete hello[boardName][listName]
//       console.log('List has been removed');
//   }
// }
// //remove card
// function removeCard (boardName, listName, cardIndex) {
//   if (hello[boardName] === undefined) {
//     console.log("Board doesn't exist");
//   } else if (hello[boardName][listName] === undefined) {
//     console.log("List doesn't exist in specified board");
//   } else if (hello[boardName][listName][cardIndex] === undefined) {
//     console.log("There is no card at that index");
//   } else {
//      hello[boardName][listName].splice(cardIndex,1)
//      console.log('Card has been removed');
//   }
// }
//
// //move card
// function moveCard (boardName, fromList, toList, fromCardIndex, toCardIndex) {
//   if (hello[boardName] === undefined) {
//     console.log("Board doesn't exist");
//   } else if (hello[boardName][fromList] === undefined) {
//     console.log("'fromList' doesn't exist in specified board");
//   } else if (hello[boardName][toList] === undefined) {
//     console.log("'toList' doesn't exist in specified board");
//   } else if (hello[boardName][fromList][fromCardIndex] === undefined) {
//     console.log("There is no card at that index");
//   } else if (hello[boardName][toList].length < toCardIndex) {
//     console.log(`The list is not that long, please select a 'toCardIndex' between 0 and ${hello[boardName][toList].length}`);
//   } else {
//     hello[boardName][toList][toCardIndex] = hello[boardName][fromList][fromCardIndex]
//     hello[boardName][fromList].splice(fromCardIndex,1)
//     console.log('Card has been moved');
//   }
// }
