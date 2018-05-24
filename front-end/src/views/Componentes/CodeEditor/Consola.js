import React, {Component} from 'react';
//import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import brace from 'brace';
import Axios from 'axios';
//import GlotAPI from 'glot-api';
import { Card, CardBody, CardHeader, Col, Collapse, Row, Table } from 'reactstrap';
import  { Redirect } from 'react-router-dom';

import '../../../scss/spinner.css';
import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/mode/c_cpp';

import'brace/theme/dracula';

import { isString } from 'util';



class CodeEditor extends Component{

    constructor(){
        super();
        this.state={
            enunciado:"",
            existeEnunciado:false,
            lenguaje:["Python","Java","C"],
            lenguajeRA:["python",'java','c_cpp'],
            modo:'python',
            basePython:"",
            baseJava:"",
            baseC_Cpp:"",
            aceEditorValue:"",
            espera:false

        }
    };

    componentDidMount(){
        this.setState({
            espera:true,
            modo:this.props.match.params.lenguaje
        })
        var num=this.props.match.params.num;
        if(isString(num)){
            Axios.get('http://localhost:8082/exercise/'+num)
                .then(response=>{
                        this.setState({
                            enunciado:response.data,
                            existeEnunciado:true,
                            espera:false
                        });
                        var aux;
                        for(aux in this.state.lenguaje){
                            if(this.state.modo===this.state.lenguajeRA[aux]){
                                console.log(aux);
                                if((response.data.exerciseLenguge-1).toString()!==aux.toString()){
                                    
                                    console.log('REDIRIGIR');
                                    window.location.replace('/');
                                }
                                break;
                            }
                        }
                        
                        
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
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.aceEditorValue !== nextState.aceEditorValue) {
          return false
        } else {
          return true;
        }
      }




    onChange=(NewValue)=>{
        console.log('Change',NewValue);
        this.setState({
            aceEditorValue:NewValue
        });
        
    };

    getEnunciado(id){
        
    }



    

    /*consumeAPI= event =>{
        const glot= new GlotAPI('d8c012ba-9fc5-4dda-af2b-8614aae48d30');
        glot.run('python','2',[{"name": "main.py", "content": "print(42)"}]);
        Axios({
            "crossDomain": true,
            "url": "https://run.glot.io/languages/python/2",
            "method": "POST",
            "headers": {
              "authorization": "Token d8c012ba-9fc5-4dda-af2b-8614aae48d30",
              "content-type": "application/json",
              "cache-control": "no-cache",
              "postman-token": "26652605-dbf5-2cde-ecbe-e06001636891"
            },
            "data": "{\"files\": [{\"name\": \"main.py\", \"content\": \"print(42)\"}]}"
        }).then(response =>{
            console.log(response.data);
        }).catch(function (error){
            console.log(error,"ERRROR");
        });

    }*/
    prueba(){
        console.log(this.state.enunciado);
    }

    render(){

        var num;
       
        for(num in this.state.lenguaje){
            if(this.state.modo===this.state.lenguaje[num]){
                console.log(num);
                break;
            }
        }

        return (
            <div>
                <Row>
                  <Col>
                  <Card>
                    <CardHeader>
                        {this.state.existeEnunciado?
                        <h2 style={{textAlign: "center" }}>{this.state.enunciado.exerciseTitle}</h2>:
                        <h2 style={{textAlign: "center" }}>Consola de {this.state.lenguaje[num]}</h2>
                    }
                
                    </CardHeader>
                    <CardBody>

                        
                        {this.state.espera ?
                             <div className="defaultSpinner"></div>
                            :
                            <div >
                            <div style={{textAlign:"justify",fontSize:"18"}}>
                            {this.state.enunciado.exerciseBody}
                            </div>
                                <div style={{height:"20px"}}> </div>
                                <AceEditor
                                    mode={this.state.modo}
                                    theme='dracula'
                                    name="blah2"
                                    width="70%"
                                    onChange={this.onChange}
                                    fontSize={18}
                                    showPrintMargin={true}
                                    showGutter={true}
                                    highlightActiveLine={true}
                                    value={''}
                                    setOptions={{
                                        enableBasicAutocompletion: true,
                                        enableLiveAutocompletion: true,
                                        enableSnippets: true,
                                        showLineNumbers: true,
                                        tabSize: 2,
                                    }}/>
                            </div>
                        }
                         
                        
                    </CardBody>
                </Card>
                  </Col>  
                </Row>
                
            </div>
        );


    }

}

export default CodeEditor;