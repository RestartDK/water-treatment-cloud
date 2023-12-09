export type ValveStatus = "on" | "off";

export type Valve = {
	deviceId: string;
	status: ValveStatus;
};

export type ScheduleValve= {
	deviceId: string;
	status: ValveStatus;
	targetTime: string;
};

export interface ValveStatusResponse {
    status: ValveStatus;
}
export interface DeviceReportePropertiesResponse {
	reportedProperties: {
		status: ValveStatus;
		$metadata: {
			$lastUpdated: string;
			status: {
				$lastUpdated: string;
			};
		};
		$version: number;
	};
}

export interface ValveDevice {
	deviceId: string;
	generationId: string;
	etag: string;
	connectionState: "Connected" | "Disconnected"; // Assuming these are the only two states
	status: "enabled" | "disabled"; // Assuming these are the only two statuses
	statusReason: string | null;
	connectionStateUpdatedTime: string; // ISO 8601 format date string
	statusUpdatedTime: string; // ISO 8601 format date string
	lastActivityTime: string; // ISO 8601 format date string
	cloudToDeviceMessageCount: number;
	capabilities: Record<string, unknown>; // Use 'any' if the structure is unknown
	authentication: {
		symmetricKey: {
			primaryKey: string;
			secondaryKey: string;
		};
		x509Thumbprint: {
			primaryThumbprint: string | null;
			secondaryThumbprint: string | null;
		};
		type: string;
		SymmetricKey: {
			// This looks like a repetition of symmetricKey above, so it might be unnecessary or a mistake in the data
			primaryKey: string;
			secondaryKey: string;
		};
	};
}

// Then, for the API call, you'd expect an array of these:
export type ValveDevicesResponse = ValveDevice[];
