function Post(props) {
  
    return (
      <>
          <table style={{ visibility: !props.VisibleAddNewPost ? "visible" : "collapse", border: "2px solid purple"}}>
            <tbody>
              <tr>
                <td>Title:</td>
                <td>{props.post.title}</td>
              </tr>
              <tr>
                <td>Body:</td>
                <td>{props.post.body}</td>
              </tr>
            </tbody>
          </table> 
          <br/>        
      </>
    );
  }
  
  export default Post