import { Component } from 'react'

import React from 'react'

export class TransferFund extends Component {
    state = {
        amount: 0,
        msg: ''
    }

    handleChange = ({ target }) => {
        this.setState({ amount: +target.value })
    }

    onTransfer = (ev) => {
        this.props.onTransferFund(this.state.amount, this.props.contact)
    }

    render() {
        const amount = this.state
        const { contact, userCoins } = this.props
        return (
            <section className='transfer-fund'>
                <h3>Transfer coins to {contact.name}</h3>
                <label htmlFor="amount">
                    Amount: <input type="number" min="0" id='amount' name='amount' max={userCoins}
                        onChange={this.handleChange} step="1" onWheel={() => {}}/>
                    {/* <input type="range" min="0" max="100" value={amount} id="myRange"/> */}
                </label>

                {/* <svg id='progress' percent='75' viewport='0 0 140 140'>
                    <circle cx='70' cy='70' r='64'></circle>
                    <circle cx='70' cy='70' r='64'></circle>
                </svg>
                <div>
                    <input id='number' max='100' min='0' onTouchStart={() => {}} placeholder='75' 
                    type='number' onChange={this.handleChange}/>
                        <span>%</span>
                </div> */}
                <button onClick={() => this.props.onTransferFund(this.state.amount, this.props.contact)}>Transfer</button>
            </section >
        )
    }
}

