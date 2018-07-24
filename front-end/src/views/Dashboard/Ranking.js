import React, { Component } from 'react';
import ChartComponent, { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
    Badge,
    Button,
    ButtonDropdown,
    ButtonGroup,
    ButtonToolbar,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Progress,
    Row,
    Table,
    CardColumns,
} from 'reactstrap';
import { connect } from 'react-redux';
import Widget03 from '../../views/Widgets/Widget03';
import Axios from 'axios';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')
var fecha = new Date();

const sparkLineChartData = [
    {
        data: [35, 23, 56, 22, 97, 23, 64],
        label: 'New Clients',
    },
    {
        data: [65, 59, 84, 84, 51, 55, 40],
        label: 'Recurring Clients',
    },
    {
        data: [35, 23, 56, 22, 97, 23, 64],
        label: 'Pageviews',
    },
    {
        data: [65, 59, 84, 84, 51, 55, 40],
        label: 'Organic',
    },
    {
        data: [78, 81, 80, 45, 34, 12, 40],
        label: 'CTR',
    },
    {
        data: [1, 13, 9, 17, 34, 41, 38],
        label: 'Bounce Rate',
    },
];

const sparklineChartOpts = {
    tooltips: {
        enabled: false,
        custom: CustomTooltips
    },
    responsive: true,
    maintainAspectRatio: true,
    scales: {
        xAxes: [
            {
                display: false,
            }],
        yAxes: [
            {
                display: false,
            }],
    },
    elements: {
        line: {
            borderWidth: 2,
        },
        point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3,
        },
    },
    legend: {
        display: false,
    },
};

const makeSparkLineData = (dataSetNo, variant) => {
    const dataset = sparkLineChartData[dataSetNo];
    const data = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            {
                backgroundColor: 'transparent',
                borderColor: variant ? variant : '#c2cfd6',
                data: dataset.data,
                label: dataset.label,
            },
        ],
    };
    return () => data;
};
const monthsLabel = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'
    , 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre'
    , 'Noviembre', 'Diciembre'];

class Ranking extends Component {
    constructor() {
        super();
        this.state = {
            coord: false,
            careerDropOpen: false,
            coordDropOpen: false,
            profesor: null,

            monthSelected:fecha.getMonth(),
            monthButtonOpen: false,

            coordList:[],
            careerList:[],

            careerLabel: 'Carreras',
            coordLabel:'Coordinación',
            idList:[],
            alumList:[],

        };
    }
    componentWillMount(){
        if (this.props.infoUsuarios.userType === 1) {
            this.setState({
                profesor: false,
                alumSelected: this.props.infoUsuarios,
                lineSelected: 1,
                careerSight: false,
                coordSight: false
            });
            this.obtenerRankingCord(this.state.monthSelected,this.state.coordList[0])
        }
        else {
            this.obtenerCarreras(this.props.infoUsuarios.userType);
            this.obtenerCoords(this.props.infoUsuarios.userType);
            this.setState({
                careerLabel: 'Carreras',
                coordLabel: 'Coordinación',
                profesor: true,
                coord: this.state.coordList[0],
                career: this.state.careerList[0],
            });
            this.obtenerRankingCareer(this.state.monthSelected,this.state.careerList[0]);
        }
    }
    onButtonMonthToggle() {
        this.setState({
            monthButtonOpen: !this.state.monthButtonOpen,
        });
    }
    onMonthItemSelected(i) {
        this.setState({
            monthSelected: i,
        });
        if (this.props.infoUsuarios.userType === 1) {
            
        }

        else if (this.props.infoUsuarios.userType === 2) {
            if (this.state.coordSight === true) {
                
            }
            else {
                
            }
        }
        else if (this.props.infoUsuarios.userType === 3) {
            if (this.state.careerSight === true) {
                
            }
            else if (this.state.coordSight === true) {
                this.obtenerDataCoord(i, this.state.coord);
            }
            else {
            }
        }

    }
    onCareerItemSelect(sel) {
        this.setState({
            careerLabel: sel,
            career: sel,
            careerSight: true,
            coordSight: false
        });
        if (this.props.infoUsuarios.userType === 3) {
            //this.obtenerDataCarrer(this.state.monthSelected, sel);
        }
        else{
            if(sel==='Todas'){
                //this.obtenerAlumCoord(this.state.coord);
                this.setState({alumLabel:'---- ----'});
            }
            else
                this.obtenerRankingCareer(this.state.monthSelected,sel);
        }
    }

    onCoordItemSelect(sel) {
        this.setState({
            coordLabel: sel,
            coord: sel,
            careerSight: false,
            coordSight: true
        });
        if(this.state.career==='Todas'){
            //this.obtenerAlumCoord(sel);
            this.setState({alumLabel:'---- ----'});
        }
        else{
            //this.obtenerAlumBeCareerOnCoord(this.state.career,sel);
            this.setState({alumLabel:'---- ----'});
        }
        //this.obtenerDataCoord(this.state.monthSelected, sel);
    }
    obtenerCarreras(user) {
        var url;
        if (user === 2) {
            url = 'http://localhost:8082/user/coordination/career/' + this.props.infoUsuarios.userCoordination;
        }
        else if (user === 3) {
            url = 'http://localhost:8082/user/allcareer';
        }
        this.setState({
            espera: true
        });
        Axios.get(url)
            .then(response => {
                var dataCatch = response.data;
                this.setState({
                    careerList: dataCatch,
                    espera: false
                });
            })
            .catch(function (error) {
                console.log(error);
                this.setState({ espera: false });
            });
    }
    obtenerCoords(user) {
        var url;
        if (user === 2) {
            var aux = [];
            aux.push(this.props.infoUsuarios.userCoordination);
            this.setState({
                coordList: aux,
                espera: false
            })
        }

        if (user === 3) {
            url = 'http://localhost:8082/user/allcoordination'
            this.setState({
                espera: true
            });
            Axios.get(url)
                .then(response => {
                    var dataCatch = response.data;
                    console.log(dataCatch);
                    this.setState({
                        coordList: dataCatch,
                        espera: false
                    });
                })
                .catch(function (error) {
                    console.log(error);
                    this.setState({ espera: false });
                });
        }
    }
    obtenerRankingCord(mes, coord) {
        var fix = mes + 1;
        var url = 'http://localhost:8082/userExercise/ranking/coordination/' + coord + '/' + fecha.getFullYear() + '-' + fix;
        this.setState({
            espera: true
        });
        Axios.get(url)
            .then(response => {
                var dataCatch = response.data;
                console.log(dataCatch);
                this.setState({
                    idList: dataCatch,
                    espera: false
                });
            })
            .catch(function (error) {
                console.log(error);
                this.setState({ espera: false });
            });

    }
    obtenerAlumno(id) {
        var url = 'http://localhost:8082/user/' + id;

        this.setState({espera: true});

        Axios.get(url)
            .then(response => {
                var dataCatch= response.data;
                console.log(dataCatch);
                this.setState({
                    alumList: dataCatch,
                    espera: false,
                });
            })
            .catch(function (error) {
                console.log(error);
                this.setState({ espera: false });
            });

    }
    obtenerRankingCareer(mes, career) {
        var fix = mes + 1;
        var url = 'http://localhost:8082/userExercise/ranking/career/' + career + '/' + fecha.getFullYear() + '-' + fix;
        this.setState({
            espera: true
        });
        Axios.get(url)
            .then(response => {
                var dataCatch = response.data;
                console.log(dataCatch);
                this.setState({
                    idList: dataCatch,
                    espera: false,
                });
            })
            .catch(function (error) {
                console.log(error);
                this.setState({ espera: false });
            });

    }
    filterGroup(listaCareer, listaCoord) {
        return (
            <ButtonToolbar className="float-center" aria-label="Toolbar with button groups">
                <ButtonGroup horizontal="true">
                    <ButtonDropdown isOpen={this.state.careerDropOpen} toggle={() => { this.setState({ careerDropOpen: !this.state.careerDropOpen }); }}>
                        <DropdownToggle caret>
                            {this.state.careerLabel}
                        </DropdownToggle>
                        <DropdownMenu direction="down">
                            <DropdownItem onClick={() => this.onCareerItemSelect('Todas')} active={this.state.career === 'Todas'}>Todas</DropdownItem>
                            {listaCareer && listaCareer.map((career, key) =>
                                <DropdownItem key={key} onClick={() => this.onCareerItemSelect(career)} active={this.state.career === career}>{career}</DropdownItem>
                            )}
                        </DropdownMenu>
                    </ButtonDropdown>
                    <ButtonDropdown isOpen={this.state.coordDropOpen} toggle={() => { this.setState({ coordDropOpen: !this.state.coordDropOpen }); }}>
                        <DropdownToggle caret>
                            {this.state.coordLabel}
                        </DropdownToggle>
                        <DropdownMenu direction="down">
                            <DropdownItem onClick={() => this.onCoordItemSelect('Todas')} active={this.state.coord === 'Todas'}>Todas</DropdownItem>
                            {listaCoord && listaCoord.map((cord, key) =>
                                <DropdownItem key={key} onClick={() => this.onCoordItemSelect(cord)} active={this.state.coord === cord}>{cord}</DropdownItem>
                            )}
                        </DropdownMenu>
                    </ButtonDropdown>
                </ButtonGroup>
            </ButtonToolbar>
        )

    }
    buttonMonth(month) {
        return (
            <ButtonDropdown isOpen={this.state.monthButtonOpen} toggle={() => { this.onButtonMonthToggle() }}>
                <DropdownToggle caret className="pb-1" color="primary">{monthsLabel[month]}</DropdownToggle>
                <DropdownMenu direction="down">
                    <DropdownItem header>Mes</DropdownItem>
                    <DropdownItem onClick={() => { this.onMonthItemSelected(2); }}>Marzo</DropdownItem>
                    <DropdownItem onClick={() => { this.onMonthItemSelected(3); }}>Abril</DropdownItem>
                    <DropdownItem onClick={() => { this.onMonthItemSelected(4); }}>Mayo</DropdownItem>
                    <DropdownItem onClick={() => { this.onMonthItemSelected(5); }}>Junio</DropdownItem>
                    <DropdownItem onClick={() => { this.onMonthItemSelected(6); }}>Julio</DropdownItem>
                    <DropdownItem onClick={() => { this.onMonthItemSelected(7); }}>Agosto</DropdownItem>
                    <DropdownItem onClick={() => { this.onMonthItemSelected(8); }}>Septiembre</DropdownItem>
                    <DropdownItem onClick={() => { this.onMonthItemSelected(9); }}>Octubre</DropdownItem>
                    <DropdownItem onClick={() => { this.onMonthItemSelected(10); }}>Noviembre</DropdownItem>
                    <DropdownItem onClick={() => { this.onMonthItemSelected(11); }}>Diciembre</DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        );
    }
    chartTittle(titulo) {
        return (
            <CardHeader>
                <i className="fa fa-align-justify"></i> {titulo}
            </CardHeader>
        )
    }
    alumList(listaAlumnos) {
        return (
            <Col>
                {listaAlumnos && listaAlumnos.map((alumno, key) =>
                    <div key={key} className="progress-group mb-4">
                        <div className="progress-group-prepend">
                            <span className="progress-group-text">
                                {alumno.userName}
                            </span>
                        </div>
                        <div className="progress-group-bars">
                            <Progress className="progress-xs" color="info" value="78" />
                            <Progress className="progress-xs" color="danger" value="78" />
                        </div>
                    </div>
                )}
                <div className="legend text-center">
                    <small>
                        <sup className="px-1"><Badge pill color="info">&nbsp;</Badge></sup>
                        Enunciados hechos
                        &nbsp;
                        <sup className="px-1"><Badge pill color="danger">&nbsp;</Badge></sup>
                        Tiempo gastado
                    </small>
                </div>
            </Col>
        )

    }
    makeRanking(month) {
        return (
            <Card>
                {this.chartTittle('Ranking')}
                {this.state.espera ?
                    <div className="row">
                        <div className='col'>
                            <div className='defaultSpinner' ></div>
                        </div>
                    </div>
                :
                <CardBody>
                    <Row>
                        <Col className='text-left'>
                            {this.filterGroup(this.state.careerList,this.state.coordList)}
                        </Col>
                        <Col className='text-right'>
                            {this.buttonMonth(month)}
                        </Col>
                    </Row>
                    {this.alumList(this.state.listaAlumnos)}
                </CardBody>
                }
            </Card>
        );
    }
    render() {
        return (
            <Col>
                {this.makeRanking(this.state.monthSelected)}
            </Col>
        )
    }
}
const mapStateToProps = state => {
    return {
        infoUsuarios: state.infoUsuarios,
    };
};
export default connect(mapStateToProps)(Ranking);
