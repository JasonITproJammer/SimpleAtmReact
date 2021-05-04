import React, { Component } from 'react';

export class AtmSubmit extends Component {
    static displayName = AtmSubmit.name;

    render() {
        return (
            <div className="pt-2 pb-2">
                <button id="btnSubmit" className="btn btn-primary">Submit</button>
            </div>
        );
    }
}