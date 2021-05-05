import React, { Component } from 'react';

export class AtmBalance extends Component {
    static displayName = AtmBalance.name;

    constructor(props) {
        super(props);
        this.state = { balances: [], loading: true };
    }

    componentDidMount() {
        this.getCurrentBalance();
    }

    static renderBalanceTable(balances) {
        return (
            <table id="tblBalance" className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Denomination</th>
                        <th scope="col">Bills</th>
                    </tr>
                </thead>
                <tbody>
                    {balances.map(balance =>
                        <tr key={balance.inventoryID}>
                            <td>${balance.denomination}</td>
                            <td>{balance.billQuantity}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : AtmBalance.renderBalanceTable(this.state.balances);

        return (
            <div>
                {contents}
            </div>
        );
    }

    async getCurrentBalance() {
        const response = await fetch('atm/currentbalance');
        const data = await response.json();
        this.setState({ balances: data, loading: false });
    }
}