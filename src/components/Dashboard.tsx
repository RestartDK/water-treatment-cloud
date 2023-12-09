import { useQuery } from "@tanstack/react-query";
import { getAllValves } from "@/api/api";
import ValveComponent from "./ValveComponent";

export default function Dashboard() {
	const { data, isLoading, error } = useQuery({ queryKey: ['valves'], queryFn: () => getAllValves() });

	if (isLoading) {
		return (
			<div>
                Loading...
            </div>
		);
	}

    if (error) {
        return (
            <div>
                Error: {error.message}
            </div>
        );
    }

    if (!data) {
        return (
            <div>
                Error: No data found
            </div>
        );
    }

	return (
        <div className="w-full flex flex-col">
            <div className="flex">
                <h1 className="text-3xl font-bold p-4">Your Valves</h1>
            </div>
            <div className="flex flex-col justify-end">
                {data.map((device) => (
                    <ValveComponent deviceId={device.deviceId} />
                ))}
            </div>
        </div>
    );
}