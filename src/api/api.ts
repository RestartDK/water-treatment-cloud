import axios from "axios";
import { ValveState } from "../lib/types";

const api = axios.create({
	baseURL: "https://valve-connector.azurewebsites.net/api/",
});

// TODO: make this api in azure functions
export const getValveCollection = async (): Promise<ValveState[]> => {
    const res = await api.get("httpTriggerTest");
    return res.data;
}

// TODO: make this api in azure functions
export const getValveState = async (deviceId: string, status: string): Promise<ValveState> => {
    const res = await api.post("httpTriggerTest", {
        deviceId,
        status,
    });
    return res.data;
}

export const changeValveState = async (deviceId: string, status: string): Promise<void> => {
    await axios.post(`https://valve-connector.azurewebsites.net/api/httpTriggerTest/?deviceId=`, { deviceId, status})
}