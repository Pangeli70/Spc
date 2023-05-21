/** -----------------------------------------------------------------------
 * @module [apg-spc]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.8.0 [APG 2022/06/26] Removing Rhum
 * @version 0.9.2 [APG 2022/10/02] Github Beta
 * @version 0.9.7 [APG 2023/05/06] Separation of concerns lib/src
 * -----------------------------------------------------------------------
 */

import { Uts, Rst } from "../deps.ts";
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
    let r = await this.mockInit();
    if (r.ok) {
      await this.execute();
      r = await this.mockEnd();
    }
  }

  RunSync(arun: eApgSpcRun) {
    if (arun == eApgSpcRun.no) return false;
    this.specifier.Title(this.CLASS_NAME);
    let r = this.mockInitSync()
    if (r.ok) {
      this.executeSync();
      r = this.mockEndSync();
    }
  }

  async SendEventsToTestService(
    auri: string,
    aframework: string,
    aspecs: string,
  ) {
    await this.specifier.SendEventsToTestService(auri, aframework, aspecs);
  }


  async mockInit() {
    const r: Rst.IApgRst = { ok: true };
    r.payload = { signature: "IApgSpcEvent", data: await this.specifier.MockInit() };
    return r
  }

  async mockEnd() {
    const r: Rst.IApgRst = { ok: true };
    r.payload = { signature: "IApgSpcEvent", data: await this.specifier.MockEnd() };
    return r
  }

  mockInitSync() {
    const r: Rst.IApgRst = { ok: true };
    r.payload = { signature: "IApgSpcEvent", data: this.specifier.MockInitSync() };
    return r
  }

  mockEndSync() {
    const r: Rst.IApgRst = { ok: true };
    r.payload = { signature: "IApgSpcEvent", data: this.specifier.MockEndSync() };
    return r
  }

}


