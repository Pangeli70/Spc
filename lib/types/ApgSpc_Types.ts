/** -----------------------------------------------------------------------
 * @module [ApgSpc]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.7 [APG 2023/05/06] Separation of concerns lib/src
 * @version 1.0.0 APG 20240921 Integration in Deno 2
 * @version 1.0.1 APG 20241124 Porting types from Edr_Tst
 * ------------------------------------------------------------------------
*/
import {
    ApgSpc_Base
} from "../classes/ApgSpc_Base.ts";
import {
    ApgSpc_eRun
} from "../enums/ApgSpc_eRun.ts";
import {
    ApgSpc_IEvent
} from "../interfaces/ApgSpc_IEvent.ts";


export type ApgSpc_Recordset_TFlags = Record<string, ApgSpc_eRun>;





export type ApgSpc_TSpecResult = {
    execution: Date,
    total: number,
    successfull: number,
    skipped: number,
    failed: number,
    events: ApgSpc_IEvent[]
}


export type ApgSpc_TSuite = {
    name: string,
    spec: ApgSpc_Base,
    results: ApgSpc_TSpecResult[]
};