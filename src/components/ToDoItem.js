// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';

class ToDoItem extends Component {
    constructor(props) {
        super(props);
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " constructor");
        //Binds scope of this to our handleTaskChange
        // this.handleTaskChange = this.handleTaskChange.bind(this);
        this.handleDueDateChange = this.handleDueDateChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " did mount");
    }

    handleTaskChange = () => {
        this.props.handleTaskChangeCallback(this.props.toDoListItem.id);
    }

    //Allows the due-date of the Item object to be changed
    handleDueDateChange() {
        console.log("Changing due-date");
        let listItem = this.props.toDoListItem;
        this.props.handleDueDateChangeCallback(listItem.id);
    }

    handleStatusChange() {
        console.log("Changing status");
        let listItem = this.props.toDoListItem;
        this.props.handleStatusChangeCallback(listItem.id);
    }
// Reference
    // handleLoadList = () => {
    //     this.props.loadToDoListCallback(this.props.toDoList);
    // }

    //Handles removal of Item from the list
    handleRemoveItem = () => {
        console.log("Removing Item");
        let listItem = this.props.toDoListItem;
        // this.props.loadToDoListCallback(this.props.toDoList);
        this.props.removeItemCallback(listItem.id);
        
        
        //IMPLEMENTATION NEEDED TO ASSIST REDO/UNDO
    }
    //Handles moving up of Item from the list
    handleMovingUpItem = () => {
        console.log("Moving Item Up");
        let listItem = this.props.toDoListItem;
        // this.props.loadToDoListCallback(this.props.toDoList);
        this.props.moveItemUpCallback(listItem.id);
        
        
        //IMPLEMENTATION NEEDED TO ASSIST REDO/UNDO
    }
    //Handles moving down of Item from the list
    handleMovingDownItem = () => {
        console.log("Moving Item Down");
        let listItem = this.props.toDoListItem;
        // this.props.loadToDoListCallback(this.props.toDoList);
        this.props.moveItemDownCallback(listItem.id);
        
        
        //IMPLEMENTATION NEEDED TO ASSIST REDO/UNDO
    }
    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem render");
        let listItem = this.props.toDoListItem;
        let statusType = "status-complete";
        if (listItem.status === "incomplete")
            statusType = "status-incomplete";
        console.log("Description: " + listItem.description + " Due-Date: " + listItem.due_date + " Status: " + listItem.status);

        return (
            //This is the main toDoList item; contains all smaller components
            //task-col should be made editable as a text field when clicked on
            //due-date-col should open up a calendar input when clicked on
            //status-col should open up a dropdown input when clicked on
            //test-4-col appears to be padding - don't do anything to it
            //list-controls-col contains all the buttons for specific functions for the particular Item
            <div id={'todo-list-item-' + listItem.id} className='list-item-card'>
                <div id={'todo-list-task-' + listItem.id} className='item-col task-col' onClick={this.handleTaskChange}>
                    {listItem.description}
                </div>
                <div id={'todo-list-due-date-' + listItem.id} className='item-col due-date-col' onClick={this.handleDueDateChange}>
                    {listItem.due_date}
                </div>
                <div id={'todo-list-status-' + listItem.id} className='item-col status-col' className={statusType} onClick={this.handleStatusChange}>
                    {listItem.status}
                </div>
                <div className='item-col test-4-col'></div>
                <div className='item-col list-controls-col'>
                    <KeyboardArrowUp id={'move-down-button-'+listItem.id} className='list-item-control todo-button' onClick={this.handleMovingUpItem}/>
                    <KeyboardArrowDown id={'move-up-button-'+listItem.id} className='list-item-control todo-button' onClick={this.handleMovingDownItem}/>
                    <Close id={'close-button-'+listItem.id} className='list-item-control todo-button' onClick={this.handleRemoveItem}/>
                    <div className='list-item-control'></div>
        <div className='list-item-control'></div>
                </div>
            </div>
        )
    }

}

export default ToDoItem;