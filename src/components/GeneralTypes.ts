
export interface IListState<T> {
    data: T[],
    loading: boolean,
    pages: number,
    currentSort: any,
    currentFilter: any,
    pageSize: number,
    message: string,
    modalAddIsOpen: boolean,
    modalDeleteIsOpen: boolean,
    currentRecord: T | null
}

export interface ILoadResult<T>
{
    data: T[],
    pages: number
    message: string;
}

export interface ISaveMessage<T> {
    id: number,
    dataSubject: T,
    action: string,
    subaction: string,
    additionalData: object[]
}

export interface IAPIResult<T> {
    id: number;
    dataSubject: T;
    success: boolean;
    message: string;
}