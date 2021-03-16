// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import testData from './test/testData.json'
import jsTPS from './common/jsTPS'

import ChangeDate_Transaction from './transactions/ChangeDate_Transaction.js'
import TaskChange_Transaction from './transactions/TaskChange_Transaction.js'
import StatusChange_Transaction from './transactions/StatusChange_Transaction.js'
import RemoveItem_Transaction from './transactions/RemoveItem_Transaction.js'
import MoveItemUp_Transaction from './transactions/MoveItemUp_Transaction';
import MoveItemDown_Transaction from './transactions/MoveItemDown_Transaction';

// THESE ARE OUR REACT COMPONENTS
import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import Workspace from './components/Workspace'
{/*import ItemsListHeaderComponent from './components/ItemsListHeaderComponent'
import ItemsListComponent from './components/ItemsListComponent'
import ListsComponent from './components/ListsComponent'*/
}
class App extends Component {
  constructor(props) {
    // ALWAYS DO THIS FIRST
    super(props);

    // DISPLAY WHERE WE ARE
    console.log("App constructor");

    // MAKE OUR TRANSACTION PROCESSING SYSTEM
    this.tps = new jsTPS();

    // CHECK TO SEE IF THERE IS DATA IN LOCAL STORAGE FOR THIS APP
    let recentLists = localStorage.getItem("recentLists");
    console.log("recentLists: " + recentLists);
    if (!recentLists) {
      recentLists = JSON.stringify(testData.toDoLists);
      localStorage.setItem("toDoLists", recentLists);
    }
    recentLists = JSON.parse(recentLists);

    // FIND OUT WHAT THE HIGHEST ID NUMBERS ARE FOR LISTS
    let highListId = -1;
    let highListItemId = -1;
    for (let i = 0; i < recentLists.length; i++) {
      let toDoList = recentLists[i];
      if (toDoList.id > highListId) {
        highListId = toDoList.id;
      }
      for (let j = 0; j < toDoList.items.length; j++) {
        let toDoListItem = toDoList.items[j];
        if (toDoListItem.id > highListItemId)
        highListItemId = toDoListItem.id;
      }
    };

    // SETUP OUR APP STATE
    this.state = {
      toDoLists: recentLists,
      currentList: {items: []},
      nextListId: highListId+1,
      nextListItemId: highListItemId+1,
      useVerboseFeedback: true
    }
  }

  // WILL LOAD THE SELECTED LIST
  loadToDoList = (toDoList) => {
    console.log("loading " + toDoList);

    // MAKE SURE toDoList IS AT THE TOP OF THE STACK BY REMOVING THEN PREPENDING
    const nextLists = this.state.toDoLists.filter(testList =>
      testList.id !== toDoList.id
    );
    nextLists.unshift(toDoList);
    
    let listItem = document.getElementById("todo-list-button-"+toDoList.id);
    listItem.contentEditable = true;

    let toDoItems = document.getElementById("todo-list-items-div");
    toDoItems.style.visibility = "visible";

    listItem.onblur = () => {
      listItem.contentEditable = false;
    }

    this.setState({
      toDoLists: nextLists,
      currentList: toDoList
    });
  }

  addNewList = () => {
    let newToDoListInList = [this.makeNewToDoList()];
    let newToDoListsList = [...newToDoListInList, ...this.state.toDoLists];
    let newToDoList = newToDoListInList[0];

    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState({
      toDoLists: newToDoListsList,
      currentList: newToDoList,
      nextListId: this.state.nextListId+1
    }, this.afterToDoListsChangeComplete);
  }

  makeNewToDoList = () => {
    let newToDoList = {
      id: this.state.highListId,
      name: 'Untitled',
      items: []
    };
    return newToDoList;
  }

  makeNewToDoListItem = () =>  {
    let newToDoListItem = {
      description: "No Description",
      dueDate: "0000-00-00",
      status: "incomplete"
    };
    return newToDoListItem;
  }

  // THIS IS A CALLBACK FUNCTION FOR AFTER AN EDIT TO A LIST
  afterToDoListsChangeComplete = () => {
    console.log("App updated currentToDoList: " + this.state.currentList);

    // WILL THIS WORK? @todo
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("recent_work", toDoListsString);
  }

  //Removes the specified item from the toDoList and refreshes the workspace
  removeListItem = (itemID) => {
    let itemList = this.state.currentList.items;
    let indexOfItem = -1;
    for (let i = 0; (i < itemList.length) && (indexOfItem < 0); i++) {
        if (itemList[i].id === itemID) {
            indexOfItem = i;
        }
    }
    itemList.splice(indexOfItem, 1);  //Removes the item
    this.loadToDoList(this.state.currentList);  //'Refreshes' the list
  }

  //Adds a new default item to the current list. Probably best to push
  addListItem = () => {
    console.log("Adding new item");
    let itemList = this.state.currentList.items;
    let newItem = this.makeNewToDoListItem();
    console.log(newItem);
    itemList.unshift(newItem);
    this.loadToDoList(this.state.currentList);
  }

  //Moves up the item to the current list.
  createMoveItemUpTransaction = (itemID) => {
    console.log("Moving up new item");
    let transactionHandler = this.tps;
    let itemList = this.state.currentList.items;
    let indexOfItem = -1;
    for (let i = 1; (i < itemList.length) && (indexOfItem < 0); i++) {
        if (itemList[i].id === itemID) {
            indexOfItem = i;
        }
    }
    if(indexOfItem!=-1){
      transactionHandler.addTransaction(new MoveItemUp_Transaction(this, indexOfItem));
    }
  }

  moveItemUp = (indexOfItem) => {
    let itemList = this.state.currentList.items;
    if(indexOfItem!=-1){
      let tempItem = itemList[indexOfItem];
      itemList[indexOfItem]=itemList[indexOfItem-1];
      itemList[indexOfItem-1]=tempItem;
    }
    this.loadToDoList(this.state.currentList);
  }

  //Moves down the item to the current list.
  createMoveItemDownTransaction = (itemID) => {
    let transactionHandler = this.tps;
    let itemList = this.state.currentList.items;
    let indexOfItem = -1;
    for (let i = 0; (i < itemList.length-1) && (indexOfItem < 0); i++) {
        if (itemList[i].id === itemID) {
            indexOfItem = i;
        }
    }
    if(indexOfItem!=-1){
      transactionHandler.addTransaction(new MoveItemDown_Transaction(this, indexOfItem));
    }

  }

  //Moves item down in the currentlist given its index
  moveItemDown = (indexOfItem) => {
    let itemList = this.state.currentList.items;
    if(indexOfItem!=-1){
      let tempItem = itemList[indexOfItem];
      itemList[indexOfItem]=itemList[indexOfItem+1];
      itemList[indexOfItem+1]=tempItem;
    }
    this.loadToDoList(this.state.currentList);
  }
  // //Changes the name of the list
  // editListName = () => {
  //   console.log("Editing list name");
  //   let listID = this.state.currentList.id;
  //   let listElement = document.getElementById()
  // }

  //Closes list view; doesn't change the order of todo lists in the left sidebar
  closeListView = () => {
    console.log("Closing list view");
    this.setState({
      toDoLists: this.state.toDoLists,
      currentList: null
    });
    let workspace = document.getElementById("workspace");
    let listItems = document.getElementById("todo-list-items-div");
    workspace.remove(listItems);
    this.render();
    // this.loadToDoList(this.state.currentList);
  }

  //Deletes the top list in the left sidebar. If no more lists exists, create a new list to act as a placeholder. Patch this later
  deleteFirstList = () => {
    console.log("DELETING FIRST LIST");
    let toDoListsList = this.state.toDoLists;
    toDoListsList.splice(0,1);
    this.setState({
      toDoLists: toDoListsList,
      currentList: toDoListsList.length==0 ? this.makeNewToDoList() : toDoListsList[0] 
    });
    let workspaceItems = document.getElementById("todo-list-items-div");
    workspaceItems.style.visibility = "hidden";
  }

  
  //Allows the textfield of the task column to be changed
  createTaskChangeTransaction = (itemID) => {
      console.log("Changing Task");
      let taskColumn = document.getElementById('todo-list-task-' + itemID);
      let oldTask = taskColumn.innerHTML;
      let transactionHandler = this.tps;
      taskColumn.contentEditable = true;

      taskColumn.addEventListener("keyup", function(event) {
          // Number 13 is the "Enter" key on the keyboard
          if (event.keyCode === 13) {
            // Cancel the default action, if needed
            taskColumn.blur();
          }
        });
      taskColumn.onblur = () => {
          taskColumn.innerHTML.trim();
          let newTask = taskColumn.innerHTML;
          let taskChangeTransaction = new TaskChange_Transaction(this, oldTask, newTask, itemID);
          transactionHandler.addTransaction(taskChangeTransaction);
      }

  }

  //Changes the task
  changeTask = (task, itemID) => {
    let taskColumn = document.getElementById('todo-list-task-' + itemID);
    taskColumn.innerHTML = task;
  }

  //Creates a status change Transaction object
  createStatusChangeTransaction = (itemID) => {
    let transactionHandler = this.tps;
    
    let itemDiv = document.getElementById('todo-list-item-' + itemID); //We have access to the current div item
    let status = document.getElementById('todo-list-status-' + itemID); //We have access to the specific date div
    let statusMenu = document.createElement("select"); //We create an input element
    statusMenu.className = "status-col";   //To ensure when we load up the dropdown to replace the div, same padding
    statusMenu.style.background = "#353a44";  //Changes background color
    statusMenu.style.color = "#d9d6cc"; //Changes font color
    //Options for the dropdown
    let completeOption = document.createElement("option");
    completeOption.innerHTML = "complete";
    completeOption.style.background = "#353a44";  //Changes background color
    completeOption.style.color = "#19c8ff"; //Changes font color
    statusMenu.appendChild(completeOption);
    let incompleteOption = document.createElement("option");
    incompleteOption.innerHTML = "incomplete";
    incompleteOption.style.background = "#353a44";  //Changes background color
    incompleteOption.style.color = "#ffc819"; //Changes font color
    statusMenu.appendChild(incompleteOption);

    //Original status
    let oldStatus = status.innerHTML;

    itemDiv.replaceChild(statusMenu, status);    //Replaces the dueDate div with the calendar object
    statusMenu.addEventListener('blur', (event) => {  //Code for when the calendar object loses focus
        let optionChosen = statusMenu.value;
        itemDiv.replaceChild(status, statusMenu);
        let newStatus = optionChosen;
        let statusChangeTransaction = new StatusChange_Transaction(this, oldStatus, newStatus, itemID);
        transactionHandler.addTransaction(statusChangeTransaction);
    });
    
  }

  //Changes the task
  changeStatus = (status, itemID) => {
    let statusColumn = document.getElementById('todo-list-status-' + itemID);
    statusColumn.innerHTML = status; 
    if(statusColumn.innerHTML == "complete")
      statusColumn.style.color = "#19c8ff";
    else
      statusColumn.style.color = "#ffc819"
  }

  //Creates a Transaction for changing the due date
  createDueDateChangeTransaction = (itemID) => {
    let transactionHandler = this.tps;
    let itemDiv = document.getElementById('todo-list-item-' + itemID); //We have access to the current div item
    let dueDate = document.getElementById('todo-list-due-date-' + itemID); //We have access to the specific date div
    let calendar = document.createElement("input"); //We create an input element
    calendar.type = "date"; //We make it of type date; opens up a calendar for us
    calendar.id = "calendarPlaceholder";
    calendar.className = "item-col due-date-col";   //To ensure when we load up the calendar to replace the div, same padding
    calendar.style.background = "#353a44";  //Changes background color
    calendar.style.color = "#d9d6cc"; //Changes font color
    let oldDate = dueDate.innerHTML;
    itemDiv.replaceChild(calendar, dueDate);    //Replaces the dueDate div with the calendar object  
    calendar.contentEditable = true;    //Allows us to edit the calendar
    calendar.addEventListener('blur', (event) => {  //Code for when the calendar object loses focus
        let newDate = calendar.value;   //Preserves new date the calendar was inputted
        itemDiv.replaceChild(dueDate, calendar);    //Replaces the div back in place of the calendar
        transactionHandler.addTransaction(new ChangeDate_Transaction(this, oldDate, newDate, itemID));
      });
  }

  //Changes the date of the itemID
  changeDate = (date, itemID) => {
    // let itemDiv = document.getElementById('todo-list-item-' + itemID); //We have access to the current div item
    let dueDate = document.getElementById('todo-list-due-date-' + itemID); //We have access to the specific date div
    // let calendar = document.getElementById("calendarPlaceholder"); //We create an input element
    // itemDiv.replaceChild(dueDate, calendar);    //Replaces the div back in place of the calendar
    dueDate.innerHTML = date;    //Sets the div to the value of what the calendar was changed to
    if(dueDate.innerHTML == "" || dueDate.innerHTML == null)    //If the due date was left blank, placeholder text is set
        dueDate.innerHTML = "N/A: Assign a Date";
  }

  //Undos the latest Transaction if there is one
  undoTransaction = () => {
    if(this.tps.hasTransactionToUndo()){
        this.tps.undoTransaction();
    }
  }

  //Redos the latest Transaction if there is one
  redoTransaction = () => {
    if(this.tps.hasTransactionToRedo()){
        this.tps.doTransaction();
    }
  }

  render() {
    let items = this.state.currentList.items;
    return (
      <div id="root">
        <Navbar />
        <LeftSidebar 
          toDoLists={this.state.toDoLists}
          loadToDoListCallback={this.loadToDoList}
          addNewListCallback={this.addNewList}
          onClick={this.editListName}
        />
        <Workspace toDoListItems={items} 
          handleSpecificTaskChangeCallback={this.createTaskChangeTransaction}
          handleSpecificStatusChangeCallback={this.createStatusChangeTransaction}
          handleSpecificDueDateChangeCallback={this.createDueDateChangeTransaction}
          removeListItemCallback={this.removeListItem}
          addNewListItemCallback={this.addListItem}
          deleteListItemCallback={this.deleteFirstList}//FIX
          moveListItemUpCallback={this.createMoveItemUpTransaction}
          moveListItemDownCallback={this.createMoveItemDownTransaction}
          undoTransactionCallback={this.undoTransaction}
          redoTransactionCallback={this.redoTransaction}
          // closeListCallback={console.log("REACHED")}//FIX
        />
      </div>
    );
  }
}

export default App;