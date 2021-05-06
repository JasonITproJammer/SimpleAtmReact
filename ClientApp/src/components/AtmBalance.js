import React, { Component } from 'react';

export class AtmBalance extends Component {
    static displayName = AtmBalance.name;

    constructor(props) {
        super(props);
        this.state = { balances: [], loading: true };
    }

    componentDidMount() {
        if (this.props.category === "I") {
            this.getDenominationBalance();
        }
        else if (this.props.category === "W") {
            this.postWithdraw();
        }
        else if (this.props.category === "R") {
            this.postRestock();
        }
        else {
            this.getCurrentBalance();
        }
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

    async getDenominationBalance() {
        const encodedValue = encodeURIComponent(this.props.selectedOptions);
        const response = await fetch('atm/denominationbalance?denoms=' + encodedValue);
        const data = await response.json();
        this.setState({ balances: data, loading: false });
    }

    async postWithdraw() {
        const encodedValue = encodeURIComponent(this.props.withdrawalAmount);
        const response = await fetch('atm/Withdraw?withdrawalAmount=' + encodedValue, { method: 'POST' });
        const data = await response.json();
        this.setState({ balances: data, loading: false });
    }

    async postRestock() {
        const response = await fetch('atm/Restock', { method: 'POST' });
        const data = await response.json();
        this.setState({ balances: data, loading: false });
    }
}