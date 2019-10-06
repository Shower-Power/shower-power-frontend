export class Shower {
    constructor(showerDuration,gasOrElectric,time) {
        this.time = time
        this.showerDuration = showerDuration;
        this.gasOrElectric = gasOrElectric;
        this.costGallon = 0.71;
        this.costHeatGas = 1.4;
        this.gallonsPerMin = 2.1;
        this.costHeatElectric = 2.1;
        this.energyCost = 0;
        this.dollarCost = 0;
        this.waterGallons = 0;
    }
    SingleShowerDollarCost(){
        if(gasOrElectric = true){
            this.dollarCost = this.showerDuration*(this.costGallon*this.gallonsPerMin)*this.costHeatGas;
        }
        else {
            this.dollarCost = this.showerDuration*(this.costGallon*this.gallonsPerMin)*this.costHeatElectric;
        }
    }
    SingleShowerWaterCost(){
        this.waterGallons = this.showerDuration*this.gallonsPerMin
    }
    EnergyCost(){
        if(gasOrElectric =true){
            this.energyCost = this.showerDuration*this.costHeatGas;
        }
        else{
            this.energyCost = this.showerDuration*this.costHeatElectric;
        }
    }
}
export class User {
    constructor(name){
        this.name = name;
        this.showers = [];
        this.avShowerDur = 0;
        this.avShowerCostEn = 0;
        this.avShowerCostDol = 0;
        this.totMonthShowTime = 0;
        this.totMonthShowCostEn = 0;
        this.totMonthShowCostDol = 0;
    }
    MonthTotals(){
        MonthTotalShowerTime();
        MonthTotalShowerCostEnergy();
        MonthTotalShowerCostDollar();
    }
    MonthTotalShowerTime(){
        for(i = 0; i <this.showers.length; i++){
            this.totMonthShowTime += this.showers[i].showerDuration;
        }
    }
    MonthTotalShowCostEnergy(){
        for(i = 0; i <this.showers.length; i++){
            this.totMonthShowCostEn += this.shower[i].energyCost;
        }
    }
    MonthTotalCostDollar(){
        for(i = 0; i <this.showers.length; i++){
            this.totMonthShowCostDol += this.shower[i].energyCost;
        }
    }
    Averages(){
        AverageShowerDuration();
        AverageShowerCostEnergy();
        AverageShowerCostDollar();
    }
    AverageShowerDuration(){
        this.avShowerDur = this.monthTotalShowerTime/this.showers.length;
    }
    AverageShowerCostEnergy(){
        this.avShowerCostEn = this.MonthTotalShowCostEnergy/this.showers.length;
    }
    AverageShowerCostDollar(){
        this.avShowerCostDol = this.MonthTotalCostDollar/this.showers.length;
    }
}