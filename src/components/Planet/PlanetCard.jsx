import React from 'react';
import {
  Card,
  Icon
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class PlanetIndex extends React.PureComponent {

  static propTypes = {
    data: PropTypes.object,
  };

  render() {
    const { data } = this.props;
    const re = new RegExp('planets\\/([0-9]+)\\/$', 'gi');
    const planetId = re.exec(data.url)[1] || 0;

    return (
      <Card as={Link} to={`/planets/${planetId}`}>
        <Card.Content>
          <Card.Header>{data.name}</Card.Header>
          <Card.Description>
            <div><Icon name="cloudversify" /> {data.climate}</div>
            <div><Icon name="users" /> {data.population}</div>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }

}
