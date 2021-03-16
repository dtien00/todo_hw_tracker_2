// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

class ListLink extends Component {
    constructor(props) {
        super(props);
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " did mount");
    }

    handleLoadList = () => {
        this.props.loadToDoListCallback(this.props.toDoList);
    }

    allowEdit = (toDoListID) => {
        console.log("AOIALSL REACHED");
        let listElement = document.getElementById('todo-list-button-'+toDoListID);
        listElement.addEventListener("keyup", function(event) {
            // Number 13 is the "Enter" key on the keyboard
            if (event.keyCode === 13) {
              // Cancel the default action, if needed
              listElement.blur();
            }
          });
        listElement.onblur = () => {
            console.log("BLUIRRED");
            listElement.innerHTML.trim();
            listElement.contentEditable = false;
        }
        
        listElement.contentEditable = true;
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink render");

        return (
            <div 
                id={'todo-list-button-'+this.props.toDoList.id}
                className='todo-list-button'
                onClick={this.handleLoadList}
                // onDoubleClick={this.allowEdit(this.props.toDoList.id)}
            >
                {this.props.toDoList.name}<br />
            </div>
        )
    }
}

export default ListLink;