import React, {Component} from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table,Button, Input} from 'reactstrap';
import  { Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login-component';
import Axios from 'axios';

class Ingresar extends Component{


 constructor (props, context) {
    super(props, context);
    	this.state ={
    		correo:"",
    	};
    this.responseGoogle = this.responseGoogle.bind(this);
    this.getMail= this.getMail.bind(this);
  }
 

  getMail(){	
  	Axios.get('https://www.googleapis.com/gmail/v1/users/'+this.state.correo+'/profile')
        .then(Response =>{
        	console.log("lala");
            console.log(Response);
        }
        ).catch(function(error){
            console.log(error);
        });
    };


  responseGoogle (googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    var googleId = googleUser.getId();


    this.setState({
        correo:id_token
    });

    this.getMail();
    //console.log({ googleId });
    //console.log({accessToken: id_token});
    console.log(googleUser);
    var aux34 = googleUser.w3.U3;
    console.log(aux34);
    //anything else you want to do(save to localStorage)...
  }			

  

	render(){
		return(
			<form>
				<div>
	                <Row>
	                  	<Col>
	                  		<Card>
	                    		<CardHeader>
	                    		 <h2 style={{textAlign: "center" }}>Bienvenido a la plataforma</h2>
	                    		</CardHeader>
	                    		<CardBody>
	                    		
					                <div style={{textAlign:"center"}}>
					                 
									<GoogleLogin socialId="171991856415-96dr3egj16vhs32dg4hr2fhbns24bhh3.apps.googleusercontent.com"
					                     className="google-login btn btn-info "
					                     scope="profile"
					                     fetchBasicProfile={true}
					                   //	style={{""}}	
					                     responseHandler={this.responseGoogle}
					                     buttonText="Ingresar"
					                     />


									</div>
						        </CardBody>
							</Card>
						</Col>
					</Row>
				</div>
			</form>
		);
	}


}
export default Ingresar;
