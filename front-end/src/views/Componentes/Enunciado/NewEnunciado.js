import React, {Component} from 'react';
import { Card, CardBody, CardHeader, Col, Row, Input,DropdownItem,DropdownMenu,
    DropdownToggle,Form,FormGroup,FormText,FormFeedback,InputGroup,InputGroupAddon,
    InputGroupText,Label,Button,ButtonDropdown,} from 'reactstrap';
import { AppSwitch } from '@coreui/react';
import Axios from 'axios';

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
            entradas:[],
            salidas:[],
            tempEntrada:"",
            tempSalida:"",
            publicar:false,
            aceptar:false,

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
        /*if(estados.titulo!=="" && estados.enunciado!=="" && estados.fechaFinal!==""
        && estados.fechaFinal!=="" && estados.entradas!=="" && estados.salidas!==""){
            this.setState({
                aceptar:false
            });
        }
        else{
            this.setState({
                aceptar:true
            })
        }*/
    }
    handleClickPublicar=event=>{
        console.log(event.target);
        var name=event.target.name;
        var value=event.target.value;
       this.setState({
           [name]:!this.state.publicar
       });
    }
    
    handleInsertArray=nombreInOut=>{
            console.log(nombreInOut);
        var InOut;
        if(nombreInOut==="entrada"){
            InOut=this.state.entradas;
            //Validador
            if(this.state.tempEntrada===""){
                //decir que esta vacio
                return;
            }

            InOut.push(this.state.tempEntrada);
            this.setState({
                entradas:InOut,
                tempEntrada:""
            });
        }
        else{
            InOut=this.state.salidas;
            //validador
            if(this.state.tempSalida===""){
                //decir que esta vacio
                return;
            }
            InOut.push(this.state.tempSalida);
            this.setState({
                salidas:InOut,
                tempSalida:""
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

    CrearEnunciadoAPI=event=>{
        console.log(this.state);


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
            InOut && InOut.map((dato,key)=>
            <Row key={key}>
                <Col md={10} style={{width:"80%"}}>
                    <Input  disabled value={dato}/>
                    </Col>
                <Col md={1} style={{width:"10%",textAlign:"left"}}>
                    <Label>
                        <i id={key.toString()} className="btn-pill fa fa-close fa-lg btn-outline-danger font-3xl"
                         onClick={()=>{this.handleDeleteArray(which,key);}} ></i>
                    </Label>
                </Col>
            </Row>
            ));
    }

    render(){
        var ej1="ejemplo:\n2\n4\n8";
        var ej2="ejemplo:\n4\n16\n64";

        return (

            <Row>
                  <Col>
                  <Card>
                    <CardHeader >
                        <i className="fa fa-align-justify" ></i> Nuevo Enunciado
                    </CardHeader>
                    <CardBody>
                    <form>
                        <FormGroup>
                            <Label  htmlFor="tituloEnun">Titulo</Label>
                            <Input required type="text" name="titulo" id="tituloEnun" aria-describedby="info" 
                            placeholder="Introduce el titulo del Enunciado" onChange={this.handleChange}/>
                            
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="bodyEnunciado">Enunciado</Label>
                            <Input type="textarea" required name="enunciado" id="bodyEnunciado" rows="10" style={{resize:'none'}} placeholder="Introduce el Cuerpo del Enunciado" onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup>
                            <Label>Lenguaje</Label>
                            <div></div>
                            <FormGroup check inline>
                                <Input required className="form-check-input" type="radio" name="lenguaje" id="inlineRadio1" value="1" defaultChecked onClick={this.handleChange}/>
                                <Label check htmlFor="inlineRadio1">Python</Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Input required className="form-check-input" type="radio" name="lenguaje" id="inlineRadio2" value="2" onClick={this.handleChange}/>
                                <Label check htmlFor="inlineRadio2">Java</Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Input required className="form-check-input" type="radio" name="lenguaje" id="inlineRadio3" value="3" onClick={this.handleChange}/>
                                <Label check htmlFor="inlineRadio3">C </Label>
                            </FormGroup>
                        </FormGroup>

                        
                        <Row >
                            <Col md={6}>
                                <Label  htmlFor="entrada">Entradas</Label>
                                {this.ListarInOut(this.state.entradas,1)}
                                <Row>
                                    <Col md={10} style={{width:"80%"}}>
                                        <Input value={this.state.tempEntrada} name="tempEntrada" id="entrada" onChange={this.handleChange}/>
                                    </Col>
                                    <Col md={1} style={{width:"10%",textAlign:"left"}}>
                                        <Label onClick={()=>{this.handleInsertArray("entrada");}} >
                                            <i className="btn-pill fa fa-plus-circle fa-lg btn-outline-info font-5xl"
                                            style={{ color: '#89e4ff'}} ></i>
                                        </Label>
                                    </Col>
                                </Row>
                                <small id="emailHelp" className="form-text text-muted">Las entradas deben estar separadas el salto de linea, y debe corresponder a la misma en la salidas.</small>
                                 
                            </Col>
                            
                            <Col md={6} >
                                <Label htmlFor="salida" >Salidas</Label>
                                {this.ListarInOut(this.state.salidas,2)}
                                <Row>
                                    <Col md={10} style={{width:"80%"}}>
                                        <Input value={this.state.tempSalida} name="tempSalida" id="salida" onChange={this.handleChange}/>
                                        </Col>
                                    <Col md={1} style={{width:"10%",textAlign:"left"}}>
                                        <Label onClick={()=>{this.handleInsertArray("salida");}} >
                                            <i className="btn-pill fa fa-plus-circle fa-lg btn-outline-info font-5xl"
                                            style={{ color: '#89e4ff'}} ></i>
                                        </Label>
                                    </Col>
                                </Row>
                                <small id="emailHelp" className="form-text text-muted">Las salidas deben estar separadas el salto de linea, y deben corresponder a la misma con las entradas.</small>
                            </Col>
                        </Row>
                        
                        <br/>
                        <FormGroup>
                            <Label>Dificultad</Label>
                            <div></div>
                            <FormGroup check inline>
                                <Input required className="form-check-input" type="radio" name="dificultad" id="inlineRadio1" value="1" defaultChecked onClick={this.handleChange}/>
                                <Label check htmlFor="inlineRadio1">Fácil</Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Input required className="form-check-input" type="radio" name="dificultad" id="inlineRadio2" value="2" onClick={this.handleChange}/>
                                <Label check htmlFor="inlineRadio2">Medio</Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Input required className="form-check-input" type="radio" name="dificultad" id="inlineRadio3" value="3" onClick={this.handleChange}/>
                                <Label check htmlFor="inlineRadio3">Difícil </Label>
                            </FormGroup>
                        </FormGroup>

                        <Row>
                            <Col>
                            <Row>
                                <Col md={10} style={{width:"80%"}}>
                                <FormGroup >
                                    <Label  htmlFor="dias">Días para Realizar</Label>
                                    <Input required type="number" id="dias" name="PuntosTotales" className="form-control" min="0" pattern="[0-9]" defaultValue={0} onChange={this.handleChange}/>
                                </FormGroup>
                                </Col>
                                </Row>
                            </Col>
                            <Col>
                            <Row>
                                <Col md={10} style={{width:"80%"}}>
                                <FormGroup >
                                    <Label htmlFor="puntosTotales">Puntaje Total del Enunciado</Label>
                                    <Input required type="number" name="PuntosTotales" className="form-control" min="1" pattern="[0-9]" id="puntosTotales"  defaultValue={1} onChange={this.handleChange}/>
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
                        
                    

                        
                    </form>
                    <button  onClick={this.CrearEnunciadoAPI} disabled={this.state.aceptar}>
                            <strong> Crear</strong>
                        </button>
                    
                    </CardBody>
                </Card>
                  </Col>  
                </Row>
            
        );
    }
}

export default NewEnunciado;