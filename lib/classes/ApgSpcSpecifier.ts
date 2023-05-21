/** -----------------------------------------------------------------------
 * @module [apg-spc]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.8.0 [APG 2022/06/26] Removing Rhum
 * @version 0.9.2 [APG 2022/10/02] Github Beta
 * @version 0.9.7 [APG 2023/05/06] Separation of concerns lib/src
 * -----------------------------------------------------------------------
 */
import { Uts, Std } from "../deps.ts"
import { IApgSpcEvent } from "../interfaces/IApgSpcEvent.ts"
import { eApgSpcClause } from "../enums/eApgSpcClause.ts"
import { eApgSpcRun } from "../enums/eApgSpcRun.ts";
import { TApgSpcFlags } from "../types/TApgSpcFlags.ts";

/**
 * Abstract service with testing capabilities
 */
export class ApgSpcSpecifier {

  static readonly CONSOLE_WIDTH = 80;
  static readonly SPACER = "-".repeat(this.CONSOLE_WIDTH - 1);

  private static _totalSuccessfull = 0;
  private static _totalFailed = 0;
  private static _totalSkipped = 0;
  private static _lastResumeIndex = 0;


  private _events: IApgSpcEvent[] = [];
  private _specs: TApgSpcFlags = {}
  private _logMode: Uts.eApgUtsLogMode = Uts.eApgUtsLogMode.verbose;


  get Mode() {
    return this._logMode;
  }
  set Mode(amode: Uts.eApgUtsLogMode) {
    this._logMode = amode;
  }

  #log(amessage: string) {
    if (this._logMode == Uts.eApgUtsLogMode.verbose) {
      console.log(amessage);
    }
  }

  get Events() {
    return this._events;
  }


  /**
   * Initializes the spec
   */
  Init(
    afunction: string,
    aflags: TApgSpcFlags,
    alogMode = Uts.eApgUtsLogMode.verbose
  ) {

    const fname = afunction;
    this._specs = aflags;
    this._logMode = alogMode;

    const event: IApgSpcEvent = {
      clause: eApgSpcClause.init,
      message: fname,
      hrt: performance.now()
    }
    this._events.push(event);
    const message = ("|\n+-" + fname + "\n|");
    console.log(message);

    const run = (this._specs[fname]);
    let msg = ""
    if (run === undefined) {
      msg = `Trying to initialize the spec [${fname}] but it is not registered in the flags object`;
      this.Skip(msg);
      return false;
    }
    if (run == eApgSpcRun.no) {
      this.Skip(msg);
      return false;
    }
    return true;
  }



  /**
   * Declares the beginning of a set of specs for the current object 
   */
  Title(atitle: string) {
    const spacer = ApgSpcSpecifier.SPACER;

    const event: IApgSpcEvent = {
      clause: eApgSpcClause.title,
      message: atitle,
      hrt: performance.now()
    }
    this._events.push(event);
    const message = (Std.Colors.yellow(`\n+${spacer}\n| ${atitle}\n+${spacer}`));
    console.log(message)
  }



  /**
   * Spec definition: use this method to declare the current conditions
   */
  When(aconditions: string) {
    const message = "When " + aconditions + "...";
    this.#log("|   " + message);
    const event: IApgSpcEvent = {
      clause: eApgSpcClause.when,
      message: message,
      hrt: performance.now()
    }
    this._events.push(event);
  }


  /**
   * Spec expectation: use this method to declare the expected result
   */
  WeExpect(aexpect: string) {
    const message = "We expect " + aexpect;
    this.#log("|   " + message);
    const event: IApgSpcEvent = {
      clause: eApgSpcClause.expect,
      message: message,
      hrt: performance.now()
    }
    this._events.push(event);
  }


  /**
   * Trace specs skipping by flags or by error
   * @param arun Flag that indicates that the spec will be skipped or not
   * @param amessage Eventual message to justify why it was skipped
   */
  Skip(
    amessage = ""
  ) {

    let message = amessage;
    const res = Std.Colors.gray("       SKIPPED");
    if (amessage == "") {
      message = "This test was..."
    }

    this.#log("|     " + message + "\n|" + res);

    const event: IApgSpcEvent = {
      clause: eApgSpcClause.skip,
      message: amessage,
      hrt: performance.now()
    }
    this._events.push(event);

  }


  /**
   * Spec result: use this method to record the test results
   * @param aresult The value obtained testing the spec
   * @param asuccess The flag that indicats if the test was successful
   */
  WeGot(aresult: string, asuccess: boolean) {
    const message = "We got " + aresult
    let res = "";
    if (asuccess === true) {

      res = Std.Colors.green("       SUCCESS");

      const event: IApgSpcEvent = {
        clause: eApgSpcClause.success,
        message: message,
        hrt: performance.now()
      }
      this._events.push(event);

    }
    else {

      res = Std.Colors.red("       FAILURE");

      const event: IApgSpcEvent = {
        clause: eApgSpcClause.failure,
        message: message,
        hrt: performance.now()
      }
      this._events.push(event);

    }
    this.#log("|     " + message + "\n|" + res);
  }

  /**
   * Resume of the current results. 
   * It is used to close a group of related specs started with the call to the Init() method.
   * It reports in a row the number of specs succesful, failed and skipped.
   * The partial counters are reset.
   */
  Resume() {

    let successfull = 0;
    let failed = 0;
    let skipped = 0;

    for (let i = ApgSpcSpecifier._lastResumeIndex; i < this._events.length; i++) {
      const event = this._events[i];
      if (event.clause == eApgSpcClause.skip) skipped++;
      if (event.clause == eApgSpcClause.success) successfull++;
      if (event.clause == eApgSpcClause.failure) failed++;
    }

    ApgSpcSpecifier._totalSkipped += skipped;
    ApgSpcSpecifier._totalSuccessfull += successfull;
    ApgSpcSpecifier._totalFailed += failed;

    const eventMessage = `Successful: ${successfull}, Failed: ${failed}, Skipped: ${skipped}`;
    const successfullStamp = Std.Colors.green(`${successfull}`);
    const failedStamp = Std.Colors.red(`${failed}`);
    const skippedStamp = Std.Colors.gray(`${skipped}`);
    const message = `Successful: ${successfullStamp}, Failed: ${failedStamp}, Skipped: ${skippedStamp}`;

    const spacer = ApgSpcSpecifier.SPACER;
    const resume = Std.Colors.yellow(
      `+${spacer}\n` +
      `| ${message} \n` +
      `+${spacer}\n`);
    console.log(resume);

    successfull = 0;
    failed = 0;
    skipped = 0;

    const event: IApgSpcEvent = {
      clause: eApgSpcClause.resume,
      message: eventMessage,
      hrt: performance.now()
    }
    this._events.push(event);
    ApgSpcSpecifier._lastResumeIndex = this._events.length;
  }

  /**
   * Resumes the results of all the specs till the call to the specTitle() method.
   * It reports in a row the number of specs succesful, failed and skipped.
   * It should be called after the last specResume() call
   * The total counters are reset.
   */
  static FinalReport() {

    const eventMessage = `Successful: ${this._totalSuccessfull}, Failed: ${this._totalFailed}, Skipped: ${this._totalSkipped}`;

    const successfull = Std.Colors.green(`${this._totalSuccessfull}`);
    const failed = Std.Colors.red(`${this._totalFailed}`);
    const skipped = Std.Colors.gray(`${this._totalSkipped}`);
    const message = `Successful: ${successfull}, Failed: ${failed}, Skipped: ${skipped}`;

    const spacer = this.SPACER;
    const resume = Std.Colors.magenta(
      `+${spacer}\n` +
      `| Final resume \n` +
      `+${spacer}\n` +
      `| ${message}\n` +
      `+${spacer}\n`);
    console.log(resume);

    this._totalSuccessfull = 0;
    this._totalSkipped = 0;
    this._totalFailed = 0;

  }


  /**
   * 
   * @returns 
   */
  MockInit() {
    const event: IApgSpcEvent = {
      clause: eApgSpcClause.mockInit,
      message: "",
      hrt: performance.now()
    }
    this._events.push(event);

    const spacer = ApgSpcSpecifier.SPACER;
    const resume = Std.Colors.cyan(
      `+${spacer}\n` +
      `| Mock init \n` +
      `+${spacer}\n`);
    this.#log(resume);

    return Promise.resolve(event);
  }


   MockInitSync(amessage = "") {
    const event: IApgSpcEvent = {
      clause: eApgSpcClause.mockInit,
      message: amessage,
      hrt: performance.now()
    }
    this._events.push(event);

     const spacer = ApgSpcSpecifier.SPACER;
    const resume = Std.Colors.cyan(
      `+${spacer}\n` +
      `| Mock init \n` +
      `+${spacer}\n`);
    this.#log(resume);

    return event;
  }


  MockEnd(amessage = "") {
    const event: IApgSpcEvent = {
      clause: eApgSpcClause.mockEnd,
      message: amessage,
      hrt: performance.now()
    }
    this._events.push(event);

    const spacer = ApgSpcSpecifier.SPACER;
    const resume = Std.Colors.cyan(
      `+${spacer}\n` +
      `| Mock End \n` +
      `+${spacer}\n`);
    this.#log(resume);

    return Promise.resolve(event);
  }


  MockEndSync(amessage = "") {
    const event: IApgSpcEvent = {
      clause: eApgSpcClause.mockEnd,
      message: amessage,
      hrt: performance.now()
    }
    this._events.push(event);

    const spacer = ApgSpcSpecifier.SPACER;
    const resume = Std.Colors.cyan(
      `+${spacer}\n` +
      `| Mock End \n` +
      `+${spacer}\n`);
    this.#log(resume);

    return event;
  }


  async SendEventsToTestService(
    auri: string,
    aframework: string,
    aspecs: string,
  ) {

    const headers = {
      'Content-Type': 'application/json'
    };

    const body = JSON.stringify({
      framework: aframework,
      specs: aspecs,
      events: this._events
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

    let r: any;
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
      console.log("Error from the Deno Deploy Test service on " + auri);
      console.error(e);
      return e;
    }

    const spacer = ApgSpcSpecifier.SPACER;
    const resume = Std.Colors.brightGreen(
      `+${spacer}\n` +
      `| Remote storage (${auri}) result\n` +
      `+${spacer}\n` +
      `| ${JSON.stringify(r)}\n` +
      `+${spacer}\n`);
    this.#log(resume);



    return r;

  }



  AreEqual(a: unknown, b: unknown): boolean {
    const typeOfA = typeof a;
    const typeOfB = typeof b;

    if (typeOfA == 'object' && typeOfB == 'object') {
      return Uts.ApgUtsObj.DeepCompare(a, b);
    }
    return a === b;
  }

  IsNotUndefOrNull(a: unknown) {
    if (a === undefined) return false;
    if (a === null) return false;
    return true;
  }

  IsNotEmpty(a: string) {
    if (a !== "") return true;
    return false;
  }

}


