import { InputGroupRadio } from "react-bootstrap/InputGroup";

export interface IContractData {
    id: number,
    externalId : string,
    code: string,
    title: string,
    description: string,
    status: string,
    createdOn : Date,
    createdBy : string,
    updatedOn : Date,
    updatedBy : string,
    contractType : number,
    accountInfoId : number,
    parentContractId : number,
    startDate: Date,
    endDate: Date,
    value: number,  
    paymentInfo: IPayment[] | null,
    teamComposition: ITeam[] | null,

    modifier: "Unchanged" | "Added" | "Modified" | "Deleted"
}

export interface IPayment {
    id: number,
    description: string,
    plannedInvoiceDate: Date,
    actualInvoiceDate: Date,
    amount: number,
    paymentStatus: number,
    comment : string,

    modifier: "Unchanged" | "Added" | "Modified" | "Deleted"
}

export interface ITeam {
    id: number,
    teamMember : string,
    memberType : number,
    startDate: Date | null,
    endDate: Date | null,

    modifier: "Unchanged" | "Added" | "Modified" | "Deleted"
}
