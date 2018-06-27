import React, {Component} from 'react';
import {Card, CardBody, CardFooter, CardHeader,Button,Row,Col} from 'reactstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Axios from 'axios';
const urlBase="http://localhost:8082";

class Resultado extends Component {
    constructor(){
        super();
        this.state={
            exercise:"",
            result:"",
        };
        this.componentWillMount=this.componentWillMount.bind(this);
        this.existExerciseResult=this.existExerciseResult.bind(this);
        this.inOutToPrint=this.inOutToPrint.bind(this);
    }
    componentWillMount(){
        var Consultas=[];
        Consultas.push(
            Axios.get(urlBase+"/userExercise/"+this.props.match.params.idUserExercise)
        );
        //probar con 8
        Consultas.push(
            Axios.get("http://localhost:8082/userExercise/user/"+this.props.infoUsuarios.userID) 
        );

        Promise.all(Consultas).then(Response=>{
            try{
                var exercise=Response[0].data.exercise;
                var userExercises=[];
                userExercises=Response[1].data;
                if(this.existExerciseResult(exercise,userExercises)){
                    this.setState({
                        exercise:exercise,
                        result:Response[0].data
                    })
                }
                else{
                    window.location.replace('/#/enunciados');
                }
            }
            catch(err){
                //console.log(err);
                window.location.replace('/#/enunciados');
            };
        })
        .catch(error=>{
            console.log(error)
        });
    }
    existExerciseResult(exercise,array){
        var id=exercise.exerciseID;
        for(var i=0;i<array.length;i++){
            if(array[i].exercise.exerciseID===id){
                return true;
            }
        }
        return false;
    }

    inOutToPrint(texto,variable){
        if(typeof (texto)=== 'undefined'){
           
            return <div></div>
        }
        var arrayTexto;

        switch(variable){
            case 2:
                texto=texto.substr(0,texto.length-2);
                arrayTexto=texto.split("\\n, ");
                break;
            default:
                arrayTexto=texto.split("/@");
                break; 
        }
        var salida="";
        switch(variable){
            case 3:
                for (let i = 0; i < arrayTexto.length; i++) {
                    if(i===0){
                        salida=arrayTexto[0]
                    }
                    else{
                        salida=salida+" - "+arrayTexto[i];
                    }  
                }
                return salida;

            default:
                return(
                    arrayTexto && arrayTexto.map((dato,key)=>
                        <div className="text-center" key={key}>{dato}</div>
                    )
                );
        }  
    }
    converTime(min){
        var minRest=min % 60;
        var hora=Math.floor(min/60) % 24;
        return((hora>0)?hora+" horas "+minRest + " minutos":minRest + " minutos");
    }

    render(){
        console.log(this.props);
        this.converTime(this.state.result.userSolvingTime);
        return(
            <Row>
                <Col className="offset-md-2" md={8}>
                    <Card>
                        <CardHeader className="text-center"> <h3>Resultado</h3></CardHeader>
                        <CardBody>
                            <Row >
                                <Col className="text-center">
                                    <h4><em>"{this.state.exercise.exerciseTitle}"</em></h4>
                                </Col> 
                            </Row>

                            <br/>
                            <Row>
                                <Col ></Col>
                                <Col className="text-left"><strong>Fecha de Realización:</strong></Col>
                                <Col className="text-center">{(this.state.result!=="")?this.state.result.userDateResolution.substr(0,10):""}</Col>
                                <Col ></Col>
                                <Col ></Col>

                            </Row>
                            
                            <br/>
                            <Row>
                                <Col></Col>
                                <Col className="text-left"><strong>Tiempo de Realización:</strong></Col>
                                <Col className="text-center">{this.converTime(this.state.result.userSolvingTime)}</Col>
                                <Col></Col>
                                <Col></Col>

                            </Row>
                            <br/>
                            <Row>
                                <Col></Col>
                                <Col className="text-left"><strong>Entrada Probadas:</strong></Col>
                                <Col className="text-center">{this.inOutToPrint(this.state.exercise.exerciseInput,3)}</Col>
                                <Col></Col>
                                <Col></Col>

                            </Row>
                            <br/>

                            <Row>
                                <Col></Col>
                                <Col className="text-left"><strong></strong></Col>
                                <Col className="text-center"><strong>Obtenido</strong></Col>
                                <Col className="text-center"><strong>Esperado</strong></Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col className="text-left"><strong>Puntaje:</strong></Col>
                                <Col className="text-center">{this.state.result.userScore}</Col>
                                <Col className="text-center">{this.state.exercise.exerciseScore}</Col>
                                <Col></Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col></Col>
                                <Col className="text-left"><strong></strong></Col>
                                <Col className="text-center"></Col>
                                <Col className="text-right"></Col>
                                <Col></Col>
                                
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col className="text-left"><strong>Salidas:</strong></Col>
                                <Col className="text-center">{this.inOutToPrint(this.state.result.userOutput,2)}</Col>
                                <Col className="text-center">{this.inOutToPrint(this.state.exercise.exerciseOutput)}</Col>
                                <Col></Col>
                            </Row>
                              
                            <Row>
                                <Col className="text-left"><strong></strong></Col>
                                <Col className="text-center"></Col>
                                <Col className="text-right"></Col>
                            </Row>
                        </CardBody>
                        <CardBody>
                            <Row>
                                <Col></Col>
                                <Col></Col>
                                <Col></Col>
                            </Row>
                        </CardBody>

                        <CardFooter className="text-center">
                            <Col></Col>
                            <Col>
                                <Link to="/enunciados">
                                    <Button  color="primary" block className="btn-pill " outline> volver</Button>
                                </Link>
                            </Col>
                            <Col ></Col>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        );
    }
}
const mapStateToProps = state =>{
    return{
      infoUsuarios: state.infoUsuarios
    };
  };

export default connect(mapStateToProps)(Resultado);