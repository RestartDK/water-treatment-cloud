import { Valve, ValveStatus } from "@/lib/types";
import { Button } from "./ui/button";
import { getValveState, setValveState } from "@/api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface ValveComponentProps {
    deviceId: string;
}

export default function ValveComponent({ deviceId }: ValveComponentProps) {
    const queryClient = useQueryClient();
	const { data, isLoading, error } = useQuery({ queryKey: ['valvestate', deviceId], queryFn: () => getValveState(deviceId) });

    console.log("Valve state data: ", data);

    const mutation = useMutation({
		mutationFn: ({deviceId, status}: Valve) => {
			return setValveState(deviceId, status);
		},
        onSuccess: (data) => {
            queryClient.setQueryData(['valvestate', deviceId], data);
        },
        onError: (error) => {
            // Handle error
            console.log("Error: ", error);
        },  
	});

	const onSubmit = (status: ValveStatus) => {
		mutation.mutate({deviceId, status});
	};

    if (isLoading) {
        return (
            <div>
                Loading Valve...
            </div>
        );
    }

    if (error) {
        return (
            <div>
                {error.message}
            </div>
        );
    }

    if (!data) {
        return (
            <div>
                Error: No status found
            </div>
        );
    }

    // Destructure 'status' from 'data'
    const { status } = data;
    
	return (
        <div className="w-full">
            {status && (
                <div className="flex flex-row justify-center items-center gap-4 p-4">
                    <h1>{deviceId}</h1>
                    <p>Current Status: {status}</p>
                    <Button onClick={() => onSubmit("on")}>Turn on</Button>
                    <Button onClick={() => onSubmit("off")}>Turn off</Button>
                </div>
            )}
        </div>
	);
}