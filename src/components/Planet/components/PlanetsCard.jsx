import React from 'react';
import {
  Button,
  Card,
  Dimmer,
  Loader,
  Segment
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadMorePlanets } from 'app-redux/actions/planets';
import PlanetCard from './PlanetCard';


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
    loadMorePlanets,
  }
)

export default class PlanetsCard extends React.PureComponent {

  static propTypes = {
    data: PropTypes.object,
    loading: PropTypes.bool,
    loadingMore: PropTypes.bool,
    loadMorePlanets: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.currentPage = 1;
  }

  handleOnClickLoadMore = () => {
    this.props.loadMorePlanets(++this.currentPage);
  }

  render() {
    const { loading, loadingMore, data } = this.props;

    return (
      <Dimmer.Dimmable dimmed={loading}>
        <Dimmer active={loading}>
          <Loader>Loading</Loader>
        </Dimmer>
        <Segment>
          <Card.Group>
            {data.results.map((planet, key) => <PlanetCard key={key} data={planet} />)}
          </Card.Group>
          {data.next !== null && (
            <Button
              color="blue"
              onClick={this.handleOnClickLoadMore}
              loading={loading || loadingMore}
            >
              Load more
            </Button>
          )}
        </Segment>
      </Dimmer.Dimmable>
    );
  }

}
