import React, { Component } from "react";
import axios from "axios";
import Posts from "../Posts";

class Users extends Component {
  constructor(props) {
    super(props);
    this.patientModel = {
      id: 0,
      accountNum: "arslan",
      IsAPIAccess: false,
      isPhrUser: true,
    };
    this.state = {
      users: [],
      selectedUser: "",
      patientModel: this.patientModel,
    };
  }
  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/users").then((result) => {
      this.setState({ users: result.data, selectedUser: result.data[0] });
    });
  }
  componentDidUpdate(pP, pS, sS) {}
  changeSelectedUser = (user) => {
    console.log(user);
    this.setState({
      selectedUser: user,
    });
  };

  toggleAPIAccess = () => {
    const isPhrUser = this.state.patientModel.isPhrUser;
    if (isPhrUser) {
      this.setState({
        patientModel: {
          ...this.state.patientModel,
          IsAPIAccess: true,
        },
      });
    } else {
      this.setState({
        patientModel: {
          IsAPIAccess: false,
        },
      });
    }
  };

  render() {
    const { users, selectedUser } = this.state;
    return (
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          {users.length == 0 ? (
            <h1>Loading.....</h1>
          ) : (
            users.map((user) => {
              return (
                <h1 key={user.id} onClick={() => this.changeSelectedUser(user)}>
                  {user.name}{" "}
                </h1>
              );
            })
          )}
        </div>
        <div style={{ width: "50%" }}>
          <h1>Selected users</h1>
          <button onClick={this.toggleAPIAccess}>toggleapi</button>

          {selectedUser && <Posts user={selectedUser} />}
        </div>
      </div>
    );
  }
}

export default Users;
