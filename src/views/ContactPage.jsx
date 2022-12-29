import { useEffect , useCallback } from 'react'

import { contactService } from '../services/contact.service'

import { ContactList } from '../cmps/ContactList'
import { ContactDetails } from './ContactDetails'
import { useDispatch, useSelector } from 'react-redux'
import { loadContacts, removeContact, setFilterBy } from '../store/actions/contact.actions'
import { loadLoggedInUser } from '../store/actions/user.actions'

export const ContactPage = (props) => {

    const dispatch = useDispatch()
    const contacts = useSelector(state => state.contactModule.contacts)
    const filterBy = useSelector(state => state.contactModule.filterBy)

    useEffect(() => {
        dispatch(loadContacts())
    }, [])

    // state = {
    //     contacts: null,
    //     filterBy: {
    //         term: ''
    //     }
    // }
    // componentDidMount() {
    //     this.loadContacts()
    // }

    // loadContacts = async () => {
    //     try {
    //         const contacts = await contactService.getContacts(this.state.filterBy)
    //         // console.log(contacts);
    //         this.setState({ contacts })
    //     }
    //     catch (err) {
    //         console.log('Error in loading contacts', err);
    //     }
    // }

    const onChangeFilter = (filterBy) => {
        dispatch(setFilterBy(filterBy))
        dispatch(loadContacts())
    }

    const onRemoveContact = useCallback(async (contactId) => {
        try {
            dispatch(removeContact(contactId))
        } catch (err) {
            console.log('err:', err)
        }
    }, [])

    // const onRemoveContact = async (contactId) => {
    //     try {
    //         const contacts = await contactService.deleteContact(contactId)
    //         this.setState({ contacts })
    //     }
    //     catch (err) {
    //         console.log("Failed in deleting contact", err);
    //     }
    // }

    if (!contacts) return <div>Loading...</div>
    return (
        <ContactList contacts={contacts} filterBy={filterBy} onChangeFilter={onChangeFilter}
            onRemoveContact={onRemoveContact} />
    )
}
