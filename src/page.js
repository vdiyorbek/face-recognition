import React, { Component } from 'react'

export default class page extends Component {
    const input=document.getElementById('myid');
    render() {
        return (
            <input type="file" id="myid" />
            <canvas id="mycanvas" />
        )
    }
}
