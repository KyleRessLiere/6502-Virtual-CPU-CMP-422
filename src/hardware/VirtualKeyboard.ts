import { Hardware } from "./Hardware";
import { Interrupt } from "./imp/Interrupt";
import { InterruptController } from "./InterruptController";
import { Queue } from "./util/Queue";

export class VirtualKeyboard extends Hardware implements Interrupt {
    constructor(interruptController: InterruptController) {

        super(0, "Keyboard");
        this.isExecuting = false;
        this.irq = -1;
        this.priority = 1;

        this.InterruptController = interruptController;

        this.monitorKeys();




    }
    public isExecuting: boolean;

    private InterruptController: InterruptController;

    irq: number;
    priority: 1;

    public outputBuffer: Queue;
    public inputBuffer: Queue;

    name: String;

    private monitorKeys() {
        var stdin = process.stdin;


        stdin.setRawMode(true);

        stdin.setEncoding(null);

        stdin.on('data', function (key) {

            let keyPressed: String = key.toString();
            this.log("key press");

            if (key.toString() === '\u0003') {
                process.exit;
            }

            this.interruptController.acceptInterrupt(this);

        }.bind(this));



    }




}