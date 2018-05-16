import React, {Component} from 'react';
import { Link } from 'react-router-dom';


import prueba from './prueba.json';
import './index.css';

class EnunciadoAlumno extends Component{
    constructor(){
        super();
        this.state={
            items:[],
            lenguaje:['python','java','c'],
            padre:-1 // segun el padre se veran las funciones
        };
    }

    componentDidMount(){
    

        console.log(this.props.location.state);
        this.setState({
            items:prueba,
            padre: this.props.location.state.padre

        });
        
        //obtener todos los enunciados
    
        
        // GET ALL
        /*Axios.get('/products')
          .then(response => {
              console.log(response.data);
              this.setState({
                  items:response.data
              });
          })
          .catch(function (error) {
              console.log(error)
          })*/
    
    };


    listar (listaEnunciados){
        return (
            <div >
                <table>
                    <thead>
                    <tr style={{textAlign:'left'}}>
                        <th >Nombre</th>
                        <th>Lenguaje</th>
                        <th>Acción</th>
                    </tr>
                    </thead>


                {listaEnunciados && listaEnunciados.map((enunciado, key) =>

                <tbody key={key}>
                    <tr  id={key} className="accordion-toggle" data-toggle="collapse" data-target={"."+key.toString() } style={{textAlign:'left'}}>
                        <td>{enunciado.exerciseTitle}</td>
                        <td>{this.state.lenguaje[enunciado.exerciseLenguge-1]}</td>
                        {
                            this.state.padre>1?
                            <td>
                                <button>{enunciado.exercisePublished.toString()}</button>
                                <button>Editar</button>
                                <button>Stats</button>
                                
                            </td>:
                            <td>
                                <Link to={{
                                    pathname:"/Console/"+this.state.lenguaje[enunciado.exerciseLenguge-1].toString()+"/enun/"+key.toString(),
                                    state:{
                                        lenguaje:enunciado.exerciseLenguge
                                    }
                                    }}>
                                    <button>
                                    GO
                                    </button>
                                
                                </Link>
                            </td>
                    }
                        {/*<td>{enunciado.expirationDate.toString().substr(0, 10)}</td>
                        
                        <td>
                            <button type="button" >
                                Editar
                            </button>
                            &emsp;
                            <button id={enunciado.productId} data-toggle="modal" data-target={"#modalDelete"+key.toString()}>
                                Eliminar
                            </button>
                            <div className="modal hide" id={"modalDelete"+key.toString()} >
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title">Estás seguro?</h4>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <p> Estas seguro que quieres borrar {enunciado.productName}?</p>
                                            <div className="row justify-content-center" >
                                                <div className="col-12-xs  text-center">
                                                    <button id={enunciado.productId} className="btn btn-success btn-md" onClick={this.handleDelete}>Yes</button>
                                                    &emsp;
                                                    <button className="btn btn-danger btn-md" data-dismiss="modal" >No</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </td>*/}
                    </tr>
                    <tr>
                        <td colSpan="6" className="hiddenRow">
                                <div className={" accordion-body collapse "+key.toString()} id="accordion1">
                                <fieldset className="form-group">
                                    <div className="row">
                                        <legend className="col-form-label col-sm-2 pt-0">Cuerpo:</legend>
                                        <div className="col-sm-10" style={{textAlign:'justify'}}>
                                                {enunciado.exerciseBody}
                                        </div>
                                    </div>
                                </fieldset>
                                </div>


                        </td>
                    </tr>
                </tbody>
            )}
                </table>
            </div>


        );

    }


    render(){
        
        
        console.log(this.state);

        return(
            <div>
                {this.listar(this.state.items)}
            </div>
        );
    };




}

export default EnunciadoAlumno;