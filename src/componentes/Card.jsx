import React from 'react';
import './Card.css';

export default (props) => {

    return(
        <div className="card-prontuario">
            <h1>{props.title}</h1>
            {props.children}
        </div>
    )

}