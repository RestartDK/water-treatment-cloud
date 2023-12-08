import MaxWidthWrapper from "./MaxWidthWrapper";
import Dashboard from "./components/Dashboard";
import {
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";	

// Create a client
const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<MaxWidthWrapper>
				<Dashboard />
			</MaxWidthWrapper>
		</QueryClientProvider>
	);
}

export default App;
