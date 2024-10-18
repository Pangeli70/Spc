/** -----------------------------------------------------------------------
 * @module [ApgSpc]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.1 APG 20240921 Integration in Deno 2
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