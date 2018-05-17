import React, {Component} from 'react';
import Axios from 'axios';

class NewEnunciado extends Component{
    constructor() {
        super();
        this.state = {
            titulo:"",
            enunciado:"",
            lenguaje:1, /* 1 = Python; 2 = Java; 3 = C */
            fechaInicial:"",
            fechaFinal:"",
            PuntosTotales:1,
            fechaHoy : ""+(new Date().getFullYear())+"-"+(new Date().getMonth())+"-"+(new Date().getDate()),
            entradas:"",
            salidas:""

        };
    }

    handleChange=event=>{
        
        //console.log(event.target.value);
        var name=event.target.name;
        var value=event.target.value;
        this.setState({
            [name]:value
        });

        

    }
    stringToFormatInOut(texto){
        console.log(texto);
        texto=texto.split("\n");
        console.log(texto);
        var aux='';
        var complete='';
        for(aux in texto){
            if(complete==''){
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

        var exercise={
            exerciseTitle: this.state.titulo,
            exerciseBody: this.state.enunciado,
            exerciseIntialDate: this.state.fechaInicial,
            exerciseInput: this.stringToFormatInOut(this.state.entradas), 
            exerciseOutput: this.stringToFormatInOut(this.state.salidas),
            exerciseFinishlDate: this.state.fechaFinal,
            exerciseScore: this.state.PuntosTotales,
            exercisePublished: false   
        }

        Axios.post('http://localhost:8082/exercise',exercise)
        .then(Response =>{
            console.log(Response);
        }

        ).catch(function(error){
            console.log(error);
        });
        console.log(exercise);
    }

    render(){
        var ej1="ejemplo:\n2\n4\n8";
        var ej2="ejemplo:\n4\n16\n64";

        return (
            <form>
                <div className="form-group">
                    <label >Titulo</label>
                    <input type="text" className="form-control" name="titulo" id="tituloEnun" aria-describedby="" placeholder="Introduce el titulo del Enunciado" onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label >Enunciado</label>
                    <textarea className="form-control" name="enunciado" id="bodyEnunciado" rows="10" placeholder="Introduce el Cuerpo del Enunciado" onChange={this.handleChange}></textarea>
                </div>

                <div className="form-group"  >
                    <label >Lenguaje</label>
                    <div></div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="lenguaje" id="inlineRadio1" value="1" defaultChecked onClick={this.handleChange}/>
                        <label className="form-check-label">Python</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="lenguaje" id="inlineRadio2" value="2" disabled onClick={this.handleChange}/>
                        <label className="form-check-label" >Java</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="lenguaje" id="inlineRadio3" value="3" disabled onClick={this.handleChange}/>
                        <label className="form-check-label" >C </label>
                    </div>
                </div>
                
                <div className="row">
                    <div className="form-group col">
                        <label >Entradas</label>
                        <textarea className="form-control" name="entradas" id="entradas" aria-describedby="emailHelp" placeholder={ej1} rows="5" onChange={this.handleChange}/>
                        <small id="emailHelp" className="form-text text-muted">Las entradas deben estar separadas el salto de linea, y debe corresponder a la misma en la salidas.</small>
                    </div>

                    <div className="form-group col">
                        <label >Salidas</label>
                        <textarea className="form-control" id="salidas" name="salidas" aria-describedby="emailHelp" placeholder={ej2} rows="5" onChange={this.handleChange}/>
                        <small id="emailHelp" className="form-text text-muted">Las salidas deben estar separadas el salto de linea, y deben corresponder a la misma con las entradas.</small>
                    </div>
                </div>
  


                <div className="row">
                    <div className="col form-group">
                        <label >Fecha inicial</label>
                        <div></div>
                        <input type="date" id="fechaIni" name='fechaInicial' min={this.state.fechaHoy} onChange={this.handleChange}/>
                    </div>
                    <div className="col form-group">
                        <label>Fecha Final</label>
                        <div></div>
                        <input type="date" id="fechaFinal" name='fechaFinal' min={this.state.fechaHoy} onChange={this.handleChange}/>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col">
                    <label>Puntaje Total del Enunciado</label>
                        <input type="number" name="PuntosTotales" className="form-control" min="1" pattern="[0-9]" id="puntosTotales" aria-describedby="" placeholder="Puntaje" onChange={this.handleChange}/>
                    </div>
                    <div className="col"></div>
                </div>
                <div>
                   <strong onClick={this.CrearEnunciadoAPI} > Crear</strong>
                    </div>
                <br/>
                <br/>
            </form>
        );
    }
}

export default NewEnunciado;