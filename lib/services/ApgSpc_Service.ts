/** -----------------------------------------------------------------------
 * @module [ApgSpc]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.8.0 [APG 2022/06/26] Removing Rhum
 * @version 0.9.2 [APG 2022/10/02] Github Beta
 * @version 0.9.7 [APG 2023/05/06] Separation of concerns lib/src
 * @version 0.1 APG 20240921 Integration in Deno 2
 * -----------------------------------------------------------------------
 */
import {
    Uts
} from "../deps.ts";
import {
    ApgSpc_eClause
} from "../enums/ApgSpc_eClause.ts";
import {
    ApgSpc_eLogMode
} from "../enums/ApgSpc_eLogMode.ts";
import {
    ApgSpc_eRun
} from "../enums/ApgSpc_eRun.ts";
import {
    ApgSpc_IEvent
} from "../interfaces/ApgSpc_IEvent.ts";
import {
    ApgSpc_Recordset_TFlags,
    ApgSpc_TSpecResult
} from "../types/ApgSpc_Types.ts";



/**
 * Service to manage Specs
 */
export class ApgSpc_Service extends Uts.ApgUts_Service {

    static readonly CONSOLE_WIDTH = 80;
    static readonly SPACER = "-".repeat(this.CONSOLE_WIDTH - 1);

    private static _totalSuccessfull = 0;
    private static _totalFailed = 0;
    private static _totalSkipped = 0;
    private static _lastResumeIndex = 0;

    private static _current: string = "";
    private static _specEvents: ApgSpc_IEvent[] = [];
    private static _specsFlags: ApgSpc_Recordset_TFlags = {}
    private static _logMode: ApgSpc_eLogMode = ApgSpc_eLogMode.verbose;


    static get LogMode() {
        return this._logMode;
    }
    static set LogMode(amode: ApgSpc_eLogMode) {
        this._logMode = amode;
    }
    static get SpecEvents() {
        return this._specEvents;
    }



    static #log(amessage: string, aminLevel: ApgSpc_eLogMode) {
        if (this._logMode >= aminLevel) {
            console.log(amessage);
        }
    }



    /**
     * Initializes the spec
     */
    static Init(
        afunction: Function,
        aflags: ApgSpc_Recordset_TFlags,
    ) {

        this._current = afunction.name;
        this._specsFlags = aflags;

        const event: ApgSpc_IEvent = {
            clause: ApgSpc_eClause.init,
            message: this._current,
            hrt: performance.now()
        }
        this._specEvents.push(event);
        const message = ("\n+-" + this._current + "\n|");
        console.log(message);
    }



    static DoSkip() {
        const run = (this._specsFlags[this._current]);
        let msg = ""
        if (run === undefined) {
            msg = `Trying to initialize the spec [${this._current}] but it is not registered in the flags object`;
            this.Skip(msg);
            return true;
        }
        if (run == ApgSpc_eRun.no) {
            this.Skip(msg);
            return true;
        }
        return false;
    }



    /**
     * Declares the beginning of a set of specs for the current object 
     */
    static Title(atitle: string) {

        const timeStamp = new Date().toLocaleString();

        const spacer = ApgSpc_Service.SPACER;

        const event: ApgSpc_IEvent = {
            clause: ApgSpc_eClause.title,
            message: atitle,
            hrt: performance.now()
        }
        this._specEvents.push(event);
        const message = (Uts.Std.Colors.yellow(
            `\n` +
            `+${spacer}\n` +
            `| ${atitle} (${timeStamp})\n` +
            `+${spacer}`));
        console.log(message)
    }



    /**
     * Spec definition: use this method to declare the current conditions
     */
    static When(aconditions: string) {
        const message = "When " + aconditions + "...";
        this.#log("|   " + message, ApgSpc_eLogMode.verbose);
        const event: ApgSpc_IEvent = {
            clause: ApgSpc_eClause.when,
            message: message,
            hrt: performance.now()
        }
        this._specEvents.push(event);
        return this;
    }



    /**
     * Spec expectation: use this method to declare the expected result
     */
    static WeExpect(aexpect: string) {
        const message = "We expect " + aexpect;
        this.#log("|     " + message, ApgSpc_eLogMode.verbose);
        const event: ApgSpc_IEvent = {
            clause: ApgSpc_eClause.expect,
            message: message,
            hrt: performance.now()
        }
        this._specEvents.push(event);
        return this;
    }



    /**
     * Trace specs skipping by flags or by error
     * @param arun Flag that indicates that the spec will be skipped or not
     * @param amessage Eventual message to justify why it was skipped
     */
    static Skip(
        amessage = ""
    ) {

        let message = amessage;
        const res = Uts.Std.Colors.gray("       SKIPPED");
        if (amessage == "") {
            message = "This test was..."
        }

        this.#log("|     " + message + "\n|" + res, ApgSpc_eLogMode.silent);

        const event: ApgSpc_IEvent = {
            clause: ApgSpc_eClause.skip,
            message: amessage,
            hrt: performance.now()
        }
        this._specEvents.push(event);
        return this;
    }



    /**
     * Spec result: use this method to record the test results
     * @param aresult The value obtained testing the spec
     * @param asuccess The flag that indicats if the test was successful
     */
    static WeGot(aresult: string, asuccess: boolean) {

        let prevHrt = 0;
        for (let i = this._specEvents.length - 1; i >= 0; i--) {
            if (this._specEvents[i].clause == ApgSpc_eClause.init) {
                prevHrt = this._specEvents[i].hrt;
                break;
            }
        }

        const newHrt = performance.now();
        const deltaTime = (newHrt - prevHrt).toFixed(3)
        const message = "We got " + aresult + " in " + deltaTime + "ms";
        let res = "";
        if (asuccess === true) {

            res = Uts.Std.Colors.green("         SUCCESS");

            const event: ApgSpc_IEvent = {
                clause: ApgSpc_eClause.success,
                message: message,
                hrt: newHrt
            }
            this._specEvents.push(event);

        }
        else {

            res = Uts.Std.Colors.red("         FAILURE");

            const event: ApgSpc_IEvent = {
                clause: ApgSpc_eClause.failure,
                message: message,
                hrt: newHrt
            }
            this._specEvents.push(event);

        }
        this.#log("|       " + message + "\n|" + res, ApgSpc_eLogMode.verbose);
        this.#log("|", ApgSpc_eLogMode.verbose);

        return this;
    }



    /**
     * Resume of the current results. 
     * It is used to close a group of related specs started with the call to the Init() method.
     * It reports in a row the number of specs succesful, failed and skipped.
     * The partial counters are reset.
     */
    static Resume() {

        let successfull = 0;
        let failed = 0;
        let skipped = 0;

        for (let i = ApgSpc_Service._lastResumeIndex; i < this._specEvents.length; i++) {
            const event = this._specEvents[i];
            if (event.clause == ApgSpc_eClause.skip) skipped++;
            if (event.clause == ApgSpc_eClause.success) successfull++;
            if (event.clause == ApgSpc_eClause.failure) failed++;
        }

        this._totalSkipped += skipped;
        this._totalSuccessfull += successfull;
        this._totalFailed += failed;

        const eventMessage = `Successful: ${successfull}, Failed: ${failed}, Skipped: ${skipped}`;
        const successfullStamp = Uts.Std.Colors.green(`${successfull}`);
        const failedStamp = Uts.Std.Colors.red(`${failed}`);
        const skippedStamp = Uts.Std.Colors.gray(`${skipped}`);
        const message = `Successful: ${successfullStamp}, Failed: ${failedStamp}, Skipped: ${skippedStamp}`;

        const spacer = this.SPACER;
        const resume = Uts.Std.Colors.gray(
            `+${spacer}\n` +
            `| ${message} \n` +
            `+${spacer}\n`);
        this.#log(resume, ApgSpc_eLogMode.silent);

        const event: ApgSpc_IEvent = {
            clause: ApgSpc_eClause.resume,
            message: eventMessage,
            hrt: performance.now()
        }
        this._specEvents.push(event);
        this._lastResumeIndex = this._specEvents.length;
    }



    /**
     * Resumes the results of all the specs till the call to the specTitle() method.
     * It reports in a row the number of specs succesful, failed and skipped.
     * It should be called after the last specResume() call
     * The total counters are reset.
     */
    static FinalReport(aresults: ApgSpc_TSpecResult[]) {

        let totalSuccessfull = 0;
        let totalFailed = 0;
        let totalSkipped = 0;

        for (const result of aresults) {
            totalSuccessfull += result.successfull;
            totalFailed += result.failed;
            totalSkipped += result.skipped;
        }

        const timeStamp = new Date().toLocaleString();

        const successfull = Uts.Std.Colors.green(`${totalSuccessfull}`);
        const failed = Uts.Std.Colors.red(`${totalFailed}`);
        const skipped = Uts.Std.Colors.gray(`${totalSkipped}`);
        const message = `Successful: ${successfull}, Failed: ${failed}, Skipped: ${skipped}`;

        const spacer = this.SPACER;
        const resume = Uts.Std.Colors.magenta(
            `+${spacer}\n` +
            `| Final resume (${timeStamp})\n` +
            `+${spacer}\n` +
            `| ${message}\n` +
            `+${spacer}\n`);
        console.log(resume);

    }



    static MockInit() {
        const event: ApgSpc_IEvent = {
            clause: ApgSpc_eClause.mockInit,
            message: "",
            hrt: performance.now()
        }
        const timeStamp = new Date().toLocaleString();
        this._specEvents.push(event);

        const spacer = ApgSpc_Service.SPACER;
        const resume = Uts.Std.Colors.cyan(
            `+${spacer}\n` +
            `| Mock init (${timeStamp})\n` +
            `+${spacer}\n`);
        this.#log(resume, ApgSpc_eLogMode.silent);

        return Promise.resolve(event);
    }



    static MockEnd(amessage = "") {

        const timeStamp = new Date().toLocaleString();

        const event: ApgSpc_IEvent = {
            clause: ApgSpc_eClause.mockEnd,
            message: amessage,
            hrt: performance.now()
        }
        this._specEvents.push(event);

        const spacer = ApgSpc_Service.SPACER;
        const resume = Uts.Std.Colors.cyan(
            `+${spacer}\n` +
            `| Mock End (${timeStamp})\n` +
            `+${spacer}\n`);
        this.#log(resume, ApgSpc_eLogMode.silent);

        return Promise.resolve(event);
    }



    static async SendEventsToResultsBrowser(
        auri: string,
        aframework: string,
        aspecName: string,
    ) {

        const headers = {
            'Content-Type': 'application/json'
        };

        const body = JSON.stringify({
            framework: aframework,
            specs: aspecName,
            events: this._specEvents
        });

        const postParams: RequestInit = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers,
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body,
        }

        let r: unknown;
        try {
            const response = await fetch(auri, postParams);
            if (response.json) {
                r = await response.json();
            }
            else {
                r = response;
            }

        }
        catch (e) {

            const basicMessage = Uts.Std.Colors.red("Error from the Deno Deploy Test service on " + auri);
            this.#log(basicMessage, ApgSpc_eLogMode.quiet);
            const verboseMessage = Uts.Std.Colors.red(JSON.stringify(e));
            this.#log(verboseMessage, ApgSpc_eLogMode.verbose);

            return false;
        }

        const spacer = ApgSpc_Service.SPACER;
        const resume = Uts.Std.Colors.brightGreen(
            `+${spacer}\n` +
            `| Posting on remote storage (${auri}) result\n` +
            `+${spacer}\n` +
            `| ${JSON.stringify(r)}\n` +
            `+${spacer}\n`);
        this.#log(resume, ApgSpc_eLogMode.silent);


        return true;

    }



    static Reset() {

        this._totalSuccessfull = 0;
        this._totalSkipped = 0;
        this._totalFailed = 0;
        this._current = "";
        this._lastResumeIndex = 0;
        this._specEvents = [];
        this._specsFlags = {};
    }



    static Result() {

        const r: ApgSpc_TSpecResult = {
            execution: new Date(),
            total: this._totalSuccessfull + this._totalSkipped + this._totalFailed,
            successfull: this._totalSuccessfull,
            skipped: this._totalSkipped,
            failed: this._totalFailed,
            events: [...this._specEvents]
        }
        return r;
    }



}


