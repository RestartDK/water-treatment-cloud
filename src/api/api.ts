import axios from "axios";
import { ValveDevicesResponse, ValveStatusResponse } from "../lib/types";

const api = axios.create({
	baseURL: "https://valve-connector.azurewebsites.net/api/",
});

export const getAllValves = async (): Promise<ValveDevicesResponse> => {
    const res = await api.get("getAllValves");
    return res.data;
}

export const createValve = async (deviceId: string): Promise<void> => {
    await api.post(`createValve?deviceId=${deviceId}`);
}

export const getValveState = async (deviceId: string): Promise<ValveStatusResponse> => {
    const res = await api.get(`getValveState?deviceId=${deviceId}`);
    return res.data;
}

export const setValveState = async (deviceId: string, status: string): Promise<ValveStatusResponse> => {
    const res = await api.post(`setValveState?deviceId=${deviceId}&status=${status}`);
    return res.data;
}

export const scheduleValveStatus = async (deviceId: string, status: string, targetTime: string): Promise<void> => {
    await api.post(`scheduleValveStatus?deviceId=${deviceId}&status=${status}&targetTime=${targetTime}`);
}