/** -----------------------------------------------------------------------
 * @module [ApgSpc]
 * @author [APG] ANGELI Paolo Giusto
 * @version 1.0.0 [APG 2024/09/21] Moving to Deno 2
 * -----------------------------------------------------------------------
*/

/**
 * Flag to run or skip a spec log
 */
export enum ApgSpc_eLogMode {
    /** No logs */
    silent = 0,
    /** Some logs */
    quiet = 1,
    /** All logs */
    verbose = 2
}