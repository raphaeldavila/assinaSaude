import React, {useState, useEffect } from 'react';
import ReactDOM, { render } from 'react-dom';
import swal from 'sweetalert';
import './Queixas.css';
import { Button, Form, FormGroup, Label, Input, Badge } from 'reactstrap';
import { BrowserRouter as Router, Route, Link, useHistory} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useForm } from "react-hook-form";

export default (props) => {

    const axios = require('axios');
    const { register, handleSubmit } = useForm();
    const history = useHistory();

    const initialValue = [
        { id: 0, value: "Selecione ... " }];

    const [stateQueixas, setQueixas] = useState(initialValue);
    const [stateDoencas, setDoencas] = useState(initialValue);
    const [stateDoencasBadge, setDoencasBadge] = useState([{id: 0, label: 'teste'}]);

    const arrayDoenca = [];
    const todosDoencas = [];

    useEffect(() => {
        axios.get('https://assina-prontuario.herokuapp.com/queixas')
        .then(function (response) {
            setQueixas(response.data.data);
        });

        axios.get('https://assina-prontuario.herokuapp.com/doencas')
        .then(function (response) {
            setDoencas(response.data.data);
        });
    }, []); 

    function removerTag(){
        alert('tetse');
    }

    function handleChange(e) {
        const doenca = e.target.value;
        
        let splitValue = doenca.split("-");
        let idValue =  splitValue[0];
        let labelValue =  splitValue[1];

        let countDoenca = document.getElementById('doenca-' + idValue);
        if(countDoenca == null){    
            arrayDoenca.push(idValue);

            const objetoDoenca = {
                id: idValue,
                label: labelValue
            };

            todosDoencas.push(objetoDoenca);

            setDoencasBadge(todosDoencas);

            const tagDoencas = document.getElementById('tags-doencas');




            // const element = document.createElement('div');
            // element.setAttribute("class", "badge badge-queixas");
            // element.setAttribute("id", "doenca-" + idValue);
            // element.textContent = labelValue + '  x';
            // tagDoencas.appendChild(element );
        }
    }

    function adicionarTag(){
        <div class='badge badge-queixas'></div>
    }

    const onSubmit = (data) => {
        
        let allDoencas = arrayDoenca;
        if(data.queixas == undefined){
            swal("É necessário selecionar uma queixa.");
            return
        }

        if(data.historico == undefined){
            swal("É necessário relatar um histórico. Entre 10 e 100 caracteres.");
            return
        }else{
            if(data.historico.length <= 10 && data.historico.length >= 100){
                swal("Digite um histórico entre 10 e 100 caracteres.");
                return
            }
        }

        const dadosPost = {
            "queixa" : data.queixas, 
            "doencas" : allDoencas,
            "historico" : data.historico
        }

        axios.post('https://assina-prontuario.herokuapp.com/prontuario', dadosPost)
        .then(function (response) {
            swal("Sucesso", "Uhuul! Prontuário cadastrado com sucesso. Aguarde você será redirecionado para a tela de prontuários.", "success");
            localStorage.setItem("@assina-saude/dadosProntuario", JSON.stringify(response.data));
            setTimeout(function(){
                history.push('/');
            }, 4000);
        })
        .catch(function (error) {
            swal("Erro", "Não foi possível realizar seu prontuário. Tente novamente mais tarde!", "error");
        });
    };

    return(
        <div className="card-queixas">
            <header>Anamnese</header>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <label className="title-form">Queixa Principal</label>
                    <Input type="select" name="select" id="queixaPrincipal" {...register("queixas")}>
                        {stateQueixas.map((queixas, index) => (
                            <option key={queixas.id} value={queixas.id} >{queixas.label}</option>
                        ))}
                    </Input>
                </FormGroup>

                <FormGroup>
                    <label className="title-form">Doenças Adulto</label>
                    <Input type="select" name="select" id="queixaPrincipal" {...register("doencas")} onChange={handleChange}>
                        {stateDoencas.map((doencas, index) => (
                            <option key={doencas.id} value={doencas.id + '-' + doencas.label}> {doencas.label} </option>
                        ))}
                    </Input>
                </FormGroup>

                <FormGroup>
                    <Label for="historicoMolestia">Selecionados</Label>
                    <div id="tags-doencas">
                        {adicionarTag}
                    </div>
                </FormGroup>

                <FormGroup>
                    <Label for="historicoMolestia">Histórico da Moléstia</Label>
                    <Input type="textarea" name="text" id="historicoMolestia" placeholder="Digite..." rows="3" {...register("historico")} />
                </FormGroup>

                <Button className="btn btn-prontuario-queixas">Salvar</Button>

                <Link to="/"> <FontAwesomeIcon icon={faArrowLeft} /> Voltar para prontuários</Link>
            </Form>
        </div>
    )
}

