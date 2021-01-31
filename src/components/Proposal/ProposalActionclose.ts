/*
** Implementation of action Close (close) for Proposal
** This file is only generated once; you may change it as needed.
** In case you want to re-generate it, simply delete it an re-run the code generator.
** Do not change the method's name or signature as this wil break the calling code.
**
*/
import { ILoadResult, ISaveMessage, IAPIResult } from '../GeneralTypes';
import { http } from '../http';
import { Utils } from '../Utils';
import { IProposalData } from './generated/ProposalTypes';
import {ProposalAPI} from './generated/ProposalAPI';

export class ProposalActionclose {
    static perform = async (id: number, token: string): Promise<ISaveMessage<IProposalData>> => {
        try {
            // get the record from the backend
            var recAPIResult = await ProposalAPI.loadOneRecord(id, token);
            var rec : IProposalData = recAPIResult.dataSubject!;
            var saveMessage : ISaveMessage<IProposalData>;

            // perform action on the record
            if( rec.proposalStatus === "Closed")
            {
                alert("Proposal is already Closed, no change was made");
                saveMessage =  { id: id, dataSubject : rec, action: "None", subaction: "", additionalData: [] };
            } else
            {
                rec.proposalStatus = "Closed";
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
