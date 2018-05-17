import React, {Component} from 'react';
//import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import brace from 'brace';
import Axios from 'axios';
//import GlotAPI from 'glot-api';

import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/mode/c_cpp';

import 'brace/theme/tomorrow';
import 'brace/theme/kuroir';
import 'brace/theme/monokai';
import { isString } from 'util';




class CodeEditor extends Component{

    constructor(){
        super();
        this.state={
            enunciado:"",
            existeEnunciado:false,
            lenguaje:["python","java","c_cpp"],
            basePython:"",
            baseJava:"",
            baseC_Cpp:"",
            aceEditorValue:""

        }
    };

    componentDidMount(){

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
        Axios.get('http://localhost:8082/exercise/'+id)
        .then(response=>{
            console.log(response.data); 
            if(!this.state.existeEnunciado){
                this.setState({
                    enunciado:response.data,
                    existeEnunciado:true
                }); 
            console.log(this.enunciado);
            }
           
        })
        .catch(function(error){
            console.log(error);
        })
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

        var num=this.props.match.params.num;
        if(isString(num)){
            this.getEnunciado(num);
        }
        var modo=this.props.match.params.lenguaje;

        return (
            <div>
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <h2 style={{textAlign: "center" }}>{this.state.enunciado.exerciseTitle}</h2>
                        <div style={{textAlign:"justify",fontSize:"18"}}>{this.state.enunciado.exerciseBody}</div>
                        <div style={{height:"20px"}}> </div>
                        <AceEditor
                            mode={modo}
                            theme="monokai"
                            name="blah2"
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
                    
                    <div className="col-1"></div>
                </div>


                
            </div>
        );


    }

}

export default CodeEditor;