import React from 'react';

import logo from "./org-logo.jpg";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import REACTDOM from "react-dom";

  
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      list: []
    };
  }

  
  updateInput(key, value) {
    this.setState({ [key]: value });
  }

  
  addItem() {
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice()
      
    };
    const list = [...this.state.list];
    list.push(newItem);
    this.setState({
      list,
      newItem: ""
    });
  localStorage.setItem("Name", JSON.stringify(list));
}

  deleteItem(id) {
    const list = [...this.state.list];
    const updatedList = list.filter(item => item.id !== id);
    this.setState({ list: updatedList });
    localStorage.setItem("Name", JSON.stringify(updatedList));
  }

  hydrateStateWithLocalStorage(){
    for(let key in this.state){
      if (localStorage.hasOwnProperty(key)){
        let value = localStorage.getItemkey();
        try{
          value = JSON.parse(value);
          this.setState({[key]: value});
        }catch(e){
          this.setState({[key]: value});
        }
        }
      }
    }
  
    componentDidMount(){
      this.hydrateStateWithLocalStorage();

      window.addEventListener(
        "beforeunload", this.saveStateToLocalStorage.bind(this)
      );
    }

    componentWillUnmount(){
      window.removeEventListener("beforeunload", 
      this.saveStateToLocalStorage.bind(this)
      );
      this.saveStateToLocalStorage();
    }

    saveStateToLocalStorage(){
      for (let key in this.state){
        localStorage.setItem(key, JSON.stringify(this.state(key)));
      }
    }

  render() {
    return (
      
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Voter Registration List</h1>
        </header>
        <div
          style={{
            padding: 50,
            textAlign: "left",
            maxWidth: 500,
            margin: "auto"
          }}
        >
          <p>Note: any registered voter will be assigned a unique id number e.g id: 1.02976267823718</p>
         <h2>Enter Your Name On The List To Register</h2> 
          <br />
          <input
            type="text"
            placeholder="Type First and Lastname"
            value={this.state.newItem}
            onChange={e => this.updateInput("newItem", e.target.value)}
          />
          <button
            onClick={() => this.addItem()}
            disabled={!this.state.newItem.length}
          >
            &#43; Submit
          </button>
          <br /> <br />
          <ol>
            {this.state.list.map(item => {
              return (
                <li key={item.id}>
                  {item.value}
                  <button onClick={() => this.deleteItem(item.id)}>
                    Remove
                  </button>
                </li>

                
              );
            })}
          </ol>
        </div>
      </div>

    );    
  }
}

export default App;