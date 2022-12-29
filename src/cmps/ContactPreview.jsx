import { Link } from "react-router-dom"

export function ContactPreview({ contact, onRemoveContact }) {
    return (
        <section className='contact-preview'>
            <Link to={`/contact/${contact._id}`} className='info'>
                <img src={contact.imgUrl || require('../assets/imgs/contact-preview.png')} alt="" />
                <h4>{contact.name}</h4>
            </Link>

            <div className="actions">
                <span className="fa-solid trash-icon" title="Delete" onClick={() => onRemoveContact(contact._id)}></span>
                <Link to={`/contact/edit/${contact._id}`}  className="fa-solid edit-icon" title="Edit"></Link>
            </div>
        </section>
    )
}
