import { useEffect, useState } from "react";
import axios from "axios";

const usersUrl = "https://jsonplaceholder.typicode.com/users";
const todosUrl = "https://jsonplaceholder.typicode.com/todos";

function User(props) {
  const [VisibleOtherData, setVisibleOtherData] = useState(true);
  const [todos, setTodos] = useState([]);
  const [isCompleted, setIsCompleted] = useState(true);
  const [user, setUser] = useState(props.user);

  useEffect(() => {
    const fetchData = async () => {
      const { data: userTodos } = await axios.get(
        `${todosUrl}?userId=${props.user.id}`
      );
      setTodos(userTodos);

      todos.map((todo) => (todo.completed ? null : setIsCompleted(false)));
    };
    fetchData();
  }, [todos]);

  const updateUser = async () => {
    const { data } = await axios.put(`${usersUrl}/${props.user.id}`, user);
    console.log(data);
  };

  const deleteUser = async () => {
    const { data } = await axios.delete(`${usersUrl}/${props.user.id}`);
    console.log(data);
  };

  const sendId = () => {
    props.isClickedCallback(props.user.id);

    if (props.isPressed && props.isClicked === props.user.id) {
      props.isPressedCallback(false);
      props.sendId(null);
    } else {
      props.isPressedCallback(true);
      props.sendId(props.user.id);
    }
  };

  return (
    <div>
      <div
        style={{
          border: isCompleted ? "2px solid green" : "2px solid red",
          background:
            props.isClicked === props.user.id && props.isPressed
              ? "orange"
              : null,
          width: 430,
          textAlign: "left",
          margin: "auto",
        }}
      >
        <table style={{ width: "630px" }}>
          <tbody>
            <tr>
              <td onClick={sendId}>ID:</td>
              <td>{props.user.id}</td>
            </tr>
            <tr>
              <td>Name:</td>
              <td>
                <input
                  type="text"
                  onInput={(e) => setUser({ ...user, name: e.target.value })}
                  defaultValue={props.user.name}
                />
              </td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>
                <input
                  type="email"
                  onInput={(e) => setUser({ ...user, email: e.target.value })}
                  defaultValue={props.user.email}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <button
          onMouseOver={() => setVisibleOtherData(false)}
          onClick={() => setVisibleOtherData(true)}
        >
          Other Data
        </button>

        <table
          style={{
            visibility: VisibleOtherData ? "collapse" : "visible",
            border: "2px solid black",
            width: "400px",
            height: "150px",
            backgroundColor: "beige",
            borderRadius: "30px",
            margin: "auto",
          }}
        >
          <tbody>
            <tr>
              <td>Street:</td>
              <td>
                <input
                  type="text"
                  onInput={(e) => setUser({ ...user, street: e.target.value })}
                  defaultValue={props.user.address.street}
                />
              </td>
            </tr>
            <tr>
              <td>City:</td>
              <td>
                {" "}
                <input
                  type="text"
                  onInput={(e) => setUser({ ...user, city: e.target.value })}
                  defaultValue={props.user.address.city}
                />
              </td>
            </tr>
            <tr>
              <td>Zip Code:</td>
              <td>
                {" "}
                <input
                  type="text"
                  onInput={(e) => setUser({ ...user, zipcode: e.target.value })}
                  defaultValue={props.user.address.zipcode}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <button onClick={updateUser}>Update</button>
        <button onClick={deleteUser}>Delete</button>
      </div>

      <br />
    </div>
  );
}

export default User;
