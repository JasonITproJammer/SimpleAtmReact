﻿import React, { Component } from 'react';
import { AtmAction } from './AtmAction';
import { AtmSubmit } from './AtmSubmit';
import { AtmBalance } from './AtmBalance';

export class ATM extends Component {
    static displayName = ATM.name;

    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <AtmAction />
                    <AtmSubmit />
                </div>
                <div className="col-md-6">
                    <AtmBalance />
                </div>
            </div>
        );
    }
}