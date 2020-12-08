import React from 'react';
import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { getPlanets, loadMorePlanets } from 'app-actions/planets';
import PlanetsCard from './components/PlanetsCard';

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

export default class PlanetList extends React.PureComponent {

  static propTypes = {
    data: PropTypes.object,
    getPlanets: PropTypes.func,
    loadMorePlanets: PropTypes.func,
    loading: PropTypes.bool,
    loadingMore: PropTypes.bool,
  };

  componentDidMount() {
    this.props.getPlanets();
  }

  render() {
    const { data } = this.props;

    return (
      <Container>
        <Header as="h1" inverted>
          Planets
          <Header sub>{data.results.length} item{data.results.length > 1 ? 's' : ''} of {data.count}</Header>
        </Header>
        <PlanetsCard />
      </Container>
    );
  }

}
