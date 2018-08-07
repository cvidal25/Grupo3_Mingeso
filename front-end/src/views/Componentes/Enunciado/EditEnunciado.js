import React, {Component} from 'react';
import  { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { isString } from 'util';
import { Card, CardBody, CardHeader, Col, Row, Input,Popover,PopoverHeader,
    Form,FormGroup,FormFeedback,
    Label,Button,Alert,
    Modal,ModalBody, ModalFooter,ModalHeader } from 'reactstrap';
import Axios from 'axios';
import '../../../scss/spinner.css';
import Topicos from './Topicos';
import {connect} from 'react-redux'

/*this.props.infoUsuarios.LO QUE NECESITES DEL USUARIO
ejempplo: this.props.infoUsuario.userID,
{"userID":7,"userName":"Barbara Sarmiento",
"userType":1,
"userMail":"barbara.sarmiento@usach.cl",
"userCareer":"Ingeniería de Ejecución en Informática",
"userCoordination":"B-3"}
*/


const url= 'http://localhost:8082/';

var inputValidadores=
[{
    titulo:false,
    enunciado:false,
    dias:false,
    puntaje:false,
    entrada:false,
    salida:false,
    topic:false,
},{
    titulo:false,
    enunciado:false,
    dias:false,
    puntaje:false,
    entrada:false,
    salida:false,
    false:false,
}]; //valid //invalid

class EditEnunciado extends Component{
    constructor() {
        super();
        this.state = {
            data:{},
            titulo:"",
            enunciado:"",
            lenguaje:1, /* 1 = Python; 2 = Java; 3 = C */
            fechaInicial:"",
            fechaFinal:"",
            PuntosTotales:1,
            dificultad:1,
            dias:0,
            entradas:[],
            inputEntradasEnabled:[],
            inputSalidasEnabled:[],
            salidas:[],
            tempEntrada:"",
            inputEntradaEnabled:true,
            inputSalidaEnabled:true,            
            tempSalida:"",
            publicar:false,
            aceptar:false,
            invalidDias:0,
            invalidPuntaje:0,
            invalidInOut:0,
            topico:'',
            topics:[],
            alertOpen:false,
            alertType:"danger",
            espera:false,
            botonValidadorIn:false,
            botonValidadorOut:false,
        };

    /*componentWillMount(){
        this.setState({
            espera:true,
        })
        var num=this.props.match.params.id;
        if(isString(num)){
            Axios.get('http://localhost:8082/exercise/'+num)
                .then(response=>{

                        if(response.data===null){
                            console.log('REDIRIGIR');
                            window.location.replace('/');
                        }

                        const data=response.data;
                        this.setState({
                            data:data,
                            titulo:data.exerciseTitle,
                            enunciado:data.exerciseBody,
                            lenguaje:data.exerciseLenguge,
                            fechaInicial:data.exerciseIntialDate.substr(0, 10),
                            fechaFinal:data.exerciseFinishlDate.substr(0,10),
                            PuntosTotales:data.exerciseScore,
                            entradas:this.formatInOutToString(data.exerciseInput),
                            salidas:this.formatInOutToString(data.exerciseOutput),
                            espera: false
                        });
                        
                    }
                )
                .catch(function(error){
                    console.log(error);

                    this.setState({
                        espera:false
                    })
                })
        }
        else{
            this.setState({
                espera:false
            })
        }
    };*/

   

    }

    
    componentDidMount(){
      this.setState({
          espera:true,
      })
        var num=this.props.match.params.id;
        if(isString(num)){
            Axios.get('http://localhost:8082/exercise/'+num)
                .then(response=>{

                        if(response.data===null){
                            console.log('REDIRIGIR');
                            window.location.replace('/');
                        }
                        console.log(response.data);
                        const data=response.data;
                        this.setState({
                            data:data,
                            titulo:data.exerciseTitle,
                            enunciado:data.exerciseBody,
                            lenguaje:data.exerciseLenguge,
                            fechaInicial:(data.exerciseIntialDate===null)?null:data.exerciseIntialDate.substr(0, 10),
                            PuntosTotales:data.exerciseScore,
                            entradas:this.inOutToFormatArray(data.exerciseInput),
                            salidas:this.inOutToFormatArray(data.exerciseOutput),
                            publicar:data.exercisePublished,
                            dificultad:data.exerciseDifficulty,
                            dias:data.exerciseDays,
                            topico:"",
                            espera: false
                        });
                        
                    }
                )
                .catch(function(error){
                    console.log(error);

                    this.setState({
                        espera:false
                    })
                })
        }
        else{
            this.setState({
                espera:false
            })
        }
    };

    handleChange=event=>{
        
        //console.log(event.target.value);
        var name=event.target.name;
        var value=event.target.value;
        this.setState({
            [name]:value
        });
        
        console.log(value);
        if(name==='botonValidadorIn'){
            if(value.length>0 && this.state.botonValidadorIn===true){
               this.setState({
                botonValidadorIn:false,
               });
            }
        }
        if(name==='botonValidadorOut'){
            if(value.length>0 && this.state.botonValidadorOut===true){
                this.setState({
                    botonValidadorOut:false,
                   });
            }
        }

        this.HandleValidador(name,value);
        
    }

    handleClickPublicar=event=>{
        console.log(event.target);
        var name=event.target.name;
        //var value=event.target.value;
       this.setState({
           [name]:!this.state.publicar
       });
    }
    
    handleInsertArray=nombreInOut=>{
        console.log(nombreInOut);
        var InOut,enabled;
        if(nombreInOut==="entrada"){
            InOut=this.state.entradas;
            enabled=this.state.inputEntradasEnabled;
            this.setState({
                botonValidadorIn:false,
            });
            //Validador
            if(this.state.tempEntrada===""){
                inputValidadores[1].entrada=true;
                this.setState({
                    invalidInOut:0
                })
                //decir que esta vacio
                return;
            }
            InOut.push(this.state.tempEntrada);
            enabled.push(false);
            this.setState({
                entradas:InOut,
                tempEntrada:"",
                inputEntradasEnabled:enabled
            });
        }
        else{
            InOut=this.state.salidas;
            enabled=this.state.inputSalidasEnabled;
            //validador
            this.setState({
                botonValidadorOut:false,
            });
            if(this.state.tempSalida===""){
                inputValidadores[0].salida=false;
                inputValidadores[1].salida=true;
                this.setState({
                    invalidInOut:0
                });
                //decir que esta vacio
                return;
            }
            InOut.push(this.state.tempSalida);
            enabled.push(false);
            this.setState({
                salidas:InOut,
                tempSalida:"",
                inputSalidasEnabled:enabled
            });
        }
        if(this.state.entradas.length===this.state.salidas.length){
            inputValidadores[0].salida=false;
            inputValidadores[1].salida=false;
            inputValidadores[0].entrada=false;
            inputValidadores[1].entrada=false;
        }
        
    }

    handleDeleteArray=(which,posicion)=>{
        console.log(posicion);
        var array=[];
        switch (which){
            case 1: //entrada
            
                array=this.state.entradas;
                console.log(array);
                array.splice(posicion,1);
                console.log(array);
                this.setState({
                    entradas:array
                });
                break;
            
            case 2: //salida
                array=this.state.salidas;
                array.splice(posicion,1);
                this.setState({
                    salidas:array
                });
                break;
            default:
                return;
        }
    
    }
    handleEditEnabled=(which,posicion)=>{
        var array=[];
        var state;
        
        switch (which){
            case 1: //entrada
                array=this.state.inputEntradasEnabled;
                if(this.state.entradas[posicion]===''){
                    return;
                }
                state = array.map((x, index) => posicion === index ? !x : false);
                this.setState({
                    inputEntradasEnabled:state
                })
                
                break;
            
            case 2: //salida
                array=this.state.inputSalidasEnabled;
                if(this.state.salidas[posicion]===''){
                    return;
                }
                state = array.map((x, index) => posicion === index ? !x : false);
                this.setState({
                    inputSalidasEnabled:state
                })
                break;
            default:
                return;
        }
       
    }

    handleChangeArray=(which,posicion)=>event=>{
        var array=[];
        var value=event.target.value;
        switch (which){
            case 1: //entrada
                    
                array=this.state.entradas;
                array[posicion]=value;
                this.setState({
                    entradas:array
                });
                break;
            
            case 2: //salida
                array=this.state.salidas;
                array[posicion]=value;
                this.setState({
                    salidas:array
                });
                break;
            default:
                return;

                }
    }

    arrayToFormatInOut(array){
        var aux='';
        var complete='';
        for(aux in array){
            if(complete===''){
                complete=array[aux];
            }
            else{
                complete=complete+'/@'+array[aux]
            }
        }
        console.log(complete);
        return complete;
    }

    inOutToFormatArray(InOut){
        return InOut.split('/@');
    }

    HandleValidador(nombreInput,value){
        var valid=(value!=='')?true:false;
        this.setState({
            invalidDias:0,
            invalidPuntaje:0
        })
        var invalid=!valid;
        console.log(nombreInput);
        switch (nombreInput){
            case "titulo":
                inputValidadores[0].titulo=valid;
                inputValidadores[1].titulo=invalid;
                break;
            case "enunciado":
                inputValidadores[0].enunciado=valid;
                inputValidadores[1].enunciado=invalid;
                break;
            case "dias":
                var aux=parseInt(value);

                if(isNaN(aux)){
                    valid=false;
                    invalid=true;
                    this.setState({
                        invalidPuntaje:1
                    })
                }
                else if (aux<0){
                    valid=false;
                    invalid=true;
                    this.setState({
                        invalidPuntaje:2
                    })
                }
                inputValidadores[0].dias=valid;
                inputValidadores[1].dias=invalid;
                break;
            case "PuntosTotales":
                var aux=parseInt(value);

                if(isNaN(aux)){
                    valid=false;
                    invalid=true;
                    this.setState({
                        invalidDias:1
                    })
                }
                else if (aux<1){
                    valid=false;
                    invalid=true;
                    this.setState({
                        invalidDias:2
                    })
                }
                console.log(valid);
                inputValidadores[0].puntaje=valid;
                inputValidadores[1].puntaje=invalid;
                break;
            case "tempEntrada":
                inputValidadores[1].entrada=false;
                break;
            case "tempSalida":
                inputValidadores[1].salida=false;
                break;
            case "topico":
                inputValidadores[0].topic=valid;
                inputValidadores[1].topic=invalid;
                break;
        }
    }

    validador(){
        var status=true;
        if(this.state.PuntosTotales<1){
            status=false;
        }
        if(this.state.dias<0){
            status= false;
        }
        if (this.state.titulo===''){
            inputValidadores[0].titulo=false;
            inputValidadores[1].titulo=true;
            status= false;
        }
        if (this.state.enunciado===''){
            inputValidadores[0].enunciado=false;
            inputValidadores[1].enunciado=true;
            status= false;
        }
        if(this.state.entradas.length===0){
            //deicr que es 0
            inputValidadores[0].entrada=false;
            inputValidadores[1].entrada=true;
            if(this.state.tempEntrada.length>0){
                this.setState({
                    invalidInOut:1, //arreglo vacio
                    botonValidadorIn:true
                })
            }
            else{
                this.setState({
                    invalidInOut:1, //arreglo vacio
                })
            }
            status= false;
        }
        if(this.state.salidas.length===0){
            //decir que es 0
            inputValidadores[0].salida=false;
            inputValidadores[1].salida=true;
            if(this.state.tempSalida.length>0){
                this.setState({
                    invalidInOut:1, //arreglo vacio
                    botonValidadorOut:true
                })
            }
            else{
                this.setState({
                    invalidInOut:1, //arreglo vacio
                })
            }
        }

        if(this.state.entradas.length!==this.state.salidas.length){
            inputValidadores[0].salida=false;
            inputValidadores[1].salida=true;
            inputValidadores[0].entrada=false;
            inputValidadores[1].entrada=true;
            this.setState({
                invalidInOut:2 // arreglo desicual
            })
            //decir que es cual es mayor
            status= false;
        }
        if(this.state.topico===''){
            inputValidadores[0].topic=false;
            inputValidadores[1].topic=true;
            status= false;
        }
       
        this.setState({
            aceptar:status
        });
        return status;
        
    }

    CrearEnunciadoAPI=event=>{
        console.log(this.state);
        var fechaPlus= new Date();

        if(this.validador()){
            
            var exercise={
                'exerciseID': this.state.data.exerciseID,
                'exerciseTitle': this.state.titulo,
                'exerciseBody': this.state.enunciado,
                'exerciseLenguge': this.state.lenguaje,
                'exerciseIntialDate': (this.state.publicar)?fechaPlus:null,//this.state.fechaInicial+"T03:00:00.000+0000",
                'exerciseInput': this.arrayToFormatInOut(this.state.entradas), 
                'exerciseOutput': this.arrayToFormatInOut(this.state.salidas),
                'exerciseFinishlDate':  (this.state.publicar)?this.sumaFecha(this.state.dias,fechaPlus):null,//this.state.fechaFinal+"T03:00:00.000+0000",
                'exerciseScore': this.state.PuntosTotales,
                'exercisePublished': this.state.publicar,
                'exerciseDifficulty':this.state.dificultad,
                'exerciseDays':	this.state.dias,
                'exerciseTopic': this.state.topico
                }
            
            console.log(exercise);

            Axios.post('http://localhost:8082/exercise',exercise)
                .then(Response =>{
                    console.log(Response);
                    this.setState({
                        alertOpen:true,
                        alertType: "success",
                    })
                }
                ).catch(error=>{
                    this.setState({
                        alertOpen: true,
                        alertType: "danger"
                    });
                    console.log(error);
                });
  
        }

    }
    onDismiss=()=> {
        this.setState({ alertOpen: false });
      }

    //""
    sumaFecha(tiempo, fecha)
        {
            var dia = fecha.getDate(),
             mes = fecha.getMonth() + 1,
             anio = fecha.getFullYear(),
            //tiempo = prompt("Ingrese la cantidad de días a añadir"),
             addTime = tiempo * 86400; //Tiempo en segundos
     
            fecha.setSeconds(addTime); //Añado el tiempo
        return (fecha);
        }
    
    findTopic(topico){
        for (var topics in this.state.topics){
            console.log(topics);
        }
    }

    //Entrada: Arreglo
    ListarInOut(InOut,which){
        return (
            InOut && InOut.map((dato,key)=>{

            var estado=(which===1)?this.state.inputEntradasEnabled[key]:this.state.inputSalidasEnabled[key];
            var iconVar=(!estado)?"fa-pencil btn-outline-info":"fa-check btn-outline-success";
            return <Row key={key}>
                
                <Col md={9} style={{width:"70%"}}>
                    <Input  disabled={!estado} value={dato} onChange={this.handleChangeArray(which,key)}/>
                    </Col>
                <Col md={1} style={{width:"10%",textAlign:"left"}}>
                    <Label>
                        <i id={key.toString()} className={"btn-pill fa "+iconVar+" fa-lg font-3xl"}
                         onClick={()=>{this.handleEditEnabled(which,key);}} ></i>
                    </Label>
                </Col>
                <Col md={1} style={{width:"10%",textAlign:"left"}}>
                    <Label>
                        <i id={key.toString()} className="btn-pill fa fa-close fa-lg btn-outline-danger font-3xl"
                         onClick={()=>{this.handleDeleteArray(which,key);}} ></i>
                    </Label>
                </Col>
                
            </Row>
        }));
    }
    createModal(){
        return <Modal isOpen={this.state.alertOpen} className={"modal-"+this.state.alertType} >
              <ModalHeader >Edición</ModalHeader>
              <ModalBody>
              {(this.state.alertType==="success")?"Se ha editado el enunciado de forma correcta":"Se tuvo un problema con la conexion intente mas tarde..."}
              </ModalBody>
              <ModalFooter>
                  {(this.state.alertType==="success")?
                    <Link to={'/enunciadosPro'}>
                       <Button color={this.state.alertType} >Aceptar</Button>
                    </Link>:
                     <Button color={this.state.alertType} toggle={this.onDismiss}>Aceptar</Button>
                }
                  </ModalFooter>
            </Modal>
    }

    popoverInOut(InOut,arreglo){

        return(
            <Popover  placement="top" isOpen={(arreglo.length>0)?false:this.state[InOut]} target={InOut} >
                <PopoverHeader className="text-center">Apreta aqui<br/>para agregar</PopoverHeader>
            </Popover>
        )
    }

    render(){
        const feedBack="Complete este campo";
        const feedBackNotNull="No puedes agregar un elemento vacio";
        const feedBackDiference="Las cantidad de entradas no es el mismo que de salidas";
        const feedBackInOutZero="No tiene entrada o salida, debe agregar al menos una para cada una de ellas"
        const feedBackNum="Debe ser un número";
        const feedBackNumPlus="Debe ser un número positivo";
        const feedBackTopic="Debes seleccionar un topico";
        return (

            <Row>
                  <Col>
                    
                  <Card>
                      
                    <CardHeader >
                        <i className="fa fa-align-justify" ></i> Edición de Enunciado
                    </CardHeader>
                    <Alert color={this.state.alertType} isOpen={this.state.alertOpen} toggle={this.onDismiss}>
                        {(this.state.alertType==="success")?"Nuevo Enunciado Creado Con Exito":"Se tuvo un problema con la conexion intente mas tarde..."}
                    </Alert>
                    <CardBody>
                        {this.state.espera?
                            <div className="row">
                                <div className ='col'>
                                    <div className='defaultSpinner' ></div>
                                </div>
                            </div>
                            :
                    <div>
                    <Form>
                        
                        <FormGroup>
                            <Label  htmlFor="tituloEnun">Titulo</Label>
                            <Input  type="text" name="titulo" valid={inputValidadores[0].titulo} invalid={inputValidadores[1].titulo} id="tituloEnun" aria-describedby="info" 
                            placeholder="Introduce el titulo del Enunciado" onChange={this.handleChange} value={this.state.titulo}/>
                            <FormFeedback>{feedBack}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="bodyEnunciado">Enunciado</Label>
                            <Input type="textarea"  name="enunciado" id="bodyEnunciado" rows="10" style={{resize:'none'}} 
                             valid={inputValidadores[0].enunciado} invalid={inputValidadores[1].enunciado} value={this.state.enunciado}
                            placeholder="Introduce el Cuerpo del Enunciado" onChange={this.handleChange}/>
                            <FormFeedback>{feedBack}</FormFeedback>

                        </FormGroup>

                        <Row>
                            <Col>
                                <FormGroup>
                                    
                                        <Label>Lenguaje</Label>
                                        <div></div>
                                        <FormGroup check inline>
                                            <Input  className="form-check-input" type="radio" name="lenguaje" id="inlineRadio1" value="1" defaultChecked={this.state.lenguaje===1} onClick={this.handleChange}/>
                                            <Label check htmlFor="inlineRadio1">Python</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Input  className="form-check-input" type="radio" name="lenguaje" id="inlineRadio2" value="2"  defaultChecked={this.state.lenguaje===2} onClick={this.handleChange}/>
                                            <Label check htmlFor="inlineRadio2">Java</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Input  className="form-check-input" type="radio" name="lenguaje" id="inlineRadio3" value="3"  defaultChecked={this.state.lenguaje===3} onClick={this.handleChange}/>
                                            <Label check htmlFor="inlineRadio3">C </Label>
                                        </FormGroup>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label htmlFor="topic">Topico</Label>
                                    <Input type="select" name="topico" defaultValue="" style={{width:"82%"}} onChange={this.handleChange} 
                                        valid={inputValidadores[0].topic} invalid={inputValidadores[1].topic}>
                                        <option disabled hidden value="" >Topicos</option>
                                        {Topicos &&  Topicos.map((topico,key)=>{
                                            return <option key={key} id={key} value={topico} >{topico}</option>
                                        })}
                                    </Input>
                                    <FormFeedback>{feedBackTopic}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>

                        
                        <Row >
                            
                            <Col md={6}>
                                <FormGroup>
                                    <Label  htmlFor="entrada">Entradas</Label>
                                    {this.ListarInOut(this.state.entradas,1)}
                                    <br/>
                                    <Row>
                                        
                                            <Col md={10} style={{width:"80%"}}>
                                                <Input value={this.state.tempEntrada} disabled={!this.state.inputEntradaEnabled} 
                                                valid={inputValidadores[0].entrada} invalid={inputValidadores[1].entrada}
                                                name="tempEntrada" id="entrada" onChange={this.handleChange}/>
                                                <FormFeedback>{(this.state.invalidInOut===0)?feedBack:(this.state.invalidInOut===1)?feedBackInOutZero:feedBackDiference}</FormFeedback>
                                            </Col>
                                            <Col md={1} style={{width:"10%",textAlign:"left"}}>
                                                <Label disabled={!this.state.inputEntradaEnabled} id={"botonValidadorIn"} onClick={()=>{this.handleInsertArray("entrada");}} >
                                                    <i className="btn-pill fa fa-plus-circle fa-lg btn-outline-info font-5xl"
                                                    style={{ color: '#89e4ff'}} ></i>
                                                </Label>
                                                {this.popoverInOut("botonValidadorIn",this.state.entradas)}
                                            </Col>
                                        
                                    </Row>
                                    <small id="emailHelp" className="form-text text-muted">Las entradas deben corresponder misma cantidad que las salidas.</small>
                                </FormGroup>
                            </Col>
                            
                            <Col md={6} >
                                <FormGroup>
                                    <Label htmlFor="salida" >Salidas</Label>
                                    {this.ListarInOut(this.state.salidas,2)}
                                    <br/>
                                    <Row>
                                    
                                        <Col md={10} style={{width:"80%"}}>
                                            <Input value={this.state.tempSalida} name="tempSalida" 
                                            disabled={!this.state.inputSalidaEnabled} id="salida" 
                                            valid={inputValidadores[0].salida} invalid={inputValidadores[1].salida}
                                            onChange={this.handleChange}/>
                                            <FormFeedback>{(this.state.invalidInOut===0)?feedBack:(this.state.invalidInOut===1)?feedBackInOutZero:feedBackDiference}</FormFeedback>
                                            </Col>
                                        <Col md={1} style={{width:"10%",textAlign:"left"}}>
                                            <Label onClick={()=>{this.handleInsertArray("salida");}}  id={"botonValidadorOut"} >
                                                <i className="btn-pill fa fa-plus-circle fa-lg btn-outline-info font-5xl"
                                                style={{ color: '#89e4ff'}} ></i>
                                            </Label>
                                            {this.popoverInOut("botonValidadorOut",this.state.salidas)}
                                        </Col>
                                    
                                    </Row>
                                    <small id="emailHelp" className="form-text text-muted help-block">Las salidas deben corresponder misma cantidad que las entradas.</small>
                                    </FormGroup>
                            </Col>
                            
                        </Row>
                        
                        <br/>
                        <FormGroup>
                            <Label>Dificultad</Label>
                            <div></div>
                            <FormGroup check inline>
                                <Input  className="form-check-input" type="radio" name="dificultad" id="inlineRadio4" value="1"  defaultChecked={this.state.dificultad===1} onClick={this.handleChange}/>
                                <Label check htmlFor="inlineRadio4">Fácil</Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Input  className="form-check-input" type="radio" name="dificultad" id="inlineRadio5" value="2"  defaultChecked={this.state.dificultad===2} onClick={this.handleChange}/>
                                <Label check htmlFor="inlineRadio5">Medio</Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Input  className="form-check-input" type="radio" name="dificultad" id="inlineRadio6" value="3"  defaultChecked={this.state.dificultad===3} onClick={this.handleChange}/>
                                <Label check htmlFor="inlineRadio6">Difícil </Label>
                            </FormGroup>
                        </FormGroup>

                        <Row>
                            <Col>
                            <Row>
                                <Col md={10} style={{width:"80%"}}>
                                <FormGroup >
                                    <Label  htmlFor="dias">Días para Realizar</Label>
                                    <Input  type="number" id="dias" name="dias"
                                     className="form-control" min="0" 
                                     valid={inputValidadores[0].dias} invalid={inputValidadores[1].dias}
                                     value={this.state.dias} onChange={this.handleChange}/>
                                    <FormFeedback>{(this.state.invalidDias===0)?feedBack:(this.state.invalidDias===1)?feedBackNum:feedBackNumPlus}</FormFeedback>
                                </FormGroup>
                                </Col>
                                </Row>
                            </Col>
                            <Col>
                            <Row>
                                <Col md={10} style={{width:"80%"}}>
                                <FormGroup >
                                    <Label htmlFor="puntosTotales">Puntaje Total del Enunciado</Label>
                                    <Input  type="number" name="PuntosTotales" className="form-control" 
                                    min="1"  id="puntosTotales" 
                                    valid={inputValidadores[0].puntaje} invalid={inputValidadores[1].puntaje}
                                    onChange={this.handleChange} value={this.state.PuntosTotales}/>
                                    <FormFeedback>{(this.state.invalidPuntaje===0)?feedBack:(this.state.invalidPuntaje===1)?feedBackNum:feedBackNumPlus}</FormFeedback>
                                </FormGroup>
                                </Col>
                                </Row>
                            </Col>
                        </Row>

                        <FormGroup row>
                            <Col md={3}><Label htmlFor="publicar">Publicar Ahora</Label></Col>
                            <Col style={{float:"right"}}>
                                <FormGroup check className="checkbox">
                                
                                    <Input className="form-check-input" type="checkbox" id="publicar" name="publicar" 
                                    value={this.state.publicar} defaultChecked={this.state.publicar} 
                                    onClick={this.handleClickPublicar}/>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        
    
                    </Form>
                
                    <br/>
                    
                    <Button   onClick={this.CrearEnunciadoAPI} disabled={this.state.aceptar}>
                            <strong> editar</strong>
                    </Button>
                    </div> 
                        }
                    </CardBody>
                     <Alert color={this.state.alertType} isOpen={this.state.alertOpen} toggle={this.onDismiss}>
                        {(this.state.alertType==="success")?"Cambios efectuados correctamente":"Se tuvo un problema con la conexion intente mas tarde..."}
                    </Alert>
                    {this.createModal()}
                </Card>
               
                  </Col>  
                </Row>
            
        );
    }
}
const mapStateToProps = state =>{
    return{
      infoUsuarios: state.infoUsuarios,
    };
  };
  

export default connect(mapStateToProps)(EditEnunciado);