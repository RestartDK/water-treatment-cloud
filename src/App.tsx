import { Valve, ValveCollection, ValveState } from "./lib/types";
import { Button } from "./components/ui/button";
import { changeValveState } from "./api/api";
import { useMutation } from "@tanstack/react-query";

const valves: ValveCollection = [
	{
		deviceId: "valve1",
		status: "off",
	},
	{
		deviceId: "valve2",
		status: "off",
	},
];

function ValveComponent({ deviceId, status }: Valve) {
	const mutation = useMutation({
		mutationFn: (status: ValveState) => {
			return changeValveState(deviceId, status);
		},
	});

	const onSubmit = (newStatus: ValveState) => {
		mutation.mutate(newStatus);
	};

	return (
		<div className="flex flex-row justify-center items-center gap-4 p-4">
			<h1>{deviceId}</h1>
			<p>Current Status: {status}</p>
			<Button onClick={() => onSubmit("on")}>Turn on</Button>
			<Button onClick={() => onSubmit("off")}>Turn off</Button>
		</div>
	);
}

function App() {
	return (
		<div className="w-full flex flex-col">
			{valves.map((valve: Valve) => (
				<ValveComponent key={valve.deviceId} {...valve} />
			))}
		</div>
	);
}

export default App;
