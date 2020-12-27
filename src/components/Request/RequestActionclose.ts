/*
** Implementation of action Close (close) for Request
** This file is only generated once; you may change it as needed.
** In case you want to re-generate it, simply delete it an re-run the code generator.
** Do not change the method's name or signature as this wil break the calling code.
**
*/
import { ILoadResult, ISaveMessage, IAPIResult } from '../GeneralTypes';
import { http } from '../http';
import { Utils } from '../Utils';
import { IRequestData } from './generated/RequestTypes';
import {RequestAPI} from './generated/RequestAPI';

export class RequestActionclose {
    static perform = async (id: number, token: string): Promise<ISaveMessage<IRequestData>> => {
        try {
            // get the record from the backend
            var recAPIResult = await RequestAPI.loadOneRecord(id, token);
            var rec : IRequestData = recAPIResult.dataSubject!;
            var saveMessage : ISaveMessage<IRequestData>;

            // perform action on the record
            if( rec.requestStatus === "Closed")
            {
                alert("Request is already Closed, no change was made");
                saveMessage =  { id: id, dataSubject : rec, action: "None", subaction: "", additionalData: [] };
            } else
            {
                rec.requestStatus = "Closed";
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
