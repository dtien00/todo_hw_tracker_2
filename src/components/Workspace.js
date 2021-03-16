// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import ToDoItem from './ToDoItem'
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import AddBox from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';

class Workspace extends Component {
    constructor(props) {
        super(props);
    }
    removeSpecificItem = (itemID) => {
        this.props.removeListItemCallback(itemID);
    }
    moveSpecificItemUp = (itemID) => {
        this.props.moveListItemUpCallback(itemID);
    }
    moveSpecificItemDown = (itemID) => {
        this.props.moveListItemDownCallback(itemID);
    }
    changeSpecificItemTask = (itemID) => {
        this.props.handleSpecificTaskChangeCallback(itemID);
    }
    changeSpecificItemStatus = (itemID) => {
        this.props.handleSpecificStatusChangeCallback(itemID);
    }
    changeSpecificItemDueDate = (itemID) => {
        this.props.handleSpecificDueDateChangeCallback(itemID);
    }
    closeListCallback = () => {
        console.log("CLEARING LIST VIEW");
        let workspace = document.getElementById("workspace");
        let toDoItems = document.getElementById("todo-list-items-div");
        toDoItems.style.visibility = "hidden";
    }

    
    // deleteListItemCallback = () => {
    //     console.log("DELETING LIST CURRENT ITEM");
    // }

    render() {
        return (
            <div id="workspace">
                <div id="todo-list-header-card" className="list-item-card-head">
                    <div id="task-col-header" className="item-col todo-button">Task</div>
                    <div id="date-col-header" className="item-col todo-button">Due Date</div>
                    <div id="status-col-header" className="item-col todo-button">Status</div>
                    <div className="item-col button-group" display="flex" flexDirection="row" flexWrap="nowrap">
                        <Undo id="undo-button" className="list-item-control material-icons todo-button" onClick={this.props.undoTransactionCallback}/>
                        <Redo id="redo-button" className="list-item-control material-icons todo-button" onClick={this.props.redoTransactionCallback}/>
                        <AddBox id="add-item-button" className="list-item-control material-icons todo-button" onClick={this.props.addNewListItemCallback}/>
                        <Delete id="delete-list-button" className="list-item-control material-icons todo-button" onClick={this.props.deleteListItemCallback}/>
                        <Close id="close-list-button" className="list-item-control material-icons todo-button" onClick={this.closeListCallback}/>
                    </div>
                </div>
                <div id="todo-list-items-div">
                    {
                        this.props.toDoListItems.map((toDoListItem) => (
                        <ToDoItem
                            key={toDoListItem.id}
                            toDoListItem={toDoListItem}     // PASS THE ITEM TO THE CHILDREN
                            removeItemCallback={this.removeSpecificItem}
                            moveItemUpCallback={this.moveSpecificItemUp}
                            moveItemDownCallback={this.moveSpecificItemDown}
                            handleTaskChangeCallback={this.changeSpecificItemTask}
                            handleStatusChangeCallback={this.changeSpecificItemStatus}
                            handleDueDateChangeCallback={this.changeSpecificItemDueDate}
                        />))
                    }
                </div>
                <br />
            </div>
        );
    }
}

export default Workspace;