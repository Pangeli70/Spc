/** -----------------------------------------------------------------------
 * @module [ApgSpc-ApgUts_Object]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.2 [APG 2022/10/08] Github Beta
 * @version 0.9.7 [APG 2023/05/13] Separation of concerns lib/src
 * @version 1.0.0 [APG 2024/09/21] Moving to Deno 2
 * ------------------------------------------------------------------------
 */

import { Spc, Uts } from "../deps.ts";
import {ApgUts_Object_DeepCompare_Data} from "./data/ApgUts_Object_DeepCompare_Data.ts";
import {ApgUts_Object_Indirect_Data} from "./data/ApgUts_Object_Indirect_Data.ts";


export class ApgSpc_Spec_ApgUts_Object extends Spc.ApgSpc_Base {

    protected override initClassName(): string {
        return ApgSpc_Spec_ApgUts_Object.name
    }


    constructor() {
        super();

        this.runFlags = {
            [this.S01_IndirectAccessToProps.name]: Spc.ApgSpc_eRun.yes,
            [this.S02_DeepCompare.name]: Spc.ApgSpc_eRun.yes
        }
    }



    S01_IndirectAccessToProps() {

        const spec = Spc.ApgSpc_Service;
        spec.Init(this.S01_IndirectAccessToProps, this.runFlags);
        if (spec.DoSkip()) return;
        
        const obj = Uts.ApgUts_Object;

        const testObj = ApgUts_Object_Indirect_Data;

        let path = `unkn`;
        let val = obj.Indirect(testObj, path);
        let exp = testObj.unkn;
        let res = (val === exp);
        spec
            .When(`trying to access the [${path}] property`)
            .WeExpect(`to get the value [${exp}]`)
            .WeGot(`[${val}]`, res);


        path = `prop1`;
        val = obj.Indirect(testObj, path);
        exp = testObj.prop1;
        res = (val === exp);
        spec
            .When(`trying to access the ${path} property`)
            .WeExpect(`to get the value [${exp}]`)
            .WeGot(`[${val}]`, res);


        path = `node1.prop2`;
        val = obj.Indirect(testObj, path);
        exp = testObj.node1.prop2;
        res = (val === exp);
        spec
            .When(`trying to access the ${path} property`)
            .WeExpect(`to get the value [${exp}]`)
            .WeGot(`[${val}]`, res);


        path = `node1.node2.node3.prop6`;
        val = obj.Indirect(testObj, path).toString();
        exp = testObj.node1.node2.node3.prop6.toString();
        res = (val === testObj.node1.node2.node3.prop6.toString());
        spec
            .When(`trying to access the ${path} property`)
            .WeExpect(`to get the value [${exp}]`)
            .WeGot(`[${val}]`, res);


        path = `node1.node2.node3.prop6[2]`;
        val = obj.Indirect(testObj, path);
        exp = testObj.node1.node2.node3.prop6[2];
        res = (val === exp);
        spec
            .When(`trying to access the ${path} property`)
            .WeExpect(`to get the value [${exp}]`)
            .WeGot(`[${val}]`, res);


        const path2 = [`node1`, `node2`, `node3`, `prop6[2]`];
        val = obj.Indirect(testObj, path2);
        exp = testObj.node1.node2.node3.prop6[2];
        res = (val === exp);
        spec
            .When(`trying to access the ${JSON.stringify(path2)} property`)
            .WeExpect(`to get the value [${exp}]`)
            .WeGot(`[${val}]`, res);

        spec.Resume();
    }



    S02_DeepCompare() {

        const spec = Spc.ApgSpc_Service;
        spec.Init(this.S02_DeepCompare, this.runFlags);
        if (spec.DoSkip()) return;

        const obj = Uts.ApgUts_Object;
        
        const dataSetName = 'ApgUts_Object_DeepCompare_Data';

        const testObj = ApgUts_Object_DeepCompare_Data;

        let v = obj.DeepCompare(testObj[0], testObj[1]);
        let e = true;
        let r = (v === e);
        spec
            .When(`trying to deep compare the objects [0] and [1] of ` + dataSetName)
            .WeExpect(`to get the value [${e}]`)
            .WeGot(`[${v}]`, r);


        v = obj.DeepCompare(testObj[0], testObj[2]);
        e = true;
        r = (v === e);
        spec
            .When(`trying to deep compare the objects [0] and [2] of ` + dataSetName)
            .WeExpect(`to get the value [${e}]`)
            .WeGot(`[${v}]`, r);


        v = obj.DeepCompare(testObj[0], testObj[3]);
        e = false;
        r = (v === e);
        spec
            .When(`trying to deep compare the objects [0] and [3] of ` + dataSetName)
            .WeExpect(`to get the value [${e}]`)
            .WeGot(`[${v}]`, r);


        v = obj.DeepCompare(testObj[0], testObj[4]);
        e = false;
        r = (v === e);
        spec
            .When(`trying to deep compare the objects [0] and [4] of ` + dataSetName)
            .WeExpect(`to get the value [${e}]`)
            .WeGot(`[${v}]`, r);


        v = obj.DeepCompare(testObj[0], testObj[5]);
        e = false;
        r = (v === e);
        spec
            .When(`trying to deep compare the objects [0] and [5] of ` + dataSetName)
            .WeExpect(`to get the value [${e}]`)
            .WeGot(`[${v}]`, r);


        spec.Resume();
    }


    override async execute() {
        this.S01_IndirectAccessToProps();
        this.S02_DeepCompare();
        await Promise.resolve();
    }



}