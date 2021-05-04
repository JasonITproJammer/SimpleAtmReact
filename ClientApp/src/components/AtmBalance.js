import React, { Component } from 'react';

export class AtmBalance extends Component {
    static displayName = AtmBalance.name;

    render() {
        return (
            <table id="tblBalance" className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Denomination</th>
                        <th scope="col">Bills</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>$100</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td>$50</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td>$20</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td>$10</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td>$5</td>
                        <td>10</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}