import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { AppSwitch } from '@coreui/react';
import { Card, CardBody, CardHeader, Col, Collapse, Row, Table,Button, Tooltip,Modal,ModalBody, ModalFooter,ModalHeader } from 'reactstrap';
import Axios from 'axios';
import '../../../scss/spinner.css';
import c_icon from '../../../assets/img/logos_lenguajes/c_logo.png';
import python_icon from '../../../assets/img/logos_lenguajes/python_logo.png';
import java_icon from '../../../assets/img/logos_lenguajes/java_logo.png';
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

class EnunciadoPro extends Component{
    constructor(){
        super();
        this.state={
            items:[],
            lenguaje:['python','java','c_cpp'],
            iconos:[python_icon,java_icon,c_icon],
            fadeIn: true,
            timeout: 300,
            espera:false,
            openStates:[[],[],[],[]], //0 Acordion 1 tooltiOpenEdit  2 tooltipOpenDelete 3 modalOpen
            modal: false,
        };
        this.toggle = this.toggle.bind(this);
    }
    
    componentDidMount(){

        this.setState({
            espera:true
        });

        Axios.get('http://localhost:8082/exercise')
        .then(response=>{
            var aux=[];
            var enunciados=response.data;
            
            for ( var item in enunciados){
                aux.push(false);    
            }

            this.setState({
                items:enunciados,
                openStates:[aux,aux,aux,aux],
                espera:false
            });
        })
        .catch(function(error){
            console.log(error);
            this.setState({
                espera:false
            })
        })
    };
    toggle() {
        const aux=this.state.modal;
        this.setState({
          modal: !aux
        });
    }

    //cambia estado para abrir el colapse o bien mostrar el tooltips
    //Entrada: posicion, y posicion del arreglo al que pertenece
    toggleOpen(tab,posicionOpens) {
        var tempOpenStates=this.state.openStates;
        if(tempOpenStates[3][posicionOpens]){
            return;
        }
        const prevState = this.state.openStates[posicionOpens];
        
        const state = prevState.map((x, index) => tab === index ? !x : false);

        tempOpenStates[posicionOpens]=state;
        this.setState({
            openStates:tempOpenStates
        });
  }

    //cambiar estado para abrir uno de los modal del ejercicio.
    //Entrada: posicion.
    toggleOpenModal(tab){
        var tempOpenStates=this.state.openStates;
        tempOpenStates[3][tab]=!tempOpenStates[3][tab];
        
        
        this.setState({
            openStates:tempOpenStates
        });
        console.log(this.state.openStates);

    }
    
    //los lista los datos correspontiente a entrada o salidas correspodiente del programa
    //entrada: string con de entradas o salidas, con separacion de  @
    listarInOut(datos){
        
        var datosArray=datos.split("/@");

        return (
                datosArray && datosArray.map((dato,key)=>
                    <div key={key}>{dato}</div>
                )
        );
    }

    // evento para cambiar el estado de publicado del ejercicio.
    HandleSwitch=(enunciado)=>event=>{
        enunciado.exercisePublished=event.target.checked;
        let fecha=new Date();
        enunciado.exerciseIntialDate= fecha.toISOString().substr(0,10)+"T03:00:00.000+0000";
        
        
        Axios.post('http://localhost:8082/exercise',enunciado)
        .then(Response =>{
            console.log(Response);
        }

        ).catch(function(error){
            console.log(error);
        });
        
    }

    //evento para borrar un ejercicio.
    handleDelete=(id,posicion)=>{
        var array =this.state.items;
        var element=array[posicion];

        Axios.delete('http://localhost:8082/exercise/'+id.toString())
        .then(response=>{
            console.log(response);
            array.splice(posicion,1);
            this.setState({
                items:array
            });

        }).catch(error=>{
            console.log(error);
        //    array.splice(posicion,0,element);
         //   this.setState({
         //       items:array
          //  });
        });
       
    }

    //lista todos los enuncidos disponibles
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
                        {this.state.espera?
                            <div className="row">
                                <div className ='col'>
                                    <div className='defaultSpinner' ></div>
                                </div>
                            </div>
                            :
                            <Table responsive>
                            
                            <thead>
                            <tr style={{fontSize:"13"}}>
                                <th style={{width:"50%"}}>Titulo</th>
                                <th>Publicado</th>
                                <th>Lenguaje</th>
                                <th>Publicado</th>
                                <th style={{width:"15%", textAlign:'center'}}>Acción</th>
                            </tr>
                            </thead>
                            
                            {listaEnunciados && listaEnunciados.map((enunciado, key) =>
                            <tbody key={key}>
                                <tr  onClick={() => this.toggleOpen(key,0)} aria-expanded={this.state.openStates[0][key]} aria-controls={"collapse"+key.toString()}>
                                    <td>{enunciado.exerciseTitle}</td>
                                    {
                                        !enunciado.exercisePublished?<td>- - - -</td>:<td>{enunciado.exerciseIntialDate.toString().substr(0, 10)}</td>
                                    }
                                    <td>&emsp;<img src={this.state.iconos[enunciado.exerciseLenguge-1]} style={{height:'30px',width:'30px'}} alt={enunciado.exerciseLenguge}/></td>
                                    <td><AppSwitch className={'mx-1'} variant={'pill'} color={'success'} label dataOn="Si" dataOff="No" 
                                            checked={enunciado.exercisePublished} onClick={this.HandleSwitch(enunciado)}/></td>

                                    <td >
                                        <Row>
                                            <Col>
                                            {
                                                //boton de Edición
                                            }
                                                <Link to={'/enunciadosPro/'+enunciado.exerciseID +'/enunciado'}>
                                                    <Button block color="primary" id={"BotonEdit"+key.toString()} style={{ height:"38px" }}>                                                   
                                                        <i className="fa fa-wrench icons font-2xl d-block" ></i>
                                                    </Button>
                                                    <Tooltip placement="top" isOpen={this.state.openStates[1][key]} target={"BotonEdit"+key.toString()} toggle={() => {this.toggleOpen(key,1);}}>
                                                       Editar 
                                                    </Tooltip>   
                                                </Link>
                                            </Col>
                                            <Col>
                                                {
                                                //boton de Eliminar
                                            }
                                                    <Button block color="danger" id={"BotonDelete"+key.toString()}  style={{height:"38px"}} onClick={()=>{this.toggleOpenModal(key);}}>
                                                        <i className="fa fa-close font-2xl fa-lg d-block"></i>
                                                    </Button>
                                                    <Tooltip placement="top" isOpen={this.state.openStates[2][key]} target={"BotonDelete"+key.toString()} toggle={() => {this.toggleOpen(key,2);}}>
                                                       Eliminar 
                                                    </Tooltip>
                                                    <Modal isOpen={this.state.openStates[3][key]} toggle={()=>{this.toggleOpenModal(key);}} className={this.props.className}>
                                                        <ModalHeader toggle={()=>{this.toggleOpenModal(key);}}>Estas Seguro?</ModalHeader>
                                                        <ModalBody>
                                                            Estas Seguro de Eliminar: 
                                                            <strong> {enunciado.exerciseTitle}</strong>
                                                        </ModalBody>
                                                        <ModalFooter>
                                                        <Button color="info"  onClick={()=>{this.toggleOpenModal(key);}}>Cancelar</Button>{' '}
                                                        <Button color="danger" outline onClick={()=>{this.toggleOpenModal(key);this.handleDelete(enunciado.exerciseID,key);}}>Aceptar</Button>
                                                        </ModalFooter>
                                                    </Modal>
                                                
                                            </Col>
                                        </Row>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="5" style={{height:'0px',margin:'0px'}}>
                                        <Collapse isOpen={this.state.openStates[0][key]} aria-labelledby="headingOne">
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
                        
                            </Table>
                            }
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
  

export default connect(mapStateToProps)(EnunciadoPro);