import React from 'react'

import { NavLink, withRouter } from 'react-router-dom'

export function _AppHeader() {
    return (
        <header className="app-header">
            <div className='logo'>Mr bitcoin
            <span className='fa-brands bitcoin-icon'></span>
            </div>
            <nav>
                <NavLink exact to="/">Home</NavLink>
                <NavLink to="/contact">Contacts</NavLink>
                <NavLink to="/dashboard">Statistics</NavLink>
            </nav>
        </header>
    )
}


export const AppHeader = withRouter(_AppHeader)