import { useQuery } from "@tanstack/react-query";
import { getAllValves } from "@/api/api";
import ValveComponent from "./ValveComponent";

export default function Dashboard() {
	const { data, isLoading, error } = useQuery({ queryKey: ['valves'], queryFn: () => getAllValves() });
    console.log("My data: ", data);

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
            {data.map((device) => (
                <ValveComponent deviceId={device.deviceId} />
            ))}
        </div>
    );
}