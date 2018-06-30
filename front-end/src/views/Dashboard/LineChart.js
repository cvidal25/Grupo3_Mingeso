import React, { Component } from 'react';
import ChartComponent, {Line} from 'react-chartjs-2';
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

var minutesPerFaciles = [10, 10, 50, 5, 10, 0
    , 10, 0, 0, 0, 5, 0
    , 40, 15, 30, 0, 0, 0
    , 0, 10, 40, 0, 0, 5
    , 20, 0, 15, 20, 30, 0
    , 0];

var minutesPerIntermedios = [20, 60, 60, 10, 30, 20
    , 20, 10, 0, 0, 10, 0
    , 100, 10, 60, 30, 0, 0
    , 10, 10, 80, 0, 0, 30
    , 30, 0, 30, 40, 50, 0
    , 0];

var minutesPerDificiles = [40, 80, 140, 40, 0, 0
    , 80, 60, 0, 0, 0, 0
    , 200, 20, 20, 60, 340, 0
    , 0, 20, 100, 40, 0, 20
    , 0, 0, 60, 80, 100, 0
    , 40];

var minutesPerDay = [70, 150, 250, 55, 40, 20
    , 110, 70, 0, 0, 15, 0
    , 340, 45, 110, 90, 340, 0
    , 10, 40, 220, 40, 0, 55
    , 50, 0, 105, 140, 180, 0
    , 40];

var facilesPerDay = [2, 2, 10, 1, 2, 0
    , 2, 0, 0, 0, 1, 0
    , 8, 3, 6, 0, 0, 0
    , 0, 2, 8, 0, 0, 1
    , 4, 0, 3, 4, 6, 0
    , 0];

var intermediosPerDay = [2, 6, 6, 1, 3, 2
    , 2, 1, 0, 0, 1, 0
    , 10, 1, 6, 3, 0, 0
    , 1, 1, 8, 0, 0, 3
    , 3, 0, 3, 4, 5, 0
    , 0];

var dificilesPerDay = [2, 4, 7, 2, 0, 0
    , 4, 3, 0, 0, 0, 0
    , 10, 1, 1, 3, 17, 0
    , 0, 1, 5, 2, 0, 1
    , 0, 0, 3, 4, 5, 0
    , 2];

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
            data: enunciadosPerDay,
        },
        {
            label: 'Enunciados Faciles',
            backgroundColor: 'transparent',
            borderColor: brandSuccess,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: facilesPerDay,
        },
        {
            label: 'Enunciados Intermedios',
            backgroundColor: 'transparent',
            borderColor: brandDanger,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            //borderDash: [8, 5],
            data: intermediosPerDay,
        },
        {
            label: 'Enunciados Dificiles',
            backgroundColor: 'transparent',
            borderColor: brandWarning,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            //borderDash: [8, 5],
            data: dificilesPerDay,
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
            data: minutesPerDay,
        },
        {
            label: 'Enunciados Faciles',
            backgroundColor: 'transparent',
            borderColor: brandSuccess,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: minutesPerFaciles,
        },
        {
            label: 'Enunciados Intermedios',
            backgroundColor: 'transparent',
            borderColor: brandDanger,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            //borderDash: [8, 5],
            data: minutesPerIntermedios,
        },
        {
            label: 'Enunciados Dificiles',
            backgroundColor: 'transparent',
            borderColor: brandWarning,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            //borderDash: [8, 5],
            data: minutesPerDificiles,
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
var initData = {
    labels: daysLabel,
    datasets: [
        {
            label: 'Enunciados Totales',
            backgroundColor: hexToRgba(brandInfo, 10),
            borderColor: brandInfo,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: enunciadosPerDay,
        },
        {
            label: 'Enunciados Faciles',
            backgroundColor: 'transparent',
            borderColor: brandSuccess,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: facilesPerDay,
        },
        {
            label: 'Enunciados Intermedios',
            backgroundColor: 'transparent',
            borderColor: brandDanger,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            //borderDash: [8, 5],
            data: intermediosPerDay,
        },
        {
            label: 'Enunciados Dificiles',
            backgroundColor: 'transparent',
            borderColor: brandWarning,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            //borderDash: [8, 5],
            data: dificilesPerDay,
        },
    ],
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
            monthLineSelected: monthsLabel[5],
            //Chart States
            dataLineChart: initData,
            optLineChart: initOpts,
            espera: false,
            profesor: true,
        };
        this.onLineFiltClick=this.onLineFiltClick.bind(this);
        this.onLineMonthItemSelected=this.onLineMonthItemSelected.bind(this);
        this.buttonLineMonth=this.buttonLineMonth.bind(this);
        this.onLineButtonMonthToggle=this.onLineButtonMonthToggle.bind(this)
        this.filterLine=this.filterLine.bind(this);
    }
    onLineFiltClick(selected) {
        console.log(this.state.monthLineSelected);
        console.log(this.state.lineSelected);
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

    onLineMonthItemSelected(i) {
        this.setState({
          monthSelected: monthsLabel[i],
        });
    }
    onLineButtonMonthToggle() {
        this.setState({
          monthLineButtonOpen: !this.state.monthLineButtonOpen,
        });
      }
    buttonLineMonth(month) {
        return (

            <ButtonDropdown isOpen={this.state.monthLineButtonOpen} toggle={() => { this.onLineButtonMonthToggle() }}>
                <DropdownToggle caret className="pb-1" color="primary">{month}</DropdownToggle>
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
      filterGroupLine(){
          return (
            <ButtonToolbar className="float-center" aria-label="Toolbar with button groups">
                <ButtonGroup horizontal>
                  <ButtonDropdown id='carre' isOpen={this.state.carre} toggle={() => { this.setState({carre: !this.state.carre }); }}>
                    <DropdownToggle caret>
                      Carrera
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Informatica</DropdownItem>
                      <DropdownItem>Electrica</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                  <ButtonDropdown id='coord' isOpen={this.state.coord} toggle={() => { this.setState({coord: !this.state.coord }); }}>
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
        this.calculoDeEstadisticas();
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
        if (filtro===1){
            titulo= "Enunciados realizados por día";
        }
        else if(filtro===2){
            titulo="Tiempo utilizado por día";
        }
        return (
          <Card>
            {this.chartTittle(titulo)}
            <CardBody>
              <Row>
                <Col xs='3'>
                {this.filterLine()}
                </Col>
                {this.state.profesor? 
                <Col className='text-center' xs='6'>
                    {this.filterGroupLine()}
                </Col>
                :
                <Col xs='6'>

                </Col>
                }
                <Col className='text-right'xs='3'>
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
      calculoDeEstadisticas() {
        totalEnunciados = this.sumaDeArray(enunciadosPerDay, enunciadosPerDay.length);
        totalFaciles = this.sumaDeArray(facilesPerDay, facilesPerDay.length);
        totalIntermedios = this.sumaDeArray(intermediosPerDay, intermediosPerDay.length);
        totalDificiles = this.sumaDeArray(dificilesPerDay, dificilesPerDay.length);
        percentFaciles = Math.round(this.calculoPorcentaje(totalEnunciados, totalFaciles) * 100) / 100;
        percentIntermedios = Math.round(this.calculoPorcentaje(totalEnunciados, totalIntermedios) * 100) / 100;
        percentDificiles = Math.round(this.calculoPorcentaje(totalEnunciados, totalDificiles * 100) / 100);
    
        totalMinutes = this.sumaDeArray(minutesPerDay, minutesPerDay.length);
        minutesFaciles = this.sumaDeArray(minutesPerFaciles, minutesPerFaciles.length);
        minutesIntermedios = this.sumaDeArray(minutesPerIntermedios, minutesPerIntermedios.length);
        minutesDificiles = this.sumaDeArray(minutesPerDificiles, minutesPerDificiles.length);
        percentTimeF = Math.round(this.calculoPorcentaje(totalMinutes, minutesFaciles) * 100) / 100;;
        percentTimeI = Math.round(this.calculoPorcentaje(totalMinutes, minutesIntermedios) * 100) / 100;;
        percentTimeD = Math.round(this.calculoPorcentaje(totalMinutes, minutesDificiles) * 100) / 100;;
      }

      render(){
        return (
            <Col>
                {this.makeLineChart(this.state.dataLineChart, this.state.optLineChart, this.state.monthLineSelected,this.state.lineSelected)}
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