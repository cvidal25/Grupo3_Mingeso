import React, {Component} from 'react';
//import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import brace, { Split } from 'brace';
import Axios from 'axios';
//import GlotAPI from 'glot-api';
import { Card, CardBody, CardHeader, Col, Collapse,FormGroup, Row, Table,Button,Input,Label} from 'reactstrap';
import  { Redirect } from 'react-router-dom';
import Timer from "../timer/Timer";

import '../../../scss/spinner.css';
import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/mode/c_cpp';

import 'brace/theme/dracula';

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
          espera:false,
          url:"",
          stdin:"",
          stdout:"",
          date:"",
          time:"",
          click:false,

      }
  };

  componentWillMount(){

      var lenguaje,url;
      url=this.props.location.pathname;
      url=url.split("/");
      console.log(url,"original");
      if(this.state.url===""){    
          this.setState({
              url:url[2]
          });
          return;
      }
  }

  componentDidMount(){
      this.setState({
          espera:true,
          modo:this.props.match.params.lenguaje,
          date: new Date()
      })
      var num=this.props.match.params.num;
      if(isString(num)){
          Axios.get('http://localhost:8082/exercise/'+num)
              .then(response=>{
                      this.setState({
                          enunciado:response.data,
                          existeEnunciado:true,
                          espera:false,
                          date: new Date()
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
  
    handleChange=event=>{
        var value=event.target.value;
        var name=event.target.name;

        this.setState({
            [name]:value
        });
    }
    handleTime=time=>{
        this.setState({
            time:time
        });

    }
//se debe cambiar para realizar una actualizacion de los componentes
  verificarURL(){
      var lenguaje,url;
      url=this.props.location.pathname;
      //console.log(url);
      url=url.split("/");
      if(this.state.url!==url[2]){
          window.location.reload();
      }
  }


  onChange=(NewValue)=>{
      //console.log('Change',NewValue);
      this.setState({
          aceEditorValue:NewValue
      });
      //console.log(this.state.aceEditorValue);
  };

  handletryCodigo=event=>{
      console.log(Timer.prototype.getTime(this.state.date));
      console.log(this.state.time);
  }
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
          //tiempo de realizacion
          //fecha de realizacion
          'language': parseInt(num)+1,
          'code':this.state.aceEditorValue
          //solo para el answer
          //falta trial -> input
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
      this.verificarURL();

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
                            <Row>
                                <Col style={{textAlign:"justify",fontSize:"18"}}>
                                {this.state.enunciado.exerciseBody}
                                </Col>
                            </Row>
                            <br/>
                            <Timer timeInit={this.state.date} handler={this.handleTime} click={this.state.click}/>
                            <br/>
                            <Row >
                              <Col md={7}>
                                <Row style={{padding: "5px 8px",borderStyle:"solid",borderWidth:"1px", borderColor:"#73818f",backgroundColor: "rgba(91, 192, 222, 0.7)"}}>
                                    <Col  md={2} >
                                      <Label htmlFor="stdin" style={{paddingTop:"5px"}}>{"Entrada:\tStdin"}</Label>
                                    </Col>
                                    <Col>
                                    <Input type="text" name="stdin" id="stdin" placeholder="El texto ingresado aquí será enviado a stdin" onChange={this.handleChange}/>
                                  </Col>
                                </Row>
                                <Row style={{padding:"10px" ,borderStyle:"solid",borderWidth:"1px",borderColor:"#73818f",borderTop:null }}> 
                                  <Col  >
                                    
                                    <AceEditor
                                        mode={this.state.modo}
                                        theme='dracula'
                                        name="blah2"
                                        width="100%"
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
                                        }}
                                        style={{borderRadius:"8px 8px 8px 8px"}}
                                        />
                                        
                                      </Col>
                                </Row>
                              </Col>
                              <Col style={{textAlign:"justify"}}>
                                    
                                <Row style={{padding: "8px 8px 8px",borderStyle:"solid",borderWidth:"1px",borderLeft:null, borderColor:"#73818f", height:"100%", backgroundColor: "rgba(91, 192, 222, 0.7)"}}>
                                     <Label >{"Salida:\tStdout"}</Label>
                                     <Input type="textarea" name="salida" id="salida" style={{resize:'none'}} rows={22} value={""} placeholder={"El resultado del programa saldra aquí"}/>
                                  </Row>
                              </Col>
                            </Row>
                            <br/>
                            <Button color="info" onClick={this.handletryCodigo}>Probar</Button>
                            &emsp;
                            <Button color="success" onClick={this.handleSentCodigo}>Enviar</Button>
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