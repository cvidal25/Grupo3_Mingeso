import React, { Component } from 'react';
import ChartComponent, { Line } from 'react-chartjs-2';
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
var enunLineChartData = {
    labels: daysLabel,
    datasets: [
        {
            label: 'Enunciados Totales',
            backgroundColor: hexToRgba(brandInfo, 10),
            borderColor: brandInfo,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: null,
        },
        {
            label: 'Enunciados Faciles',
            backgroundColor: 'transparent',
            borderColor: brandSuccess,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: null,
        },
        {
            label: 'Enunciados Intermedios',
            backgroundColor: 'transparent',
            borderColor: brandDanger,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            //borderDash: [8, 5],
            data: null,
        },
        {
            label: 'Enunciados Dificiles',
            backgroundColor: 'transparent',
            borderColor: brandWarning,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            //borderDash: [8, 5],
            data: null,
        },
    ],
};
var timeLineChartData = {
    labels: daysLabel,
    datasets: [
        {
            label: 'Enunciados Totales',
            backgroundColor: hexToRgba(brandInfo, 10),
            borderColor: brandInfo,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: null,
        },
        {
            label: 'Enunciados Faciles',
            backgroundColor: 'transparent',
            borderColor: brandSuccess,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: null,
        },
        {
            label: 'Enunciados Intermedios',
            backgroundColor: 'transparent',
            borderColor: brandDanger,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            //borderDash: [8, 5],
            data: null,
        },
        {
            label: 'Enunciados Dificiles',
            backgroundColor: 'transparent',
            borderColor: brandWarning,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            //borderDash: [8, 5],
            data: null,
        },
    ],
};
var enunLineChartOpt = {
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

var timeLineChartOpt = {
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

const initOpts = {
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
                    stepSize: Math.ceil(enunciadosPerDay.max / 5),
                    max: enunciadosPerDay.max,
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

        this.state = {
            monthLineButtonOpen: false,
            lineSelected: 1,
            monthLineSelected: fecha.getMonth(),
            //Chart States
            dataLineChart: null,
            optLineChart: null,
            espera: false,
            profesor: true,
            coord: 'B-1',
            career: 'Informatica',
            group: true
        };
        this.onLineFiltClick = this.onLineFiltClick.bind(this);
        this.onLineMonthItemSelected = this.onLineMonthItemSelected.bind(this);
        this.buttonLineMonth = this.buttonLineMonth.bind(this);
        this.onLineButtonMonthToggle = this.onLineButtonMonthToggle.bind(this)
        this.filterLine = this.filterLine.bind(this);
    }
    componentWillMount() {
        if (this.props.infoUsuarios.userType === 1) {
            this.obtenerData(fecha.getMonth(), 1, false);
            this.setState({
                profesor: true,
                lineSelected: 1,
                dataLineChart: enunLineChartData,
                optLineChart: enunLineChartOpt,
                group: false
            });
        }
        else {
            this.obtenerData(fecha.getMonth(), 2, true);

            this.setState({
                profesor: true,
                lineSelected: 1,
                dataLineChart: enunLineChartData,
                optLineChart: enunLineChartOpt,
                group: true
            });
        }
    }

    onLineFiltClick(selected) {
        if (selected === 1) {
            this.setState({
                dataLineChart: enunLineChartData,
                optLineChart: enunLineChartOpt,
                lineSelected: selected,
            });
        }
        else if (selected === 2) {
            this.setState({
                dataLineChart: timeLineChartData,
                optLineChart: timeLineChartOpt,
                lineSelected: selected,
            });
        }
    }
    onLineCareerItemSelect(sel) {
        this.setState({
            career: sel,
            group: true
        });
        this.obtenerData(this.state.monthSelected, this.props.infoUsuarios.userType, this.state.group);
        if (this.state.lineSelected === 1) {
            this.setState({
                dataLineChart: enunLineChartData,
                optLineChart: enunLineChartOpt
            });
        }
        else if (this.state.lineSelected === 2) {
            this.setState({
                dataLineChart: timeLineChartData,
                optLineChart: timeLineChartOpt
            });
        }
    }
    onLineCoordItemSelect(sel) {
        this.setState({
            career: sel,
            group: false
        });
        this.obtenerData(this.state.monthSelected, this.props.infoUsuarios.userType, this.state.group);
        if (this.state.lineSelected === 1) {
            this.setState({
                dataLineChart: enunLineChartData,
                optLineChart: enunLineChartOpt,
            });
        }
        else if (this.state.lineSelected === 2) {
            this.setState({
                dataLineChart: timeLineChartData,
                optLineChart: timeLineChartOpt,
            });
        }
    }
    onLineMonthItemSelected(i) {
        this.obtenerData(i, this.props.infoUsuarios.userType, this.state.group);
        this.setState({
            monthLineSelected: i,
        });
        if (this.state.lineSelected === 1) {
            this.setState({
                dataLineChart: enunLineChartData,
                optLineChart: enunLineChartOpt,
            });
        }
        else if (this.state.lineSelected === 2) {
            this.setState({
                dataLineChart: timeLineChartData,
                optLineChart: timeLineChartOpt
            });
        }
    }
    onLineButtonMonthToggle() {
        this.setState({
            monthLineButtonOpen: !this.state.monthLineButtonOpen,
        });
    }
    setDataEnun(dataCatch) {
        let i;
        var matrixSum = new Array(30);
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
        enunLineChartData.datasets[0].data = matrixSum;
        enunLineChartData.datasets[1].data = dataCatch.Facil;
        enunLineChartData.datasets[2].data = dataCatch.Intermedio;
        enunLineChartData.datasets[3].data = dataCatch.Dificil;
        enunLineChartOpt.scales.yAxes.stepSize = Math.ceil(matrixSum.max / 5);
    }
    setDataTime(dataCatch) {
        let i;
        var matrixSum = new Array(30);
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
        timeLineChartData.datasets[0].data = matrixSum;
        timeLineChartData.datasets[1].data = dataCatch.Facil;
        timeLineChartData.datasets[2].data = dataCatch.Intermedio;
        timeLineChartData.datasets[3].data = dataCatch.Dificil;
        timeLineChartOpt.scales.yAxes.stepSize = Math.ceil(matrixSum.max / 5);
    }
    obtenerCarreras(){
        var url='http://localhost:8082/user/allcareer';
        Axios.get(url)
    }
    obtenerCoords(){
        var url='http://localhost:8082/user/allcoordination';

    }
    obtenerData(mes, tipo, group) {
        var url, url2;
        var fix = mes + 1;
        this.setState({
            espera: true
        });

        if (tipo === 1) {
            url = 'http://localhost:8082/userExercise/exercise/student/' + this.props.infoUsuarios.userMail + '/' + fecha.getFullYear() + '-' + fix;
            url2 = 'http://localhost:8082/userExercise/time/student/' + this.props.infoUsuarios.userMail + '/' + fecha.getFullYear() + '-' + fix;
        }
        else if (tipo === 2) {
            if (group === true) {
                url = 'http://localhost:8082/userExercise/exercise/career/' + this.state.career + '/' + fecha.getFullYear() + '-' + fix;
                url2 = 'http://localhost:8082/userExercise/time/career/' + this.state.career + '/' + fecha.getFullYear() + '-' + fix;
            }
            else {
                url = 'http://localhost:8082/userExercise/exercise/coordination/' + this.state.coord + '/' + fecha.getFullYear() + '-' + fix;
                url2 = 'http://localhost:8082/userExercise/time/coordination/' + this.state.coord + '/' + fecha.getFullYear() + '-' + fix;
            }
        }
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
    }

    buttonLineMonth(month) {
        return (
            <ButtonDropdown isOpen={this.state.monthLineButtonOpen} toggle={() => { this.onLineButtonMonthToggle() }}>
                <DropdownToggle caret className="pb-1" color="primary">{monthsLabel[month]}</DropdownToggle>
                <DropdownMenu down="true">
                    <DropdownItem header>Mes</DropdownItem>
                    <DropdownItem onClick={() => { this.onLineMonthItemSelected(2); }}>Marzo</DropdownItem>
                    <DropdownItem onClick={() => { this.onLineMonthItemSelected(3); }}>Abril</DropdownItem>
                    <DropdownItem onClick={() => { this.onLineMonthItemSelected(4); }}>Mayo</DropdownItem>
                    <DropdownItem onClick={() => { this.onLineMonthItemSelected(5); }}>Junio</DropdownItem>
                    <DropdownItem onClick={() => { this.onLineMonthItemSelected(6); }}>Julio</DropdownItem>
                    <DropdownItem onClick={() => { this.onLineMonthItemSelected(7); }}>Agosto</DropdownItem>
                    <DropdownItem onClick={() => { this.onLineMonthItemSelected(8); }}>Septiembre</DropdownItem>
                    <DropdownItem onClick={() => { this.onLineMonthItemSelected(9); }}>Octubre</DropdownItem>
                    <DropdownItem onClick={() => { this.onLineMonthItemSelected(10); }}>Noviembre</DropdownItem>
                    <DropdownItem onClick={() => { this.onLineMonthItemSelected(11); }}>Diciembre</DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        );
    }
    filterGroupLine() {
        return (
            <ButtonToolbar className="float-center" aria-label="Toolbar with button groups">
                <ButtonGroup horizontal>
                    <ButtonDropdown id='carre' isOpen={this.state.carre} toggle={() => { this.setState({ carre: !this.state.carre }); }}>
                        <DropdownToggle caret>
                            Carrera
                    </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>Informatica</DropdownItem>
                            <DropdownItem>Electrica</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                    <ButtonDropdown id='coord' isOpen={this.state.coord} toggle={() => { this.setState({ coord: !this.state.coord }); }}>
                        <DropdownToggle caret>
                            Coordinación
                    </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>A-1</DropdownItem>
                            <DropdownItem>B-2</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                </ButtonGroup>
            </ButtonToolbar>
        )

    }
    //Botones de filtro de cada grafo
    filterLine() {
        return (
            <ButtonToolbar className="float-left" aria-label="Toolbar with button groups">
                <ButtonGroup className="mr-3" aria-label="First group">
                    <Button color="outline-secondary" onClick={() => this.onLineFiltClick(1)} active={this.state.lineSelected === 1}>Enunciados</Button>
                    <Button color="outline-secondary" onClick={() => this.onLineFiltClick(2)} active={this.state.lineSelected === 2}>Horas</Button>
                </ButtonGroup>
            </ButtonToolbar>
        )
    }
    chartLine(dataIn, optIn) {
        return (
            <div className="chart-wrapper" style={{ height: 70 + '%', marginTop: 5 + '%' }}>
                <Line data={dataIn} options={optIn} height={70} />
            </div>
        )
    }
    chartTittle(titulo) {
        return (
            <CardHeader>
                <i className="fa fa-align-justify"></i> {titulo}
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
                            <Progress className="progress-xs mt-2" color="succes" value={String(percentFaciles)} />
                        </Col>
                        <Col sm={12} md className="mb-sm-2 mb-0">
                            <div className="text-muted">Intermedios Realizados</div>
                            <strong>{totalIntermedios} Enunciados ({percentIntermedios}%)</strong>
                            <Progress className="progress-xs mt-2" color="warning" value={String(percentIntermedios)} />
                        </Col>
                        <Col sm={12} md className="mb-sm-2 mb-0">
                            <div className="text-muted">Difíciles Realizados</div>
                            <strong>{totalDificiles} Enunciados ({percentDificiles}%)</strong>
                            <Progress className="progress-xs mt-2" color="danger" value={String(percentDificiles)} />
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
                            <strong>{totalMinutes} Minutos Totales </strong>
                            <Progress className="progress-xs mt-2" color="info" value="100" />
                        </Col>
                        <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                            <div className="text-muted">Minutos en Faciles</div>
                            <strong>{minutesFaciles} Minutos ({percentTimeF}%)</strong>
                            <Progress className="progress-xs mt-2" color="succes" value={String(percentTimeF)} />
                        </Col>
                        <Col sm={12} md className="mb-sm-2 mb-0">
                            <div className="text-muted">Minutos en Intermedios</div>
                            <strong>{minutesIntermedios} Minutos ({percentTimeI}%)</strong>
                            <Progress className="progress-xs mt-2" color="warning" value={String(percentTimeI)} />
                        </Col>
                        <Col sm={12} md className="mb-sm-2 mb-0">
                            <div className="text-muted">Minutos por Difíciles</div>
                            <strong>{minutesDificiles} Minutos ({percentTimeD}%)</strong>
                            <Progress className="progress-xs mt-2" color="danger" value={String(percentTimeD)} />
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
                <CardBody>
                    <Row>
                        <Col xs='3'>
                            {this.filterLine()}
                        </Col>
                        {this.state.profesor ?
                            <Col className='text-center' xs='6'>
                                {this.filterGroupLine()}
                            </Col>
                            :
                            <Col xs='6'>

                            </Col>
                        }
                        <Col className='text-right' xs='3'>
                            {this.buttonLineMonth(month)}
                        </Col>
                    </Row>
                    {this.chartLine(dataIn, optIn)}
                </CardBody>
                {this.chartFooter(filtro)}
            </Card>
        );
    }

    sumaDeArray(array, largo) {
        var i;
        var suma = 0;
        for (i = 0; i < largo; i++) {
            suma = suma + array[i];
        }
        return suma;
    }
    calculoPorcentaje(total, cantidad) {
        var porcentaje = (cantidad * 100) / total;
        return porcentaje;
    }
    //Calculo de values importantes
    render() {
        return (
            <Col>
                {this.makeLineChart(this.state.dataLineChart, this.state.optLineChart, this.state.monthLineSelected, this.state.lineSelected)}
            </Col>
        );
    }

}
const mapStateToProps = state => {
    return {
        infoUsuarios: state.infoUsuarios,
    };
};

export default connect(mapStateToProps)(LineChart);
