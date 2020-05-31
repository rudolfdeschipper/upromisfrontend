import React, { Component } from "react";
import "./Progress.css";

interface IProps {
  progress: number
}

interface IState {

}

class Progress extends Component<IProps, IState> {
  constructor(props: Readonly<IProps>) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="ProgressBar">
        <div
          className="Progress"
          style={{ width: this.props.progress + "%" }}
        />
      </div>
    );
  }
}

export default Progress;
