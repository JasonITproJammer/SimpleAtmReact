import React, { Component } from 'react';

function AtmSubmitButton(props) {
    function submitAction() {
        console.log("submitAction = " + props.category);
        if (props.category === "B") {
            //https://www.youtube.com/watch?v=-N7auOijZts
        }
    }

    return (
        <div className="pt-2 pb-2">
            <button id="btnSubmit" className="btn btn-primary" onClick={submitAction}>Submit</button>
        </div>
    );
}

function AtmDenomsSelect() {
    return (
        <div>
            <select multiple size="6" id="ddlDenoms" className="form-control w-100 h-100"
                data-toggle="tooltip" data-placement="right"
                title="Hold CTRL to select more than one">
                <option value="100">$100</option>
                <option value="50">$50</option>
                <option value="20">$20</option>
                <option value="10">$10</option>
                <option value="5">$5</option>
                <option value="1">$1</option>
            </select>
        </div>
    );
}

function AtmWithdraw() {
    return (
        <div>
            <input type="text" className="form-control text-center w-100" id="numWithdraw" />
        </div>
    );
}

function AtmActionSelect(props) {
    return (
        <div>
            <select id="ddlAtmAction" className="form-control"
                value={props.category} onChange={props.handleChange}>
                <option id="optSelect" value="S">Select...</option>
                <option id="optBalance" value="B">Check Balance</option>
                <option id="optDenomBalance" value="I">Check Denomination(s) Balance</option>
                <option id="optWithdraw" value="W">Withdraw</option>
                <option id="optRestock" value="R">Restock Machine</option>
            </select>
        </div>
    );
}

export class AtmAction extends Component {
    static displayName = AtmAction.name;

    constructor() {
        super();
        this.state = {
            category: 'S'
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ category: event.target.value });
    }

    render() {
        if (this.state.category === "W") {
            return (
                <div>
                    <AtmActionSelect category={this.state.category} handleChange={this.handleChange} />
                    <AtmWithdraw />
                    <AtmSubmitButton category={this.state.category} />
                </div>
            );
        }
        else if (this.state.category === "I") {
            return (
                <div>
                    <AtmActionSelect category={this.state.category} handleChange={this.handleChange} />
                    <AtmDenomsSelect />
                    <AtmSubmitButton category={this.state.category} />
                </div>
            );
        }
        else {
            return (
                <div>
                    <AtmActionSelect category={this.state.category} handleChange={this.handleChange} />
                    <AtmSubmitButton category={this.state.category} />
                </div>
            );
        }
    }
}