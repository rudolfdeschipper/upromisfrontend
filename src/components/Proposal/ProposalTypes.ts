/*
**             ------ IMPORTANT ------
** This file was generated by ZeroCode2 on 24/Oct/2020 13:53:12
** DO NOT MODIFY IT, as it can be regenerated at any moment.
** If you need this file changed, change the underlying model or its template.
*/

export interface IProposalData {

    id: number,
    externalId: string,
    code: string,
    title: string,
    description: string,
    startDate: Date,
    endDate: Date,
    Proposalstatus: string,
    proposalType: string,
    paymentInfo: IPayment[] | null,
    teamInfo: ITeam[] | null,

    modifier: "Unchanged" | "Added" | "Modified" | "Deleted"
}

export interface IPayment {
    id : number,
    externalId : string,
    description : string,
    plannedInvoiceDate : Date,
    amount : number,

    modifier: "Unchanged" | "Added" | "Modified" | "Deleted"
}

export interface ITeam {
    id : number,
    externalId : string,
    teammemberID : string,
    memberType : string,

    modifier: "Unchanged" | "Added" | "Modified" | "Deleted"
}

