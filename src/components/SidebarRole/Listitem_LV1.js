import React from 'react'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap';

const Listitem_LV1 = ({itemsublv1,index}) => {
    return (
        <ul className="nav nav-treeview" key={index}>
            <ListGroup className="nav-item">
                <Link className="nav-link" to={itemsublv1.link}>
                    <i className="far fa-circle nav-icon"></i>
                    <p>{itemsublv1.menu_name}</p>
                </Link>
            </ListGroup>
        </ul>
    )
}

export default Listitem_LV1