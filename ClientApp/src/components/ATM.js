import React, { Component } from 'react';
import { AtmBalance } from './AtmBalance';

function AtmSubmitButton(props) {
    return (
        <div className="pt-2 pb-2">
            <button id="btnSubmit" className="btn btn-primary" onClick={props.onClick}>Submit</button>
        </div>
    );
}

function AtmDenomsSelect(props) {
    return (
        <div>
            <select id="ddlDenoms" name="selectOptions" className="form-control w-100 h-100" 
                multiple size="6"
                value={props.selectedOptions}
                onChange={props.handleSelectionChange}>
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

function AtmWithdraw(props) {
    return (
        <div>
            <input type="text" className="form-control text-center w-100" id="numWithdraw"
                value={props.withdrawalAmount} onChange={props.handleWithdrawalChange} />
        </div>
    );
}

function AtmSelect(props) {
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

export class ATM extends Component {
    static displayName = ATM.name;

    constructor(props) {
        super(props);
        this.state = {
            category: 'S',
            currentCount: 0,
            selectedOptions: [],
            withdrawalAmount: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
        this.handleWithdrawalChange = this.handleWithdrawalChange.bind(this);
    }

    handleChange(event) {
        this.setState({ category: event.target.value });
    }

    onClick(event) {
        this.setState({ currentCount: this.state.currentCount + 1 });
    }

    handleSelectionChange(e) {
        let selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        this.setState({ selectedOptions: selectedOptions });
    }

    handleWithdrawalChange(e) {
        this.setState({ withdrawalAmount: e.target.value });
    }

    render() {
        if (this.state.category === "W") {
            return (
                <div className="row">
                    <div className="col-md-6">
                        <div>
                            <AtmSelect category={this.state.category} handleChange={this.handleChange} />
                            <AtmWithdraw withdrawalAmount={this.state.withdrawalAmount} handleWithdrawalChange={this.handleWithdrawalChange} />
                            <AtmSubmitButton onClick={this.onClick} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <AtmBalance key={this.state.currentCount} category={this.state.category} withdrawalAmount={this.state.withdrawalAmount} />
                    </div>
                </div>
            );
        }
        else if (this.state.category === "I") {
            return (
                <div className="row">
                    <div className="col-md-6">
                        <div>
                            <AtmSelect category={this.state.category} handleChange={this.handleChange} />
                            <AtmDenomsSelect selectedOptions={this.state.selectedOptions} handleSelectionChange={this.handleSelectionChange}  />
                            <AtmSubmitButton onClick={this.onClick} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <AtmBalance key={this.state.currentCount} category={this.state.category} selectedOptions={this.state.selectedOptions} />
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="row">
                    <div className="col-md-6">
                        <div>
                            <AtmSelect category={this.state.category} handleChange={this.handleChange} />
                            <AtmSubmitButton onClick={this.onClick} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <AtmBalance key={this.state.currentCount} category={this.state.category} />
                    </div>
                </div>
            );
        }
    }
}