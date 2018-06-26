import React, {Component} from 'react';

class Timer extends Component{
    constructor(){
        super();
        this.state={
            hora:0,
            min:0,
            seg:0,
            time:"",
        };
    }

    componentWillMount(){
        this.getTimeUntil(this.props.timeInit);
    }
    componentDidMount(){
        setInterval(()=>this.getTimeUntil(this.props.timeInit),1000);
    }

    printResult(){
        var hora,min,seg;
        hora=(this.state.hora<10)?"0"+this.state.hora:this.state.hora;
        min=(this.state.min<10)?"0"+this.state.min:this.state.min;
        seg=(this.state.seg<10)?"0"+this.state.seg:this.state.seg;
        return (
            <h2>
                {hora}:{min}:{seg}
            </h2>            
        );
        
    }
    
    getTimeUntil(timeInit){
        const time=Date.parse(new Date) - Date.parse(timeInit);
        const seg=Math.floor((time/1000) % 60);
        const min=Math.floor((time/(1000*60)) % 60);
        const hora=Math.floor((time/(1000*60*60)) % 24);
        const horaP=(hora<10)?"0"+hora:hora;
        const minP=(min<10)?"0"+min:min;
        const segP=(seg<10)?"0"+seg:seg;

        this.setState({hora,min,seg});
        if ((horaP+":"+minP+":"+segP) !=="NaN:NaN:NaN"){
            this.props.handler(horaP+":"+minP+":"+segP);
        }
        
    }
    getTime(timeInit){
        const time=Date.parse(new Date) - Date.parse(timeInit);
        const seg=Math.floor((time/1000) % 60);
        const min=Math.floor((time/(1000*60)) % 60);
        const hora=Math.floor((time/(1000*60*60)) % 24);
        const horaP=(hora<10)?"0"+hora:hora;
        const minP=(min<10)?"0"+min:min;
        const segP=(seg<10)?"0"+seg:seg;
        return (horaP+":"+minP+":"+segP);
    }
    getTimeMin(time){ // 00:00:00 hora, min, seg
        var arrayTime=time.split(":");
        var horasMin=parseInt(arrayTime[0],10) *60;
        var min=parseInt(arrayTime[1],10);
        var segMin= parseFloat((parseInt(arrayTime[2])/60,10).toFixed(2));
        console.log("el tiempo es:" + (horasMin + min + segMin) )
        return horasMin + min;
    }
    
    render(){
        return(
            <div style={{border:"solid",borderWidth:"1px", padding:"5px 5px 5px 5px",textAlign:"center",width:"200px"} }>
                {this.printResult()}
            </div>
                
           
        ); 
    }
        
}

export default Timer;