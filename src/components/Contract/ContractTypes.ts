
export interface IContractData {
    id: number,
    code: string,
    title: string,
    description: string,
    startdate: Date,
    enddate: Date,
    status: string,
    value: number,
    paymentInfo: IPayment[] | null,

    modifier: "Unchanged" | "Added" | "Modified" | "Deleted"
}

export interface IPayment {
    id: number,
    description: string,
    plannedinvoicedate: Date,
    actualinvoicedate: Date,
    amount: number,

    modifier: "Unchanged" | "Added" | "Modified" | "Deleted"
}

