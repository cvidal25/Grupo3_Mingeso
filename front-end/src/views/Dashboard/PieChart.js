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