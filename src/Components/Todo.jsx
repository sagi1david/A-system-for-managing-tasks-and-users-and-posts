import axios from "axios";
import { useState } from "react";

const todosUrl = 'https://jsonplaceholder.typicode.com/todos';


function Todo(props) {

  const [todo, setTodo] = useState(props.todo)

  const markCompleted = async () => {
    setTodo({...todo, completed: true})
    const { data } = await axios.put(`${todosUrl}/${props.todo.id}`, todo);
    console.log(data);
  };
  
    return (
      <>
      <br/>
          <table style={{ visibility: !props.VisibleAddNewTodo ? "visible" : "collapse", border: "2px solid purple" ,  width: "300px" ,  textAlign: "left" , margin: "auto"}}>
            <tbody>
            <tr>
            <td>Title:</td>
            <td>{props.todo.title}</td>
          </tr>
          <tr >
            <td>Completed:</td>
            <td>
              {props.todo.completed ? "True" : "False"} 
              {!props.todo.completed ? <button onClick={markCompleted}>Mark Completed</button> : null}
            </td>
          </tr>
          </tbody>
          </table>         
      </>
    );
  }
  
  export default Todo