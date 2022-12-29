import { contactService } from './contact.service'
import { storageService } from './storage.service'
import { utilService } from './util.service'

export const userService = { getLoggedInUser, signup, addMove }

const USERS_KEY = 'users'
const LOGGED_IN_USER_KEY = 'loggedInUser'

var gUsers = _loadUsers()

function getLoggedInUser() {
    return storageService.load(LOGGED_IN_USER_KEY)
}

function signup(name) {
    // if (gUsers.find(user => user.name === name)) return
    // console.log(gUsers);
    const user = {
        name,
        coins: 100,
        moves: [],
        _id: utilService.makeId(),
        imgUrl: `https://robohash.org/set_set5/${utilService.getRandomIntInclusive(1, 500)}.png`,
    }
    gUsers.push(user)
    storageService.store(LOGGED_IN_USER_KEY, user)
    storageService.store(USERS_KEY, gUsers)
    return user
}

function addMove(contact, amount) {
    const sendingUser = getLoggedInUser()
    const sendingUserIdx = gUsers.findIndex(user => user._id === sendingUser._id)
    const receivingUserIdx = gUsers.findIndex(user => user.name === contact.name)
    gUsers[sendingUserIdx].coins -= amount
    gUsers[sendingUserIdx].moves.unshift({
        to: contact.name,
        createdAt: Date.now(),
        amount,
        id: utilService.makeId()
    })

    gUsers[receivingUserIdx].coins += amount
    gUsers[receivingUserIdx].moves.unshift({
        to: sendingUser.name,
        createdAt: Date.now(),
        amount,
        id: utilService.makeId()
    })

    storageService.store(USERS_KEY, gUsers)
    storageService.store(LOGGED_IN_USER_KEY, gUsers[sendingUserIdx])

    return gUsers[sendingUserIdx]
}



function _loadUsers() {
    let users = storageService.load(USERS_KEY)
    if (!users || !users.length) {
        users = contactService.getMiniContacts().map(user => {
            user.moves = []
            user.coins = utilService.getRandomIntInclusive(50, 150)
            return user
        })
    }
    storageService.store(USERS_KEY, users)
    return users
}
