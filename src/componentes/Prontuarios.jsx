import React from 'react';
import './Prontuarios.css';
import { BrowserRouter as Router, Switch,Route, Link} from "react-router-dom";

export default (props) => {
    return(
        <div className="card-prontuario-child"> 
            <p>Nenhum prontuário cadastrado</p>
            <Link to="/queixas" className="btn btn-prontuario-queixas">Adicionar novo prontuário</Link>
        </div>
    )
}

