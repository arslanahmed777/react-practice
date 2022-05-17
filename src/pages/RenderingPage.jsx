import React, { Component } from 'react'
import Rendering from '../components/Rendering/Rendering'




export default class RenderingPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "arslan",
            age: 12,
        }
    }


    handleClick = () => {
        this.setState((prevstate) => {
            return {
                ...prevstate,
                name: "amir khan"
            }
        });
    };

    handleClickAge = () => {
        this.setState((prevstate) => {
            return {
                ...prevstate,
                age: prevstate.age + 1,
            };
        });
    };

    render() {
        return (
            <div>
                <button onClick={this.handleClick} > click me </button>
                <button onClick={this.handleClickAge} > click to changeage </button>
                <Rendering name={this.state.name} age={this.state.age} />
            </div>
        )
    }
}

