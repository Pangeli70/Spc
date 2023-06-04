/** -----------------------------------------------------------------------
 * @module [apg-uts]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.2 [APG 2022/10/08] Github Beta
 * @version 0.9.7 [APG 2023/05/13] Separation of concerns lib/src
 * ------------------------------------------------------------------------
 */
import { Spc } from "./test/deps.ts";
import { ApgSpcExampleSpec } from "./test/specs/ApgSpcExampleSpec.ts";

/** 
 * Use this test suite as an example to understand how to use the Spc framework
 * @param arun Include or exclude the entire test suite
 */
async function ApgSpcExampleTestSuite(arun: Spc.eApgSpcRun) {

    if (arun != Spc.eApgSpcRun.yes) return;
    // Define the remote test result browser service address 
    const URI = "https://apg-tst.deno.dev/store";
    // Create the spec object
    const testSpec = new ApgSpcExampleSpec();

    // We still have the possibility to decide if run this specific spec inside this suite or not
    if (testSpec.RunSync(Spc.eApgSpcRun.yes)) {
        // try to send the result to the remote service
        const _r1 = await testSpec.SendEventsToTestService(URI, "Spc", testSpec.CLASS_NAME);
    }

    // Print a final report on the console
    Spc.ApgSpcSpecifier.FinalReport();
}


// Run the test suite
await ApgSpcExampleTestSuite(Spc.eApgSpcRun.yes);