import { ILoadResult, IListInfo, ISaveMessage, IAPIResult, ISelectValueList } from '../GeneralTypes';
import { Utils } from '../Utils';

import { IContractData } from './ContractTypes';

export class ContractAPI {

    static loadList = (listInfo: IListInfo) => fetch('http://localhost:5001/api/contract/getcontractdata', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            page: listInfo.page,
            pageSize: listInfo.pageSize,
            sorted: listInfo.sorted,
            filtered: listInfo.filtered
        })
    })
        .then(response => {
            return response.json() as Promise<ILoadResult<IContractData>>;
        })
        ;

    static loadListForExport = (title: string, listInfo: IListInfo) => fetch('http://localhost:5001/api/contract/getcontractdataexport', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            page: 1,
            pageSize: listInfo.pageSize,
            sorted: listInfo.sorted,
            filtered: listInfo.filtered
        })
    })
        .then(response => {
            response.blob().then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                let filename = title + " - " + Utils.formatDate(Date.now()).replace(/\//g, "-") + ".xlsx";
                a.href = url;
                a.download = filename;
                a.click();
                a.remove();
            });
        })
        .catch(e => console.error(e))
        ;

    static saveRecord = (message: ISaveMessage<IContractData>): Promise<IAPIResult<IContractData>> => {

        return fetch('http://localhost:5001/api/contract/postonecontractdata', {
            method: message.action,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                id: message.id,
                dataSubject: message.dataSubject as IContractData,
                action: message.action,
                subaction: message.subaction,
                additionalData: message.additionalData

            })
        })
            .then(response => {
                return response.json() as Promise<IAPIResult<IContractData>>;
            })
    };

    static loadOneRecord = (id: number): Promise<IAPIResult<IContractData>> => {
        return (fetch('http://localhost:5001/api/contract/getonecontractdata', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ID: id
            })
        })
            .then(response => {
                return response.json() as Promise<IAPIResult<IContractData>>;
            }))
    }

static loadDropdownValues = (valueType: string): Promise<ISelectValueList> => {
    return (fetch('http://localhost:5001/api/contract/getselectvalues', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            valueType: valueType
        })
    })
        .then(response => {
            return response.json() as Promise<ISelectValueList>;
        }))

}

}