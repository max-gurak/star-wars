import React from 'react';
import { connect } from 'react-redux';
import { getPlanet, clearPlanetData } from '../../redux/actions/planets';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
  Container,
  Dimmer,
  Header,
  List,
  // List,
  Loader,
  Segment,
  Table,
  // Table
} from 'semantic-ui-react';
import './styles/PlanetShow.scss';
import { Link } from 'react-router-dom';

@withRouter
@connect(
  ({ planet, resident }) => {
    const { loading: residentLoading, data: residentsData } = resident;
    const { loading, data } = planet.show;

    return {
      loading,
      data,
      residentLoading,
      residentsData
      // error
    };
  },
  {
    getPlanet,
    clearPlanetData,
  }
)

export default class PlanetShow extends React.PureComponent {

  static propTypes = {
    data: PropTypes.object,
    match: PropTypes.object,
    getPlanet: PropTypes.func,
    clearPlanetData: PropTypes.func,
    loading: PropTypes.bool,
    residentLoading: PropTypes.bool,
    residentsData: PropTypes.array,
    showFields: PropTypes.array,
  };

  static defaultProps = {
    showFields: [
      { key: 'rotation_period', title: 'Rotation period' },
      { key: 'climate', title: 'Climate' },
      { key: 'gravity', title: 'Gravity' },
      { key: 'terrain', title: 'Terrain' },
      { key: 'population', title: 'Population' },
    ],
  };

  componentDidMount() {
    const { match } = this.props;

    this.props.getPlanet(match.params.id);
  }

  componentWillUnmount() {
    this.props.clearPlanetData();
  }

  getResidentId = url => {
    const re = new RegExp('people\\/([0-9]+)\\/$', 'gi');

    return re.exec(url)[1] || 0;
  };

  getResidents = () => {
    const { residentsData, residentLoading } = this.props;

    return (
      <Table.Row key="residents">
        <Table.Cell colSpan="2" className="residents-container">
          <Dimmer.Dimmable dimmed={residentLoading}>
            <Dimmer active={residentLoading}>
              <Loader>Loading Residents</Loader>
            </Dimmer>
            <div className="header">
              {residentsData.length || residentLoading ? 'Residents' : 'No Residents found'}
            </div>
            <List>
              {residentsData.map((resident, key) => {
                return (
                  <List.Item key={key} as={Link} to={`/people/${this.getResidentId(resident.url)}`} >
                    <List.Icon name={resident.gender === 'female' ? 'female' : 'male'} color="orange" />
                    <List.Content>{resident.name}</List.Content>
                  </List.Item>
                );
              })}
            </List>
          </Dimmer.Dimmable>
        </Table.Cell>
      </Table.Row>
    );
  };
  
  render() {
    const { data, loading, showFields } = this.props;

    return (
      <Container className="planet-show">
        <Header as="h1" inverted>
          Planet "{data.name}"
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
                  )
                })}
                {this.getResidents()}
              </Table.Body>
            </Table>
          </Segment>
        </Dimmer.Dimmable>
      </Container>
    );
  }

}
