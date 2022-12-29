import { Component, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { contactService } from '../services/contact.service'
import { updateContact } from '../store/actions/contact.actions'

export const ContactEdit = (props) => {
  const dispatch = useDispatch()
  const [contact, setContact] = useState(contactService.getEmptyContact())
  // state = {
  //   contact: contactService.getEmptyContact()
  // }

  // async componentDidMount() {
  //   const { id: contactId } = this.props.match.params
  //   if (contactId) {
  //     const contact = await contactService.getContactById(contactId)
  //     this.setState({ contact })
  //   }
  // }

  useEffect(() => {
    loadContact()
  }, [])

  const loadContact = async () => {
    const { id: contactId } = props.match.params
    if (contactId) {
      const contact = await contactService.getContactById(contactId)
      setContact(contact)
    }
  }

  const onAddContact = async () => {
    if (!contact.name || !contact.email || !contact.phone) return
    dispatch(updateContact(contact))
    props.history.push('/contact')
  }
  // const onAddContact = async () => {
  //   if (!contact.name || !contact.email || !contact.phone) return
  //   try {
  //     await contactService.saveContact({ ...contact })
  //     props.history.push('/contact')
  //   }
  //   catch (err) {
  //     console.log(`Failed in ${contact._id ? 'update' : 'add'} contact`, err)
  //   }
  // }

  const handleChange = ({ target }) => {
    const field = target.name
    let value = target.value
    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break;
      case 'checkbox':
        value = target.checked
        break
      case 'text':
        value = value.trim()
        break
      default:
        break
    }

    setContact(prevContact => ({ ...prevContact, [field]: value }))
  }


  if (!contact) return <div>Loading...</div>

  const { name, phone, email } = contact
  return (
    <section className='contact-edit'>
      <div className="form">
        <div className="title">
          <span className='fa-solid left-arrow-icon' title='go back' onClick={() => props.history.goBack()}></span>
          <span>{contact._id ? 'Edit' : 'Add'} Contact</span>
        </div>
        <div className="input-container ic1" title='Your name'>
          <input id="name" name="name" className="input" type="text"
            placeholder="Enter name" onChange={handleChange} value={name} />
          <div className="cut cut-short"></div>
          <label htmlFor="name" className="placeholder">Name</label>
        </div>

        <div className="input-container ic2" title='Your phone number'>
          <input id="phone" name="phone" className="input" type="text"
            placeholder="Enter phone number" onChange={handleChange} value={phone} />
          <div className="cut cut-short"></div>
          <label htmlFor="phone" className="placeholder">Phone</label>
        </div>

        <div className="input-container ic2" title='Your email'>
          <input id="email" name="email" className="input" type="text"
            placeholder="Enter email" onChange={handleChange} value={email} />
          <div className="cut cut-short"></div>
          <label htmlFor="email" className="placeholder">Email</label>
        </div>
        <button type="text" className="submit" onClick={onAddContact}>{contact._id ? 'Save' : 'Add'}</button>
      </div>
    </section>
  )
}
