import { Component, useCallback, useEffect, useState } from 'react'

import { contactService } from '../services/contact.service'
import { userService } from '../services/user.service'

import { TransferFund } from '../cmps/TransferFund'
import { MoveList } from '../cmps/MoveList'
import { useDispatch, useSelector } from 'react-redux'
import { addMove, loadLoggedInUser } from '../store/actions/user.actions'

export const ContactDetails = (props) => {
    const dispatch = useDispatch()
    const [contact, setContact] = useState(null)
    const user = useSelector(state => state.userModule.loggedInUser)

    let msg = ''

    useEffect(() => {
        loadContact()
        dispatch(loadLoggedInUser())
    }, [props.match.params.id, user?.coins])

    // const onRemoveRobot = useCallback(async (robotId) => {
    //     try {
    //         dispatch(removeRobot(robotId))
    //     } catch (err) {
    //         console.log('err:', err)
    //     }
    // }, [])


    const onTransferFund = (amount, contact) => {
        if (amount > user.coins || amount <= 0) return
        try {
            dispatch(addMove(contact, amount))
            // msg = amount > user.coins ? 'You dont have enough coins...' : 'Amount must be greater than 0!'
        } catch (err) {
            console.log('err:', err)
        }
        // this.setState({ msg }, () => {
        //     setTimeout(() => {
        //         this.setState({ msg: '' })
        //     }, 2000)
        // })
        return
        // }
    }
    // state = {
    //     contact: null,
    //     user: userService.getLoggedInUser(),
    //     moveList: null,
    //     msg: ''
    // }

    // componentDidMount() {
    //     this.loadContact()
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.match.params.id !== this.props.match.params.id) {
    //         this.loadContact()
    //     }
    // }

    const updateMoveList = async () => {
        const moveList = this.state.user.moves.reduce((acc, move) => {
            if (move.to === this.state.contact.name) {
                acc.push({
                    createdAt: move.createdAt,
                    amount: move.amount,
                    id: move.id
                })
            }
            return acc
        }, [])
        this.setState({ moveList })
    }

    const loadContact = async () => {
        const contact = await contactService.getContactById(props.match.params.id)
        setContact(contact)
    }

    const getMoveList = () => {
        if (!user.moves) return []
        return user.moves.reduce((acc, move) => {
            if (move.to === contact.name) {
                acc.push({
                    createdAt: move.createdAt,
                    amount: move.amount,
                    id: move.id
                })
            }
            return acc
        }, [])
    }

    if (!contact) return <div>Loading...</div>
    return (
        <section className="contact-details-container">
            {console.log('hi')}
            <div className='contact-details'>
                <span className='fa-solid left-arrow-icon' title='go back' onClick={() => props.history.goBack()}></span>
                <img src={contact.imgUrl || require('../assets/imgs/contact-preview.png')} alt="" />
                <h4>Name: {contact.name}</h4>
                <h4>Phone: {contact.phone}</h4>
                <h4>Email: {contact.email}</h4>

                <TransferFund contact={contact} userCoins={user.coins} onTransferFund={onTransferFund} />
                <MoveList title={'Your moves:'} moveList={getMoveList()} />
            </div>
            {/* {msg && <p className='err-msg'>{msg}</p>} */}
        </section>
    )
}
