import React from 'react'

export function MoveList({ title, moveList }) {
    return (
        !!moveList.length && <ul className='move-list'>
            <h3>{title}</h3>
            {moveList.map(({ to, createdAt, amount, id }) => <li key={id}>
                {to && <p>To: {to}</p>}
                <p>At: {new Date(createdAt).toLocaleDateString("en-US")}, {new Date(createdAt).toLocaleTimeString()}</p>
                <p>Amount: {amount} coins</p>
            </li>)}
        </ul>
        
    )
}
