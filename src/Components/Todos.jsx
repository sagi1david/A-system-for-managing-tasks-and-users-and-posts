import { useEffect, useState } from 'react';
import { getAll } from '../utils';
import axios from 'axios';
import Todo from './Todo';


const todosUrl = 'https://jsonplaceholder.typicode.com/todos';


function Todos({ userId }) {

  const [todos, setTodos] = useState([]);
  const [newTodo, setnewTodo] = useState({
    "userId": 1,
    "id": 1,
    "title": "",
    "completed": true
  });
  const [Visibletodos, setVisibletodos] = useState(false);
  const [VisibleAddNewTodo, setVisibleAddNewTodo] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const { data : userTodos } = await getAll( `${todosUrl}?userId=${userId}`);
      setTodos(userTodos);
      console.log(userTodos);
      if(userId == null)
      {
        setVisibletodos(false);
      }
      else
      {
        setVisibletodos(true);
      }
    };
    fetchData();
  }, [userId]);
  
  const addTodo = async () => {
    setnewTodo({...newTodo, userId: userId})
    setVisibleAddNewTodo(!VisibleAddNewTodo);
    const { data } = await axios.post(todosUrl, newTodo);
    console.log(data);  
  };

  
  return (
    <div style={{ visibility: Visibletodos ? "visible" : "collapse"}}>
      {Visibletodos && !VisibleAddNewTodo ? "Todo" : "New Todo"} - User {userId}
      <button onClick={() => setVisibleAddNewTodo(!VisibleAddNewTodo)} style={{visibility: Visibletodos && !VisibleAddNewTodo ? "visible" : "collapse"}}>Add</button>
      <div style={{ border: "2px solid black" ,height: "400px", width: "330px", overflow: "scroll"}}>
      <table style={{visibility: VisibleAddNewTodo ? "visible" : "collapse"}}>
          <tbody>
            <tr>
              <td>Title:</td>
              <td><input defaultValue={""} onInput={(e) => setnewTodo({...newTodo, title: e.target.value})}></input></td>
            </tr>
          </tbody>
        </table>
        <button onClick={() => setVisibleAddNewTodo(!VisibleAddNewTodo)} style={{visibility: VisibleAddNewTodo ? "visible" : "collapse"}}>Cancel</button>
        <button onClick={addTodo} style={{visibility: VisibleAddNewTodo ? "visible" : "collapse"}}>Add</button>

        {
          todos.map((todo) => {
         
            return <Todo key={todo.id} todo={todo} VisibleAddNewTodo={VisibleAddNewTodo}/>  
          
          })}
          
        <br/>
      </div>
    </div>
  );
}

export default Todos;