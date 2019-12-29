
export interface IContractData {
    id: number,
    code: string,
    title: string,
    description: string,
    startdate: Date,
    enddate: Date,
    value: number,
    paymentInfo: IPayment[] | null
}

export interface IPayment {
    id: number,
    description: string,
    plannedinvoicedate: Date,
    actualinvoicedate: Date,
    amount: number
}

