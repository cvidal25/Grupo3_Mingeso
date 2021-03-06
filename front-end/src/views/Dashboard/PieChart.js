import React, { Component } from 'react';
import ChartComponent, { Pie } from 'react-chartjs-2';
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
} from 'reactstrap';
import Axios from 'axios';
import { connect } from 'react-redux';

const diffLabel = ['Fácil', 'Intermedio', 'Difícil'];

const monthsLabel = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'
  , 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre'
  , 'Noviembre', 'Diciembre'];

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
    this.pieDataEnum = {
      labels: diffLabel,
      datasets: [
        {
          data: [0, 0, 0],
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
    this.pieDataTime = {
      labels: diffLabel,
      datasets: [
        {
          data: [0, 0, 0],
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
    this.state = {

      viewing: null,
      careerDropOpen: false,
      coordDropOpen: false,
      monthButtonOpen: false,

      alumSelected: [],
      pieSelected: 1,
      monthSelected: fecha.getMonth(),

      //Chart States
      dataChart: null,

      alumList: [],
      coordList: [],
      careerList: [],

      profesor: true,
      espera: false,
      careerSight: true,
      coordSight: true,

      coord: null,
      career: null,

      alumLabel: '---- ----',
      careerLabel: 'Carreras',
      coordLabel: 'Coordinación'
    };
  }
  componentWillMount() {
    if (this.props.infoUsuarios.userType === 1) {
      this.setState({
        profesor: false,
        alumSelected: this.props.infoUsuarios,
        pieSelected: 1,
        careerSight: false,
        coordSight: false
      });
      this.obtenerDataAlum(this.state.monthSelected, 0);
    }
    else {
      this.obtenerCarreras(this.props.infoUsuarios.userType);
      this.obtenerCoords(this.props.infoUsuarios.userType);
      this.setState({
        profesor: true,
        pieSelected: 1,
        coord: this.state.coordList[0],
        career: this.state.careerList[0],
        careerSight: true,
        coordSight: false,
        alumLabel: '---- ----',
        careerLabel: 'Carreras',
        coordLabel: 'Coordinación'
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
  onPieFiltClick(selected) {
    this.setState({
      espera: true
    });
    if (selected === 1) {
      this.setState({
        dataChart: this.pieDataEnum,
        pieSelected: selected,
        espera: false
      });
    }
    else if (selected === 2) {
      this.setState({
        dataChart: this.pieDataTime,
        pieSelected: selected,
        espera: false
      });
    }
  }
  onCareerItemSelected(sel) {
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
  onCoordItemSelected(sel) {
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
        alumLabel: '---- ----'
      });
      this.obtenerDataCoord(this.state.monthSelected, sel);
    }
  }

  onUserItemSelect(alumno) {
    //Obtener data
    this.setState({
      alumLabel: alumno.userName,
      alumSelected: alumno,
      careerSight: false,
      coordSight: false
    });
    this.obtenerDataAlum(this.state.monthSelected, alumno);
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
      this.obtenerDataAlum(i, this.state.alumSelected);
    }

    else if (this.props.infoUsuarios.userType === 2) {
      if (this.state.coordSight === true) {
        this.obtenerDataCoord(i, this.state.coord);
      }
      else if (this.state.careerSight === true) {
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
      viewing: coord,
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

    if (this.state.pieSelected === 1) {
      this.setState({
        dataChart: this.pieDataEnum,
      });
    }
    else if (this.state.pieSelected === 2) {
      this.setState({
        dataChart: this.pieDataTime,
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

    if (this.state.pieSelected === 1) {
      this.setState({
        dataChart: this.pieDataEnum,
      });
    }
    else if (this.state.pieSelected === 2) {
      this.setState({
        dataChart: this.pieDataTime,
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

    if (this.state.pieSelected === 1) {
      this.setState({
        dataChart: this.pieDataEnum,
      });
    }
    else if (this.state.pieSelected === 2) {
      this.setState({
        dataChart: this.pieDataTime,
      });
    }
  }




  setDataEnun(dataCatch) {
    totalFaciles = this.sumaDeArray(dataCatch.Facil);
    totalIntermedios = this.sumaDeArray(dataCatch.Intermedio);
    totalDificiles = this.sumaDeArray(dataCatch.Dificil);
    totalEnunciados = totalDificiles + totalFaciles + totalIntermedios;
    percentFaciles = Math.round(this.calculoPorcentaje(totalEnunciados, totalFaciles) * 100) / 100;
    percentIntermedios = Math.round(this.calculoPorcentaje(totalEnunciados, totalIntermedios) * 100) / 100;
    percentDificiles = Math.round(this.calculoPorcentaje(totalEnunciados, totalDificiles * 100) / 100);
    this.pieDataEnum.datasets[0].data = [totalFaciles, totalIntermedios, totalDificiles];
    //  console.log(pieDataEnum);   
  }
  setDataTime(dataCatch) {
    minutesFaciles = this.sumaDeArray(dataCatch.Facil);
    minutesIntermedios = this.sumaDeArray(dataCatch.Intermedio);
    minutesDificiles = this.sumaDeArray(dataCatch.Dificil);
    totalMinutes = minutesDificiles + minutesFaciles + minutesIntermedios;
    percentTimeF = Math.round(this.calculoPorcentaje(totalMinutes, minutesFaciles) * 100) / 100;
    percentTimeI = Math.round(this.calculoPorcentaje(totalMinutes, minutesIntermedios) * 100) / 100;
    percentTimeD = Math.round(this.calculoPorcentaje(totalMinutes, minutesDificiles) * 100) / 100;
    this.pieDataTime.datasets[0].data = [minutesFaciles, minutesIntermedios, minutesDificiles];
    //    console.log(pieDataTime);
  }

  buttonMonth(month) {
    return (
      <ButtonDropdown size="sm" isOpen={this.state.monthButtonOpen} toggle={() => { this.onButtonMonthToggle() }}>
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
      <ButtonToolbar className="float-left" aria-label="Toolbar with button groups">
        <ButtonGroup horizontal="true">
          <ButtonDropdown size="sm" isOpen={this.state.careerDropOpen} toggle={() => { this.setState({ careerDropOpen: !this.state.careerDropOpen }); }}>
            <DropdownToggle caret>
              {this.state.careerLabel}
            </DropdownToggle>
            <DropdownMenu direction="down">
              {listaCareer && listaCareer.map((career, key) =>
                <DropdownItem key={key} onClick={() => this.onCareerItemSelected(career)}>{career}</DropdownItem>
              )}
            </DropdownMenu>
          </ButtonDropdown>
          <ButtonDropdown size="sm" isOpen={this.state.coordDropOpen} toggle={() => { this.setState({ coordDropOpen: !this.state.coordDropOpen }); }}>
            <DropdownToggle caret>
              {this.state.coordLabel}
            </DropdownToggle>
            <DropdownMenu direction="down">
              {listaCoord && listaCoord.map((cord, key) =>
                <DropdownItem key={key} onClick={() => this.onCoordItemSelected(cord)} >{cord}</DropdownItem>
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
  filterPie() {
    return (
      <ButtonToolbar style={{ weigth: '20%' }} className="float-left" aria-label="Toolbar with button groups">
        <ButtonGroup className="mr-3" aria-label="First group">
          <Button color="outline-secondary" size="sm" onClick={() => this.onPieFiltClick(1)} active={this.state.pieSelected === 1}>Enunciados</Button>
          <Button color="outline-secondary" size="sm" onClick={() => this.onPieFiltClick(2)} active={this.state.pieSelected === 2}>Tiémpo</Button>
        </ButtonGroup>
      </ButtonToolbar>
    );
  }
  chartPie(dataIn) {
    return (
      <div className="chart-wrapper" style={{ height: 70 + '%', marginTop: 5 + '%' }}>
        <Pie data={dataIn} height={200} redraw={true} />
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
              <Col className='text-left' xs='6'>
                {this.filterPie()}
              </Col>
              <Col className='text-right' xs='6'>
                {this.buttonMonth(month)}
              </Col>
            </Row>
            {this.chartPie(dataIn, month)}
            {this.state.profesor ?
              <Row>
                <Col className='text-center' xs='9'>
                  {this.filterGroup(this.state.careerList, this.state.coordList)}
                </Col>
                <Col xs='3'>
                  {this.filterUser(this.state.alumList)}
                </Col>
              </Row>
              :
              <Row />
            }
          </CardBody>
        }
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
    //this.calculoDeEstadisticas();
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
              <strong>{totalMinutes} Segundos Totales </strong>
              <Progress className="progress-xs mt-2" color="info" value="100" />
            </Col>
            <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
              <div className="text-muted">Segundos en Faciles</div>
              <strong>{minutesFaciles} Segundos ({percentTimeF}%)</strong>
              <Progress className="progress-xs mt-2" color="succes" value={String(percentTimeF)} />
            </Col>
            <Col sm={12} md className="mb-sm-2 mb-0">
              <div className="text-muted">Segundos en Intermedios</div>
              <strong>{minutesIntermedios} Segundos ({percentTimeI}%)</strong>
              <Progress className="progress-xs mt-2" color="warning" value={String(percentTimeI)} />
            </Col>
            <Col sm={12} md className="mb-sm-2 mb-0">
              <div className="text-muted">Segundos por Difíciles</div>
              <strong>{minutesDificiles} Segundos ({percentTimeD}%)</strong>
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
        {this.makePieChart(this.state.dataChart, this.state.monthSelected, this.state.pieSelected)}
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