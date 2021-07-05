import React from "react";
import Card from './Card';
import Prontuarios from './Prontuarios';
import Queixas from './Queixas';
import { BrowserRouter as Router, Switch,Route, Link} from "react-router-dom";

export default (props) => {
    return(
        <div className="container">
            <div className="row row-prontuario">
                <div className="col-sm-12 col-md-4 col-lg-4"></div>
                <div className="col-sm-12 col-md-4 col-lg-4">
                    <Router>
                        <Switch>
                            <Route path="/queixas">
                                <Card title="Prontuário Eletrônico">
                                    <Queixas />
                                </Card>
                            </Route>
                            <Route path="/">
                                <Card title="Prontuário Eletrônico">
                                    <Prontuarios />
                                </Card>
                            </Route>
                        </Switch>
                    </Router>
                </div>
                <div className="col-sm-12 col-md-4 col-lg-4"></div>
            </div>
        </div>
    )
}