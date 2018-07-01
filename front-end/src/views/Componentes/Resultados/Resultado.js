import React, {Component} from 'react';
import {Card, CardBody, CardFooter, CardHeader,Button,Row,Col,Collapse} from 'reactstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import AceEditor from 'react-ace';


import 'brace/theme/github';
import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/mode/c_cpp';

const urlBase="http://localhost:8082";
const lenguaje=["python","java","c_cpp"];


class Resultado extends Component {
    constructor(){
        super();
        this.state={
            exercise:"",
            result:"",
            variablesNoRep:[],
            open:false,
            modo:"python",
            code:"",
            carga:false,
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
            Axios.get(urlBase+"/userExercise/user/"+this.props.infoUsuarios.userID) 
        );

        Promise.all(Consultas).then(Response=>{
            try{
                var exercise=Response[0].data.exercise;
                var userExercises=[];
                userExercises=Response[1].data;
                console.log(Response[0].data)
                if(this.existExerciseResult(exercise,userExercises)){
                    this.setState({
                        exercise:exercise,
                        result:Response[0].data,
                        code:Response[0].data.code,
                        modo:lenguaje[exercise.exerciseLenguge-1],
                        carga:true
                    });

                    var invalidVariables=Response[0].data.invalidVariables.substr(1,Response[0].data.invalidVariables.length-1);
                    invalidVariables=invalidVariables.split(",")
                    this.setState({
                        variablesNoRep:invalidVariables
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
        //verificarId usuario
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
                arrayTexto=texto.split("\\n/@");
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
        if(!Number.isInteger(min)){
            return "";
        }
        var minRest=min % 60;
        var hora=Math.floor(min/60) % 24;
        return((hora>0)?hora+" horas "+minRest + " minutos":minRest + " minutos");
    }

    iconResult(bool){

        if(typeof(bool)===typeof("")){
            
            console.log("array")
            if(bool.length===0){
                
                bool=true;
            }
            else{
                bool=false;
            }
        }
        //<i class="fa fa-check-circle-o fa-lg"></i>
        //<i class="fa fa-times-circle-o fa-lg"></i>
        if(bool){
            return <i className="fa fa-check-circle-o fa-lg " style={{color:"#4dbd74"}}></i>
        }
        else{
            return <i className="fa fa-times-circle-o fa-lg " style={{color:"#f86c6b"}}></i>
        }
    }

    toggle=event=>{
        event.preventDefault();
        this.setState({
            open:!this.state.open
        })
    }
    notChange=(NewValue)=>{
        this.setState({
                code:this.state.code
        });
}

    render(){
        console.log(this.props);
        this.converTime(this.state.result.userSolvingTime);
        return(
            <Row>
                <Col className="offset-md-2" md={8}>
                    <Card>
                        <CardHeader className="text-center"> <h3><strong>Resultado</strong></h3></CardHeader>
                        <CardBody>
                            <Row >
                                <Col className="text-center">
                                    <h4><em>{(this.state.carga)?'"'+this.state.exercise.exerciseTitle+'"':""}</em></h4>
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
                            <Row >
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
                                <Col className="text-left"></Col>
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
                                <Col className="text-left"><strong>Salidas:</strong></Col>
                                <Col className="text-center">{this.inOutToPrint(this.state.result.userOutput,2)}</Col>
                                <Col className="text-center">{this.inOutToPrint(this.state.exercise.exerciseOutput)}</Col>
                                <Col></Col>
                            </Row>
                        </CardBody>
                        {(this.state.carga) && 
                        <CardBody>
                            <Row>
                                <Col></Col>
                                <Col></Col>
                                <Col className="text-center"><h5> <strong> Analisis </strong></h5></Col>
                                <Col ></Col>
                                <Col></Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col></Col>
                                <Col className="text-left"><strong>Comentarios:</strong></Col>
                                <Col className="text-center">{this.iconResult(this.state.result.commentAnalysis)}</Col>
                                <Col className="text-right"></Col>
                                <Col></Col>
                            </Row>
                            <br/>

                            <Row>
                                <Col></Col>
                                <Col className="text-left"><strong>Identación:</strong></Col>
                                <Col className="text-center">{this.iconResult(this.state.result.identationAnalysis)}</Col>
                                <Col className="text-right"></Col>
                                <Col></Col>
                            </Row>
                            <br/>

                            <Row>
                                <Col></Col>
                                <Col className="text-left"><strong>Cuerpo Principal:</strong></Col>
                                <Col className="text-center">{this.iconResult(this.state.result.mainBodyAnalysis)}</Col>
                                <Col className="text-right"></Col>
                                <Col></Col>
                            </Row>
                            <br/>

                            <Row>
                                <Col></Col>
                                <Col className="text-left"><strong>Variables Representativas:</strong></Col>
                                <Col className="text-center">{this.iconResult(this.state.result.invalidVariables)}</Col>
                                <Col className="text-right"></Col>
                                <Col></Col>
                            </Row>
                        </CardBody>
                        }

                         {(this.state.carga) && 
                        <CardBody>
                            <Row>
                                <Col sm={1}></Col>

                                <Col sm={10}>
                                    <Card >
                                        <CardHeader>
                                            <Button block color="link" className="text-left m-0 p-0" onClick={this.toggle}  aria-expanded={this.state.open} aria-controls="collapseThree">
                                                <h5 className="m-0 p-0">Codigo</h5>
                                            </Button>
                                        </CardHeader>
                                        <Collapse isOpen={this.state.open} data-parent="#accordion" id="collapseThree">
                                            <CardBody disabled>
                                                <AceEditor
                                                    mode={this.state.modo}
                                                    theme='github'
                                                    name="blah2"
                                                    width="100%"
                                                    fontSize={18}
                                                    onChange={this.notChange}
                                                    showPrintMargin={true}
                                                    showGutter={true}
                                                    highlightActiveLine={true}
                                                    value={this.state.code}
                                                    setOptions={{
                                                            enableBasicAutocompletion: true,
                                                            enableLiveAutocompletion: true,
                                                            enableSnippets: true,
                                                            showLineNumbers: true,
                                                            tabSize: 2,
                                                    }}
                                                    style={{borderRadius:"8px 8px 8px 8px"}}
                                                    />
                                            </CardBody>
                                        </Collapse>
                                    </Card>
                        
                                </Col>
                                <Col sm={1} ></Col>
                            </Row>
                        </CardBody>  
                        }  

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