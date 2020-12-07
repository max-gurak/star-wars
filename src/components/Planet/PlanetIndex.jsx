import React from 'react';
import {
  Container,
  Header,
  Card,
  Button,
  Dimmer,
  Segment,
  Loader
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { getPlanets, loadMorePlanets } from '../../redux/actions/planets';
import { connect } from 'react-redux';
import PlanetCard from './PlanetCard';
import './styles/PlanetList.scss';

@connect(
  ({ planet }) => {
    const { loading, loadingMore, data, error } = planet.list;

    return {
      loading,
      loadingMore,
      data,
      error
    };
  },
  {
    getPlanets,
    loadMorePlanets,
  }
)

export default class PlanetIndex extends React.PureComponent {

  static propTypes = {
    data: PropTypes.object,
    getPlanets: PropTypes.func,
    loadMorePlanets: PropTypes.func,
    loading: PropTypes.boolean,
    loadingMore: PropTypes.boolean,
  };

  constructor(props) {
    super(props);

    this.currentPage = 1;
  }

  componentDidMount() {
    this.props.getPlanets();
  }

  handleOnClickLoadMore = () => {
    this.props.loadMorePlanets(++this.currentPage);
  }
  
  getPlanets = () => {
    const { results } = this.props.data;

    return (
      <Card.Group>
        {results.map((planet, key) => <PlanetCard key={key} data={planet} />)}
      </Card.Group>
    );
  }

  render() {
    const { loading, loadingMore, data } = this.props;

    return (
      <Container>
        <Header as="h1">
          Planets
          <Header sub>{data.results.length}/{data.count}</Header>
        </Header>
        <Dimmer.Dimmable as={Segment} dimmed={loading}>
          <Dimmer active={loading} inverted>
            <Loader>Loading</Loader>
          </Dimmer>
          {this.getPlanets()}
        </Dimmer.Dimmable>
        <Button
          onClick={this.handleOnClickLoadMore}
          loading={loadingMore}
          disabled={data.next === null}
        >
          Load more
        </Button>
      </Container>
    );
  }

}
