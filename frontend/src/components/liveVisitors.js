import React, { Component } from 'react';
import axios from 'axios';
import openSocket from 'socket.io-client';

import { Table } from 'reactstrap';

const socket = openSocket('http://localhost:5000');

class LiveVisitors extends Component {
  state = {
    visitors: [],
  };

  componentDidMount() {
    axios.get('http://www.geoplugin.net/json.gp').then(res => {
      const {
        geoplugin_request,
        geoplugin_city,
        geoplugin_regionName,
        geoplugin_countryName,
        geoplugin_countryCode,
      } = res.data;

      const visitor = {
        ip: geoplugin_request,
        city: geoplugin_city,
        state: geoplugin_regionName,
        country: geoplugin_countryName,
        flag: geoplugin_countryCode,
      };

      socket.emit('new_visitor', visitor);

      socket.on('visitors', visitors => {
        this.setState({ visitors });
      });
    });
  }

  renderTableBody = () => {
    const { visitors } = this.state;
    return visitors.map((user, index) => {
      return (
        <tr key={index}>
          <td>{index}</td>
          <td>{user.ip}</td>
          <td>
            <img
              src={`https://www.countryflags.io/${user.flag}/flat/64.png`}
              alt={user.country}
              title={user.country}
            />
          </td>
          <td>{user.city}</td>
          <td>{user.state}</td>
          <td>{user.country}</td>
        </tr>
      );
    });
  };

  render() {
    return (
      <>
        <h2>Live Visitors</h2>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>IP</th>
              <th>Flag</th>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>{this.renderTableBody()}</tbody>
        </Table>
      </>
    );
  }
}

export default LiveVisitors;
