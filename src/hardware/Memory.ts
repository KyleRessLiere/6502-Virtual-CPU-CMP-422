import { System } from "../System";
import { Hardware } from "./Hardware";
import { ClockListener } from "./imp/ClockListener";

export class Memory extends Hardware implements ClockListener {
    private hexList = new Array<number>(0x10000);
    private _MAR: number = 0x0000;
    private _MDR: number = 0x00;
    private _Memory = new Array<number>(0xffff)



    constructor() {
        super(0, "Memory");

        this.log("Memory Length: " + this._Memory.length.toString());



    }

    public getMAR() {
        return this._MAR;
    }

    public setMAR(mAR: number) {
        this._MAR = mAR;

    }
    public getMDR() {
        return this._MDR;
    }
    public setMDR(mDR: number) {
        this._MDR = mDR;
    }

    public getMemory() {
        return this._Memory
    }
    public setMemory(mem: Array<number>) {
        this._Memory = mem;
    }





    public reset(): void {

        this._MAR = 0x00;
        this._MAR = 0x0000;
        this._MDR = 0x00;

        for (let i = 0x00; i < this._Memory.length; i++) {
            this._Memory = [i];
        }
    }

    public read(): void {
        this.setMDR(this._Memory[this.getMAR()]);

    }

    //sets the 
    public write(): void {
        this._Memory[this.getMAR()] = this.getMDR();

    }







    //sets all values in memory to 0x00
    public initMemory(): void {
        for (let i = 0x00; i < this.hexList.length; i++) {
            this.hexList[i] = 0x00;


        }
    }

    //displays address 0x00 to 0x14 in memory
    public displayMemory(length: number, padding: number): void {
        for (let i = 0x00; i < length; i++) {
            //checks to see if value is outside of memory 
            if (i < 0x10000) {
                this.hexLog(this.hexList[i], padding);

            }
            else {
                console.log("[HW - " + this.name + "id:" + this.id + " - " + new Date() + "]:Address : " + i + "contains Value: ERR [hexValue conversion]: number undefined");
                break;
            }

        }
    }


    public pulse(): void {
        console.log("[HW - " + this.name + "id:" + this.id + " - " + new Date() + "]: Received clock pulse");

    }
}


