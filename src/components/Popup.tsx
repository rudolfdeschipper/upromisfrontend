import React from 'react';
import { Alert } from 'reactstrap';

interface IProps {
  visible: boolean,
  message: string,
//  delay: number,
//  autohide: boolean,
  style: string,
  onDismiss: () => void
}

export class Popup extends React.Component<IProps> {
  static displayName = Popup.name;

  render() {
    return (
      <Alert color={this.props.style} isOpen={this.props.visible} toggle={this.props.onDismiss}>
        {this.props.message}
      </Alert>
    );
  }
}
