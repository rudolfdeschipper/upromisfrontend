import { ILoadResult, IListInfo, ISaveMessage, IAPIResult, ISelectValueList } from '../GeneralTypes';
import { http } from '../http';
import { Utils } from '../Utils';

import { IContractData } from './ContractTypes';

export class ContractAPI {

    static webAPIUrl : string = 'http://localhost:5001/api';

    static loadList = async (listInfo: IListInfo, token: string) : Promise<ILoadResult<IContractData>> => 
    {
        try {
            const result = await http<IListInfo, ILoadResult<IContractData>>( ContractAPI.webAPIUrl,
                {
                    path: '/contract/getlist',
                    method: 'post',
                    body: listInfo,
                    accessToken: token
                }
            );
            if (result.ok && result.parsedBody) {
                return {...result.parsedBody };
            } else {
                return { data: [], pages: 0, message: result.statusText  };
            }
        } catch (ex) {
            console.error(ex);
            return { data: [], pages: 0, message: ex  };
        }

    }

    static loadListForExport = async (title: string, listInfo: IListInfo, token: string)  : Promise<void> => 
    {
        try {
            const result = await http<IListInfo, any>( ContractAPI.webAPIUrl,
                {
                    path: '/contract/getforexport',
                    method: 'post',
                    body: { ...listInfo, page: 1},
                    accessToken: token
                }
            )
            result.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    let filename = title + " - " + Utils.formatDate(Date.now()).replace(/\//g, "-") + ".xlsx";
                    a.href = url;
                    a.download = filename;
                    a.click();
                    a.remove();
                });
        } catch (ex) {
            console.error(ex);
        }
    }

    static saveRecord = async (message: ISaveMessage<IContractData>, token: string): Promise<IAPIResult<IContractData>> => {

        try {
            const result = await http<ISaveMessage<IContractData>, IAPIResult<IContractData>>(
                ContractAPI.webAPIUrl,
                {
                    path: '/contract',
                    method: message.action,
                    body: message,
                    accessToken: token
                }
            );
            if (result.ok && result.parsedBody) {
                return {...result.parsedBody, success: true };
            } else {
                return { id: message.id, dataSubject: undefined, success: false,  message: result.statusText };
            }
        } catch (ex) {
            console.error(ex);
            return { id: message.id, dataSubject: undefined, success: false,  message: ex };
        }
    };

    static loadOneRecord = async (id: number, token: string): Promise<IAPIResult<IContractData>> => {

        try {
            const result = await http<ISaveMessage<IContractData>, IAPIResult<IContractData>>(
                ContractAPI.webAPIUrl,
                {
                    path: '/contract/' + id,
                    method: 'get',
                    accessToken: token
                }
            );
            if (result.ok && result.parsedBody) {
                return {...result.parsedBody, success: true };
            } else {
                return { id: id, dataSubject: undefined, success: false,  message: result.statusText };
            }
        } catch (ex) {
            console.error(ex);
            return { id: id, dataSubject: undefined, success: false,  message: ex };
        }

    }

    static loadDropdownValues = async (valueType: string, token: string): Promise<ISelectValueList> => {

        try {
            const result = await http<any, ISelectValueList>(
                ContractAPI.webAPIUrl,
                {
                    path: '/contract/getselectvalues',
                    method: 'post',
                    body: {valueType: valueType},
                    accessToken: token
                }
            );
            if (result.ok && result.parsedBody) {
                return {...result.parsedBody };
            } else {
                return { data: [], valueType: valueType };
            }
        } catch (ex) {
            console.error(ex);
            return { data: [], valueType: valueType };
        }
    }

}