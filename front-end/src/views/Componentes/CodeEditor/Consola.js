import React, {Component} from 'react';
//import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import brace from 'brace';
import Axios from 'axios';
//import GlotAPI from 'glot-api';
import { Card, CardBody, CardHeader, Col, Collapse, Row, Table,Button } from 'reactstrap';
import  { Redirect } from 'react-router-dom';

import '../../../scss/spinner.css';
import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/mode/c_cpp';

import'brace/theme/dracula';

import { isString } from 'util';

const basePython="";
const baseJava='class Main {\n\tpublic static void main(String[] args) {\n\t\t//Codigo\n\t\t//System.out.println("Hello World!");\n\t}\n}';
const baseC_Cpp="#include <stdio.h>\n\nint main(void) {\n\n\treturn 0;\n}";

class CodeEditor extends Component{

    constructor(){
        super();
        this.state={
            enunciado:"",
            existeEnunciado:false,
            lenguaje:["Python","Java","C"],
            lenguajeRA:["python",'java','c_cpp'],
            modo:'python',
            bases:[basePython,baseJava,baseC_Cpp],
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
        console.log(this.state.aceEditorValue);
    };

    handleSentCodigo=event=>{
        /*
        //http://localhost:8082/answer
        {
	"language":1,
	"code":"i = 0\nwhile(i<3):\n\tprint(i)\n\ti = i+1"
	
}
        */

       var num;
       
       for(num in this.state.lenguaje){
           if(this.state.modo===this.state.lenguajeRA[num]){
               console.log(num);
               break;
           }
       }
       var data={
           //usuario
           //id del ejercicio
           'language': parseInt(num)+1,
           'code':this.state.aceEditorValue
       }
       console.log(data);
        Axios.post('http://localhost:8082/answer',data)
        .then(response=>{
            console.log(response.data);
        }).catch(function(error){
            console.log(error);
        });       
    }


    render(){

        var num;
       
        for(num in this.state.lenguaje){
            if(this.state.modo===this.state.lenguajeRA[num]){
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
                                    value={this.state.bases[num]}
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

                    <Button block color="success" onClick={this.handleSentCodigo}>Enviar</Button> 
                </Card>
                  </Col> 

                  
                </Row>
                
            </div>
        );


    }

}

export default CodeEditor;