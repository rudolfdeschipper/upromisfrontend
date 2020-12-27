/*
** Implementation of action Close (close) for Contract
** This file is only generated once; you may change it as needed.
** In case you want to re-generate it, simply delete it an re-run the code generator.
** Do not change the method's name or signature as this wil break the calling code.
**
*/
import { ILoadResult, ISaveMessage, IAPIResult } from '../GeneralTypes';
import { http } from '../http';
import { Utils } from '../Utils';
import { IContractData } from './generated/ContractTypes';
import {ContractAPI} from './generated/ContractAPI';

export class ContractActionclose {
    static perform = async (id: number, token: string): Promise<ISaveMessage<IContractData>> => {
        try {
            // get the record from the backend
            var recAPIResult = await ContractAPI.loadOneRecord(id, token);
            var rec : IContractData = recAPIResult.dataSubject!;
            var saveMessage : ISaveMessage<IContractData>;

            // perform action on the record
            if( rec.contractStatus === "Closed")
            {
                alert("Contract is already Closed, no change was made");
                saveMessage =  { id: id, dataSubject : rec, action: "None", subaction: "", additionalData: [] };
            } else
            {
                rec.contractStatus = "Closed";
                // send the updated record back to the caller for saving
                saveMessage =  { id: id, dataSubject : rec, action: "Save", subaction: "Close", additionalData: [] };
            }
            // send the updated record back to the caller for saving
            return saveMessage;
        } catch (ex) {
            console.error(ex);
            throw ex;
        }
    }
}
