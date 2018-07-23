import React, { Component } from 'react';
import LineChart from './LineChart';
import PieChart from './PieChart';
import Ranking from './Ranking';
import DoughnutChart from './DoughnutChart';
import {
  Row,
  CardColumns,
} from 'reactstrap';
import { connect } from 'react-redux';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      coord: false,
    };
  }
  //Operaciones
  render() {
    return (
      //Minicharts
      <div className="animated fadeIn">
        {
          //MAINCHART
        }
        <Row>
          <LineChart />
        </Row>
        <Row>
          <CardColumns className='cols-2'>
            <PieChart />
            <Ranking />
          </CardColumns>
        </Row>
        {
        }
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
