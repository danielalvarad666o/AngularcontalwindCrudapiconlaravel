import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  
  private myGlobalVar: any;

  constructor() {
    this.myGlobalVar = null;
  }

  setGlobalVar(value: any): void {
    this.myGlobalVar = value;
  }

  public getGlobalVar(): any {
    return this.myGlobalVar;
  }
}


