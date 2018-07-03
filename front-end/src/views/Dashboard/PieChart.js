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
import Axios from 'axios';
import { connect } from 'react-redux';
import Widget03 from '../../views/Widgets/Widget03'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

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

var pieInit = {
  labels: diffLabel,
  datasets: [
    {
      data: [543, 40, 230],
      backgroundColor: [
        '#36A2EB',
        '#FFCE56',
        '#FF6384',
      ],
      hoverBackgroundColor: [
        '#36A2EB',
        '#FFCE56',
        '#FF6384',
      ],
    }],
};

var pieDataEnum = {
  labels: diffLabel,
  datasets: [
    {
      data: [65, 72, 77],
      backgroundColor: [
        '#36A2EB',
        '#FFCE56',
        '#FF6384',
      ],
      hoverBackgroundColor: [
        '#36A2EB',
        '#FFCE56',
        '#FF6384',
      ],
    }],
};
var pieDataTime = {
  labels: diffLabel,
  datasets: [
    {
      data: [325, 720, 1540],
      backgroundColor: [
        '#36A2EB',
        '#FFCE56',
        '#FF6384',
      ],
      hoverBackgroundColor: [
        '#36A2EB',
        '#FFCE56',
        '#FF6384',
      ],
    }],
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
class PieChart extends Component {
  constructor() {
    super();
    this.state = {
      userExercises: [],
      pieStats:[],
      monthPieButtonOpen: false,
      pieSelected: 1,
      monthSelected: fecha.getMonth(),
      //Chart States
      dataPieChart: pieInit,
      profesor: true,
      coord: 'B-1',
      career: 'Informatica',
      group: true
    };
  }
  componentWillMount() {
    this.setState({
      espera: true
    });
    if (this.props.infoUsuarios.userType === 1) {
      this.obtenerData(fecha.getMonth(), 1, false);
      this.setState({
        profesor: false,
        dataPieChart: pieDataEnum,
        pieSelected: 1,
        group: false
      });
    }
    else {
      this.obtenerData(fecha.getMonth(), 2, true)
      this.setState({
        profesor: true,
        dataPieChart: pieDataEnum,
        pieSelected: 2,
        group: true
      });
    }
  }
  onPieFiltClick(selected) {
    if (selected === 1) {
      this.setState({
        dataPieChart: pieDataEnum,
        pieSelected: selected,
      });
    }
    else if (selected === 2) {
      this.setState({
        dataPieChart: pieInit,
        pieSelected: selected,
      });
    }
  }
  onPieCareerItemSelected(sel) {
    this.obtenerData(this.state.monthSelected, this.props.infoUsuarios.userType, this.state.group);
    this.setState({
      career: sel,
      group: true
    });
  }
  onPieCoordItemSelected(sel) {
    this.obtenerData(this.state.monthSelected, this.props.infoUsuarios.userType, this.state.group);
    this.setState({
      coord: sel,
      group: false
    });
  }
  onPieButtonMonthToggle() {
    this.setState({
      monthPieButtonOpen: !this.state.monthPieButtonOpen,
    });
  }
  onPieMonthItemSelected(i) {
    this.obtenerData(i, this.props.infoUsuarios.userType, this.state.group)
    this.setState({
      monthSelected: i,
    });
  }
  setDataEnun(dataCatch) {
    totalFaciles = this.sumaDeArray(dataCatch.Facil);
    totalIntermedios = this.sumaDeArray(dataCatch.Intermedio);
    totalDificiles = this.sumaDeArray(dataCatch.Dificil);
    totalEnunciados = totalDificiles + totalFaciles + totalIntermedios;
    percentFaciles = Math.round(this.calculoPorcentaje(totalEnunciados, totalFaciles) * 100) / 100;
    percentIntermedios = Math.round(this.calculoPorcentaje(totalEnunciados, totalIntermedios) * 100) / 100;
    percentDificiles = Math.round(this.calculoPorcentaje(totalEnunciados, totalDificiles * 100) / 100);
    pieDataEnum.datasets[0].data = [totalFaciles, totalIntermedios, totalDificiles];
    //  console.log(pieDataEnum);   
  }
  setDataTime(dataCatch) {
    minutesFaciles = this.sumaDeArray(dataCatch.Facil);
    minutesIntermedios = this.sumaDeArray(dataCatch.Intermedio);
    minutesDificiles = this.sumaDeArray(dataCatch.Dificil);
    totalMinutes = minutesDificiles + minutesFaciles + minutesIntermedios;
    percentTimeF = Math.round(this.calculoPorcentaje(totalMinutes, minutesFaciles) * 100) / 100;;
    percentTimeI = Math.round(this.calculoPorcentaje(totalMinutes, minutesIntermedios) * 100) / 100;;
    percentTimeD = Math.round(this.calculoPorcentaje(totalMinutes, minutesDificiles) * 100) / 100;;
    pieDataTime.datasets[0].data = [minutesFaciles, minutesIntermedios, minutesDificiles];
    //    console.log(pieDataTime);
  }
  obtenerData(mes, tipo, group) {
    var url, url2;
    var fix = mes + 1;
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
    console.log(url);
    console.log(url2);
    Axios.get(url)
      .then(response => {
        var dataCatch = response.data;
        this.setDataEnun(dataCatch);
      })
      .catch(function (error) {
        console.log(error);
      });

    Axios.get(url2)
      .then(response => {
        var dataCatch = response.data;
        this.setDataTime(dataCatch);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  buttonPieMonth(month) {
    return (
      <ButtonDropdown size="sm" isOpen={this.state.monthPieButtonOpen} toggle={() => { this.onPieButtonMonthToggle() }}>
        <DropdownToggle caret className="pb-1" color="primary">{monthsLabel[month]}</DropdownToggle>
        <DropdownMenu down="true">
          <DropdownItem header>Mes</DropdownItem>
          <DropdownItem onClick={() => { this.onPieMonthItemSelected(2); }}>Marzo</DropdownItem>
          <DropdownItem onClick={() => { this.onPieMonthItemSelected(3); }}>Abril</DropdownItem>
          <DropdownItem onClick={() => { this.onPieMonthItemSelected(4); }}>Mayo</DropdownItem>
          <DropdownItem onClick={() => { this.onPieMonthItemSelected(5); }}>Junio</DropdownItem>
          <DropdownItem onClick={() => { this.onPieMonthItemSelected(6); }}>Julio</DropdownItem>
          <DropdownItem onClick={() => { this.onPieMonthItemSelected(7); }}>Agosto</DropdownItem>
          <DropdownItem onClick={() => { this.onPieMonthItemSelected(8); }}>Septiembre</DropdownItem>
          <DropdownItem onClick={() => { this.onPieMonthItemSelected(9); }}>Octubre</DropdownItem>
          <DropdownItem onClick={() => { this.onPieMonthItemSelected(10); }}>Noviembre</DropdownItem>
          <DropdownItem onClick={() => { this.onPieMonthItemSelected(11); }}>Diciembre</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
  filterGroupPie() {
    return (
      <ButtonToolbar className="float-center" aria-label="Toolbar with button groups">
        <ButtonGroup horizontal>
          <ButtonDropdown size="sm" id='carre' isOpen={this.state.carre} toggle={() => { this.setState({ carre: !this.state.carre }); }}>
            <DropdownToggle caret>
              Carrera
                </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => { this.onPieCareerItemSelected('Informatica') }}>Informatica</DropdownItem>
              <DropdownItem onClick={() => { this.onPieCareerItemSelected('Informatica') }}>Electrica</DropdownItem>
              <DropdownItem onClick={() => { this.onPieCareerItemSelected('Mecanica') }}>Mecánica</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
          <ButtonDropdown size="sm" id='coord' isOpen={this.state.coord} toggle={() => { this.setState({ coord: !this.state.coord }); }}>
            <DropdownToggle caret>
              Coordinación
                </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => { this.onPieCoordItemSelected('A-1') }}>A-1</DropdownItem>
              <DropdownItem onClick={() => { this.onPieCoordItemSelected('B-3') }}>B-3</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </ButtonGroup>
      </ButtonToolbar>
    )

  }
  filterPie() {
    return (
      <ButtonToolbar style={{ weigth: '20%' }} className="float-right" aria-label="Toolbar with button groups">
        <ButtonGroup className="mr-3" aria-label="First group">
          <Button color="outline-secondary" size="sm" onClick={() => this.onPieFiltClick(1)} active={this.state.pieSelected === 1}>Enunciados</Button>
          <Button color="outline-secondary" size="sm" onClick={() => this.onPieFiltClick(2)} active={this.state.pieSelected === 2}>Horas</Button>
        </ButtonGroup>
      </ButtonToolbar>
    );
  }
  chartPie(dataIn) {
    return (
      <div className="chart-wrapper" style={{ height: 70 + '%', marginTop: 5 + '%' }}>
        <Pie data={dataIn} height={200} />
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
  //json Q,T, mes año, (carrera,alumno(email),coordinacion)
  makePieChart(dataIn, month, filtro) {
    var titulo;
    if (filtro === 1) {
      titulo = "Enunciados realizados al mes";
    }
    else if (filtro === 2) {
      titulo = "Tiempo utilizado al mes";
    }
    return (
      <Card>
        {this.chartTittle(titulo)}
        <CardBody>
          <Row>
            <Col>
              {this.filterPie()}
            </Col>

            {this.state.profesor ?
              <Col className='text-center'>
                {this.filterGroupPie()}
              </Col>
              :
              <Col>

              </Col>
            }

            <Col className='text-right'>
              {this.buttonPieMonth(month)}
            </Col>
          </Row>
          {this.chartPie(dataIn, month)}
        </CardBody>
        {this.chartFooter(filtro)}
      </Card>
    );
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

  chartFooter(filtro) {
    a
    //this.calculoDeEstadisticas();
    console.log(filtro);
    console.log(totalEnunciados);
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
  render() {
    return (
      <Col>
        {this.makePieChart(this.state.dataPieChart, this.state.monthSelected, this.state.pieSelected)}
      </Col>
    )
  }
}
const mapStateToProps = state => {
  return {
    infoUsuarios: state.infoUsuarios,
  };
};
export default connect(mapStateToProps)(PieChart);