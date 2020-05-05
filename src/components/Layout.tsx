import React from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends React.Component<{ User: any }> {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavMenu User={this.props.User} />
        <Container className="container upromisContent">
          {this.props.children}
        </Container>
      </div>
    );
  }
}
