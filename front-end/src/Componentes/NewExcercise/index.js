import React, {Component} from 'react';

class NewExcercise extends Component{
    constructor() {
        super();
        this.state = {
            titulo:"",
            enunciado:"",
            lenguaje:0, /* 1 = Python; 2 = Java; 3 = C */
            fechaInicial:"",
            fechaFinal:"",
            PuntosTotales:0,
            fechaHoy : ""+(new Date().getFullYear())+"-"+(new Date().getMonth())+"-"+(new Date().getDate()),
            entradas:"",
            salidas:""

        };
    }

    render(){
        var ej1="ejemplo:\n2\n4\n8";
        var ej2="ejemplo:\n4\n16\n64";

        return (
            <form>
                <div className="form-group">
                    <label for="tituloEnun">Titulo</label>
                    <input type="text" className="form-control" id="tituloEnun" aria-describedby="" placeholder="Introduce el titulo del Enunciado" />
                </div>
                <div class="form-group">
                    <label for="bodyEnunciado">Enunciado</label>
                    <textarea class="form-control" id="bodyEnunciado" rows="10" placeholder="Introduce el Cuerpo del Enunciado"></textarea>
                </div>

                <div className="form-group">
                    <label >Lenguaje</label>
                    <div></div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1" checked/>
                        <label class="form-check-label" for="inlineRadio1">Python</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="2" disabled/>
                        <label class="form-check-label" for="inlineRadio2">Java</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="3" disabled/>
                        <label class="form-check-label" for="inlineRadio3">C </label>
                    </div>
                </div>
                
                <div className="row">
                    <div class="form-group col">
                        <label for="entradas">Entradas</label>
                        <textarea class="form-control" id="entradas" aria-describedby="emailHelp" placeholder={ej1} rows="5"/>
                        <small id="emailHelp" class="form-text text-muted">Las entradas deben estar separadas el salto de linea, y debe corresponder a la misma en la salidas.</small>
                    </div>

                    <div class="form-group col">
                        <label for="salidas">Salidas</label>
                        <textarea class="form-control" id="salidas" aria-describedby="emailHelp" placeholder={ej2} rows="5"/>
                        <small id="emailHelp" class="form-text text-muted">Las salidas deben estar separadas el salto de linea, y deben corresponder a la misma con las entradas.</small>
                    </div>
                </div>
  


                <div className="row">
                    <div className="col form-group">
                        <label for="fechaIni">Fecha inicial</label>
                        <div></div>
                        <input type="date" id="fechaIni" min={this.state.fechaHoy}/>
                    </div>
                    <div className="col form-group">
                        <label for="fechaFinal">Fecha Final</label>
                        <div></div>
                        <input type="date" id="fechaFinal" min={this.state.fechaHoy}/>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col">
                    <label for="puntosTotales">Puntaje Total del Enunciado</label>
                        <input type="number" className="form-control" min="1" pattern="[0-9]" id="puntosTotales" aria-describedby="" placeholder="Puntaje" />
                    </div>
                    <div className="col"></div>
                </div>
                <button type="submit" className="btn btn-primary">Crear</button>
            </form>
        );
    }
}

export default NewExcercise;