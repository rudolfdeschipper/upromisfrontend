/*
**             ------ IMPORTANT ------
** This file was generated by ZeroCode2 on 29/Dec/2020 21:56:57
** DO NOT MODIFY IT, as it can be regenerated at any moment.
** If you need this file changed, change the underlying model or its template.
*/

import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, SubmitBtn, Input, Textarea, Datepicker } from 'react-formik-ui'

import { IProposalData } from './ProposalTypes';

interface IProps {
    currentData: IProposalData,
    buttonText: string;
    saveAction: (subaction: string, record: IProposalData) => void
}

interface IState {
    isSubmitting: boolean;
}

class ProposalDeleteForm extends React.Component<IProps, IState> {

    constructor(props: Readonly<IProps>) {
        super(props);
        this.state = { isSubmitting: false };
    }

    render() {
        return (
            <Formik
                initialValues={this.props.currentData as any}
                enableReinitialize={true}
                onSubmit={(values, { setSubmitting }) => {
                    this.props.saveAction("Delete", values);
                    setSubmitting(false);
                }}
            >
                <Form mode="themed">
  
                <Input name='id' label='ID' disabled />
  
                <Input name='code' label='Code' disabled />
  
                <Textarea name='title' label='Title' disbabled  />
  
                <Textarea name='description' label='Description' disbabled  />
  
                <Datepicker name='startDate' label='Start date' disabled  />
  
                <Datepicker name='endDate' label='End date' disabled  />
  
                <Input name='proposalStatusLabel' label='Status' disabled  />
  
                <Input name='proposalTypeLabel' label='Proposal type' disabled  />
                    <hr />
                    <SubmitBtn className="w3-button w3-light-grey w3-round" title={this.props.buttonText + "s this record"} disabled={this.state.isSubmitting}>
                        <i className="fa fa-save" ></i>&nbsp;{this.props.buttonText}
                    </SubmitBtn>
                </Form>
            </Formik>
        );
    }
};
export default ProposalDeleteForm;
