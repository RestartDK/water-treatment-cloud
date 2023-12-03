export type ValveState = "on" | "off";

export type Valve = {
    deviceId: string;
    status: ValveState;
}

export type ValveCollection = Valve[];