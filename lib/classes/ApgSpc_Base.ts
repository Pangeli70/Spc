/** -----------------------------------------------------------------------
 * @module [ApgSpc]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.8.0 [APG 2022/06/26] Removing Rhum
 * @version 0.9.2 [APG 2022/10/02] Github Beta
 * @version 0.9.7 [APG 2023/05/06] Separation of concerns lib/src
 * @version 0.1 APG 20240921 Integration in Deno 2
 * -----------------------------------------------------------------------
 */

import {
    Uts
} from "../deps.ts";
import {
    ApgSpc_Recordset_TFlags
} from "../types/ApgSpc_Types.ts";
import {
    ApgSpc_Service
} from "../services/ApgSpc_Service.ts";
import {
    ApgSpc_eRun
} from "../enums/ApgSpc_eRun.ts";
import {
    ApgSpc_IEvent, ApgSpc_IEvent_Signature
} from "../interfaces/ApgSpc_IEvent.ts";



/**
 * Abstract service with testing capabilities
 */
export abstract class ApgSpc_Base extends Uts.ApgUts_Class {


    protected runFlags: ApgSpc_Recordset_TFlags = {};

    get flags() { return this.runFlags; }


    /** (Virtual abstract method)
     * 
     * Method that will be overriden by the child classes to be called asyncronously.
     */
    protected execute(): Promise<void> {
        return new Promise<void>(() => {
            Uts.ApgUts.CalledVirtualAbstractSoExit(this.NAME, this.execute.name)
        })
    }



    async Run(arun: ApgSpc_eRun) {

        if (arun == ApgSpc_eRun.no) return false;
        ApgSpc_Service.Title(this.NAME);
        let r = await this.mockInit();
        if (r.ok) {
            await this.execute();
            r = await this.mockEnd();
        }
        return r.ok;
    }



    async SendEventsToTestService(
        auri: string,
        aframework: string,
        aspecs: string,
    ) {
        return await ApgSpc_Service.SendEventsToResultsBrowser(auri, aframework, aspecs);
    }



    async mockInit() {
        const r = new Uts.ApgUts_Result<ApgSpc_IEvent>();
        r.setPayload(await ApgSpc_Service.MockInit(), ApgSpc_IEvent_Signature)
        return r
    }



    async mockEnd() {
        const r = new Uts.ApgUts_Result<ApgSpc_IEvent>();
        r.setPayload(await ApgSpc_Service.MockEnd(), ApgSpc_IEvent_Signature)
        return r
    }



}


