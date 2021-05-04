import React, { Component } from 'react';

export class AtmAction extends Component {
    static displayName = AtmAction.name;

    render() {
        return (
            <div>
                <select id="ddlAtmAction" className="form-control">
                    <option id="optSelect" value="S">Select...</option>
                    <option id="optBalance" value="B">Check Balance</option>
                    <option id="optDenomBalance" value="I">Check Denomination(s) Balance</option>
                    <option id="optWithdraw" value="W">Withdraw</option>
                    <option id="optRestock" value="R">Restock Machine</option>
                </select>
            </div>
        );
    }
}