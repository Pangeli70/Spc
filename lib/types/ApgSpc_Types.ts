/** -----------------------------------------------------------------------
 * @module [ApgSpc]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.7 [APG 2023/05/06] Separation of concerns lib/src
 * @version 0.1 APG 20240921 Integration in Deno 2
 * ------------------------------------------------------------------------
*/
import {
    ApgSpc_eRun
} from "../enums/ApgSpc_eRun.ts";


export type ApgSpc_Recordset_TFlags = Record<string, ApgSpc_eRun>;
