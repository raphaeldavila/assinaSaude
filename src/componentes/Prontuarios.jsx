import React from 'react';
import './Prontuarios.css';
import '../componentes/format/Formatacao';
import { BrowserRouter as Router, Switch,Route, Link} from "react-router-dom";
import dateFormat from 'dateformat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

export default (props) => {

    const dadosArmazenados = localStorage.getItem("@assina-saude/dadosProntuario");
    const dadosLocal = JSON.parse(dadosArmazenados);    

    function vazio(){
        return (
            <p>Nenhum prontuário cadastrado </p>
        )
    }

    function dados(){

        const dataFormata = dateFormat(dadosLocal.created_at, "dd")  ;
        const mesFormata = dateFormat(dadosLocal.created_at, "mmm");
        const anoFormata = dateFormat(dadosLocal.created_at, "yyyy") ;
        const horaFormata = dateFormat(dadosLocal.created_at, "HH:MM");

        return(
            <div className="row">
                <div className="col-md-12">
                    <div className="card-prontuario-lista">
                        <div className="cabecalho"><FontAwesomeIcon icon={faClock} /> { dataFormata + '.' + mesFormata + '.' + anoFormata + ' - ' + horaFormata }</div>
                        <div className="subCabecalho">Anamnese</div>
                        <div className="corpo-prontuario-lista">

                            <div className="linha">
                                <div className="titulo-linha">Queixa Principal</div>
                                <div className="label-retorno">{dadosLocal.queixa.label}</div>
                            </div>

                            <div className="linha">
                                <div className="titulo-linha">Doenças Adulto</div>
                                <div className="label-retorno">
                                    {dadosLocal.doencas.map((dado) => (
                                        <div className="badge">{dado.label}</div>
                                    ))}
                                </div>
                            </div>

                            <div className="linha">
                                <div className="titulo-linha">Histórico da Moléstia</div>
                                <div className="label-retorno">{dadosLocal.historico}</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className="card-prontuario-child"> 
            { dadosLocal == null ? vazio() : dados() }
            <Link to="/queixas" className="btn btn-prontuario-queixas">Adicionar novo prontuário</Link>
        </div>
    )
}

