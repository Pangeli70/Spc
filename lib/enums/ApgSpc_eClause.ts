/** -----------------------------------------------------------------------
 * @module [ApgSpc]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.2 [APG 2022/10/02] Github Beta
 * @version 0.9.7 [APG 2023/05/06] Separation of concerns lib/src
 * @version 0.1 APG 20240921 Integration in Deno 2
 * -----------------------------------------------------------------------
*/

/**
 * List of clauses for ApgSpc events
 */
export enum ApgSpc_eClause {
    title = "title",
    init = "init",
    start = "start",
    when = "when",
    expect = "expect",
    skip = "skip",
    success = "success",
    failure = "failure",
    resume = "resume",
    final = "final",
    mockInit = "mockInit",
    mockEnd = "mockEnd"
}