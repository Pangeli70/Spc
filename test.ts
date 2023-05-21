/** -----------------------------------------------------------------------
 * @module [apg-uts]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.2 [APG 2022/10/08] Github Beta
 * @version 0.9.7 [APG 2023/05/13] Separation of concerns lib/src
 * ------------------------------------------------------------------------
 */
import {  Spc } from "./test/deps.ts";
import { ApgSpcExampleSpec } from "./test/specs/ApgSpcExampleSpec.ts";


async function ApgUtsTests(arun: Spc.eApgSpcRun) {

    if (arun != Spc.eApgSpcRun.yes) return;

    const URI = "https://apg-tst.deno.dev/store";
    
    const objSpec = new ApgSpcExampleSpec();
    objSpec.RunSync(Spc.eApgSpcRun.yes);
    const _r1 = await objSpec.SendEventsToTestService(URI, "Uts", objSpec.CLASS_NAME);

    
    Spc.ApgSpcSpecifier.FinalReport();
}

await ApgUtsTests(Spc.eApgSpcRun.yes);