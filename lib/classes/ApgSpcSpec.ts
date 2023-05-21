/** -----------------------------------------------------------------------
 * @module [apg-spc]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.8.0 [APG 2022/06/26] Removing Rhum
 * @version 0.9.2 [APG 2022/10/02] Github Beta
 * @version 0.9.7 [APG 2023/05/06] Separation of concerns lib/src
 * -----------------------------------------------------------------------
 */

import { Uts } from "../deps.ts";
import { TApgSpcFlags } from "../types/TApgSpcFlags.ts";
import { ApgSpcSpecifier } from "./ApgSpcSpecifier.ts";
import { eApgSpcRun } from "../enums/eApgSpcRun.ts";


/**
 * Abstract service with testing capabilities
 */
export abstract class ApgSpcSpec extends Uts.ApgUtsBaseService {

  protected specifier: ApgSpcSpecifier;

  protected flags: TApgSpcFlags = {}

  /**
   * Initialize the base object
   * @param aimportMetaUrl A string coming from the statment import.meta.url
   */
  constructor(aimportMetaUrl: string) {
    super(aimportMetaUrl);
    this.specifier = new ApgSpcSpecifier();
  }

  /**
   * Method that will be overriden by the child classes to be called asyncronously.
   */
  protected execute(): Promise<void> {
    return new Promise<void>(() => {
      throw new Error(`If you want to call method [${this.execute.name}] you must override the implementation.`)
    })
  }


  /**
   * Method that will be overriden by the child classes to be called syncronously.
   */
  protected executeSync(): void {
    throw new Error(`If you want to call method [${this.executeSync.name}] method you must override the implementation.`)
  }


  async Run(arun: eApgSpcRun) {

    if (arun == eApgSpcRun.no) return false;
    this.specifier.Title(this.CLASS_NAME);
    let r = await this.specifier.MockInit();
    if (r.message == "") {
      await this.execute();
      r = await this.specifier.MockEnd();
    }
  }

  RunSync(arun: eApgSpcRun) {
    if (arun == eApgSpcRun.no) return false;
    this.specifier.Title(this.CLASS_NAME);
    let r = this.specifier.MockInitSync()
    if (r.message == "") {
      this.executeSync();
      r = this.specifier.MockEndSync();
    }
  }


  async sendToTestService(
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
      events: this.specifier.Events
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

    // const spacer = ApgSpcService.SPACER;
    // const resume = Std.Colors.brightGreen(
    //   `+${spacer}\n` +
    //   `| Remote storage (${auri}) result\n` +
    //   `+${spacer}\n` +
    //   `| ${JSON.stringify(r)}\n` +
    //   `+${spacer}\n`);
    // this.#log(resume);

    return r;

  }

  async SendEventsToTestService(
    auri: string,
    aframework: string,
    aspecs: string,
  ) {
    await this.specifier.SendEventsToTestService(auri, aframework, aspecs);
  }


  async mockInit() {
    await this.specifier.MockInit();
  }

  async mockEnd() {
    await this.specifier.MockEnd();
  }

  mockInitSync() {
    this.specifier.MockInit();
  }

  mockEndSync() {
    this.specifier.MockEnd();
  }

}


