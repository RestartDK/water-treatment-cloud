import { ScheduleValve, Valve, ValveStatus } from "@/lib/types";
import { Button } from "./ui/button";
import { getValveState, scheduleValveStatus, setValveState } from "@/api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Circle } from "lucide-react";
import toast from "react-hot-toast";
import { DateTimePicker } from "./ui/datetimepicker";
import { useState } from "react";

interface ValveComponentProps {
	deviceId: string;
}

export default function ValveComponent({ deviceId }: ValveComponentProps) {
	const [date, setDate] = useState(new Date());

	const queryClient = useQueryClient();
	const { data, isLoading, error } = useQuery({
		queryKey: ["valvestate", deviceId],
		queryFn: () => getValveState(deviceId),
	});

	const mutationValveStatus = useMutation({
		mutationFn: ({ deviceId, status }: Valve) => {
			return setValveState(deviceId, status);
		},
		onSuccess: (data) => {
			queryClient.setQueryData(["valvestate", deviceId], data);
		},
		onError: (error) => {
			// Handle error
			console.log("Error: ", error);
			toast.error(`Error: ${error}`);
		},
	});

	const mutationScheduleValveStatus = useMutation({
		mutationFn: ({ deviceId, status, targetTime }: ScheduleValve) => {
			return scheduleValveStatus(deviceId, status, targetTime);
		},
		onSuccess: () => {
			toast.success("Valve scheduled!");
		},
		onError: () => {
			toast.error("Error scheduling valve!");
		},
	});

	const onSubmitValveStatus = (status: ValveStatus) => {
		mutationValveStatus.mutate({ deviceId, status });
	};

	const handleTurnOn = (selectedDate: Date) => {
		const targetTime = selectedDate.toISOString();
        console.log("Target time: ", targetTime);
		mutationScheduleValveStatus.mutate({ deviceId, status: "on", targetTime });
	};

	const handleTurnOff = (selectedDate: Date) => {
		const targetTime = selectedDate.toISOString();
        console.log("Target time: ", targetTime);
		mutationScheduleValveStatus.mutate({ deviceId, status: "off", targetTime });
	};

	if (isLoading) {
		return <div>Loading Valve...</div>;
	}

	if (error) {
		return <div>{error.message}</div>;
	}

	if (!data) {
		return <div>Error: No status found</div>;
	}

	// Destructure 'status' from 'data'
	const { status } = data;

	return (
		<div className="w-full">
			{status && (
				<div className="flex md:flex-row flex-col justify-evenly gap-4 p-4">
					<div className="flex md:flex-row flex-col gap-2 items-center">
						<h1 className="font-bold">{deviceId}</h1>
						<div className="flex flex-row">
							<p className="pr-2">Current Status</p>
							{status === "on" ? (
								<Circle color="#008000" />
							) : (
								<Circle color="#FF0000" />
							)}
						</div>
						<div className="flex flex-row gap-2">
							<Button onClick={() => onSubmitValveStatus("on")}>Turn on</Button>
							<Button onClick={() => onSubmitValveStatus("off")}>Turn off</Button>
						</div>
					</div>
					<div className="flex justify-center">
						<DateTimePicker date={date} setDate={setDate} onTurnOn={handleTurnOn} onTurnOff={handleTurnOff} />
					</div>
					
				</div>
			)}
		</div>
	);
}
