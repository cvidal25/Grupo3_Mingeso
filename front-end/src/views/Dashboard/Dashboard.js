import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
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

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

//PULL REQUEST
//DATOS ESTATICOS PARA GRAFICOS
/* Se presentan los datos a utilizar para graficar, por ahora esta pensado, para el profesor y el alumno, 
adicionalmente y POR AHORA solo se podra filtrar por carrera y totales, 
pero tambien se debera tener en cuenta el graficar por cada coordinacion del curso de fundamentos.
El profesor puede ver la informacion por carrera y por alumno en especifico (enunciado hechos, tiempo por enunciad),
mientras que el alumno solo puede ver sus estadisticas.
Ademas el profesor puede ver la cantidad de alumnos totales conectados al día o tambien filtrado por carrera.
Ambos tipos de usuario pueden ver las estadisticas de forma día día del mes o ver los promedios y totales mensuales.
/*Para resumir la verborria a continuación necesito de la base de datos:
-La cantidad de cada tipo de enunciados (Facil, Intermedio, Dificil) hechos por cada alumno de cada carrera al día (Informatica, Electrica, etc).
-La cantidad de minutos gastados en cada tipo de enunciado, hechos por cada alumno de cada carrera al día.
-La cantidad de intentos realizados y la cantidad de fallos en cada tipo de enunciado, 
 hecho por cada alumno de cada carrera al día. (Lease en "1.-" explicación de esto)
-La cantidad de conecciones(al menos una vez al dias) hechas por cada alumno de cada carrera al día.

Si puedo obtener los valores ya sea pidiendo por tipo de enunciado nombre del alumno,por carrera, por mes, por día, 
se pueden calcular los promedios maximos y minimos. Calculos los cuales se podrian almacenar para evitar tantos 
llamados a la base de datos, lo dejo a discusión del backend.*/

/* 1.- Decidi la evaluacion de cada enunciado de forma binaria, es decir, al intentar el enunciado o lo tiene bueno o lo tiene malo,
   ya que es lo mas facil de evaluar dado el sistema de respuestas que tienen los ejercicios, 
   ahora no tengo entendido si el alumno puede repetir muchas veces el mismo enunciado, si es que puede repetir que solo sea hasta tenerlo bueno,
   de esta manera se puede evaluar el rendimiento del alumno de forma, cuantos intentos necesito para resolver el ejercicio*/

//ENUNCIADOS POR DIA
//Por cada dia necesito que se almacene los enunciados por dificultad realizados por el alumno en el dia.

/*Matrices de 31 espacios que representa la cantidad de enunciados por dia realizados, 
  cada espacio de la matriz representa al dia trabajado, es decir, el espacio [0] es el dia 1 del mes,
  el espacio [1] al dia 2 del mes y así. Los datos almacenados corresponden a enteros numericos.
  Puede contener datos vacios aunque se recomienda llenar con 0 (a criterio de backend),
  esto pensando en que si bien son 31 espacios con el fin de representar el mes, hay meses que no tienen 31 días.
  Pero tambien se estaria dateando dias que quizas no hayan todavia pasado , como 0 tambn es un numero valido
  (por ejemplo estamos a 5, pero resto del mes aparece dateado ya que se relleno con ceros).*/

//Enunciados faciles por dia
//Cantidad de enunciados faciles realizados por dia, en un mes.
const facilesPerDay = [2, 2, 10, 1, 2, 0
  , 2, 0, 0, 0, 1, 0
  , 8, 3, 6, 0, 0, 0
  , 0, 2, 8, 0, 0, 1
  , 4, 0, 3, 4, 6, 0
  , 0];
//Enunciados intermedios por dia
//Cantidad de enunciados faciles realizados por dia, en un mes.
const intermediosPerDay = [2, 6, 6, 1, 3, 2
  , 2, 1, 0, 0, 1, 0
  , 10, 1, 6, 3, 0, 0
  , 1, 1, 8, 0, 0, 3
  , 3, 0, 3, 4, 5, 0
  , 0];
//Enunciados faciles por dia
//Cantidad de enunciados faciles realizados por dia, en un mes.
const dificilesPerDay = [2, 4, 7, 2, 0, 0
  , 4, 3, 0, 0, 0, 0
  , 10, 1, 1, 3, 17, 0
  , 0, 1, 5, 2, 0, 1
  , 0, 0, 3, 4, 5, 0
  , 2];

//Enunciados totales por día
//Este almacenamiento de datos puede ser precindible,ya que se puede obtener los 
//valores de los datos anteriores (cantidad de enunciados faciles, inter, dificiles)
const enunciadosPerDay = [6, 12, 23, 4, 5, 2
  , 8, 4, 0, 0, 2, 0
  , 28, 5, 13, 6, 17, 0
  , 1, 4, 21, 2, 0, 5
  , 7, 0, 9, 12, 16, 0
  , 2];
//ENUNCIADOS GLOBALES POR DIA (Hechos por todos los alumnos en el sistema)
/*Con esto se quiere graficar la cantidad de enunciados hechos al dia para mostrarle al profesor, 
sigue las mismas reglas que los datos ya expuestos*/
//Enunciados globales faciles hechos en el día
const enunGFacilPerDay = [6, 12, 23, 4, 5, 2
  , 8, 4, 0, 0, 2, 0
  , 28, 5, 13, 6, 17, 0
  , 1, 4, 21, 2, 0, 5
  , 7, 0, 9, 12, 16, 0
  , 2];
//Enunciados globales intermedios hechos en el dia
const enunGIntermediosPerDay = [6, 12, 23, 4, 5, 2
  , 8, 4, 0, 0, 2, 0
  , 28, 5, 13, 6, 17, 0
  , 1, 4, 21, 2, 0, 5
  , 7, 0, 9, 12, 16, 0
  , 2];
//Enunciados globales dificiles hechos en el dia
const enunGDificilesPerDay = [6, 12, 23, 4, 5, 2
  , 8, 4, 0, 0, 2, 0
  , 28, 5, 13, 6, 17, 0
  , 1, 4, 21, 2, 0, 5
  , 7, 0, 9, 12, 16, 0
  , 2];
//Enunciados globales totales hechos en el día
//Este almacenamiento de datos puede ser precindible,ya que se puede obtener los 
//valores de los datos anteriores (cantidad de enunciados faciles, inter, dificiles)
const enunGPerDay = [6, 12, 23, 4, 5, 2
  , 8, 4, 0, 0, 2, 0
  , 28, 5, 13, 6, 17, 0
  , 1, 4, 21, 2, 0, 5
  , 7, 0, 9, 12, 16, 0
  , 2];

//MINUTOS POR DÍA
/*Matrices de 31 espacios que almacena un valor numerico entero que indica la cantidad de minutos 
  totales gastados en la realizacion de los enunciados.Puede contener datos vacios aunque se recomienda 
  llenar con 0 (a criterio de backend),esto pensando en que si bien son 31 espacios con el fin de representar el mes, 
  hay meses que no tienen 31 días. Pero tambien se estaria dateando dias que quizas no hayan todavia pasado , como 0 tambn es un numero valido
  (por ejemplo estamos a 5, pero resto del mes aparece dateado ya que se relleno con ceros).*/

//Minutos en faciles
//Total de minutos por dia gastado en enunciados faciles
const minutesPerFaciles = [10, 10, 50, 5, 10, 0
  , 10, 0, 0, 0, 5, 0
  , 40, 15, 30, 0, 0, 0
  , 0, 10, 40, 0, 0, 5
  , 20, 0, 15, 20, 30, 0
  , 0];

//Minutos en intermedios
//Total de minutos por dia gastado en enunciados intermedios
const minutesPerIntermedios = [20, 60, 60, 10, 30, 20
  , 20, 10, 0, 0, 10, 0
  , 100, 10, 60, 30, 0, 0
  , 10, 10, 80, 0, 0, 30
  , 30, 0, 30, 40, 50, 0
  , 0];

//Minutos en dificiles
//Total de minutos por dia gastado en enunciados faciles
const minutesPerDificiles = [40, 80, 140, 40, 0, 0
  , 80, 60, 0, 0, 0, 0
  , 200, 20, 20, 60, 340, 0
  , 0, 20, 100, 40, 0, 20
  , 0, 0, 60, 80, 100, 0
  , 40];

//Minutos en total
//Total de minutos gastados por día
/*Este almacenamiento de datos puede ser precindible,ya que se puede obtener los 
  valores de los datos anteriores (cantidad de enunciados faciles, inter, dificiles)*/
const minutesPerDay = [70, 150, 250, 55, 40, 20
  , 110, 70, 0, 0, 15, 0
  , 340, 45, 110, 90, 340, 0
  , 10, 40, 220, 40, 0, 55
  , 50, 0, 105, 140, 180, 0
  , 40];
//Minutos globales
//No se si sera necesario mostrarle las cantidades de minutos globales ocupadas al profesor.

//USUARIOS POR DÍA
/*Matrices de 31 espacios que almacena un valor numerico entero que indica la cantidad de usuarios 
  totales que entraron almenos una vez al sistema en el dia. Puede contener datos vacios aunque se recomienda 
  llenar con 0 (a criterio de backend),esto pensando en que si bien son 31 espacios con el fin de representar el mes, 
  hay meses que no tienen 31 días. Pero tambien se estaria dateando dias que quizas no hayan todavia pasado , como 0 tambn es un numero valido
  (por ejemplo estamos a 5, pero resto del mes aparece dateado ya que se relleno con ceros).*/
const usersPerDay = [70, 150, 250, 55, 40, 20
  , 110, 70, 0, 0, 15, 0
  , 340, 45, 110, 90, 340, 0
  , 10, 40, 220, 40, 0, 55
  , 50, 0, 105, 140, 180, 0
  , 40];
//Usuarios conectados por carrera
/*Usuarios conetados al dia por carrera*/
//Informatica
const userPerDayInformatica = [140, 75, 125, 110, 20, 40
  , 55, 140, 32, 0, 15, 10
  , 340, 90, 55, 945, 170, 1
  , 20, 80, 110, 80, 0, 55
  , 100, 0, 215, 70, 180, 0
  , 120];
//Electrica
const userPerDayElectrica = [70, 150, 250, 55, 40, 20
  , 110, 70, 0, 0, 15, 0
  , 340, 45, 110, 90, 340, 0
  , 10, 40, 220, 40, 0, 55
  , 50, 0, 105, 140, 180, 0
  , 40];
//TOTALES Y PROMEDIOS POR MESES
/*Como se dijo anteriormente quizas no sea necesario almacenar este tipo de datos ya que es calculable, con los datos anteriores,
pero en el caso de necesitarse, seria guardar los promedios y totales de los datos ya mencionados por cada mes*/
//TOTALES

//Total de enunciados por dificultad realizados por los alumnos del sistema en cada mes
/*Matriz de tamaño 12 donde cada espacio representa un mes del año y en el cual se almacena 
un dato numerico entero que indica el total de enunciado hecho ese mes*/
const alu_facilesPerMonth = [0, 0, 0, 1432, 890, 345, 123, 654, 1024, 1591, 1278, 343];
const alu_intermedioPerMonth = [0, 0, 0, 1432, 890, 345, 123, 654, 1024, 1591, 1278, 343];
const alu_dificilesPerMonth = [0, 0, 0, 1432, 890, 345, 123, 654, 1024, 1591, 1278, 343];
//Total de enunciados
const alu_enunPerMonth = [0, 0, 0, 1432, 890, 345, 123, 654, 1024, 1591, 1278, 343];

//Total de enunciados por tipo realizados por todas las carreras al mes
const car_facilesPerMonth = [0, 0, 0, 1432, 890, 345, 123, 654, 1024, 1591, 1278, 343];
const car_intermedioPerMonth = [0, 0, 0, 1432, 890, 345, 123, 654, 1024, 1591, 1278, 343];
const car_dificilesPerMonth = [0, 0, 0, 1432, 890, 345, 123, 654, 1024, 1591, 1278, 343];
//Total de enunciados realizados al mes por todas las carreras
const car_enunPerMonth = [0, 0, 0, 1432, 890, 345, 123, 654, 1024, 1591, 1278, 343];

//TOTALES CONECTADOS AL MES
//Informatica
const usersPerMonthInformatica = [0, 0, 0, 1432, 890, 345, 123, 654, 1024, 1591, 1278, 343];
//Electrica
const usersPerMonthElectrica = [0, 0, 0, 716, 1620, 157, 246, 327, 2012, 740, 890, 543];

/*Almacenar los promedios calculados de meses completos, en este caso, 
representado por una matriz de 12 espacios en el cual cada espacio representa un mes*/
// Card Chart 1*/
const cardChartData1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandPrimary,
      borderColor: 'rgba(255,255,255,.55)',
      data: [65, 59, 84, 84, 51, 55, 40],
    },
  ],
};

const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}


// Card Chart 2
const cardChartData2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandInfo,
      borderColor: 'rgba(255,255,255,.55)',
      data: [1, 18, 9, 17, 34, 22, 11],
    },
  ],
};

const cardChartOpts2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 3
const cardChartData3 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40],
    },
  ],
};

const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
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
    },
  },
};

// Card Chart 4
const cardChartData4 = {
  labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.3)',
      borderColor: 'transparent',
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98],
    },
  ],
};

const cardChartOpts4 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
        barPercentage: 0.6,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
};

// Social Box Chart
const socialBoxData = [
  { data: [65, 59, 84, 84, 51, 55, 40], label: 'facebook' },
  { data: [1, 13, 9, 17, 34, 41, 38], label: 'twitter' },
  { data: [78, 81, 80, 45, 34, 12, 40], label: 'linkedin' },
  { data: [35, 23, 56, 22, 97, 23, 64], label: 'google' },
];

const makeSocialBoxData = (dataSetNo) => {
  const dataset = socialBoxData[dataSetNo];
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        backgroundColor: 'rgba(255,255,255,.1)',
        borderColor: 'rgba(255,255,255,.55)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const socialChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
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
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

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

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//GETS DE DATOS

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];
//LLENADO DE ELEMENTOS
for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}
//COLORES Y ESPECIFICACIONES VISUALES DEL CHART
const enunChart = {
  labels: ['Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5'
    , 'Día 6', 'Día 7', 'Día 8', 'Día 9', 'Día 10'
    , 'Día 11', 'Día 12', 'Día 13', 'Día 14', 'Día 15'
    , 'Día 16', 'Día 17', 'Día 18', 'Día 19', 'Día 20'
    , 'Día 21', 'Día 22', 'Día 23', 'Día 24', 'Día 25'
    , 'Día 26', 'Día 27', 'Día 28', 'Día 29', 'Día 30'
    , 'Día 31'],
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
const timeChart = {
  labels: ['Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5'
    , 'Día 6', 'Día 7', 'Día 8', 'Día 9', 'Día 10'
    , 'Día 11', 'Día 12', 'Día 13', 'Día 14', 'Día 15'
    , 'Día 16', 'Día 17', 'Día 18', 'Día 19', 'Día 20'
    , 'Día 21', 'Día 22', 'Día 23', 'Día 24', 'Día 25'
    , 'Día 26', 'Día 27', 'Día 28', 'Día 29', 'Día 30'
    , 'Día 31'],
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
//Chart de Torta
const pieTime = {
  labels: [
    'Fácil',
    'Intermedio',
    'Difícil',
  ],
  datasets: [
    {
      data: [325, 720, 1540],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
    }],
};
//
const pieEnun = {
  labels: [
    'Fácil',
    'Intermedio',
    'Difícil',
  ],
  datasets: [
    {
      data: [65, 72, 77],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
    }],
};
//Chart de Barra
const bar = {
  labels: ['Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5'
    , 'Día 6', 'Día 7', 'Día 8', 'Día 9', 'Día 10'
    , 'Día 11', 'Día 12', 'Día 13', 'Día 14', 'Día 15'
    , 'Día 16', 'Día 17', 'Día 18', 'Día 19', 'Día 20'
    , 'Día 21', 'Día 22', 'Día 23', 'Día 24', 'Día 25'
    , 'Día 26', 'Día 27', 'Día 28', 'Día 29', 'Día 30'
    , 'Día 31'],
  datasets: [
    {
      label: 'Informatica',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: userPerDayInformatica,
    },
    {
      label: 'Electrica',
      backgroundColor: 'rgba(99,255,132,0.2)',
      borderColor: 'rgba(99,255,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(99,255,132,0.4)',
      hoverBorderColor: 'rgba(99,255,132,1)',
      data: userPerDayElectrica,
    },
  ],
};
const barMonth = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'
    , 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre'
    , 'Noviembre', 'Diciebre'],
  datasets: [
    {
      label: 'Informatica',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: usersPerMonthInformatica,
    },
    {
      label: 'Electrica',
      backgroundColor: 'rgba(99,255,132,0.2)',
      borderColor: 'rgba(99,255,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(99,255,132,0.4)',
      hoverBorderColor: 'rgba(99,255,132,1)',
      data: usersPerMonthElectrica,
    },
  ],
};
//CADA CUANTO SALTA, ESCALA DE LABEL
const enunChartOpts = {
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
const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
};

const timeChartOpt = {
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
//Variables utiles a usar
//Enunciados
var totalEnunciados;
var totalFaciles;
var totalIntermedios;
var totalDificiles;
var percentFaciles;
var percentIntermedios;
var percentDificiles;
//Minutos
var totalMinutes;
var minutesFaciles;
var minutesIntermedios;
var minutesDificiles;
var percentTimeF;
var percentTimeI;
var percentTimeD;

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }
  totalValue(valueName, data) {
    return (
      <Col sm={12} md className="mb-sm-2 mb-0">
        <div className="text-muted">Visits</div>
        <strong>29.703 Users (40%)</strong>
        <Progress className="progress-xs mt-2" color="success" value="40" />
      </Col>
    )
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
  buttonCard(idB) {
    return (
      <ButtonGroup className="float-right">
        <ButtonDropdown id={idB} isOpen={this.state.idB} toggle={() => { this.setState({ idB: !this.state.idB }); }}>
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
        {this.buttonCard(idB)}
        <div className="text-value">9.823</div>
        <div>{titulo}</div>
      </CardBody>
    )
  }

  //Botones de filtro de cada grafo
  filtro() {
    return (
      <Col sm="7" className="d-none d-sm-inline-block">
        <Button color="primary" className="float-right"><i className="icon-cloud-download"></i></Button>
        <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
          <ButtonGroup className="mr-3" aria-label="First group">
            <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(1)} active={this.state.radioSelected === 1}>Day</Button>
            <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2)} active={this.state.radioSelected === 2}>Month</Button>
            <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(3)} active={this.state.radioSelected === 3}>Year</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Col>
    )
  }
  //Chart de lineas
  mainChartLine(chartData, chartOpts) {
    return (
      <div className="chart-wrapper" style={{ height: 70 + '%', marginTop: 5 + '%' }}>
        <Line data={chartData} options={chartOpts} height={70} />
      </div>
    )
  }
  //Chart de torta
  mainChartPie(chartData) {
    this.calculoDeEstadisticas();
    console.log(totalFaciles);
    return (
      <div className="chart-wrapper" style={{ height: 70 + '%', marginTop: 5 + '%' }}>
        <Pie data={chartData} height={200} />
      </div>
    )
  }
  mainChartBar(chartData, chartOpts) {
    return (
      <div className="chart-wrapper" style={{ height: 70 + '%', marginTop: 5 + '%' }}>
        <Bar data={chartData} options={chartOpts} height={200} />
      </div>
    )
  }
  //Titulo de los maincharts
  mainChartTittle(titulo, mes) {
    return (
      <Col sm="5">
        <CardTitle className="mb-0">{titulo}</CardTitle>
        <div className="small text-muted">{mes}</div>
      </Col>
    )
  }
  sumaDeArray(array, largo) {
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
  //La idea es que aca se muestren mas detalladamente los datos de los charts
  chartEnunFooter() {
    this.calculoDeEstadisticas();
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
    )
  }
  chartTimeFooter() {
    this.calculoDeEstadisticas();
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
    )
  }
  topicChart(charData, chartOpts) {

  }

  render() {
    return (
      //Minicharts
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              {this.tittleMiniChart("Enunciados", 'card1')}
              {this.miniChart(cardChartData1, cardChartOpts1)}
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary">
              {this.tittleMiniChart("Logro", 'card2')}
              {this.miniChart(cardChartData2, cardChartOpts2)}
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-warning">
              {this.tittleMiniChart("Minutos", 'card3')}
              {this.miniChart(cardChartData3, cardChartOpts3)}
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-danger">
              {this.tittleMiniChart("Conectados", 'card4')}
              {this.miniChart(cardChartData4, cardChartOpts4)}
            </Card>
          </Col>
        </Row>
        {
          //MAINCHART
        }
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  {this.mainChartTittle("Enunciados realizados por día", "Noviembre")}
                  {this.filtro()}
                </Row>
                {this.mainChartLine(enunChart, enunChartOpts)}
              </CardBody>
              {this.chartEnunFooter()}
            </Card>
            <Card>
              <CardBody>
                <Row>
                  {this.mainChartTittle("Minutos utilizado por día", "Noviembre")}
                  {this.filtro()}
                </Row>
                {this.mainChartLine(timeChart, timeChartOpt)}
              </CardBody>
              {this.chartTimeFooter()}
            </Card>
            <CardColumns className="cols-2">
              <Card>
                <CardBody>
                  <Row>
                    {this.mainChartTittle("Enunciados hechos por dificultad", "Noviembre")}
                    {this.filtro()}
                  </Row>
                  {this.mainChartPie(pieEnun)}
                </CardBody>
                {this.chartEnunFooter()}
              </Card>
              <Card>
                <CardBody>
                  <Row>
                    {this.mainChartTittle("Horas gastadas en desarrollar", "Noviembre")}
                    {this.filtro()}
                  </Row>
                  {this.mainChartPie(pieTime)}
                </CardBody>
                {this.chartTimeFooter()}
              </Card>
            </CardColumns>
            <Card>
              <CardBody>
                <Row>
                  {this.mainChartTittle("Usuarios conectados al día", "Noviembre")}
                  {this.filtro()}
                </Row>
                {this.mainChartBar(bar, options)}
              </CardBody>
              <CardBody>
                <Row>
                  {this.mainChartTittle("Usuarios conectados por mes", "Noviembre")}
                  {this.filtro()}
                </Row>
                {this.mainChartBar(barMonth, options)}
              </CardBody>
            </Card>
          </Col>
        </Row>
        {
          //RSS INFO
        }
        <Row>
          <Col xs="6" sm="6" lg="3">
            <Widget03 dataBox={() => ({ variant: 'facebook', friends: '89k', feeds: '459' })} >
              <div className="chart-wrapper">
                <Line data={makeSocialBoxData(0)} options={socialChartOpts} height={90} />
              </div>
            </Widget03>
          </Col>

          <Col xs="6" sm="6" lg="3">
            <div className="brand-card">
              <div className="brand-card-header bg-twitter">
                <i className="fa fa-twitter"></i>
                <div className="chart-wrapper">
                  <Line data={makeSocialBoxData(1)} options={socialChartOpts} height={90} />
                </div>
              </div>
              <div className="brand-card-body">
                <div>
                  <div className="text-value">973k</div>
                  <div className="text-uppercase text-muted small">followers</div>
                </div>
                <div>
                  <div className="text-value">1.792</div>
                  <div className="text-uppercase text-muted small">tweets</div>
                </div>
              </div>
            </div>
          </Col>

          <Col xs="6" sm="6" lg="3">
            <div className="brand-card">
              <div className="brand-card-header bg-linkedin">
                <i className="fa fa-linkedin"></i>
                <div className="chart-wrapper">
                  <Line data={makeSocialBoxData(2)} options={socialChartOpts} height={90} />
                </div>
              </div>
              <div className="brand-card-body">
                <div>
                  <div className="text-value">500+</div>
                  <div className="text-uppercase text-muted small">contacts</div>
                </div>
                <div>
                  <div className="text-value">292</div>
                  <div className="text-uppercase text-muted small">feeds</div>
                </div>
              </div>
            </div>
          </Col>

          <Col xs="6" sm="6" lg="3">
            <div className="brand-card">
              <div className="brand-card-header bg-google-plus">
                <i className="fa fa-google-plus"></i>
                <div className="chart-wrapper">
                  <Line data={makeSocialBoxData(3)} options={socialChartOpts} height={90} />
                </div>
              </div>
              <div className="brand-card-body">
                <div>
                  <div className="text-value">894</div>
                  <div className="text-uppercase text-muted small">followers</div>
                </div>
                <div>
                  <div className="text-value">92</div>
                  <div className="text-uppercase text-muted small">circles</div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        {
          //TRAFIC
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
                        New clients
                        &nbsp;
                        <sup className="px-1"><Badge pill color="danger">&nbsp;</Badge></sup>
                        Recurring clients
                      </small>
                    </div>
                  </Col>
                  <Col xs="12" md="6" xl="6">
                    <Row>
                      <Col sm="6">
                        <div className="callout callout-warning">
                          <small className="text-muted">Pageviews</small>
                          <br />
                          <strong className="h4">78,623</strong>
                          <div className="chart-wrapper">
                            <Line data={makeSparkLineData(2, brandWarning)} options={sparklineChartOpts} width={100} height={30} />
                          </div>
                        </div>
                      </Col>
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
                    <ul>
                      <div className="progress-group">
                        <div className="progress-group-header">
                          <i className="icon-user progress-group-icon"></i>
                          <span className="title">Male</span>
                          <span className="ml-auto font-weight-bold">43%</span>
                        </div>
                        <div className="progress-group-bars">
                          <Progress className="progress-xs" color="warning" value="43" />
                        </div>
                      </div>
                      <div className="progress-group mb-5">
                        <div className="progress-group-header">
                          <i className="icon-user-female progress-group-icon"></i>
                          <span className="title">Female</span>
                          <span className="ml-auto font-weight-bold">37%</span>
                        </div>
                        <div className="progress-group-bars">
                          <Progress className="progress-xs" color="warning" value="37" />
                        </div>
                      </div>
                      <div className="progress-group">
                        <div className="progress-group-header">
                          <i className="icon-globe progress-group-icon"></i>
                          <span className="title">Organic Search</span>
                          <span className="ml-auto font-weight-bold">191,235 <span className="text-muted small">(56%)</span></span>
                        </div>
                        <div className="progress-group-bars">
                          <Progress className="progress-xs" color="success" value="56" />
                        </div>
                      </div>
                      <div className="progress-group">
                        <div className="progress-group-header">
                          <i className="icon-social-facebook progress-group-icon"></i>
                          <span className="title">Facebook</span>
                          <span className="ml-auto font-weight-bold">51,223 <span className="text-muted small">(15%)</span></span>
                        </div>
                        <div className="progress-group-bars">
                          <Progress className="progress-xs" color="success" value="15" />
                        </div>
                      </div>
                      <div className="progress-group">
                        <div className="progress-group-header">
                          <i className="icon-social-twitter progress-group-icon"></i>
                          <span className="title">Twitter</span>
                          <span className="ml-auto font-weight-bold">37,564 <span className="text-muted small">(11%)</span></span>
                        </div>
                        <div className="progress-group-bars">
                          <Progress className="progress-xs" color="success" value="11" />
                        </div>
                      </div>
                      <div className="progress-group">
                        <div className="progress-group-header">
                          <i className="icon-social-linkedin progress-group-icon"></i>
                          <span className="title">LinkedIn</span>
                          <span className="ml-auto font-weight-bold">27,319 <span className="text-muted small">(8%)</span></span>
                        </div>
                        <div className="progress-group-bars">
                          <Progress className="progress-xs" color="success" value="8" />
                        </div>
                      </div>
                      <div className="divider text-center">
                        <Button color="link" size="sm" className="text-muted" data-toggle="tooltip" data-placement="top"
                          title="" data-original-title="show more"><i className="icon-options"></i></Button>
                      </div>
                    </ul>
                  </Col>
                </Row>
                <br />
                {
                  //LAST USERS
                }
                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                    <tr>
                      <th className="text-center"><i className="icon-people"></i></th>
                      <th>User</th>
                      <th className="text-center">Country</th>
                      <th>Usage</th>
                      <th className="text-center">Payment Method</th>
                      <th>Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">
                        <div className="avatar">
                          <img src={'assets/img/avatars/1.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                          <span className="avatar-status badge-success"></span>
                        </div>
                      </td>
                      <td>
                        <div>Yiorgos Avraamu</div>
                        <div className="small text-muted">
                          <span>New</span> | Registered: Jan 1, 2015
                      </div>
                      </td>
                      <td className="text-center">
                        <i className="flag-icon flag-icon-us h4 mb-0" title="us" id="us"></i>
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>50%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                          </div>
                        </div>
                        <Progress className="progress-xs" color="success" value="50" />
                      </td>
                      <td className="text-center">
                        <i className="fa fa-cc-mastercard" style={{ fontSize: 24 + 'px' }}></i>
                      </td>
                      <td>
                        <div className="small text-muted">Last login</div>
                        <strong>10 sec ago</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div className="avatar">
                          <img src={'assets/img/avatars/2.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                          <span className="avatar-status badge-danger"></span>
                        </div>
                      </td>
                      <td>
                        <div>Avram Tarasios</div>
                        <div className="small text-muted">

                          <span>Recurring</span> | Registered: Jan 1, 2015
                      </div>
                      </td>
                      <td className="text-center">
                        <i className="flag-icon flag-icon-br h4 mb-0" title="br" id="br"></i>
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>10%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                          </div>
                        </div>
                        <Progress className="progress-xs" color="info" value="10" />
                      </td>
                      <td className="text-center">
                        <i className="fa fa-cc-visa" style={{ fontSize: 24 + 'px' }}></i>
                      </td>
                      <td>
                        <div className="small text-muted">Last login</div>
                        <strong>5 minutes ago</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div className="avatar">
                          <img src={'assets/img/avatars/3.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                          <span className="avatar-status badge-warning"></span>
                        </div>
                      </td>
                      <td>
                        <div>Quintin Ed</div>
                        <div className="small text-muted">
                          <span>New</span> | Registered: Jan 1, 2015
                      </div>
                      </td>
                      <td className="text-center">
                        <i className="flag-icon flag-icon-in h4 mb-0" title="in" id="in"></i>
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>74%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                          </div>
                        </div>
                        <Progress className="progress-xs" color="warning" value="74" />
                      </td>
                      <td className="text-center">
                        <i className="fa fa-cc-stripe" style={{ fontSize: 24 + 'px' }}></i>
                      </td>
                      <td>
                        <div className="small text-muted">Last login</div>
                        <strong>1 hour ago</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div className="avatar">
                          <img src={'assets/img/avatars/4.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                          <span className="avatar-status badge-secondary"></span>
                        </div>
                      </td>
                      <td>
                        <div>Enéas Kwadwo</div>
                        <div className="small text-muted">
                          <span>New</span> | Registered: Jan 1, 2015
                      </div>
                      </td>
                      <td className="text-center">
                        <i className="flag-icon flag-icon-fr h4 mb-0" title="fr" id="fr"></i>
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>98%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                          </div>
                        </div>
                        <Progress className="progress-xs" color="danger" value="98" />
                      </td>
                      <td className="text-center">
                        <i className="fa fa-paypal" style={{ fontSize: 24 + 'px' }}></i>
                      </td>
                      <td>
                        <div className="small text-muted">Last login</div>
                        <strong>Last month</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div className="avatar">
                          <img src={'assets/img/avatars/5.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                          <span className="avatar-status badge-success"></span>
                        </div>
                      </td>
                      <td>
                        <div>Agapetus Tadeáš</div>
                        <div className="small text-muted">
                          <span>New</span> | Registered: Jan 1, 2015
                      </div>
                      </td>
                      <td className="text-center">
                        <i className="flag-icon flag-icon-es h4 mb-0" title="es" id="es"></i>
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>22%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                          </div>
                        </div>
                        <Progress className="progress-xs" color="info" value="22" />
                      </td>
                      <td className="text-center">
                        <i className="fa fa-google-wallet" style={{ fontSize: 24 + 'px' }}></i>
                      </td>
                      <td>
                        <div className="small text-muted">Last login</div>
                        <strong>Last week</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div className="avatar">
                          <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                          <span className="avatar-status badge-danger"></span>
                        </div>
                      </td>
                      <td>
                        <div>Friderik Dávid</div>
                        <div className="small text-muted">
                          <span>New</span> | Registered: Jan 1, 2015
                      </div>
                      </td>
                      <td className="text-center">
                        <i className="flag-icon flag-icon-pl h4 mb-0" title="pl" id="pl"></i>
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>43%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                          </div>
                        </div>
                        <Progress className="progress-xs" color="success" value="43" />
                      </td>
                      <td className="text-center">
                        <i className="fa fa-cc-amex" style={{ fontSize: 24 + 'px' }}></i>
                      </td>
                      <td>
                        <div className="small text-muted">Last login</div>
                        <strong>Yesterday</strong>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
