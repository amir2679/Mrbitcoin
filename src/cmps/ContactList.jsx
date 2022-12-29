import { Link } from "react-router-dom"

import { ContactPreview } from './ContactPreview'
import { ContactFilter } from './ContactFilter'

export function ContactList({ contacts, filterBy, onChangeFilter, onRemoveContact }) {
  return (
    <section className='contact-list'>
      {/* <input className='search-contacts' type="text" placeholder='Search...' /> */}
      <ContactFilter filterBy={filterBy} onChangeFilter={onChangeFilter} />

      {contacts.map(contact =>
        <ContactPreview
          key={contact._id}
          contact={contact}
          onRemoveContact={onRemoveContact} />)}

      <Link className="fa-solid plus-icon add-contact-btn" to="/contact/edit"></Link>

    </section>
  )
}
