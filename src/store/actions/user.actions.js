import { userService } from "../../services/user.service"

export function spendBalance(amount) {
    return async (dispatch) => {
        dispatch({ type: 'SPEND_BALANCE', amount })
    }
}

export function loadLoggedInUser() {

    return async (dispatch) => {
        try {
            const loggedInUser = await userService.getLoggedInUser()
            dispatch({ type: 'SET_LOGGED_IN_USER', loggedInUser })
            return loggedInUser
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function addMove(contact, amount) {

    return async (dispatch) => {
        try {
            const user = userService.addMove(contact, amount)
            dispatch({ type: 'ADD_MOVE', user: userService.getLoggedInUser() })
        } catch (err) {
            console.log('err:', err)
        }
    }
}