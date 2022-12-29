import { Component } from 'react'
import { useEffect, useState } from 'react'

import { userService } from '../services/user.service'
import { bitcoinService } from '../services/bitcoin.service'
import { MoveList } from '../cmps/MoveList'
import { useSelector } from 'react-redux'

export const HomePage = (props) => {

    const [user, setUser] = useState(null)
    const [userBtc, setUserBtc] = useState('')


    // state = {
    //     user: null,
    //     userBtc: '',
    // }

    useEffect(() => {
        const user = userService.getLoggedInUser()
        // if (!user) this.props.history.push('/loginSignup')
        setUser(user)
        bitcoinService.getRate(user.coins).then((userBtc) => {
            setUserBtc(userBtc)
        })
    }, [])

    const loadUser = () => {
        
    }

    // componentDidMount() {
    //     const user = userService.getLoggedInUser()
    //     if (!user) this.props.history.push('/loginSignup')
    //     this.setState({ user: { ...user } }, () => this.setUserBtc())
    // }

    // setUserBtc = async () => {
    //     try {
    //         const userBtc = await bitcoinService.getRate(this.state.user.coins)
    //         this.setState({ userBtc })
    //     }
    //     catch (err) {
    //         console.log('Error in getting BTC currency');
    //     }
    // }

    if (!user || !userBtc) return <div>Loading...</div>

    return (
        <section className='home-page'>
            <h3>Hello {user.name}!</h3>

            <div className='user-coins'>
                <span className='fa-solid money-bag-icon'></span>
                <h5>
                    Coins: {user.coins}
                </h5>
            </div>
            <div className='bitcoin'>
                <span className='fa-brands bitcoin-icon'></span>
                <h5>
                    BTC: {userBtc}
                </h5>
            </div>

            <MoveList title={'Your last 3 moves:'} moveList={user.moves.slice(0, 3)} />


        </section>
    )
}
