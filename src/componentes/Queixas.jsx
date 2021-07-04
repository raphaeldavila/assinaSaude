import React from 'react';
import './Queixas.css';
import { Button, Form, FormGroup, Label, Input, Badge } from 'reactstrap';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default (props) => {
    return(
        <div className="card-queixas">
            <header>Anamnese</header>
            <Form>
                <FormGroup>
                    <label className="title-form">Queixa Principal</label>
                    <Input type="select" name="select" id="queixaPrincipal">
                        <option disabled selected>Selecione ... </option>
                    </Input>
                </FormGroup>

                <FormGroup>
                    <label className="title-form">Doenças Adulto</label>
                    <Input type="select" name="select" id="doencasAdulto">
                        <option disabled selected>Selecione ... </option>
                    </Input>
                </FormGroup>

                <FormGroup>
                    <Label for="historicoMolestia">Histórico da Moléstia</Label>
                    <Input type="textarea" rows="5" name="text" id="historicoMolestia" value="Digite..." />
                </FormGroup>

                <Button className="btn btn-prontuario-queixas">Salvar</Button>

                <Link to="/"> <FontAwesomeIcon icon={faArrowLeft} /> Voltar para prontuários</Link>

            </Form>
        </div>
    )
}

