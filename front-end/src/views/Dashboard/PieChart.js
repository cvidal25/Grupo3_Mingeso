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

const pieInit = {
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
  class PieChart extends Component{
    constructor() {
      super();
      this.state = {
          monthButtonOpen: false,
          dropdownOpen: false,
          pieSelected: 1,
          monthSelected: monthsLabel[5],
          //Chart States
          dataPieChart: pieInit,
        };
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
    chartPie(dataIn) {
      return (
        <div className="chart-wrapper" style={{ height: 70 + '%', marginTop: 5 + '%' }}>
          <Pie data={dataIn} height={200} />
        </div>
      )
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
  }