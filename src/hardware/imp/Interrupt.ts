import { Queue } from "../util/Queue";

export interface Interrupt {
    irq: number;

    priority: number

    outputBuffer: Queue;

    inputBuffer: Queue;
}