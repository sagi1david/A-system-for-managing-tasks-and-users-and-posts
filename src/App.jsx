import Users from './Components/Users';
import Todos from './Components/Todos';
import Posts from './Components/Posts';
import { useState } from 'react';


function App() {

  const [userId, setUserId] = useState();
  
  const sendId = (newId) => {
    setUserId(newId)
  }

  
  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
      
      <div>
        <Users sendId={sendId}/>
      </div>
      
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Todos userId={userId}/>
        <br/>
        <Posts userId={userId}/>
      </div>

    </div>
  );
}

export default App;