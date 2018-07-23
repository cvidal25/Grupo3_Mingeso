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
import Widget03 from '../../views/Widgets/Widget03'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

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

class Ranking extends Component {
    constructor() {
        super();
        this.state = {
            coord: false,
        };
    }
    chartTittle(titulo) {
        return (
            <CardHeader>
                <i className="fa fa-align-justify"></i> {titulo}
            </CardHeader>
        )
    }
    render() {
        return (
            <Col>
                <Card>
                    {this.chartTittle('Ranking')}
                    <CardBody>
                        <Col>
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
                        <br />
                    </CardBody>
                </Card>
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
