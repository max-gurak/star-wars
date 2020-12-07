import React from 'react';
import { connect } from 'react-redux';
import { getPlanet } from '../../redux/actions/planets';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
  Container,
  Header,
  Table
} from 'semantic-ui-react';

@withRouter
@connect(
  ({ planet }) => {
    const { loading, data } = planet.show;

    return {
      loading,
      data,
      // error
    };
  },
  {
    getPlanet
  }
)

export default class PlanetShow extends React.PureComponent {

  static propTypes = {
    data: PropTypes.object,
    match: PropTypes.object,
    getPlanet: PropTypes.func,
  };

  componentDidMount() {
    const { match } = this.props;

    this.props.getPlanet(match.params.id);
  }

  render() {
    const { data } = this.props;
    const test = [
      { key: 'name', title: 'Name' },
      { key: 'rotation_period', title: 'Rotation period' },
      { key: 'climate', title: 'Climate' },
      { key: 'gravity', title: 'Gravity' },
      { key: 'terrain', title: 'Terrain' },
      { key: 'population', title: 'Population' },
    ]

    return (
      <Container>
        <Header as="h1">Planet</Header>
        <Table basic='very' celled collapsing>
          <Table.Body>
            {test.map((item, key) => {
              return (
                <Table.Row key={key}>
                  <Table.Cell>
                    <Header as='h4' image>
                      <Header.Content>
                        {item.title}
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{data[item.key]}</Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </Container>
    );
  }

}
