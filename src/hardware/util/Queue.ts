import { textChangeRangeIsUnchanged } from "typescript";

export class Queue {
    PriQueue: Array<[Number, Number]> = [];


    isEmpty(): boolean {
        if (this.PriQueue.length == 0) {
            return true;
        }
        else {
            return false;
        }
    }

    pushQueue(Pos: Number, Priority: number) {
        if (this.PriQueue.length > 0) {
            for (var i = 0; i < this.PriQueue.length; i++) {
                if (Priority > this.PriQueue.length[i][0]) {
                    this.PriQueue.splice(i, 0, [Priority, Pos]);
                    return;

                }
            }
            this.PriQueue.push([Pos, Priority])
        }
        else {
            this.PriQueue.push([Pos, Priority])
        }
    }

    popQueue(): Number {
        if (!this.isEmpty()) {
            return this.PriQueue.shift()[0];
        }
        else {
            console.log("Empty");
        }

    }
    peepQueue() {
        if (!this.isEmpty()) {
            return this.PriQueue.shift()[0];
        }
        else {
            console.log(this.PriQueue[0].toString());
        }
    }





}