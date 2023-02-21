import React, { Component } from 'react';
import axios from 'axios';

export default class EditExercise extends Component {
  constructor(props) {
    super(props);     //always call super when defining the constructor of a subclass
    
    //'this' in console log will be undefined, we want this to refer to this class, so we bind
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {            //state is always how you create variables in react
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }
  }
  //right before anything loads, react is going to run this method
  componentDidMount(){       //This is react's life cycle method that react automatically call at different points
    console.log("edit-exercise DidMount?")
    console.log(this.props.match.params.id);
    axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length>0){
          this.setState({
            users: response.data.map(user => user.username)
          })
        }
      })
  }


  onChangeUsername(e) {
    this.setState({
      username: e.target.value          //yaha target textbox hai, uski jaakr value change krni hai
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();  //ye normal HTML form submit behaviour ko prevent krta hai

    console.log(e);
    // return;

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      
    }
    console.log(exercise);

    axios.post('http://localhost:5000/exercises/update/'+this.props.match.params.id,exercise)
      .then(res => console.log(res.data));

    window.location = '/';  //we will take the person back to home page(list of exercises)
  }

  render() {
    return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={this.onSubmit}>

        <div className="form-group"> 
          <label>Username: </label>
          <select
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) { //.map allows us to return something for each element in an array
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>

        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>

        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
    

        <div className="form-group">
          <br/>
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
        
      </form>
    </div>
    )
  }
}