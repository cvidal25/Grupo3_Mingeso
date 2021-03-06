import React, { Component } from 'react';
import ChartComponent, { Line } from 'react-chartjs-2';
import {
    Button,
    ButtonDropdown,
    ButtonGroup,
    ButtonToolbar,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Input,
    Progress,
    Row,
    Table,
} from 'reactstrap';
import Axios from 'axios';
import { connect } from 'react-redux';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

const daysLabel = ['Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5'
    , 'Día 6', 'Día 7', 'Día 8', 'Día 9', 'Día 10'
    , 'Día 11', 'Día 12', 'Día 13', 'Día 14', 'Día 15'
    , 'Día 16', 'Día 17', 'Día 18', 'Día 19', 'Día 20'
    , 'Día 21', 'Día 22', 'Día 23', 'Día 24', 'Día 25'
    , 'Día 26', 'Día 27', 'Día 28', 'Día 29', 'Día 30'
    , 'Día 31'];
const diffLabel = ['Fácil', 'Intermedio', 'Difícil'];

const monthsLabel = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'
    , 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre'
    , 'Noviembre', 'Diciembre'];


var minutesPerDay = [70, 150, 250, 55, 40, 20
    , 110, 70, 0, 0, 15, 0
    , 340, 45, 110, 90, 340, 0
    , 10, 40, 220, 40, 0, 55
    , 50, 0, 105, 140, 180, 0
    , 40];
var enunciadosPerDay = [6, 12, 23, 4, 5, 2
    , 8, 4, 0, 0, 2, 0
    , 28, 5, 13, 6, 17, 0
    , 1, 4, 21, 2, 0, 5
    , 7, 0, 9, 12, 16, 0
    , 2];

var fecha = new Date();
var totalEnunciados;
var totalFaciles;
var totalIntermedios;
var totalDificiles;
var percentFaciles;
var percentIntermedios;
var percentDificiles;
var totalMinutes;
var minutesFaciles;
var minutesIntermedios;
var minutesDificiles;
var percentTimeF;
var percentTimeI;
var percentTimeD;


class LineChart extends Component {
    constructor() {
        super();
        this.enunLineChartData = {
            labels: daysLabel,
            datasets: [
                {
                    label: 'Enunciados Totales',
                    backgroundColor: hexToRgba(brandInfo, 10),
                    borderColor: brandInfo,
                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 2,
                    data: [],
                },
                {
                    label: 'Enunciados Faciles',
                    backgroundColor: 'transparent',
                    borderColor: brandSuccess,
                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 2,
                    data: [],
                },
                {
                    label: 'Enunciados Intermedios',
                    backgroundColor: 'transparent',
                    borderColor: brandDanger,
                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 2,
                    //borderDash: [8, 5],
                    data: [],
                },
                {
                    label: 'Enunciados Dificiles',
                    backgroundColor: 'transparent',
                    borderColor: brandWarning,
                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 2,
                    //borderDash: [8, 5],
                    data: [],
                },
            ],
        };
        this.timeLineChartData = {
            labels: daysLabel,
            datasets: [
                {
                    label: 'Segundos Totales',
                    backgroundColor: hexToRgba(brandInfo, 10),
                    borderColor: brandInfo,
                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 2,
                    data: [],
                },
                {
                    label: 'Segundos Faciles',
                    backgroundColor: 'transparent',
                    borderColor: brandSuccess,
                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 2,
                    data: [],
                },
                {
                    label: 'Segundos Intermedios',
                    backgroundColor: 'transparent',
                    borderColor: brandDanger,
                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 2,
                    //borderDash: [8, 5],
                    data: [],
                },
                {
                    label: 'Segundos Dificiles',
                    backgroundColor: 'transparent',
                    borderColor: brandWarning,
                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 2,
                    //borderDash: [8, 5],
                    data: [],
                },
            ],
        };
        this.enunLineChartOpt = {
            tooltips: {
                enabled: false,
                custom: CustomTooltips,
                intersect: true,
                mode: 'index',
                position: 'nearest',
                callbacks: {
                    labelColor: function (tooltipItem, chart) {
                        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
                    }
                }
            },
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            //Scala de los axes
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            drawOnChartArea: false,
                        },
                    }],
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            maxTicksLimit: 5,
                            stepSize: null,
                            max: minutesPerDay.max,
                        },
                    }],
            },
            elements: {
                point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                    hoverBorderWidth: 3,
                },
            },
        };
        this.timeLineChartOpt = {
            tooltips: {
                enabled: false,
                custom: CustomTooltips,
                intersect: true,
                mode: 'index',
                position: 'nearest',
                callbacks: {
                    labelColor: function (tooltipItem, chart) {
                        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
                    }
                }
            },
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            //Scala de los axes
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            drawOnChartArea: false,
                        },
                    }],
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            maxTicksLimit: 5,
                            stepSize: Math.ceil(minutesPerDay.max / 5),
                            max: minutesPerDay.max,
                        },
                    }],
            },
            elements: {
                point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                    hoverBorderWidth: 3,
                },
            },
        };
        this.state = {
            //Buttons States
            viewing: null,
            careerDropOpen: false,
            coordDropOpen: false,
            monthButtonOpen: false,

            //Variable States
            alumSelected: [],
            lineSelected: 1,
            monthSelected: fecha.getMonth(),

            //Chart States
            dataChart: this.enunLineChartData,
            optChart: this.enunLineChartOpt,

            //Booleans states
            espera: false,
            profesor: true,
            careerSight: true,
            coordSight: true,

            //Containers State
            alumList: [],
            coordList: [],
            careerList: [],
            dataTime: [],
            dataEnun: [],
            coord: null,
            career: null,

            alumLabel: '---- ----',
            careerLabel: 'Carreras',
            coordLabel: 'Coordinación'

        };
        this.onLineFiltClick = this.onLineFiltClick.bind(this);
        this.onMonthItemSelected = this.onMonthItemSelected.bind(this);
        this.buttonMonth = this.buttonMonth.bind(this);
        this.onButtonMonthToggle = this.onButtonMonthToggle.bind(this)
        this.filterLine = this.filterLine.bind(this);
    }
    componentWillMount() {
        if (this.props.infoUsuarios.userType === 1) {
            this.setState({
                profesor: false,
                alumSelected: this.props.infoUsuarios,
                lineSelected: 1,
                careerSight: false,
                coordSight: false
            });
            this.obtenerDataAlum(this.state.monthSelected, 0);
        }
        else {
            this.obtenerCarreras(this.props.infoUsuarios.userType);
            this.obtenerCoords(this.props.infoUsuarios.userType);
            this.setState({
                alumLabel: '---- ----',
                careerLabel: 'Carreras',
                coordLabel: 'Coordinación',
                profesor: true,
                lineSelected: 1,
                coord: this.state.coordList[0],
                career: this.state.careerList[0],
                careerSight: true,
                coordSight: false
            });

            if (this.props.infoUsuarios.userType === 3) {
                this.obtenerDataCarrer(this.state.monthSelected, this.props.infoUsuarios.userCareer);
            }
            else {
                this.setState({
                    coordLabel: this.props.infoUsuarios.userCoordination,
                    coord: this.props.infoUsuarios.userCoordination
                });
                this.obtenerAlumCoord(this.props.infoUsuarios.userCoordination);
                this.obtenerDataCoord(this.state.monthSelected, this.props.infoUsuarios.userCoordination);
            }
        }

    }

    onLineFiltClick(selected) {
        //console.log('ENUN',enunLineChartData,'TIME',timeLineChartData)
        this.setState({ espera: true });
        if (selected === 1) {
            this.setDataEnun(this.state.dataEnun);
            this.setState({
                lineSelected: selected,
                dataChart: this.enunLineChartData,
                optChart: this.enunLineChartOpt,
                espera: false
            });
        }
        else if (selected === 2) {
            this.setDataTime(this.state.dataTime);
            this.setState({
                lineSelected: selected,
                dataChart: this.timeLineChartData,
                optChart: this.timeLineChartOpt,
                espera: false
            });
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
            this.obtenerDataCarrer(this.state.monthSelected, sel);
            this.setState({
                coordLabel: 'Coordinación',
                alumList: null,
                alumLabel: '---- ----'
            });
        }
        else {
            this.obtenerAlumBeCareerOnCoord(sel, this.state.coord);
            this.setState({ alumLabel: '---- ----' });
        }
    }

    onCoordItemSelect(sel) {
        this.setState({
            coordLabel: sel,
            coord: sel,
            careerSight: false,
            coordSight: true
        });
        if (this.props.infoUsuarios.userType === 3) {
            this.obtenerDataCoord(this.state.monthSelected, sel);
            this.obtenerAlumCoord(sel);
            this.setState({
                careerLabel: 'Carreras',
                alumLabel: '---- ----'
            });
        }
        else {
            this.obtenerAlumCoord(sel);
            this.setState({ 
                careerLabel: 'Carreras',
                alumLabel: '---- ----' });
            this.obtenerDataCoord(this.state.monthSelected, sel);
        }
    }

    onUserItemSelect(alumno) {
        //Obtener data
        this.setState({
            alumSelected: alumno,
            alumLabel: alumno.userName,
            careerSight: false,
            coordSight: false
        });
        this.obtenerDataAlum(this.state.monthSelected, alumno);
    }

    onMonthItemSelected(i) {
        this.setState({
            monthSelected: i,
        });
        if (this.props.infoUsuarios.userType === 1) {
            this.obtenerDataAlum(i, this.state.alumSelected);
        }

        else if (this.props.infoUsuarios.userType === 2) {
            if (this.state.coordSight === true) {
                this.obtenerDataCoord(i, this.state.coord);
            }
            else if(this.state.careerSight === true){
                this.obtenerDataCoord(i, this.state.coord);
            }
            else {
                this.obtenerDataAlum(i, this.state.alumSelected);
            }
        }
        else if (this.props.infoUsuarios.userType === 3) {
            if (this.state.careerSight === true) {
                this.obtenerDataCarrer(i, this.state.career);
            }
            else if (this.state.coordSight === true) {
                this.obtenerDataCoord(i, this.state.coord);
            }
            else {
                this.obtenerDataAlum(i, this.state.alumSelected);
            }
        }

    }
    onButtonMonthToggle() {
        this.setState({
            monthButtonOpen: !this.state.monthButtonOpen,
        });
    }

    //===============================================================================
    //==============================GETS=============================================
    //===============================================================================


    ///
    obtenerAlumBeCareerOnCoord(career, coord) {
        var url = 'http://localhost:8082/user/careerCoordination/' + career + '/' + coord;
        this.setState({
            espera: true
        });
        Axios.get(url)
            .then(response => {
                var dataCatch = response.data;
                this.setState({
                    alumList: dataCatch,
                    espera: false
                });
            })
            .catch(function (error) {
                console.log(error);
                this.setState({ espera: false });
            });
    }
    obtenerAlumCoord(coord) {

        var url = 'http://localhost:8082/user/coordination/' + coord;
        this.setState({
            espera: true
        });
        Axios.get(url)
            .then(response => {
                var dataCatch = response.data;
                this.setState({
                    alumList: dataCatch,
                    espera: false
                });
            })
            .catch(function (error) {
                console.log(error);
                this.setState({ espera: false });
            });

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
                console.log(dataCatch);
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
    obtenerDataCoord(mes, coord) {
        var url, url2;
        var fix = mes + 1;
        this.setState({
            espera: true,
            viewing: 'Sección: '+ coord,
        });
        url = 'http://localhost:8082/userExercise/exercise/coordination/' + coord + '/' + fecha.getFullYear() + '-' + fix;
        url2 = 'http://localhost:8082/userExercise/time/coordination/' + coord + '/' + fecha.getFullYear() + '-' + fix;
        console.log(url, url2);
        Axios.get(url)
            .then(response => {
                var dataCatch = response.data;
                this.setDataEnun(dataCatch);
                this.setState({ espera: false });
            })
            .catch(function (error) {
                console.log(error);
                this.setState({ espera: false });
            });

        Axios.get(url2)
            .then(response => {
                var dataCatch = response.data;
                this.setDataTime(dataCatch);
                this.setState({ espera: false });
            })
            .catch(function (error) {
                console.log(error);
                this.setState({ espera: false });
            });

        if (this.state.lineSelected === 1) {
            this.setState({
                dataChart: this.enunLineChartData,
                optChart: this.enunLineChartOpt,
            });
        }
        else if (this.state.lineSelected === 2) {
            this.setState({
                dataChart: this.timeLineChartData,
                optChart: this.timeLineChartOpt
            });
        }
    }
    obtenerDataCarrer(mes, career) {
        var url, url2;
        var fix = mes + 1;
        this.setState({
            espera: true,
            viewing: career,
        });
        url = 'http://localhost:8082/userExercise/exercise/career/' + career + '/' + fecha.getFullYear() + '-' + fix;
        url2 = 'http://localhost:8082/userExercise/time/career/' + career + '/' + fecha.getFullYear() + '-' + fix;
        console.log(url, url2);
        Axios.get(url)
            .then(response => {
                var dataCatch = response.data;
                this.setDataEnun(dataCatch);
                this.setState({ espera: false });
            })
            .catch(function (error) {
                console.log(error);
                this.setState({ espera: false });
            });

        Axios.get(url2)
            .then(response => {
                var dataCatch = response.data;
                this.setDataTime(dataCatch);
                this.setState({ espera: false });
            })
            .catch(function (error) {
                console.log(error);
                this.setState({ espera: false });
            });

        if (this.state.lineSelected === 1) {
            this.setState({
                dataChart: this.enunLineChartData,
                optChart: this.enunLineChartOpt,
            });
        }
        else if (this.state.lineSelected === 2) {
            this.setState({
                dataChart: this.timeLineChartData,
                optChart: this.timeLineChartOpt
            });
        }
    }
    obtenerDataAlum(mes, alum) {
        var url, url2;
        var fix = mes + 1;
        this.setState({
            espera: true,
            viewing: alum.userName,
        });
        if (alum === 0) {
            url = 'http://localhost:8082/userExercise/exercise/student/' + this.props.infoUsuarios.userMail + '/' + fecha.getFullYear() + '-' + fix;
            url2 = 'http://localhost:8082/userExercise/time/student/' + this.props.infoUsuarios.userMail + '/' + fecha.getFullYear() + '-' + fix;
        }
        else {
            url = 'http://localhost:8082/userExercise/exercise/student/' + alum.userMail + '/' + fecha.getFullYear() + '-' + fix;
            url2 = 'http://localhost:8082/userExercise/time/student/' + alum.userMail + '/' + fecha.getFullYear() + '-' + fix;
        }
        console.log(url, url2);
        Axios.get(url)
            .then(response => {
                var dataCatch = response.data;
                this.setDataEnun(dataCatch);
                this.setState({ espera: false });
            })
            .catch(function (error) {
                console.log(error);
                this.setState({ espera: false });
            });

        Axios.get(url2)
            .then(response => {
                var dataCatch = response.data;
                this.setDataTime(dataCatch);
                this.setState({ espera: false });
            })
            .catch(function (error) {
                console.log(error);
                this.setState({ espera: false });
            });

        if (this.state.lineSelected === 1) {
            this.setState({
                dataChart: this.enunLineChartData,
                optChart: this.enunLineChartOpt,
            });
        }
        else if (this.state.lineSelected === 2) {
            this.setState({
                dataChart: this.timeLineChartData,
                optChart: this.timeLineChartOpt
            });
        }
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

    filterGroup(listaCareer, listaCoord) {
        return (
            <ButtonToolbar className="float-center" aria-label="Toolbar with button groups">
                <ButtonGroup horizontal="true">
                    <ButtonDropdown isOpen={this.state.careerDropOpen} toggle={() => { this.setState({ careerDropOpen: !this.state.careerDropOpen }); }}>
                        <DropdownToggle caret>
                            {this.state.careerLabel}
                        </DropdownToggle>
                        <DropdownMenu direction="down">
                            {listaCareer && listaCareer.map((career, key) =>
                                <DropdownItem key={key} onClick={() => this.onCareerItemSelect(career)} >{career}</DropdownItem>
                            )}
                        </DropdownMenu>
                    </ButtonDropdown>
                    <ButtonDropdown isOpen={this.state.coordDropOpen} toggle={() => { this.setState({ coordDropOpen: !this.state.coordDropOpen }); }}>
                        <DropdownToggle caret>
                            {this.state.coordLabel}
                        </DropdownToggle>
                        <DropdownMenu direction="down">
                            {listaCoord && listaCoord.map((cord, key) =>
                                <DropdownItem key={key} onClick={() => this.onCoordItemSelect(cord)} >{cord}</DropdownItem>
                            )}
                        </DropdownMenu>
                    </ButtonDropdown>
                </ButtonGroup>
            </ButtonToolbar>
        )

    }
    filterUser(listaAlumnos) {
        var des;
        if (listaAlumnos === null || listaAlumnos.length === 0)
            des = true;
        else
            des = false;

        return (
            <Input type="select" name="select" id="select">
                <option value="0">{this.state.alumLabel}</option>
                {des ?
                    <div />
                    :
                    <optgroup className="text-center" label='-----------------------------'>
                    </optgroup>
                }
                {listaAlumnos && listaAlumnos.map((alumno, key) =>
                    <option key={key} value={key} onClick={() => this.onUserItemSelect(alumno)} >{alumno.userName}</option>
                )}
            </Input>
        )
    }
    //Botones de filtro de cada grafo
    filterLine() {
        return (
            <ButtonToolbar className="float-left" aria-label="Toolbar with button groups">
                <ButtonGroup className="mr-3" aria-label="First group">
                    <Button color="outline-secondary" onClick={() => this.onLineFiltClick(1)} active={this.state.lineSelected === 1}>Enunciados</Button>
                    <Button color="outline-secondary" onClick={() => this.onLineFiltClick(2)} active={this.state.lineSelected === 2}>Tiémpo</Button>
                </ButtonGroup>
            </ButtonToolbar>
        )
    }
    chartLine(dataIn, optIn) {
        return (
            <div className="chart-wrapper" style={{ height: 70 + '%', marginTop: 5 + '%' }}>
                <Line data={dataIn} options={optIn} height={70} redraw={true} />
            </div>
        )
    }
    chartTittle(titulo) {
        return (
            <CardHeader>
                <i className="fa fa-align-justify"></i> {titulo +' - '+ this.state.viewing +' mes de '+monthsLabel[this.state.monthSelected]}
            </CardHeader>
        )
    }
    chartFooter(filtro) {
        if (filtro === 1) {
            return (
                <CardFooter>
                    <Row className="text-center">
                        <Col sm={12} md className="mb-sm-2 mb-0">
                            <div className="text-muted">Enunciados Realizados</div>
                            <strong>{totalEnunciados} Enunciados</strong>
                            <Progress className="progress-xs mt-2" color="info" value="100" />
                        </Col>
                        <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                            <div className="text-muted">Faciles Realizados</div>
                            <strong>{totalFaciles} Enunciados ({percentFaciles}%)</strong>
                            <Progress className="progress-xs mt-2" color="green" value={String(percentFaciles)} />
                        </Col>
                        <Col sm={12} md className="mb-sm-2 mb-0">
                            <div className="text-muted">Intermedios Realizados</div>
                            <strong>{totalIntermedios} Enunciados ({percentIntermedios}%)</strong>
                            <Progress className="progress-xs mt-2" color="danger" value={String(percentIntermedios)} />
                        </Col>
                        <Col sm={12} md className="mb-sm-2 mb-0">
                            <div className="text-muted">Difíciles Realizados</div>
                            <strong>{totalDificiles} Enunciados ({percentDificiles}%)</strong>
                            <Progress className="progress-xs mt-2" color="warning" value={String(percentDificiles)} />
                        </Col>
                    </Row>
                </CardFooter>
            );
        }
        else if (filtro === 2) {
            return (
                <CardFooter>
                    <Row className="text-center">
                        <Col sm={12} md className="mb-sm-2 mb-0">
                            <div className="text-muted">Tiempo Utilizado</div>
                            <strong>{totalMinutes} Segundos Totales </strong>
                            <Progress className="progress-xs mt-2" color="info" value="100" />
                        </Col>
                        <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                            <div className="text-muted">Segunodos en Faciles</div>
                            <strong>{minutesFaciles} Segundos ({percentTimeF}%)</strong>
                            <Progress className="progress-xs mt-2" color="green" value={String(percentTimeF)} />
                        </Col>
                        <Col sm={12} md className="mb-sm-2 mb-0">
                            <div className="text-muted">Segundos en Intermedios</div>
                            <strong>{minutesIntermedios} Segundos ({percentTimeI}%)</strong>
                            <Progress className="progress-xs mt-2" color="danger" value={String(percentTimeI)} />
                        </Col>
                        <Col sm={12} md className="mb-sm-2 mb-0">
                            <div className="text-muted">Segundos por Difíciles</div>
                            <strong>{minutesDificiles} Segundos ({percentTimeD}%)</strong>
                            <Progress className="progress-xs mt-2" color="warning" value={String(percentTimeD)} />
                        </Col>
                    </Row>
                </CardFooter>
            );
        }
    }
    makeLineChart(dataIn, optIn, month, filtro) {
        //PEDIR ENUNCIADOS SEGUN MES
        var titulo;
        if (filtro === 1) {
            titulo = "Enunciados realizados por día";
        }
        else if (filtro === 2) {
            titulo = "Tiempo utilizado por día";
        }
        return (
            <Card>
                {this.chartTittle(titulo)}
                {this.state.espera ?
                    <CardBody>
                        <div className="row">
                            <div className='col'>
                                <div className='defaultSpinner' ></div>
                            </div>
                        </div>
                    </CardBody>
                    :
                    <CardBody>
                        <Row>
                            <Col xs='3'>
                                {this.filterLine()}
                            </Col>
                            {this.state.profesor ?
                                <Col className='text-right' xs='5'>
                                    {this.filterGroup(this.state.careerList, this.state.coordList)}
                                </Col>
                                :
                                <Col xs='3'>

                                </Col>
                            }
                            {this.state.profesor ?
                                <Col className='text-center' xs='3'>
                                    {this.filterUser(this.state.alumList)}
                                </Col>
                                :
                                <Col xs='3'>

                                </Col>
                            }
                            <Col className='text-right' xs='1'>
                                {this.buttonMonth(month)}
                            </Col>
                        </Row>
                        {this.chartLine(dataIn, optIn)}
                    </CardBody>
                }
                {this.chartFooter(filtro)}
            </Card>
        );
    }

    //Calculo de values importantes
    render() {
        return (
            <Col>
                {this.makeLineChart(this.state.dataChart, this.state.optChart, this.state.monthSelected, this.state.lineSelected)}
            </Col>
        );
    }
    setDataEnun(dataCatch) {
        this.setState({ espera: true });
        let i;
        var matrixSum = new Array(31);
        for (i = 0; i < dataCatch.Facil.length; i++) {
            matrixSum[i] = dataCatch.Facil[i] + dataCatch.Intermedio[i] + dataCatch.Dificil[i];
        }
        totalFaciles = this.sumaDeArray(dataCatch.Facil);
        totalIntermedios = this.sumaDeArray(dataCatch.Intermedio);
        totalDificiles = this.sumaDeArray(dataCatch.Dificil);
        totalEnunciados = totalDificiles + totalFaciles + totalIntermedios;
        percentFaciles = Math.round(this.calculoPorcentaje(totalEnunciados, totalFaciles) * 100) / 100;
        percentIntermedios = Math.round(this.calculoPorcentaje(totalEnunciados, totalIntermedios) * 100) / 100;
        percentDificiles = Math.round(this.calculoPorcentaje(totalEnunciados, totalDificiles * 100) / 100);
        this.enunLineChartData.datasets[0].data = matrixSum;
        this.enunLineChartData.datasets[1].data = dataCatch.Facil;
        this.enunLineChartData.datasets[2].data = dataCatch.Intermedio;
        this.enunLineChartData.datasets[3].data = dataCatch.Dificil;
        this.enunLineChartOpt.scales.yAxes.stepSize = Math.ceil(matrixSum.max / 5);
        this.enunLineChartOpt.scales.yAxes.max = matrixSum.max;
        this.setState({
            dataEnun: dataCatch,
            espera: false
        });
    }
    setDataTime(dataCatch) {
        this.setState({ espera: true });
        let i;
        var matrixSum = new Array(31);
        for (i = 0; i < dataCatch.Facil.length; i++) {
            matrixSum[i] = dataCatch.Facil[i] + dataCatch.Intermedio[i] + dataCatch.Dificil[i];
        }
        minutesFaciles = this.sumaDeArray(dataCatch.Facil);
        minutesIntermedios = this.sumaDeArray(dataCatch.Intermedio);
        minutesDificiles = this.sumaDeArray(dataCatch.Dificil);
        totalMinutes = minutesDificiles + minutesFaciles + minutesIntermedios;
        percentTimeF = Math.round(this.calculoPorcentaje(totalMinutes, minutesFaciles) * 100) / 100;
        percentTimeI = Math.round(this.calculoPorcentaje(totalMinutes, minutesIntermedios) * 100) / 100;
        percentTimeD = Math.round(this.calculoPorcentaje(totalMinutes, minutesDificiles) * 100) / 100;
        this.timeLineChartData.datasets[0].data = matrixSum;
        this.timeLineChartData.datasets[1].data = dataCatch.Facil;
        this.timeLineChartData.datasets[2].data = dataCatch.Intermedio;
        this.timeLineChartData.datasets[3].data = dataCatch.Dificil;
        this.timeLineChartOpt.scales.yAxes.stepSize = Math.ceil(matrixSum.max / 5);
        this.timeLineChartOpt.scales.yAxes.max = matrixSum.max;
        this.setState({
            dataTime: dataCatch,
            espera: false
        });
    }
    sumaDeArray(array) {
        var i;
        var suma = 0;
        for (i = 0; i < array.length; i++) {
            suma = suma + array[i];
        }
        return suma;
    }
    calculoPorcentaje(total, cantidad) {
        var porcentaje = (cantidad * 100) / total;
        return porcentaje;
    }

}
const mapStateToProps = state => {
    return {
        infoUsuarios: state.infoUsuarios,
    };
};

export default connect(mapStateToProps)(LineChart);
