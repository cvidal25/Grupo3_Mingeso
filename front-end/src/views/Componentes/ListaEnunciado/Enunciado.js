import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Collapse, Row, Table,Button } from 'reactstrap';
import Axios from 'axios';
import Loading from 'react-loading-spinner';
import '../../../scss/spinner.css';
import c_icon from '../../../assets/img/logos_lenguajes/c_logo.png';
import python_icon from '../../../assets/img/logos_lenguajes/python_logo.png';
import java_icon from '../../../assets/img/logos_lenguajes/java_logo.png';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

/*this.props.infoUsuarios.LO QUE NECESITES DEL USUARIO
<span>{this.props.infoUsuarios.userName}</span>
ejemplo: this.props.infoUsuarios.userID,
{"userID":7,"userName":"Barbara Sarmiento",
"userType":1,
"userMail":"barbara.sarmiento@usach.cl",
"userCareer":"Ingeniería de Ejecución en Informática",
"userCoordination":"B-3"}
*/

//import prueba from './prueba.json';

class Enunciado extends Component{
    constructor(){
        super();
        this.state={
            items:[],
            lenguaje:['python','java','c_cpp'],
            iconos:[python_icon,java_icon,c_icon],
            collapse: false,
            accordion: [],
            espera:false,
      };
    }

    componentDidMount(){
        this.setState({
            espera:true
        });

        const config={
            'onUploadProgress': (progressEvent) => {
                console.log("PAZ----");
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                console.debug('onUploadProgress called with', arguments, 'Percent Completed:' + percentCompleted);
            },
            'onDownloadProgress': (progressEvent) => {
                console.log("PAZ");
                console.log(progressEvent.total,progressEvent.loaded,progressEvent.lengthComputable );
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                console.debug('onUploadProgress called with', arguments, 'Percent Completed:' + percentCompleted);
            },


        }
        Axios.get('http://localhost:8082/exercise',config)
        .then(response=>{
            //console.log(response.data);
            var aux=[];
            var enunciados=response.data;
            let item;
            for (item in enunciados){
                aux.push(false);    
            }

            this.setState({
                items:enunciados,
                accordion: aux,
                espera:false
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
            <Row>
                <Col>
                <Card>
                    <CardHeader>
                        <i className="fa fa-align-justify"></i> Tabla de Enunciados
                    </CardHeader>
                    <CardBody>
                        {//<Loading isLoading={this.state.espera} loadingClassName='defloading' > //
                        }
                            {this.state.espera?
                            <div className="row">
                                <div className ='col'>
                                    <div className='defaultSpinner' ></div>
                                </div>
                            </div>
                            :
                            <Table responsive>
                            
                            <thead>
                            <tr>
                                <th>Titulo</th>
                                <th>Publicado</th>
                                <th >Lenguaje </th>
                                <th style={{textAlign:'center'}} >Status</th>
                            </tr>
                            </thead>
                            
                            {listaEnunciados && listaEnunciados.map((enunciado, key) =>
                            <tbody key={key}>
                                <tr  onClick={() => this.toggleAccordion(key)} aria-expanded={this.state.accordion[key]} aria-controls={"collapse"+key.toString()}>
                                    <td>{enunciado.exerciseTitle}</td>
                                    <td>{enunciado.exerciseIntialDate.toString().substr(0, 10)}</td>
                                    <td>&emsp;<img src={this.state.iconos[enunciado.exerciseLenguge-1]} style={{height:'30px',width:'30px'}}/></td>
                                    <td>
                                        <Link to={{
                                            pathname:"/enunciados/"+this.state.lenguaje[enunciado.exerciseLenguge-1].toString()+"/consola/"+enunciado.exerciseID,
                                            
                                            }}>
                                            <Button block color="primary">GO</Button>
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="4">
                                        <Collapse isOpen={this.state.accordion[key]} aria-labelledby="headingOne">
                                            <fieldset className="form-group">
                                                <div className="row">
                                                    <legend className="col-form-label col-sm-1 pt-0"><strong> Cuerpo:</strong></legend>
                                                    <div className="col-sm-11" style={{textAlign:'justify'}}>
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
                        
                        </Table> }
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
                        {//</Loading>
                        }
                    </CardBody>
                </Card>
                </Col>
            </Row>
        </div>
        );

    }


    render(){

        return(
            <div>
                {this.listar(this.state.items)}
            </div>
        );
    };

}


const mapStateToProps = state =>{
    return{
      infoUsuarios: state.infoUsuarios,
    };
  };
  

export default connect(mapStateToProps)(Enunciado);
