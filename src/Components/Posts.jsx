import { useState, useEffect } from 'react';
import { getAll } from '../utils';
import Post from './Post';
import axios from 'axios';

const postsUrl = 'https://jsonplaceholder.typicode.com/posts';


const Posts = ({userId}) => {

  const [posts, setPosts] = useState([]);
  const [newPost, setnewPost] = useState({
    "userId": 1,
    "id": 1,
    "title": "",
    "body": ""
  });
  const [VisiblePosts, setVisiblePosts] = useState(false);
  const [VisibleAddNewPost, setVisibleAddNewPost] = useState(false);



  useEffect(() => {
    const fetchData = async () => {
      const { data : userPosts } = await getAll( `${postsUrl}?userId=${userId}`);
      setPosts(userPosts);
      
      if(userId == null)
      {
        setVisiblePosts(false);
      }
      else
      {
        setVisiblePosts(true);
      }    
    };
    fetchData();
  }, [userId]);


  const addPost = async () => {
    setnewPost({...newPost, userId: userId})
    setVisibleAddNewPost(!VisibleAddNewPost);
    const { data } = await axios.post(postsUrl, newPost);
    console.log(data); 
  }


  return (
    <>
    <div style={{ visibility: VisiblePosts ? "visible" : "collapse"}}>
      {VisiblePosts && !VisibleAddNewPost ? "Post" : "New Post"} - User {userId}
      <button onClick={() => setVisibleAddNewPost(!VisibleAddNewPost)} style={{visibility: VisiblePosts && !VisibleAddNewPost ? "visible" : "collapse"}}>Add</button>
      <div style={{ border: "2px solid black", height: "400px", width: "330px", overflow: "scroll"}}>
      <table style={{visibility: VisibleAddNewPost ? "visible" : "collapse"}}>
          <tbody>
            <tr>
              <td>Title:</td>
              <td><input defaultValue={""} onInput={(e) => setnewPost({...newPost, title: e.target.value})}></input></td>
            </tr>
            <tr>
              <td>Body:</td>
              <td><input defaultValue={""} onInput={(e) => setnewPost({...newPost, body: e.target.value})}></input></td>
            </tr>
          </tbody>
        </table>
        <button onClick={() => setVisibleAddNewPost(!VisibleAddNewPost)} style={{visibility: VisibleAddNewPost ? "visible" : "collapse"}}>Cancel</button>
        <button onClick={addPost} style={{visibility: VisibleAddNewPost ? "visible" : "collapse"}}>Add</button>

      { 
        posts.map((post) => {
                         
          return <Post key={post.id} post={post} VisibleAddNewPost={VisibleAddNewPost}/>  

        })}
      </div>
    </div>
    </>
  );
};

export default Posts;