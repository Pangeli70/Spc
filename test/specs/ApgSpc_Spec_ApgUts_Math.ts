/** -----------------------------------------------------------------------
 * @module [ApgSpc-ApgUts_Math]
 * @author [APG] ANGELI Paolo Giusto
 * @version 1.0.0 [APG 2024/09/21] Moving to Deno 2
 * ------------------------------------------------------------------------
 */

import { Spc, Uts } from "../deps.ts";



export class ApgSpc_Spec_ApgUts_Math extends Spc.ApgSpc_Base {

    protected override initClassName(): string {
        return ApgSpc_Spec_ApgUts_Math.name
    }


    constructor() {
        super();

        this.runFlags = {
            [this.S01_GetRandomInRange.name]: Spc.ApgSpc_eRun.yes,
            [this.S02_RoundCeilAndFloorAdjusted.name]: Spc.ApgSpc_eRun.yes,
        }
    }



    S01_GetRandomInRange() {

        const spec = Spc.ApgSpc_Service;
        spec.Init(this.S01_GetRandomInRange, this.runFlags);
        if (spec.DoSkip()) return;
        
        const lib = Uts.ApgUts_Math;

        let min = 1;
        let max = 2;
        let figures = -1;
        let val = lib.GetRandomInRange(min, max);
        let exp = true;
        let res = (val >= min && val <= max);
        spec
            .When(`trying to get a number between [${min}] and [${max}]`)
            .WeExpect(`to get [${exp}]`)
            .WeGot(`[${val}]`, res);


        min = 10;
        max = 20
        figures = 8;
        val = lib.GetRandomInRange(min, max, figures);
        exp = true;
        res = (val >= min && val <= max);
        spec
            .When(`trying to get a number between [${min}] and [${max}] with ${figures} figures`)
            .WeExpect(`to get [${exp}]`)
            .WeGot(`[${val}]`, res);


        min = 10000;
        max = 20000;
        figures = 3;
        val = lib.GetRandomInRange(min, max, figures);
        exp = true;
        res = (val >= min && val <= max);
        spec
            .When(`trying to get a number between [${min}] and [${max}] with ${figures} figures`)
            .WeExpect(`to get [${exp}]`)
            .WeGot(`[${val}]`, res);


        spec.Resume();
    }



    S02_RoundCeilAndFloorAdjusted() {

        const spec = Spc.ApgSpc_Service;
        spec.Init(this.S02_RoundCeilAndFloorAdjusted, this.runFlags);
        if (spec.DoSkip()) return;
        
        const lib = Uts.ApgUts_Math;

        const value = 111.00549234;

        let figures = 0;
        let val = lib.Round(value, 0);
        let exp = 111;
        spec
            .When(`trying to round the number [${value}] with [${figures}] figures`)
            .WeExpect(`to get [${exp}]`)
            .WeGot(`[${val}]`, (val == exp));
        
        
        figures = -3;
        val = lib.Round(value, figures);
        exp = 111.005;
        spec
            .When(`trying to round the number [${value}] with [${figures}] figures`)
            .WeExpect(`to get [${exp}]`)
            .WeGot(`[${val}]`, (val == exp));


        figures = 1;
        val = lib.Round(value, figures);
        exp = 110;
        spec
            .When(`trying to round the number [${value}] with [${figures}] figures`)
            .WeExpect(`to get [${exp}]`)
            .WeGot(`[${val}]`, (val == exp));
        
        
        figures = -3;
        val = lib.Ceil(value, figures);
        exp = 111.006;
        spec
            .When(`trying to ceil the number [${value}] with [${figures}] figures`)
            .WeExpect(`to get [${exp}]`)
            .WeGot(`[${val}]`, (val == exp));
        
        
        figures = -4;
        val = lib.Floor(value, figures);
        exp = 111.0054;
        spec
            .When(`trying to floor the number [${value}] with [${figures}] figures`)
            .WeExpect(`to get [${exp}]`)
            .WeGot(`[${val}]`, (val == exp));

        spec.Resume();
    }



    override async execute() {
        this.S01_GetRandomInRange();
        this.S02_RoundCeilAndFloorAdjusted();
        await Promise.resolve()
    }

}