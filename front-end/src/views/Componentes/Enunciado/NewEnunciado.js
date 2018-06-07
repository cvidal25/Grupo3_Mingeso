import React, {Component} from 'react';
import { Card, CardBody, CardHeader, Col, Row, Input,DropdownItem,DropdownMenu,
    DropdownToggle,Form,FormGroup,FormText,FormFeedback,InputGroup,InputGroupAddon,
    InputGroupText,Label,Button,ButtonDropdown,} from 'reactstrap';
import Axios from 'axios';

var inputValidadores=
[{
    titulo:false,
    enunciado:false,
    dias:false,
    puntaje:false,
    entrada:false,
    salida:false
},{
    titulo:false,
    enunciado:false,
    dias:false,
    puntaje:false,
    entrada:false,
    salida:false
}]; //valid //invalid

class NewEnunciado extends Component{
    constructor() {
        super();
        this.state = {
            items:[],
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
        };
        
    }
    componentDidMount(){
        
    };

    handleChange=event=>{
        
        //console.log(event.target.value);
        var name=event.target.name;
        var value=event.target.value;
        this.setState({
            [name]:value
        });
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
            
            //Validador
            if(this.state.tempEntrada===""){
                inputValidadores[1].entrada=true;
                this.setState({
                    lenguaje:this.state.lenguaje
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
            if(this.state.tempSalida===""){
                inputValidadores[0].salida=false;
                inputValidadores[1].salida=true;
                this.setState({
                    lenguaje:this.state.lenguaje
                })
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
            status= false;
        }
        if(this.state.salidas.length===0){
            //decir que es 0
            inputValidadores[0].salida=false;
            inputValidadores[1].salida=true;
            status= false;
        }

        if(this.state.entradas.length>this.state.salidas.length){
            
            //decir que es cual es mayor
            status= false;
        }
        if(this.state.entradas.length<this.state.salidas.length){
            
            // decir cual es mayor
            status= false;
        }
        this.setState({
            aceptar:status
        });
        return status;
        
    }

    CrearEnunciadoAPI=event=>{
        console.log(this.state);
        this.validador()
        
        

        /*var exercise={
            'exerciseTitle': this.state.titulo,
           'exerciseBody': this.state.enunciado,
           'exerciseLenguge': this.state.lenguaje,
            'exerciseIntialDate': this.state.fechaInicial+"T03:00:00.000+0000",
            'exerciseInput': this.stringToFormatInOut(this.state.entradas), 
            'exerciseOutput': this.stringToFormatInOut(this.state.salidas),
            'exerciseFinishlDate': this.state.fechaFinal+"T03:00:00.000+0000",
            'exerciseScore': this.state.PuntosTotales,
            'exercisePublished': false   
        }
        Axios.post('http://localhost:8082/exercise',exercise)
        .then(Response =>{
            console.log(Response);
        }
        ).catch(function(error){
            console.log(error);
        });
        console.log(exercise);*/
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

    render(){
        var feedBack="Complete este campo"
        //var feedBackNumDias=(this.state.invalidDias===0)?feedBack:"Debe ser un número"
        return (

            <Row>
                  <Col>
                  <Card>
                    <CardHeader >
                        <i className="fa fa-align-justify" ></i> Nuevo Enunciado { isNaN(parseInt("hola mundo")).toString()}
                    </CardHeader>
                    <CardBody>
                    <Form>
                        
                        <FormGroup>
                            <Label  htmlFor="tituloEnun">Titulo</Label>
                            <Input  type="text" name="titulo" valid={inputValidadores[0].titulo} invalid={inputValidadores[1].titulo} id="tituloEnun" aria-describedby="info" 
                            placeholder="Introduce el titulo del Enunciado" onChange={this.handleChange}/>
                            <FormFeedback>{feedBack}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="bodyEnunciado">Enunciado</Label>
                            <Input type="textarea"  name="enunciado" id="bodyEnunciado" rows="10" style={{resize:'none'}} 
                             valid={inputValidadores[0].enunciado} invalid={inputValidadores[1].enunciado}
                            placeholder="Introduce el Cuerpo del Enunciado" onChange={this.handleChange}/>
                            <FormFeedback>{feedBack}</FormFeedback>

                        </FormGroup>

                        <FormGroup>
                            <Label>Lenguaje</Label>
                            <div></div>
                            <FormGroup check inline>
                                <Input  className="form-check-input" type="radio" name="lenguaje" id="inlineRadio1" value="1" defaultChecked onClick={this.handleChange}/>
                                <Label check htmlFor="inlineRadio1">Python</Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Input  className="form-check-input" type="radio" name="lenguaje" id="inlineRadio2" value="2" onClick={this.handleChange}/>
                                <Label check htmlFor="inlineRadio2">Java</Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Input  className="form-check-input" type="radio" name="lenguaje" id="inlineRadio3" value="3" onClick={this.handleChange}/>
                                <Label check htmlFor="inlineRadio3">C </Label>
                            </FormGroup>
                        </FormGroup>

                        
                        <Row >
                            <Col md={6}>
                                <Label  htmlFor="entrada">Entradas</Label>
                                {this.ListarInOut(this.state.entradas,1)}
                                <br/>
                                <Row>
                                    <Col md={10} style={{width:"80%"}}>
                                        <Input value={this.state.tempEntrada} disabled={!this.state.inputEntradaEnabled} 
                                         valid={inputValidadores[0].entrada} invalid={inputValidadores[1].entrada}
                                        name="tempEntrada" id="entrada" onChange={this.handleChange}/>
                                    </Col>
                                    <Col md={1} style={{width:"10%",textAlign:"left"}}>
                                        <Label disabled={!this.state.inputEntradaEnabled} onClick={()=>{this.handleInsertArray("entrada");}} >
                                            <i className="btn-pill fa fa-plus-circle fa-lg btn-outline-info font-5xl"
                                            style={{ color: '#89e4ff'}} ></i>
                                        </Label>
                                    </Col>
                                </Row>
                                <small id="emailHelp" className="form-text text-muted">Las entradas deben corresponder misma cantidad que las salidas.</small>
                                 
                            </Col>
                            
                            <Col md={6} >
                                <Label htmlFor="salida" >Salidas</Label>
                                {this.ListarInOut(this.state.salidas,2)}
                                <br/>
                                <Row>
                                    <Col md={10} style={{width:"80%"}}>
                                        <Input value={this.state.tempSalida} name="tempSalida" 
                                        disabled={!this.state.inputSalidaEnabled} id="salida" 
                                        valid={inputValidadores[0].salida} invalid={inputValidadores[1].salida}
                                        onChange={this.handleChange}/>
                                        </Col>
                                    <Col md={1} style={{width:"10%",textAlign:"left"}}>
                                        <Label onClick={()=>{this.handleInsertArray("salida");}} >
                                            <i className="btn-pill fa fa-plus-circle fa-lg btn-outline-info font-5xl"
                                            style={{ color: '#89e4ff'}} ></i>
                                        </Label>
                                    </Col>
                                </Row>
                                <small id="emailHelp" className="form-text text-muted help-block">Las salidas deben corresponder misma cantidad que las entradas.</small>
                            </Col>
                        </Row>
                        
                        <br/>
                        <FormGroup>
                            <Label>Dificultad</Label>
                            <div></div>
                            <FormGroup check inline>
                                <Input  className="form-check-input" type="radio" name="dificultad" id="inlineRadio4" value="1" defaultChecked onClick={this.handleChange}/>
                                <Label check htmlFor="inlineRadio4">Fácil</Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Input  className="form-check-input" type="radio" name="dificultad" id="inlineRadio5" value="2" onClick={this.handleChange}/>
                                <Label check htmlFor="inlineRadio5">Medio</Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Input  className="form-check-input" type="radio" name="dificultad" id="inlineRadio6" value="3" onClick={this.handleChange}/>
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
                                     defaultValue={0} onChange={this.handleChange}/>
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
                                    min="1"  id="puntosTotales"  defaultValue={1} 
                                    valid={inputValidadores[0].puntaje} invalid={inputValidadores[1].puntaje}
                                    onChange={this.handleChange}/>
                                </FormGroup>
                                </Col>
                                </Row>
                            </Col>
                        </Row>

                        <FormGroup row>
                            <Col md="2"><Label htmlFor="publicar">Publicar Ahora</Label></Col>
                            <Col style={{float:"right"}}>
                                <FormGroup check className="checkbox">
                                    <Input className="form-check-input" type="checkbox" id="publicar" name="publicar" 
                                    value={this.state.publicar} checked={this.state.publicar} 
                                    onClick={this.handleClickPublicar}/>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        
    
                    </Form>
                    <Button  onClick={this.CrearEnunciadoAPI} disabled={this.state.aceptar}>
                            <strong> Crear</strong>
                        </Button>
                    
                    </CardBody>
                </Card>
                  </Col>  
                </Row>
            
        );
    }
}

export default NewEnunciado;