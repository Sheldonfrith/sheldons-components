export type TemperatureUnits = "°C" | "°F" | "°K";
export type DensityUnits = "g/ml" | "kg/m3" | "lb/ft3" | "lb/in3" | "g/m3" | "g/cm3" | "g/dm3" | "kg/cm3";
export type MassUnits = "g" | "kg" | "tonne" | "lb" | "oz" | "dg";
export type VolumeUnits = "cm3" | "m3" | "ltr" | "in3" | "ft3 " | "dm3" | "US gal" | "Imp. gal" | "ml";
export type ThermalConductivityUnits = "W/m·K" | "W/m·°C" | "W/cm·°C" | "W/cm·K" | "BTU/h·ft·°F";
export type ThermalDiffusivityUnits = "m2/s" | "ft2/s" | "cm2/s" | "in2/s";
export type HeatCapacityUnits = "J/K" | "J/°C" | "BTU/°F" | "cal/°C" | "kCal/°C";
export type SpecificHeatUnits =
  | "J/kg·K"
  | "kJ/kg·K"
  | "J/kg·°C"
  | "kJ/kg·°C"
  | "J/g·K"
  | "kJ/g·K"
  | "BTU/°F/lb"
  | "cal/°C/g"
  | "kCal/°C/kg"
  | "kCal/°C/g";
export type VolumetricSpecificHeatUnits =
  | "J/m3·K"
  | "J/cm3·K"
  | "kJ/m3·K"
  | "kJ/cm3·K"
  | "J/m3·°C"
  | "J/cm3·°C"
  | "kJ/m3·°C"
  | "kJ/cm3·°C";
type FractionUnits = "fraction" | "%";
type RatioUnits = "ratio";

export type AllUnits =
  | VolumetricSpecificHeatUnits
  | SpecificHeatUnits
  | TemperatureUnits
  | DensityUnits
  | MassUnits
  | VolumeUnits
  | ThermalConductivityUnits
  | ThermalDiffusivityUnits
  | HeatCapacityUnits
  | FractionUnits
  | RatioUnits;



export function convertUnits(inputUnit: AllUnits, outputUnit: AllUnits, inputValue: number){

}

type ConversionsMap<T extends string> = {[inputUnit in T]: {[outputUnit in T]: ((inputVal: number)=> number)|undefined v}};

const temperatureConversions: ConversionsMap<TemperatureUnits> = {
    "°C": {
        "°C": (v)=>v,
        "°F": (v)=> (v * 1.8) +32,
        "°K": (v)=> v + 273.15
    },
    "°F": {
        "°C": (v)=>(v -32)/1.8,
        "°F": (v)=>v,
        "°K": (v)=> (v+459.67)/1.8
    },
    "°K": {
        "°C": (v)=>v-273.15,
        "°F": v=> (v*1.8) -459.67,
        "°K": v=> v
    }
}
const densityConversions: ConversionsMap<DensityUnits> = {
    "g/ml": {
    "g/ml": v => v,
    "kg/m3": v => v*1000,
    "lb/ft3": v => v*62.43,
    "lb/in3": v => v*0.036128,
    "g/m3": v => v * 1000000,
    "g/cm3": v => v,
    "g/dm3": v => v * 1000,
    "kg/cm3": v => v * 0.001
},
    "kg/m3": {
    "g/ml": v => v,
    "kg/m3": v => v,
    "lb/ft3": v => v,
    "lb/in3": v => v,
    "g/m3": v => v,
    "g/cm3": v => v,
    "g/dm3": v => v,
    "kg/cm3": v => v
},
    "lb/ft3": {
    "g/ml": v => v,
    "kg/m3": v => v,
    "lb/ft3": v => v,
    "lb/in3": v => v,
    "g/m3": v => v,
    "g/cm3": v => v,
    "g/dm3": v => v,
    "kg/cm3": v => v
},
    "lb/in3": {
    "g/ml": v => v,
    "kg/m3": v => v,
    "lb/ft3": v => v,
    "lb/in3": v => v,
    "g/m3": v => v,
    "g/cm3": v => v,
    "g/dm3": v => v,
    "kg/cm3": v => v
},
    "g/m3": {
    "g/ml": v => v,
    "kg/m3": v => v,
    "lb/ft3": v => v,
    "lb/in3": v => v,
    "g/m3": v => v,
    "g/cm3": v => v,
    "g/dm3": v => v,
    "kg/cm3": v => v
},
    "g/cm3": {
    "g/ml": v => v,
    "kg/m3": v => v,
    "lb/ft3": v => v,
    "lb/in3": v => v,
    "g/m3": v => v,
    "g/cm3": v => v,
    "g/dm3": v => v,
    "kg/cm3": v => v
},
    "g/dm3": {
    "g/ml": v => v,
    "kg/m3": v => v,
    "lb/ft3": v => v,
    "lb/in3": v => v,
    "g/m3": v => v,
    "g/cm3": v => v,
    "g/dm3": v => v,
    "kg/cm3": v => v
},
    "kg/cm3": {
    "g/ml": v => v,
    "kg/m3": v => v,
    "lb/ft3": v => v,
    "lb/in3": v => v,
    "g/m3": v => v,
    "g/cm3": v => v,
    "g/dm3": v => v,
    "kg/cm3": v => v
}
}
const volumetricSpecificHeatConversions: ConversionsMap<VolumetricSpecificHeatUnits> ={
    "J/m3·K": {
        "J/m3·K": v => v,
        "J/cm3·K": v => v,
        "kJ/m3·K": v => v,
        "kJ/cm3·K": v => v,
        "J/m3·°C": v => v,
        "J/cm3·°C": v => v,
        "kJ/m3·°C": v => v,
        "kJ/cm3·°C": v => v
    },
    "J/cm3·K": {
        "J/m3·K": v => v,
        "J/cm3·K": v => v,
        "kJ/m3·K": v => v,
        "kJ/cm3·K": v => v,
        "J/m3·°C": v => v,
        "J/cm3·°C": v => v,
        "kJ/m3·°C": v => v,
        "kJ/cm3·°C": v => v
    },
    "kJ/m3·K": {
        "J/m3·K": v => v,
        "J/cm3·K": v => v,
        "kJ/m3·K": v => v,
        "kJ/cm3·K": v => v,
        "J/m3·°C": v => v,
        "J/cm3·°C": v => v,
        "kJ/m3·°C": v => v,
        "kJ/cm3·°C": v => v
    },
    "kJ/cm3·K": {
        "J/m3·K": v => v,
        "J/cm3·K": v => v,
        "kJ/m3·K": v => v,
        "kJ/cm3·K": v => v,
        "J/m3·°C": v => v,
        "J/cm3·°C": v => v,
        "kJ/m3·°C": v => v,
        "kJ/cm3·°C": v => v
    },
    "J/m3·°C": {
        "J/m3·K": v => v,
        "J/cm3·K": v => v,
        "kJ/m3·K": v => v,
        "kJ/cm3·K": v => v,
        "J/m3·°C": v => v,
        "J/cm3·°C": v => v,
        "kJ/m3·°C": v => v,
        "kJ/cm3·°C": v => v
    },
    "J/cm3·°C": {
        "J/m3·K": v => v,
        "J/cm3·K": v => v,
        "kJ/m3·K": v => v,
        "kJ/cm3·K": v => v,
        "J/m3·°C": v => v,
        "J/cm3·°C": v => v,
        "kJ/m3·°C": v => v,
        "kJ/cm3·°C": v => v
    },
    "kJ/m3·°C": {
        "J/m3·K": v => v,
        "J/cm3·K": v => v,
        "kJ/m3·K": v => v,
        "kJ/cm3·K": v => v,
        "J/m3·°C": v => v,
        "J/cm3·°C": v => v,
        "kJ/m3·°C": v => v,
        "kJ/cm3·°C": v => v
    },
    "kJ/cm3·°C": {
        "J/m3·K": v => v,
        "J/cm3·K": v => v,
        "kJ/m3·K": v => v,
        "kJ/cm3·K": v => v,
        "J/m3·°C": v => v,
        "J/cm3·°C": v => v,
        "kJ/m3·°C": v => v,
        "kJ/cm3·°C": v => v
    }
}