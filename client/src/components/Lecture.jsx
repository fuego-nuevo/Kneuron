// import React, { Component } from 'react';

// class Lecture extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       name: ''
//     };
//   }

//   componentDidMount(){
//     this.grabTopics();
//   }

//   async grabTopics(){
//     try{
//       const topics = await axios.get('/api/topics/${localStorage.getItem('id_token')}');
//       console.log("Grabbed the topics: ", topics);
//       this.setState({ topics: topics.data });
//     } catch(error) {
//       console.log("Error retrieving topics!");
//     }
//   }

//   render(){
//     return(
//       <div>
//         <p>In The Lecture Component!!!</p>
//       </div>
//     );
//   }
// }


// export default Lecture;
