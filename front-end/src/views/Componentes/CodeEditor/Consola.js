import React, {Component} from 'react';
//import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import Axios from 'axios';
//import GlotAPI from 'glot-api';
import { Card, CardBody, CardHeader, Col,CardFooter, 
	 Row, Button,Input,Label,
	Modal,ModalBody, ModalFooter,ModalHeader
} from 'reactstrap';
import Timer from "../timer/Timer";
import {connect} from 'react-redux'

import '../../../scss/spinner.css';
import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/mode/c_cpp';

import 'brace/theme/dracula';


import { isString } from 'util';

/*this.props.infoUsuarios.LO QUE NECESITES DEL USUARIO
ejempplo: this.props.infoUsuario.userID,
{"userID":7,"userName":"Barbara Sarmiento",
"userType":1,
"userMail":"barbara.sarmiento@usach.cl",
"userCareer":"Ingeniería de Ejecución en Informática",
"userCoordination":"B-3"}
*/

const urlBase="http://localhost:8082";
const basePython="";
const baseJava='class Main {\n\tpublic static void main(String[] args) {\n\t\t//Codigo\n\t\t//System.out.println("Hello World!");\n\t}\n}';
const baseC_Cpp="#include <stdio.h>\n\nint main(void) {\n\n\treturn 0;\n}";
const lenguajeJson={"python":1,"java":2,"c_cpp":3};
class CodeEditor extends Component{

	constructor(){
			super();
			this.state={
					enunciado:"",
					existeEnunciado:false,
					lenguaje:["Python","Java","C"],
					lenguajeRA:["python",'java','c_cpp'],
					idExercise:-1,
					modo:'python',
					bases:[basePython,baseJava,baseC_Cpp],
					aceEditorValue:"",
					espera:false,
					esperaRun:false,
					url:"",
					stdin:"",
					stdout:"",
					date:"",
					time:"",
					click:false,
					modalOpen:false,

			}
	};

	componentWillMount(){

			var url;
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
					date: new Date(),
					aceEditorValue: this.state.bases[lenguajeJson[this.props.match.params.lenguaje]-1],
			})
			var num=this.props.match.params.num;
			if(isString(num)){
					Axios.get('http://localhost:8082/exercise/'+num)
							.then(response=>{
											this.setState({
													enunciado:response.data,
													existeEnunciado:true,
													espera:false,
													date: new Date(),
													idExercise: parseInt(num,10),
											});
											if(response.data.exerciseLenguge!==lenguajeJson[this.state.modo]){
												console.log('REDIRIGIR');
												window.location.replace('/#/dashboard');
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
				//console.log(time);

		}
//se debe cambiar para realizar una actualizacion de los componentes
	verificarURL(){
			var url;
			url=this.props.location.pathname;
			//console.log(url);
			url=url.split("/");
			if(this.state.url!==url[2]){
					window.location.reload();
			}
	}


	onChange=(NewValue)=>{
			this.setState({
					aceEditorValue:NewValue
			});
	};

	handletryCodigo=event=>{
		console.log(Timer.prototype.getTime(this.state.date));
		console.log(this.state.time);
		this.setState({
			esperaRun:true
		})

		var trial={
		"language":lenguajeJson[this.state.modo],
		"code":this.state.aceEditorValue,
		"input":this.state.stdin
		}
		
		Axios.post(urlBase+"/trial",trial)
			.then(response=>{
				var json=JSON.parse(response.data[0]);
				if(json["stderr"]!==""){
					this.setState({
						stdout:json["stderr"]
					})
				}
				else{
					this.setState({
					stdout:json["stdout"]
				})
				}
				this.setState({
					esperaRun:false
				})

				
				console.log(response.data[0]);
				console.log(json);
				//console.log(response.data);
			})
			.catch(error=>{
				console.log(error);
				this.setState({
					esperaRun:false
				})

			})


		console.log(trial);
	
	}
	handleSentCodigo=event=>{
			
			var num;
			this.toggleOpen();
			for(num in this.state.lenguaje){
					if(this.state.modo===this.state.lenguajeRA[num]){
							console.log(num);
							break;
					}
			}
			var data={
					//tiempo de realizacion
					//fecha de realizacion
					
					'language': lenguajeJson[this.state.modo],
					'code':this.state.aceEditorValue,
					'exercise_id':this.state.idExercise,
					'user_id':this.props.infoUsuarios.userID, // temporal debe ser dinamico
					'resolving_time': Timer.prototype.getTimeMin(this.state.time),
					'resolving_date':new Date()
			}

			console.log(data);
			Axios.post('http://localhost:8082/answer',data)
			.then(response=>{
					console.log(response);
					console.log(response.data);
					
			}).catch(function(error){
					console.log(error);
			});
	}

	toggleOpen(){
		this.setState({
			modalOpen:!this.state.modalOpen
		})
	}

	createModal(){

		return (
			<Modal isOpen={this.state.modalOpen} toggle={()=>{this.toggleOpen();}}
                   className='modal-info'>
              <ModalHeader toggle={()=>{this.toggleOpen();}}>Confirmar Envió</ModalHeader>
              <ModalBody>
			  	Estas seguro de enviar el código.
				Este código solo podrá ser enviado una vez
				y no se podrán hacer cambios posteriores.
              </ModalBody>
			  <ModalFooter>
				<Button color="danger"  onClick={()=>{this.toggleOpen();}}>Cancelar</Button>{' '}
				<Button color="success"  onClick={()=>{this.handleSentCodigo()}}>Enviar <i className="fa fa-send fa-lg"></i></Button>                   
              </ModalFooter>
        </Modal>
		);
		
	}

	render(){

			var num;
			
			for(num in this.state.lenguaje){
					if(this.state.modo===this.state.lenguajeRA[num]){
							//console.log(num);
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
											<Row style={{paddingRight:"15px"}}>
												<Col >
													<h2 style={{textAlign: "center" }}>{this.state.enunciado.exerciseTitle + " "}</h2>
												</Col>
												
													<Button color="success" onClick={()=>{this.toggleOpen();}} style={{right:"0px"}}>Enviar <i className="fa fa-send fa-lg"></i></Button>
													{this.createModal()}
												
											</Row>

											
											 :
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
														<Row>
															<Col>
																<Timer timeInit={this.state.date} handler={this.handleTime} click={this.state.click}/>
															</Col>
															<Col className="col-auto">
																<div style={{paddingTop:"10px"}}>
																<Button color="dark" onClick={this.handletryCodigo}>Correr <i className="fa fa-cogs fa-lg"></i></Button>
																</div>
															</Col>
														</Row>
														
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
																				value={this.state.aceEditorValue}
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
																		 <Input type="textarea" name="salida" id="salida" style={{resize:'none'}} rows={22} value={this.state.stdout} placeholder={"El resultado del programa saldra aquí"}/>
																	</Row>
															</Col>
														</Row>
														<br/>
														
														
													</div>
											}
												 
									</CardBody>
									<CardFooter >
									{
										this.state.existeEnunciado &&	
										<Row >
											<Col className="text-right">
												<Button color="success" onClick={()=>{this.toggleOpen();}} style={{right:"0px"}}>Enviar<i className="fa fa-send fa-lg"></i></Button>
												{this.createModal()}
											</Col>
										</Row>
									}
										 
									</CardFooter>

									
							</Card>
								</Col> 

								
							</Row>
							
					</div>
			);


	}

}
const mapStateToProps = state =>{
    return{
      infoUsuarios: state.infoUsuarios,
    };
  };
  
export default connect(mapStateToProps)(CodeEditor);