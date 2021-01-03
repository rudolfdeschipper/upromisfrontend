import React from 'react';
import { Alert } from 'reactstrap';
import { IBusinessRuleResult } from './GeneralTypes';

interface IProps {
  visible: boolean,
  message: string,
//  delay: number,
//  autohide: boolean,
  style: string,
  errorList?: IBusinessRuleResult[],
  onDismiss: () => void
}

export class Popup extends React.Component<IProps> {
  static displayName = Popup.name;

  render() {
    let errormessages = null;
    let warnmessages = null;
    let infomessages = null;

    if(this.props.errorList != undefined) { 
      errormessages = this.props.errorList?.filter(e => e.severity == 2).length > 0 ? (
        <div>
        <h3>Errors</h3>
        <ul>
          {
            this.props.errorList?.filter(e => e.severity == 2).map(e => (
              <li key={e.property} >{e.property}: {e.message}</li>
            ))  
        }
      </ul></div>
      ) : undefined;
      warnmessages = this.props.errorList?.filter(e => e.severity == 1).length > 0 ? (
        <div>
        <h3>Warnings</h3>
        <ul>
          {
            this.props.errorList?.filter(e => e.severity == 1).map(e => (
              <li key={e.property} >{e.property}: {e.message}</li>
            ))  
        }
      </ul></div>
      ) : undefined;
      infomessages = this.props.errorList?.filter(e => e.severity == 0).length > 0 ? (
        <div>
        <h3>Information</h3>
        <ul>
          {
            this.props.errorList?.filter(e => e.severity == 0).map(e => (
              <li key={e.property} >{e.property}: {e.message}</li>
            ))  
        }
      </ul></div>
      ) : undefined;
    }
    let res = (
      <Alert color={this.props.style} isOpen={this.props.visible} toggle={this.props.onDismiss}>
        <div>
        {this.props.message}
        {errormessages}
        {warnmessages}
        {infomessages}
        </div>
      </Alert>
    );
    return res;
  }
}
