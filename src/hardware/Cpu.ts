import { System } from "../System";
//links cpu.ts to hardware.ts however already in the folder
import { Hardware } from "./Hardware";
//link clock listener so that can access pulse
import { ClockListener } from "./imp/ClockListener";
import { MMU } from "./MMU";
import { Ascii } from "./util/Ascii";

import { InterruptController } from "./InterruptController";

// hardware is the parent class and cpu needs to take the information from that
export class Cpu extends Hardware implements ClockListener {
    //setting the clock count to 0 so it starts there
    public cpuClockCount: number = 0;
    public pipeLine: number = 1;
    public programCounter: number = 0x0000;
    //creating the x and y registers
    public xRegister: number = 0x00;
    public yRegister: number = 0x00;
    //create zFlag
    public zFlag: number = 0;
    private accNum: number;
    private instructionRegister: number = 0x00;
    public opcode: number;
    public operand: 0x00;
    private mode: number = 0;
    private logs: boolean = true;
    private InterruptController = new InterruptController();


    //creating the MMU class
    private mmu: MMU = null;

    constructor() {

        super(0, "CPU");

        this.log("CPU");
    }

    pulse() {

        let getTime: number = new Date().getTime()
        this.cpuClockCount++;
        console.log("HW " + this.name + " id " + this.id + " " + getTime + " Received clock pulse - CPU CLock Count: " + this.cpuClockCount);

        //pipeline steps
        if (this.pipeLine == 0) {
            this.fetch();
        }
        else if (this.pipeLine == 1) {
            this.decode();
        }
        else if (this.pipeLine == 2) {
            this.decode()
        }
        else if (this.pipeLine == 3) {
            this.execute()
        }
        else if (this.pipeLine == 4) {
            this.writeBack();
        }
        else if (this.pipeLine == 5) {
            this.interruptCheck();
        }
        this.writeBack();
    }

    //writeBack function and what it prints
    writeBack() {
        console.log("CPU STATE: | MODE: 0 PC: " + this.programCounter + "IR: " + this.instructionRegister +
            " Acc: " + this.accNum + " xReg: " + this.xRegister + "yReg: " + this.yRegister + " ZFlag: " + this.zFlag + " Step: " + this.pipeLine);
    }

    public fetch(): void {
        // Loads the IR with the memory address from the Program counter
        this.instructionRegister = this.mmu.readNow(this.programCounter);
        this.programCounter++;
    }

    public decode(): void {
        // Each if statement will move the cpuPipeline number to a different number i.e, 3, 4
        if ((this.instructionRegister == 0xA9) || (this.instructionRegister == 0xA2) || (this.instructionRegister == 0xA2) || (this.instructionRegister == 0xD0)) {
            this.mmu.setLowBit(this.programCounter);
            this.programCounter++;
            this.pipeLine = 1;
        }

        if ((this.instructionRegister == 0xAD) || (this.instructionRegister == 0x8D) || (this.instructionRegister == 0x6D) || (this.instructionRegister == 0xAE)
            || (this.instructionRegister == 0xAC) || (this.instructionRegister == 0xEC) || (this.instructionRegister == 0xEE)) {
            this.mmu.setLowBit(this.programCounter);
            this.programCounter++;
            this.pipeLine = 2;
        }
        //this is focusing on the high order bytes
        else if (this.pipeLine == 0) {
            this.mmu.setHighBit(this.programCounter);
            this.programCounter++;
            this.pipeLine = 3;
        }
    }




    public interruptCheck(): void {
        //Pops the most recent key press in the Queue;
        this.log(this.InterruptController.outputBuffer.popQueue().toString());
    }

    //instruction 
    public execute(): void {
        if (this.instructionRegister == 0xA9) {
            // loading a constant with read now in accumulator
            this.accNum = this.mmu.readNow(this.programCounter);
            this.pipeLine = 5;

        } else if (this.instructionRegister == 0xAD) {
            //this will load the accumulator from memory

            this.accNum = this.mmu.readFromMem(this.mmu.getLowBit(), this.mmu.getHighBit());
            this.pipeLine = 5;


        } else if (this.instructionRegister == 0x8D) {
            //storing the accumulator in memory
            this.mmu.writeToMem(this.mmu.getLowBit(), this.mmu.getHighBit(), this.accNum);
            this.pipeLine = 5;
            //similar to AD


        } else if (this.instructionRegister == 0x6D) {
            //adds and keeps result in accumulator
            this.accNum += this.mmu.readFromMem(this.mmu.getLowBit(), this.mmu.getHighBit());
            this.pipeLine = 5;


        } else if (this.instructionRegister == 0xA2) {
            //load the x register with a constant
            this.xRegister = this.mmu.getLowBit();
            this.pipeLine = 5;


        } else if (this.instructionRegister == 0xAE) {
            //load the x register from memory
            this.xRegister = this.mmu.readFromMem(this.mmu.getLowBit(), this.mmu.getHighBit());
            this.pipeLine = 5;


        } else if (this.instructionRegister == 0xA0) {
            //load the y register with a constant
            this.yRegister = this.mmu.getHighBit();
            this.pipeLine = 5;


        } else if (this.instructionRegister == 0xAC) {
            //load the y register from memory
            this.yRegister = this.mmu.readNow(this.programCounter);
            this.pipeLine = 5;

        } else if (this.instructionRegister == 0xA8) {
            //load the y register from the accumulator
            this.yRegister = this.mmu.readFromMem(this.mmu.getLowBit(), this.mmu.getHighBit());
            this.pipeLine = 5;

        } else if (this.instructionRegister == 0xEA) {
            //no operation

        } else if (this.instructionRegister == 0x00) {
            //need to break here
            process.exit();

        } else if (this.instructionRegister == 0xEC) {
            if (this.xRegister == this.mmu.readNow(this.programCounter)) {
                this.zFlag = 1;
                this.pipeLine = 5;
            }

        } else if (this.instructionRegister == 0xD0) {
            //if z flag is zero then branch on bytes
            if (this.zFlag == 0) {
                this.programCounter = this.programCounter + this.mmu.readNow(this.programCounter);
                this.pipeLine = 5;
            }

        } else if (this.instructionRegister == 0xEE) {
            //increasing the vlaue by a byte
            if (this.pipeLine == 2) {
                this.accNum = this.mmu.readFromMem(this.mmu.getLowBit(), this.mmu.getHighBit())
                this.pipeLine = 3;
            } else if (this.pipeLine == 3) {
                this.accNum++;
                this.pipeLine = 4;
            }

        } else if (this.instructionRegister == 0xFF) {
            //ending statement
            if (this.xRegister == 0x01) {
                console.log(this.yRegister);
                this.programCounter++;
            } else if (this.xRegister == 0x02) {
                this.programCounter = this.mmu.readNow(this.programCounter);
                if (this.mmu.readNow(this.programCounter) != 0x00) {
                    //reads from the ascii because it is a string
                    console.log(Ascii.asciiCode(this.mmu.readNow(this.programCounter)));
                    this.pipeLine = 5;
                }
            }
        }
    }
}