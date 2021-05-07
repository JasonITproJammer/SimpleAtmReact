import React, { Component } from 'react';

function ErrorMessage(props) {
    return (
        <div className="alert alert-danger">
            {props.errMessage}
        </div>
    );
}

export class AtmBalance extends Component {
    static displayName = AtmBalance.name;

    constructor(props) {
        super(props);
        this.state = {
            balances: [],
            loading: true,
            errMsg: '',
            isError: false
        };
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
        let errorMessage = this.state.isError
            ? <ErrorMessage errMessage={this.state.errMsg} />
            : '';

        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : AtmBalance.renderBalanceTable(this.state.balances);

        return (
            <div>
                {errorMessage}
                {contents}
            </div>
        );
    }

    async getCurrentBalance() {
        const response = await fetch('atm/currentbalance');
        if (response.ok) {
            const data = await response.json();
            this.setState({ balances: data, loading: false, isError: false });
        }
        else {
            const err = await response.json();
            this.setState({ balances: [], loading: false, isError: true, errMsg: err.errMessage });
        }
    }

    async getDenominationBalance() {
        const encodedValue = encodeURIComponent(this.props.selectedOptions);
        const response = await fetch('atm/denominationbalance?denoms=' + encodedValue);
        if (response.ok) {
            const data = await response.json();
            this.setState({ balances: data, loading: false, isError: false });
        }
        else {
            const err = await response.json();
            this.setState({ balances: [], loading: false, isError: true, errMsg: err.errMessage });
        }
    }

    async postWithdraw() {
        const encodedValue = encodeURIComponent(this.props.withdrawalAmount);
        const response = await fetch('atm/Withdraw?withdrawalAmount=' + encodedValue, { method: 'POST' });
        if (response.ok) {
            const data = await response.json();
            this.setState({ balances: data, loading: false, isError: false });
        }
        else {
            const err = await response.json();
            this.setState({ balances: [], loading: false, isError: true, errMsg: err.errMessage });
        }
    }

    async postRestock() {
        const response = await fetch('atm/Restock', { method: 'POST' });
        if (response.ok) {
            const data = await response.json();
            this.setState({ balances: data, loading: false, isError: false });
        }
        else {
            const err = await response.json();
            this.setState({ balances: [], loading: false, isError: true, errMsg: err.errMessage });
        }
    }
}