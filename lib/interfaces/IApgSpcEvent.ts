/** -----------------------------------------------------------------------
 * @module [apg-spc]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.2 [APG 2022/10/02] Github Beta
 * @version 0.9.7 [APG 2023/05/06] Separation of concerns lib/src
 * -----------------------------------------------------------------------
*/
import { eApgSpcClause } from "../enums/eApgSpcClause.ts"

/**
 * Data structure to store spec event infos
 */
export interface IApgSpcEvent {
    clause: eApgSpcClause,
    message: string,
    hrt: number,
    payload?: unknown
}