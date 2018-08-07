import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Collapse, Row, Table,Button } from 'reactstrap';
import Axios from 'axios';
import '../../../scss/spinner.css';
import c_icon from '../../../assets/img/logos_lenguajes/c_logo.png';
import python_icon from '../../../assets/img/logos_lenguajes/python_logo.png';
import java_icon from '../../../assets/img/logos_lenguajes/java_logo.png';
import {connect} from 'react-redux';

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
            realizado:[],
            userExercises:[],
            espera:false,
      };
    }

    componentDidMount(){
        this.setState({
            espera:true
        });
        var Consultas=[];
        var realizados=[];
        var userExercises=[];
        Consultas.push(
            Axios.get('http://localhost:8082/exercise')
        );
        //probar con 8
        Consultas.push(
            Axios.get("http://localhost:8082/userExercise/user/"+this.props.infoUsuarios.userID)
        );
        Promise.all(Consultas).then(response=>{
            var aux=[];
                var enunciados=response[0].data;
                let item;
                for (item in enunciados){
                    aux.push(false); 
                    realizados.push(false);
                }
                
                userExercises=response[1].data;
                try{
                    for(var i=0;i<userExercises.length;i++){
                        
                        var posicion=userExercises[i].exercise.exerciseID-1;
                        realizados[posicion]=true;
                    }
                }
                catch(err){
                    console.log(err);
                    
                }
                
                this.setState({
                    items:enunciados,
                    accordion: aux,
                    realizado:realizados,
                    espera:false,
                    userExercises:userExercises
                });
        }

        ).catch(error=>{
            console.log(error);
            this.setState({
                espera:false
            })
        })


    };

    //para abrir uno y solo uno de los desplegables.
    //entrada posición
    toggleAccordion(tab) {

    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      accordion: state,
    });
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

    //busca si un ejercicio de tiene resultado realizado por el usuario.
    //entrada: ejercicio.
    findExerciseResult(exercise){
        var id=exercise.exerciseID;
        var array=this.state.userExercises;
        for(var i=0;i<array.length;i++){
            if(array[i].exercise.exerciseID===id){
                return array[i];
            }
        }
        return null;
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
                                    <div className='defaultSpinner'></div>
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
                            
                            {listaEnunciados && listaEnunciados.map((enunciado, key) =>{
                                var exerciseResult=this.findExerciseResult(enunciado);

                            //muestra solo los ejercicios publicasos o que ya tengan algún resultado
                            return( (enunciado.exercisePublished || exerciseResult!==null)&& 
                                <tbody key={key}>
                                    <tr  onClick={() => this.toggleAccordion(key)} aria-expanded={this.state.accordion[key]} aria-controls={"collapse"+key.toString()}>
                                    <td>{enunciado.exerciseTitle}</td>
                                    <td>{enunciado.exerciseIntialDate.toString().substr(0, 10)}</td>
                                    <td>&emsp;<img src={this.state.iconos[enunciado.exerciseLenguge-1]} style={{height:'30px',width:'30px'}} alt={enunciado.exerciseLenguge}/></td>
                                    <td>{
                                        //si tiene resultado de va a ver resultado, sino va a Go para realizar el ejercicio
                                    }
                                        {(exerciseResult===null)?
                                            <Link to={{pathname:"/enunciados/"+this.state.lenguaje[enunciado.exerciseLenguge-1].toString()+"/consola/"+enunciado.exerciseID,}}>
                                            <Button block color="success">GO</Button>
                                        </Link>:
                                        <Link to={{
                                            pathname:"/resultado/"+exerciseResult.userExerciseID
                                            ,state:{
                                                exercise:enunciado,
                                                result:exerciseResult
                                            }
                                            }} >
                                            <Button block color="info">Ver Resultado</Button>
                                        </Link>

                                        }
                                        
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="4">
                                    {
                                        // desplegable
                                    }
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
                            </tbody>);

                            }
                               
                                
                                
                                
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
