/*
**             ------ IMPORTANT ------
** This file was generated by ZeroCode2 on 29/Dec/2020 21:56:56
** DO NOT MODIFY IT, as it can be regenerated at any moment.
** If you need this file changed, change the underlying model or its template.
*/

import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Datepicker, Input, Textarea, SubmitBtn, Select } from 'react-formik-ui'

import { ITeammembers } from './ContractTypes';
import { ISelectValue } from '../../GeneralTypes';
import { UserContext } from '../../../context/UserContext';


interface IProps {
    currentData: ITeammembers;
    memberTypevalues : ISelectValue[]; 
    buttonText: string;
    updateValues:  (values: ITeammembers) => void;
}

interface IState {
    isSubmitting: boolean
}

class ContractTeamForm extends React.Component<IProps, IState> {

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
                    this.props.updateValues({...values});
                    setSubmitting(false);
                }}
                validationSchema={Yup.object({
                    id: Yup.number()
                        .required('Required')
,                     teammemberID: Yup.string()
                        .required('Required')
,                     memberType: Yup.string()
                        .required('Required')
                        .oneOf([
                        'Owner',
                        'Administrator',
                        'Member',
                        'Participant',
                        'Reader',
                        ])
                })}

            >
                <Form className="w3-container" mode="themed">
                    <Input name='id' label='ID' disabled
                     />
                    <Input name='teammemberID' label='Team member' disabled
                     />
                    <Select name='memberType' label='Member Type' options={this.props.memberTypevalues}
                     />
                    <hr />
                    <SubmitBtn className="w3-button w3-light-grey w3-round" title={this.props.buttonText + "s this record"} disabled={this.state.isSubmitting}>
                        <i className="fa fa-save" ></i>&nbsp;{this.props.buttonText}
                    </SubmitBtn>
                </Form>
            </Formik>
        );
    }
};
export default ContractTeamForm;

