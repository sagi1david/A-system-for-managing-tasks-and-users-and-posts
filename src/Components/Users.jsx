import { useEffect, useState } from "react";
import { getAll } from "../utils";
import User from "./User";
import axios from "axios";

const usersUrl = "https://jsonplaceholder.typicode.com/users";

function Users(props) {
  const [users, setUsers] = useState([]);
  const [string, setString] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
  });
  const [visibleAddNewUser, setVisibleAddNewUser] = useState(false);
  const [isClicked, setIsClicked] = useState(-1);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: users } = await getAll(usersUrl);
      setUsers(users);
    };
    fetchData();
  }, [users]);

  const sendId = (newId) => {
    props.sendId(newId);
  };

  const addUser = () => {
    setIsPressed(false);
    setIsClicked(-1);
    props.sendId(null);
    setVisibleAddNewUser(true);
  };

  const addNewUser = async () => {
    setNewUser({ newUser });
    props.sendId(null);
    setVisibleAddNewUser(false);
    const { data } = await axios.post(usersUrl, newUser);
    console.log(data);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div
        style={{
          border: "2px solid black",
          width: 450,
          borderRadius: "70px",
          textAlign: "center",
        }}
      >
        <br />
        Search <input type="text" onInput={(e) => setString(e.target.value)} />
        <button onClick={addUser}>Add</button>
        <br />
        <br />
        {users
          .filter(
            (user) => user.name.includes(string) || user.email.includes(string)
          )
          .map((user) => {
            return (
              <User
                isPressed={isPressed}
                isPressedCallback={setIsPressed}
                isClicked={isClicked}
                isClickedCallback={setIsClicked}
                key={user.id}
                user={user}
                sizeArr={users.length}
                sendId={sendId}
              />
            );
          })}
        <br />
      </div>

      <div
        style={{
          visibility:
            visibleAddNewUser && isClicked === -1 ? "visible" : "collapse",
        }}
      >
        Add New User
        <div
          style={{ border: "2px solid black", height: "400px", width: "330px" }}
        >
          <table>
            <tbody>
              <tr>
                <td>Name:</td>
                <td>
                  <input
                    type="text"
                    defaultValue={""}
                    onInput={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                  ></input>
                </td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>
                  <input
                    type="email"
                    defaultValue={""}
                    onInput={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                  ></input>
                </td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => setVisibleAddNewUser(!visibleAddNewUser)}>
            Cancel
          </button>
          <button onClick={addNewUser}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default Users;
