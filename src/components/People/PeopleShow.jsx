import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  Button,
  Container,
  Dimmer,
  Header,
  Loader,
  Segment,
  Table
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { History } from 'base';
import { getResident, clearResidentData } from 'app-actions/residents';

import '../Planet/styles/PlanetShow.scss';

@withRouter
@connect(
  ({ resident }) => {
    const { loading, error, showResident: data } = resident;

    return {
      loading,
      data,
      error,
    };
  },
  {
    getResident,
    clearResidentData,
  }
)

export default class PeopleShow extends React.PureComponent {

  static propTypes = {
    clearResidentData: PropTypes.func,
    data: PropTypes.object,
    getResident: PropTypes.func,
    loading: PropTypes.bool,
    match: PropTypes.object,
    showFields: PropTypes.array
  };

  static defaultProps = {
    showFields: [
      { key: 'height', title: 'Height' },
      { key: 'mass', title: 'Mass' },
      { key: 'gender', title: 'Gender' },
      { key: 'skin_color', title: 'Skin color' },
      { key: 'hair_color', title: 'Hair color' },
      { key: 'birth_year', title: 'Birthday' }
    ]
  };

  componentDidMount() {
    const { match } = this.props;

    this.props.getResident(match.params.id);
  }

  componentWillUnmount() {
    this.props.clearResidentData();
  }

  getPlanetId = url => {
    const re = new RegExp('planets\\/([0-9]+)\\/$', 'gi');

    return re.exec(url)[1] || 0;
  };

  render() {
    const { loading, data, showFields } = this.props;

    return (
      <Container className="planet-show">
        <Header as="h1" inverted>
          Person "{data.name}"
        </Header>
        <Dimmer.Dimmable dimmed={loading}>
          <Dimmer active={loading}>
            <Loader>Loading</Loader>
          </Dimmer>
          <Segment>
            <Table basic="very" celled collapsing>
              <Table.Body>
                {showFields.map((item, key) => {
                  return (
                    <Table.Row key={key}>
                      <Table.Cell>{item.title}</Table.Cell>
                      <Table.Cell>{data[item.key]}</Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
            <Button.Group className="go-back-buttons">
              <Button color="blue" onClick={() => History.push('/planets')}>
                Planets list
              </Button>
              <Button.Or />
              <Button
                color="blue"
                onClick={() => History.push(`/planets/${this.getPlanetId(data.homeworld)}`)
                }
              >
                Homeword
              </Button>
            </Button.Group>
          </Segment>
        </Dimmer.Dimmable>
      </Container>
    );
  }
}
