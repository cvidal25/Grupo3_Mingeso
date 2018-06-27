import React, { Component } from 'react';
import ChartComponent, { Bar, Line, Pie } from 'react-chartjs-2';
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
import Widget03 from '../../views/Widgets/Widget03'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/*this.props.infoUsuarios.LO QUE NECESITES DEL USUARIO
ejempplo: this.props.infoUsuario.userID,
{"userID":7,"userName":"Barbara Sarmiento",
"userType":1,
"userMail":"barbara.sarmiento@usach.cl",
"userCareer":"Ingeniería de Ejecución en Informática",
"userCoordination":"B-3"}
*/

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')


const facilesPerDay = [2, 2, 10, 1, 2, 0
  , 2, 0, 0, 0, 1, 0
  , 8, 3, 6, 0, 0, 0
  , 0, 2, 8, 0, 0, 1
  , 4, 0, 3, 4, 6, 0
  , 0];

const intermediosPerDay = [2, 6, 6, 1, 3, 2
  , 2, 1, 0, 0, 1, 0
  , 10, 1, 6, 3, 0, 0
  , 1, 1, 8, 0, 0, 3
  , 3, 0, 3, 4, 5, 0
  , 0];

const dificilesPerDay = [2, 4, 7, 2, 0, 0
  , 4, 3, 0, 0, 0, 0
  , 10, 1, 1, 3, 17, 0
  , 0, 1, 5, 2, 0, 1
  , 0, 0, 3, 4, 5, 0
  , 2];

const enunciadosPerDay = [6, 12, 23, 4, 5, 2
  , 8, 4, 0, 0, 2, 0
  , 28, 5, 13, 6, 17, 0
  , 1, 4, 21, 2, 0, 5
  , 7, 0, 9, 12, 16, 0
  , 2];

const enunGFacilPerDay = [6, 12, 23, 4, 5, 2
  , 8, 4, 0, 0, 2, 0
  , 28, 5, 13, 6, 17, 0
  , 1, 4, 21, 2, 0, 5
  , 7, 0, 9, 12, 16, 0
  , 2];

const enunGIntermediosPerDay = [6, 12, 23, 4, 5, 2
  , 8, 4, 0, 0, 2, 0
  , 28, 5, 13, 6, 17, 0
  , 1, 4, 21, 2, 0, 5
  , 7, 0, 9, 12, 16, 0
  , 2];

const enunGDificilesPerDay = [6, 12, 23, 4, 5, 2
  , 8, 4, 0, 0, 2, 0
  , 28, 5, 13, 6, 17, 0
  , 1, 4, 21, 2, 0, 5
  , 7, 0, 9, 12, 16, 0
  , 2];

const enunGPerDay = [6, 12, 23, 4, 5, 2
  , 8, 4, 0, 0, 2, 0
  , 28, 5, 13, 6, 17, 0
  , 1, 4, 21, 2, 0, 5
  , 7, 0, 9, 12, 16, 0
  , 2];

const minutesPerFaciles = [10, 10, 50, 5, 10, 0
  , 10, 0, 0, 0, 5, 0
  , 40, 15, 30, 0, 0, 0
  , 0, 10, 40, 0, 0, 5
  , 20, 0, 15, 20, 30, 0
  , 0];

const minutesPerIntermedios = [20, 60, 60, 10, 30, 20
  , 20, 10, 0, 0, 10, 0
  , 100, 10, 60, 30, 0, 0
  , 10, 10, 80, 0, 0, 30
  , 30, 0, 30, 40, 50, 0
  , 0];

const minutesPerDificiles = [40, 80, 140, 40, 0, 0
  , 80, 60, 0, 0, 0, 0
  , 200, 20, 20, 60, 340, 0
  , 0, 20, 100, 40, 0, 20
  , 0, 0, 60, 80, 100, 0
  , 40];

const minutesPerDay = [70, 150, 250, 55, 40, 20
  , 110, 70, 0, 0, 15, 0
  , 340, 45, 110, 90, 340, 0
  , 10, 40, 220, 40, 0, 55
  , 50, 0, 105, 140, 180, 0
  , 40];

const usersPerDay = [70, 150, 250, 55, 40, 20
  , 110, 70, 0, 0, 15, 0
  , 340, 45, 110, 90, 340, 0
  , 10, 40, 220, 40, 0, 55
  , 50, 0, 105, 140, 180, 0
  , 40];

const userPerDayInformatica = [140, 75, 125, 110, 20, 40
  , 55, 140, 32, 0, 15, 10
  , 340, 90, 55, 945, 170, 1
  , 20, 80, 110, 80, 0, 55
  , 100, 0, 215, 70, 180, 0
  , 120];

const userPerDayElectrica = [70, 150, 250, 55, 40, 20
  , 110, 70, 0, 0, 15, 0
  , 340, 45, 110, 90, 340, 0
  , 10, 40, 220, 40, 0, 55
  , 50, 0, 105, 140, 180, 0
  , 40];

const alu_facilesPerMonth = [0, 0, 0, 1432, 890, 345, 123, 654, 1024, 1591, 1278, 343];
const alu_intermedioPerMonth = [0, 0, 0, 1432, 890, 345, 123, 654, 1024, 1591, 1278, 343];
const alu_dificilesPerMonth = [0, 0, 0, 1432, 890, 345, 123, 654, 1024, 1591, 1278, 343];

const alu_enunPerMonth = [0, 0, 0, 1432, 890, 345, 123, 654, 1024, 1591, 1278, 343];

const car_facilesPerMonth = [0, 0, 0, 1432, 890, 345, 123, 654, 1024, 1591, 1278, 343];
const car_intermedioPerMonth = [0, 0, 0, 1432, 890, 345, 123, 654, 1024, 1591, 1278, 343];
const car_dificilesPerMonth = [0, 0, 0, 1432, 890, 345, 123, 654, 1024, 1591, 1278, 343];

const car_enunPerMonth = [0, 0, 0, 1432, 890, 345, 123, 654, 1024, 1591, 1278, 343];

const usersPerMonthInformatica = [0, 0, 0, 1432, 890, 345, 123, 654, 1024, 1591, 1278, 343];
const usersPerMonthElectrica = [0, 0, 0, 716, 1620, 157, 246, 327, 2012, 740, 890, 543];



// sparkline charts
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

// Main Charts
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

//Variables utiles a usar
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

class Dashboard extends Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.onMonthBtnClick = this.onMonthBtnClick.bind(this);
    this.onLineFiltClick = this.onLineFiltClick.bind(this);
    this.onPieFiltClick = this.onPieFiltClick.bind(this);
    this.onMonthItemSelected = this.oNMonthItemSelected.bind(this);
    this.state = {

      cardsButton: new Array(4).fill(false),
      monthButtonOpen: new Array(3).fill(false),
      dropdownOpen: false,
      lineSelected: 1,
      pieSelected: 1,
      radialSelected: 1,
      monthSelected: monthsLabel[5],
      //Chart States
      dataLineChart: initData,
      optLineChart: initOpts,
      dataPieChart: pieInit
    };
  }
  toggle(i) {
    const newArray = this.state.cardsButton.map((element, index) => { return (index === i ? !element : false); });
    this.setState({
      cardsButton: newArray,
    });
  }

  onMonthBtnClick(i) {
    const newArray = this.state.monthButtonOpen.map((element, index) => { return (index === i ? !element : false); });
    this.setState({
      monthButtonOpen: newArray,
    });
  }
  onPieFiltClick(selected) {
    console.log(this.state.pieSelected)
    if (selected == 1) {
      this.setState({
        dataPieChart: pieDataEnum,
        pieSelected: selected
      });
    }
    else if (selected == 2) {
      this.setState({
        dataPieChart: pieDataTime,
        pieSelected: selected
      });
    }
  }
  onRadialFiltClick(selected) {
    console.log(this.state.radialSelected)
    if (selected == 1) {
      this.setState({
        dataLineChart: enunLineChartData,
        radialSelected: selected
      });
    }
    else if (selected == 2) {
      this.setState({
        dataLineChart: timeLineChartData,
        radialSelected: selected
      });
    }
  }
  /*Axios.get('http://localhost:8082/exercise',config)
        .then(response=>{
            var aux=[];
            var enunciados=response.data;
            let item;
            for (item in enunciados){
                aux.push(false);    
            }

            this.setState({
                items:enunciados,
                openStates:[aux,aux,aux,aux],
                espera:false
            });
        })*/
  oNMonthItemSelected(i) {
    this.setState({
      monthSelected: monthsLabel[i],
    });
  }
  //Grafo de minichart
  miniChart(miniChartData, miniChartOps) {
    return (
      <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
        <Line data={miniChartData} options={miniChartOps} height={70} />
      </div>
    )
  }
  //Boton de los mini charts
  buttonMiniChart(i) {
    return (
      <ButtonGroup className="float-right">
        <ButtonDropdown isOpen={this.state.cardsButton[i]} toggle={() => { this.toggle(i); }}>
          <DropdownToggle caret className="p-0" color="transparent">
            <i className="icon-settings"></i>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>Action</DropdownItem>
            <DropdownItem>Another action</DropdownItem>
            <DropdownItem disabled>Disabled action</DropdownItem>
            <DropdownItem>Something else here</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </ButtonGroup>
    )
  }
  //Titulo de los minicharts
  tittleMiniChart(titulo, idB) {
    return (
      <CardBody className="pb-0">
        {this.buttonMiniChart(idB)}
        <div className="text-value">9.823</div>
        <div>{titulo}</div>
      </CardBody>
    )
  }

  //Botones de selector de meses
  buttonMonth(i, month) {
    return (
      <ButtonDropdown isOpen={this.state.monthButtonOpen[i]} toggle={() => { this.onMonthBtnClick(i); }}>
        <DropdownToggle caret className="pb-1" color="primary">{month}</DropdownToggle>
        <DropdownMenu down="true">
          <DropdownItem header>Mes</DropdownItem>
          <DropdownItem onClick={() => { this.oNMonthItemSelected(2); }}>Marzo</DropdownItem>
          <DropdownItem onClick={() => { this.oNMonthItemSelected(3); }}>Abril</DropdownItem>
          <DropdownItem onClick={() => { this.oNMonthItemSelected(4); }}>Mayo</DropdownItem>
          <DropdownItem onClick={() => { this.oNMonthItemSelected(5); }}>Junio</DropdownItem>
          <DropdownItem onClick={() => { this.oNMonthItemSelected(6); }}>Julio</DropdownItem>
          <DropdownItem onClick={() => { this.oNMonthItemSelected(7); }}>Agosto</DropdownItem>
          <DropdownItem onClick={() => { this.oNMonthItemSelected(8); }}>Septiembre</DropdownItem>
          <DropdownItem onClick={() => { this.oNMonthItemSelected(9); }}>Octubre</DropdownItem>
          <DropdownItem onClick={() => { this.oNMonthItemSelected(10); }}>Noviembre</DropdownItem>
          <DropdownItem onClick={() => { this.oNMonthItemSelected(11); }}>Diciembre</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
  //Botones de filtro de cada grafo
  filterLine() {
    return (
      <Col sm="6" //className="d-none d-sm-inline-block">
      >
        <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
          <ButtonGroup className="mr-3" aria-label="First group">
            <Button color="outline-secondary" onClick={() => this.onLineFiltClick(1)} active={this.state.lineSelected === 1}>Enunciados</Button>
            <Button color="outline-secondary" onClick={() => this.onLineFiltClick(2)} active={this.state.lineSelected === 2}>Horas</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Col>
    )
  }
  filterPie() {
    return (
      <Col sm="6" //className="d-none d-sm-inline-block">
      >
        <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
          <ButtonGroup className="mr-3" aria-label="First group">
            <Button color="outline-secondary" onClick={() => this.onPieFiltClick(1)} active={this.state.pieSelected === 1}>Enunciados</Button>
            <Button color="outline-secondary" onClick={() => this.onPieFiltClick(2)} active={this.state.pieSelected === 2}>Horas</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Col>
    );
  }
  filterRadial() {
    return (
      <Col sm="6" //className="d-none d-sm-inline-block">
      >
        <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
          <ButtonGroup className="mr-3" aria-label="First group">
            <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(1)} active={this.state.radioSelected === 1}>Enunciados</Button>
            <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2)} active={this.state.radioSelected === 2}>Horas</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Col>
    )
  }
  //Chart de lineas
  chartLine(dataIn, optIn) {
    return (
      <div className="chart-wrapper" style={{ height: 70 + '%', marginTop: 5 + '%' }}>
        <Line data={dataIn} options={optIn} height={70} />
      </div>
    )
  }
  //Chart de torta
  chartPie(dataIn) {
    return (
      <div className="chart-wrapper" style={{ height: 70 + '%', marginTop: 5 + '%' }}>
        <Pie data={dataIn} height={200} />
      </div>
    )
  }
  //Titulo de los maincharts
  chartTittle(titulo) {
    return (
      <CardHeader>
        <i className="fa fa-align-justify"></i> {titulo}
      </CardHeader>
    )
  }
  //Footers Enun
  chartFooter(filtro) {
    //this.calculoDeEstadisticas();
    if (filtro == 1) {
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
    else if (filtro == 2) {
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
  //Make de graficos (acoplar header, botones, grfico y footer)

  makeEnunLineChart(dataIn, optIn, month, filtro) {
    //PEDIR ENUNCIADOS SEGUN MES
    return (
      <Card>
        {this.chartTittle("Enunciados realizados por día")}
        <CardBody>
          <Row>
            {this.filterLine()}
            {this.buttonMonth(0, month)}
          </Row>
          {this.chartLine(dataIn, optIn)}
        </CardBody>
        {this.chartFooter(filtro)}
      </Card>
    );
  }

  makeTimeLineChart(dataIn, optIn, month, filtro) {
    //PEDIR TIEMPO SEGUN MES
    return (
      <Card>
        {this.chartTittle("Tiempo utilizado por día")}
        <CardBody>
          <Row>
            {this.filterLine()}
            {this.buttonMonth(0, month)}
          </Row>
          {this.chartLine(dataIn, optIn)}
        </CardBody>
        {this.chartFooter(filtro)}
      </Card>
    );
  }
  //json Q,T, mes año, (carrera,alumno(email),coordinacion)
  makeEnunPieChart(dataIn, month, filtro) {
    return (
      <Card>
        {this.chartTittle("Enunciados realizados al mes")}
        <CardBody>
          <Row>
            {this.filterPie()}
            {this.buttonMonth(1, month)}
          </Row>
          {this.chartPie(dataIn, month)}
        </CardBody>
        {this.chartFooter(filtro)}
      </Card>
    );
  }
  makeTimePieChart(dataIn, month, filtro) {
    return (
      <Card>
        {this.chartTittle("Minutos utilizado al mes")}
        <CardBody>
          <Row>
            {this.filterPie()}
            {this.buttonMonth(1, month)}
          </Row>
          {this.chartPie(dataIn, month)}
        </CardBody>
        {this.chartFooter(filtro)}
      </Card>
    );
  }
  //Renders
  renderLine(filter, month) {
    if (filter == 1) {
      return (
        <Col>
          {this.makeEnunLineChart(this.state.dataLineChart, this.state.optLineChart, month, filter)}
        </Col>
      );
    }
    else if (filter == 2) {
      return (
        <Col>
          {this.makeTimeLineChart(this.state.dataLineChart, this.state.optLineChart, month, filter)}
        </Col>
      );
    }
  }
  renderPie(filter, month) {
    if (filter == 1) {
      return (
        <CardColumns className="cols-2">
          {this.makeEnunPieChart(this.state.dataPieChart, month, filter)}
        </CardColumns>
      )
    }
    else if (filter == 2) {
      return (
        <CardColumns className="cols-2">
          {this.makeTimePieChart(this.state.dataPieChart, month, filter)}
        </CardColumns>
      )
    }
  }
  renderChartsByFilter(filter, month) {
    if (filter[0] == 1) {
      return (
        <Col>
          {this.makeEnunLineChart(this.state.dataLineChart, this.state.optLineChart, month, filter)}
          <CardColumns className="cols-2">
            {this.makeEnunPieChart(this.state.dataPieChart, month, filter)}
          </CardColumns>
        </Col>
      );
    }
    else if (filter[0] == 2) {
      return (
        <Col>
          {this.makeTimeLineChart(this.state.dataLineChart, this.state.optLineChart, month, filter)}
          <CardColumns className="cols-2">
            {this.makeTimePieChart(this.state.dataPieChart, month, filter)}
          </CardColumns>
        </Col>
      );
    }
  }

  //Operaciones
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

  render() {
    return (
      //Minicharts
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              {this.tittleMiniChart("Enunciados", 1)}
              {this.miniChart(cardChartData1, cardChartOpts1)}
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary">
              {this.tittleMiniChart("Logro", 2)}
              {this.miniChart(cardChartData2, cardChartOpts2)}
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-warning">
              {this.tittleMiniChart("Minutos", 3)}
              {this.miniChart(cardChartData3, cardChartOpts3)}
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-danger">
              {this.tittleMiniChart("Conectados", 4)}
              {this.miniChart(cardChartData4, cardChartOpts4)}
            </Card>
          </Col>
        </Row>
        {
          //MAINCHART
        }
        <Row>
          {this.renderLine(this.state.lineSelected, this.state.monthSelected)}
          {//this.renderChartsByFilter(this.state.radioSelected, this.state.monthSelected)
          }
        </Row>
        <Row>
          <Col>
            {this.renderPie(this.state.pieSelected, this.state.monthSelected)}
          </Col>
        </Row>
        {
          //Evaluacion
          //Profesor
        }
        <Row>
          <Col>
            <Card>
              <CardHeader>
                Traffic {' & '} Sales
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" md="6" xl="6">
                    <Row>
                      <Col sm="6">
                        <div className="callout callout-info">
                          <small className="text-muted">New Clients</small>
                          <br />
                          <strong className="h4">9,123</strong>
                          <div className="chart-wrapper">
                            <Line data={makeSparkLineData(0, brandPrimary)} options={sparklineChartOpts} width={100} height={30} />
                          </div>
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="callout callout-danger">
                          <small className="text-muted">Recurring Clients</small>
                          <br />
                          <strong className="h4">22,643</strong>
                          <div className="chart-wrapper">
                            <Line data={makeSparkLineData(1, brandDanger)} options={sparklineChartOpts} width={100} height={30} />
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <hr className="mt-0" />
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          Monday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <Progress className="progress-xs" color="info" value="34" />
                        <Progress className="progress-xs" color="danger" value="78" />
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          Tuesday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <Progress className="progress-xs" color="info" value="56" />
                        <Progress className="progress-xs" color="danger" value="94" />
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          Wednesday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <Progress className="progress-xs" color="info" value="12" />
                        <Progress className="progress-xs" color="danger" value="67" />
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          Thursday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <Progress className="progress-xs" color="info" value="43" />
                        <Progress className="progress-xs" color="danger" value="91" />
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          Friday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <Progress className="progress-xs" color="info" value="22" />
                        <Progress className="progress-xs" color="danger" value="73" />
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          Saturday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <Progress className="progress-xs" color="info" value="53" />
                        <Progress className="progress-xs" color="danger" value="82" />
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          Sunday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <Progress className="progress-xs" color="info" value="9" />
                        <Progress className="progress-xs" color="danger" value="69" />
                      </div>
                    </div>
                    <div className="legend text-center">
                      <small>
                        <sup className="px-1"><Badge pill color="info">&nbsp;</Badge></sup>
                        Enunciados hechos
                        &nbsp;
                        <sup className="px-1"><Badge pill color="danger">&nbsp;</Badge></sup>
                        Recurring clients
                      </small>
                    </div>
                  </Col>
                  <Col xs="12" md="6" xl="6">
                    <Row>
                      <Col sm="6">
                        <div className="callout callout-success">
                          <small className="text-muted">Organic</small>
                          <br />
                          <strong className="h4">49,123</strong>
                          <div className="chart-wrapper">
                            <Line data={makeSparkLineData(3, brandSuccess)} options={sparklineChartOpts} width={100} height={30} />
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <hr className="mt-0" />
                  </Col>
                </Row>
                <br />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    infoUsuarios: state.infoUsuarios,
  };
};

export default connect(mapStateToProps)(Dashboard);
