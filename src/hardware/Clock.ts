
import { Hardware } from "./Hardware";
import { ClockListener } from "./imp/ClockListener";

export class Clock extends Hardware{
  

     public clockListenersList:Array<ClockListener> = [];
    
    constructor() {
        super(0,'Clock');
     
      
    }

    public initClockListners(clock : ClockListener){
        this.clockListenersList.push(clock);
      
    }
    

    //send pulses to members of the ClockListners interface
    public pulseOut(){
        console.log("Pulsing");
       
        for(let clock of this.clockListenersList){
            clock.pulse();
        }    
        
       }
       

    //tiks clock at interval
   public startClock(interval : number){
    var that = this;
    setInterval(function(){
        return that.pulseOut();
    }, interval);

   
   }

}