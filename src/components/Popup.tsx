import React, { Component, useState } from 'react';
import { Alert } from 'reactstrap';

interface IProps {
  visible: boolean,
  message: string,
//  delay: number,
//  autohide: boolean,
  style: string
}

interface IState {
  visible: boolean
}

export class Popup extends React.Component<IProps, IState> {
  static displayName = Popup.name;

  constructor(props: IProps) {
    super(props);
    this.state = {
      visible: props.visible
    };
  }


  onDismiss = () => this.setState({ visible: false });

  render() {
    return (
      <Alert color={this.props.style} isOpen={this.props.visible} toggle={this.onDismiss}>
        {this.props.message}
      </Alert>
    );
  }
}
