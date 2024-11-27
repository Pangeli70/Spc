/** -----------------------------------------------------------------------
 * @module [apg-uts]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.2 [APG 2022/10/08] Github Beta
 * @version 0.9.7 [APG 2023/05/13] Separation of concerns lib/src
 * @version 0.1 APG 20240921 Integration in Deno 2
 * ------------------------------------------------------------------------
 */
import {
    Spc
} from "./test/deps.ts";
import {
    ApgSpc_Spec_ApgUts_Math
} from "./test/specs/ApgSpc_Spec_ApgUts_Math.ts";
import {
    ApgSpc_Spec_ApgUts_Object
} from "./test/specs/ApgSpc_Spec_ApgUts_Object.ts";


// Remote test result browser service address 
const RESULTS_BROWSER_URI = "https://apg-tst.deno.dev/store";

// Current framework or library under test
const FRAMEWORK = "ApgSpc";


/** 
 * Use this test suite as an example to understand how to use the Spc framework
 * @param arun Include or exclude the entire test suite
 */
async function ApgSpc_Suite(arun: Spc.ApgSpc_eRun) {

    const results: Spc.ApgSpc_TSpecResult[] = [];

    if (arun != Spc.ApgSpc_eRun.yes) return;

    const ApgUts_Object_Spec = new ApgSpc_Spec_ApgUts_Object();

    const r1 = await ApgUts_Object_Spec.Run(Spc.ApgSpc_eRun.yes)

    if (r1) {
        results.push(Spc.ApgSpc_Service.Result());
        const r = await Spc.ApgSpc_Service.SendEventsToResultsBrowser(
            RESULTS_BROWSER_URI,
            FRAMEWORK,
            ApgUts_Object_Spec.NAME
        );
        Spc.ApgSpc_Service.Reset();
    }


    const ApgUts_Math_Spec = new ApgSpc_Spec_ApgUts_Math();

    const r2 = await ApgUts_Math_Spec.Run(Spc.ApgSpc_eRun.yes)

    if (r2) {
        results.push(Spc.ApgSpc_Service.Result());
        const r = await Spc.ApgSpc_Service.SendEventsToResultsBrowser(
            RESULTS_BROWSER_URI,
            FRAMEWORK,
            ApgUts_Math_Spec.NAME
        );
        Spc.ApgSpc_Service.Reset();
    }

    
    Spc.ApgSpc_Service.FinalReport(results);

}


// Run the test suite
await ApgSpc_Suite(Spc.ApgSpc_eRun.yes);