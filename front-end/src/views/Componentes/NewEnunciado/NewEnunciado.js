import React, {Component} from 'react';
import { Card, CardBody, CardHeader, Col, Row, Input } from 'reactstrap';
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
            entradas:"",
            salidas:"",
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
    stringToFormatInOut(texto){
        texto=texto.split("\n");
        var aux='';
        var complete='';
        for(aux in texto){
            if(complete===''){
                complete=texto[aux];
            }
            else{
                complete=complete+'/@'+texto[aux]
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
                        <div className="form-group">
                            <label >Titulo</label>
                            <Input required type="text" className="form-control" name="titulo" id="tituloEnun" aria-describedby="" placeholder="Introduce el titulo del Enunciado" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label >Enunciado</label>
                            <textarea required className='form-control form-control' name="enunciado" id="bodyEnunciado" rows="10" style={{resize:'none'}} placeholder="Introduce el Cuerpo del Enunciado" onChange={this.handleChange}></textarea>
                        </div>

                        <div className="form-group"  >
                            <label >Lenguaje</label>
                            <div></div>
                            <div className="form-check form-check-inline">
                                <Input required className="form-check-input" type="radio" name="lenguaje" id="inlineRadio1" value="1" defaultChecked onClick={this.handleChange}/>
                                <label className="form-check-label">Python</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <Input required className="form-check-input" type="radio" name="lenguaje" id="inlineRadio2" value="2" disabled onClick={this.handleChange}/>
                                <label className="form-check-label" >Java</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <Input required className="form-check-input" type="radio" name="lenguaje" id="inlineRadio3" value="3" disabled onClick={this.handleChange}/>
                                <label className="form-check-label" >C </label>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="form-group col">
                                <label >Entradas</label>
                                <textarea required className="form-control" name="entradas" id="entradas" aria-describedby="emailHelp" placeholder={ej1} rows="5" onChange={this.handleChange} style={{resize:'none'}}/>
                                <small id="emailHelp" className="form-text text-muted">Las entradas deben estar separadas el salto de linea, y debe corresponder a la misma en la salidas.</small>
                            </div>

                            <div className="form-group col">
                                <label >Salidas</label>
                                <textarea required className="form-control" id="salidas" name="salidas" aria-describedby="emailHelp" placeholder={ej2} rows="5" onChange={this.handleChange} style={{resize:'none'}}/>
                                <small id="emailHelp" className="form-text text-muted">Las salidas deben estar separadas el salto de linea, y deben corresponder a la misma con las entradas.</small>
                            </div>
                        </div>
        


                        <div className="row">
                            <div className="col form-group">
                                <label >Fecha inicial</label>
                                <div></div>
                                <Input required type="date" id="fechaIni" name='fechaInicial'  onChange={this.handleChange}/>
                            </div>
                            <div className="col form-group">
                                <label>Fecha Final</label>
                                <div></div>
                                <Input required type="date" id="fechaFinal" name='fechaFinal' style={{width:'100%'}} onChange={this.handleChange}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col">
                            <label>Puntaje Total del Enunciado</label>
                                <Input required type="number" name="PuntosTotales" className="form-control" min="1" pattern="[0-9]" id="puntosTotales" aria-describedby="" defaultValue={1} onChange={this.handleChange}/>
                            </div>
                            <div className="col"></div>
                        </div>
                        <div>
                            
                            </div>
                        <br/>
                        <br/>
                        
                    </form>
                    <button  onClick={this.CrearEnunciadoAPI} disabled={this.state.aceptar}>
                        <strong onClick={this.CrearEnunciadoAPI}> Crear</strong>
                            </button>
                    </CardBody>
                </Card>
                  </Col>  
                </Row>
            
        );
    }
}

export default NewEnunciado;