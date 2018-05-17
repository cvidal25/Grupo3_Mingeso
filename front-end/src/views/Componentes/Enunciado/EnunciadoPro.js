import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {Card, CardBody, CardHeader, Col, Collapse, Row, Table } from 'reactstrap';
import { AppSwitch } from '@coreui/react';
import Axios from 'axios';

//import prueba from './prueba.json';

class EnunciadoPro extends Component{
    constructor(){
        super();
        this.state={
            items:[],
            lenguaje:['python','java','c_cpp'],
            padre:-1, // segun el padre se veran las funciones
            collapse: false,
            accordion: [],
            custom: [true, false],
            status: 'Closed',
            fadeIn: true,
            timeout: 300,
      };
    }

    componentDidMount(){
        Axios.get('http://localhost:8082/exercises')
        .then(response=>{
            //console.log(response.data._embedded);
            var aux=[];
            var enunciados=response.data._embedded.exercises;
            let item;
            for (item in enunciados){
                aux.push(false);    
            }
            this.setState({
                items:enunciados,
                accordion: aux
            });
        })
        .catch(function(error){
            console.log(error);
        })
    };

    toggleAccordion(tab) {

    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      accordion: state,
    });
  }

    listarInOut(datos){

        var datosArray=datos.split("/@");

        return (
                datosArray && datosArray.map((dato,key)=>
                    <div key={key}>{dato}</div>
                )
        );
    }


    listar (listaEnunciados){
        return (
            <div >
            {
                /*<table>
                    <thead>
                    <tr style={{textAlign:'left'}}>
                        <th >Nombre</th>
                        <th>Lenguaje</th>
                        <th>Acción</th>
                    </tr>
                    </thead>


                {listaEnunciados && listaEnunciados.map((enunciado, key) =>

                <tbody key={key}>
                    <tr  id={key} className="accordion-toggle" data-toggle="collapse" data-target={"."+key.toString() } style={{textAlign:'left'}}>
                        <td>{enunciado.exerciseTitle}</td>
                        <td>{this.state.lenguaje[enunciado.exerciseLenguge-1]}</td>
                        {
                            this.state.padre>1?
                            <td>
                                <button>{enunciado.exercisePublished.toString()}</button>
                                <button>Editar</button>
                                <button>Stats</button>
                                
                            </td>:
                            <td>
                                <Link to={{
                                    pathname:"/Console/"+this.state.lenguaje[enunciado.exerciseLenguge-1].toString()+"/enun/"+key.toString(),
                                    state:{
                                        lenguaje:enunciado.exerciseLenguge
                                    }
                                    }}>
                                    <button>
                                    GO
                                    </button>
                                
                                </Link>
                            </td>
                    }
                    </tr>
                    <tr>
                        <td colSpan="6" className="hiddenRow">
                                <div className={" accordion-body collapse "+key.toString()} id="accordion1">
                                <fieldset className="form-group">
                                    <div className="row">
                                        <legend className="col-form-label col-sm-2 pt-0">Cuerpo:</legend>
                                        <div className="col-sm-10" style={{textAlign:'justify'}}>
                                                {enunciado.exerciseBody}
                                        </div>
                                    </div>
                                </fieldset>
                                </div>


                        </td>
                    </tr>
                </tbody>
            )}
                </table> */
            }
            <Row>
                <Col>
                <Card>
                    <CardHeader>
                        <i className="fa fa-align-justify"></i> Tabla de Enunciados
                    </CardHeader>
                    <CardBody>
                        <Table responsive>
                        
                        <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Publicado</th>
                            <th>Lenguaje</th>
                            <th>Publicado</th>
                            <th>Acción</th>
                        </tr>
                        </thead>
                        
                        {listaEnunciados && listaEnunciados.map((enunciado, key) =>
                        <tbody>
                            <tr key={key} onClick={() => this.toggleAccordion(key)} aria-expanded={this.state.accordion[key]} aria-controls={"collapse"+key.toString()}>
                                <td>{enunciado.exerciseTitle}</td>
                                {
                                    !enunciado.exercisePublished?<td>- - - -</td>:<td>{enunciado.exerciseIntialDate.toString().substr(0, 10)}</td>
                                }
                                <td>{this.state.lenguaje[enunciado.exerciseLenguge-1]}</td>
                                <td><AppSwitch className={'mx-1'} variant={'pill'} color={'success'} label dataOn="Si" dataOff="No" checked={enunciado.exercisePublished}/></td>

                                <td>
                                    <button>Editar</button>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="5" style={{height:'0px',margin:'0px'}}>
                                    <Collapse isOpen={this.state.accordion[key]} aria-labelledby="headingOne">
                                        <fieldset className="form-group">
                                            <div className="row">
                                                <legend className="col-form-label col-sm-2 pt-0"><strong> Cuerpo:</strong></legend>
                                                <div className="col-sm-10" style={{textAlign:'justify'}}>
                                                        {enunciado.exerciseBody}
                                                </div>
                                            </div>
                                            <br/>
                                            <div className="row">
                                                <legend className="col-form-label col-sm-2 pt-0"><strong> Input: </strong></legend>
                                                <div className="col-sm-3" style={{textAlign:'justify'}}>
                                                        {this.listarInOut(enunciado.exerciseInput)}
                                                </div>
                                                <legend className="col-form-label col-sm-2 pt-0"> <strong> Output:</strong></legend>
                                                <div className="col-sm-3" style={{textAlign:'justify'}}>
                                                        {this.listarInOut(enunciado.exerciseOutput)}
                                                </div>
                                            </div>
                                            
                                        </fieldset>
                                    </Collapse>
                                </td>
                            </tr>
                        </tbody>
                        )}
                       
                        </Table>
                        {
                        /*
                        <Pagination>
                        <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                        <PaginationItem active>
                            <PaginationLink tag="button">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                        <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                        <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                        <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                        </Pagination>*/
                        }

                    </CardBody>
                </Card>
                </Col>
            </Row>
        </div>
        );

    }


    render(){
        console.log(this.state);

        return(
            <div>
                {this.listar(this.state.items)}
            </div>
        );
    };




}

export default EnunciadoPro;