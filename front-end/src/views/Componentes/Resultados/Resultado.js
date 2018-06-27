import React, {Component} from 'react';
import {Card, CardBody, CardFooter, CardHeader,Button,Row,Col} from 'reactstrap';

class Resultado extends Component {
    constructor(){
        super();
        this.state={

        };
    }

    render(){

        return(
            <Row>
                <Col className="offset-md-2" md={8}>
                    <Card>
                        <CardHeader className="text-center"> <h3>Resultado</h3></CardHeader>
                        <CardBody>
                            Estos Son los resultados del ejercicios a 
                        </CardBody>
                        <CardFooter> 
                            <Button  color="secondary" outline> volver</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        );
    }
}
export default Resultado;