/** -----------------------------------------------------------------------
 * @module [apg-spc]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.2 [APG 2022/10/02] Github Beta
 * @version 0.9.7 [APG 2023/05/06] Separation of concerns lib/src
 * -----------------------------------------------------------------------
*/

/**
 * List of clauses for ApgSpcService events
 */
export enum eApgSpcClause {
    title = "title",
    init = "init",
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