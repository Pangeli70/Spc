/** -----------------------------------------------------------------------
 * @module [ApgSpc]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.2 [APG 2022/10/02] Github Beta
 * @version 0.9.7 [APG 2023/05/06] Separation of concerns lib/src
 * @version 0.1 APG 20240921 Integration in Deno 2
 * -----------------------------------------------------------------------
*/
import {
    ApgSpc_eClause
} from "../enums/ApgSpc_eClause.ts"


export const ApgSpc_IEvent_Signature =  "ApgSpc_IEvent_Signature";

/**
 * Data structure to store spec event infos
 */
export interface ApgSpc_IEvent {
    
    clause: ApgSpc_eClause,

    message: string,

    hrt: number,

}