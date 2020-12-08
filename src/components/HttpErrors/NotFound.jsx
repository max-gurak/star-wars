import React from 'react';
import {
  Button,
  Container,
  Header
} from 'semantic-ui-react';
import './styles/NotFound.scss';
import { History } from 'base';

export default class NotFound extends React.PureComponent {

  render() {
    return (
      <Container className="not-found">
        <Header as="h1" inverted>
          404
          <Header.Subheader>Not found</Header.Subheader>
        </Header>
        <Button
          onClick={() => History.push('/planets')}
        >
          Planets list
        </Button>
      </Container>
    );
  }

}
