
const INITIAL_STATE = {
    loggedInUser: null,
    users: null
}

export function userReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SPEND_BALANCE':
            const { loggedInUser } = state
            return {
                ...state,
                loggedInUser: { ...loggedInUser, balance: loggedInUser.balance - action.amount }
            }

        case 'SET_LOGGED_IN_USER':
            return {
                ...state,
                loggedInUser: { ...action.loggedInUser }
            }

        case 'ADD_MOVE':
            return {
                ...state,
                loggedInUser: { ...action.loggedInUser }
            }

        default:
            return state;
    }

}