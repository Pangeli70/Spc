/** -----------------------------------------------------------------------
 * @module [ApgSpc]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.2 [APG 2022/10/02] Github Beta
 * @version 0.9.7 [APG 2023/05/06] Separation of concerns lib/src
 * @version 1.0.0 [APG 2024/09/21] Moving to Deno 2
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