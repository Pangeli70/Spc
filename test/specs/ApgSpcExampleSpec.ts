/** -----------------------------------------------------------------------
 * @module [apg-spc]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.2 [APG 2022/10/08] Github Beta
 * @version 0.9.7 [APG 2023/05/13] Separation of concerns lib/src
 * ------------------------------------------------------------------------
 */

import { Spc, Uts } from "../deps.ts";

export class ApgSpcExampleSpec extends Spc.ApgSpcSpec {

    constructor() {
        super(import.meta.url)

        this.flags = {
            [this.S01_Indirect.name]: Spc.eApgSpcRun.yes
        }
    }

    S01_Indirect() {

        const spec = this.specifier;

        const run = spec.Init(this.S01_Indirect.name, this.flags);
        if (!run) return;

        const mockObj: any = {
            prop1: "prop1",
            node1: {
                prop2: "prop2",
                node2: {
                    prop3: "prop3",
                    node3: {
                        prop4: "prop4",
                        prop5: 5,
                        prop6: [1, 2, 3, 4, 5],
                        prop7: [
                            {
                                prop8: "81"
                            },
                            {
                                prop8: "82"
                            }
                        ]
                    }
                }
            }
        }

        spec.When("trying to access the [unkn] property");
        let value = Uts.ApgUtsObj.Indirect(mockObj, "unkn");
        let r = (value === mockObj.unkn);
        spec.WeExpect(`to get the value [${mockObj.unkn}]`)
        spec.WeGot(`${value}`, r);

        spec.When("trying to access the [prop1] property");
        value = Uts.ApgUtsObj.Indirect(mockObj, "prop1");
        r = (value === mockObj.prop1);
        spec.WeExpect(`to get the value [${mockObj.prop1}]`)
        spec.WeGot(`[${value}]`, r);

        spec.When("trying to access the [node1.prop2] property");
        value = Uts.ApgUtsObj.Indirect(mockObj, "node1.prop2");
        r = (value === mockObj.node1.prop2);
        spec.WeExpect(`to get the value [${mockObj.node1.prop2}]`)
        spec.WeGot(`[${value}]`, r);

        spec.When("trying to access the [node1.node2.node3.prop6] property");
        value = Uts.ApgUtsObj.Indirect(mockObj, "node1.node2.node3.prop6").toString();
        r = (value === mockObj.node1.node2.node3.prop6.toString());
        spec.WeExpect(`to get the value [${mockObj.node1.node2.node3.prop6.toString()}]`)
        spec.WeGot(`[${value}]`, r);

        spec.When("trying to access the [node1.node2.node3.prop6[2] property");
        value = Uts.ApgUtsObj.Indirect(mockObj, "node1.node2.node3.prop6[2]");
        r = (value === mockObj.node1.node2.node3.prop6[2]);
        spec.WeExpect(`to get the value [${mockObj.node1.node2.node3.prop6[2]}]`)
        spec.WeGot(`[${value}]`, r);

        spec.Resume();
    }

    override executeSync() { 
        this.S01_Indirect();
    }

    override mockInitSync() {
        const r = super.mockInitSync();
        console.log("MockInitSync overridden")
        return r;
    }

    override mockEndSync() {
        const r = super.mockEndSync();
        console.log("MockEndSync overridden")
        return r;
    }
}