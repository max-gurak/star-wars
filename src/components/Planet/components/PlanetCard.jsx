import React, { Fragment } from 'react';
import {
  Card,
  Icon
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class PlanetCard extends React.PureComponent {

  static propTypes = {
    data: PropTypes.object,
  };

  getPlanetId = () => {
    const { data } = this.props;
    const re = new RegExp('planets\\/([0-9]+)\\/$', 'gi');

    return re.exec(data.url)[1] || 0;
  };

  getClimate = () => {
    const { data } = this.props;

    return (
      <div>Climate: {data.climate}</div>
    );
  };

  getPopulation = () => {
    const { data } = this.props;
    let icon = null;

    if (!isNaN(data.population)) {
      icon = (
        <Fragment>{' '}<Icon name="users" /></Fragment>
      );
    }

    return (
      <div>Population: {data.population}{icon}</div>
    );
  };

  render() {
    const { data } = this.props;
    const planetId = this.getPlanetId();

    return (
      <Card as={Link} to={`/planets/${planetId}`} fluid={false} raised={false}>
        <Card.Content>
          <Card.Header>{data.name}</Card.Header>
          <Card.Description>
            {this.getClimate()}
            {this.getPopulation()}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }

}
