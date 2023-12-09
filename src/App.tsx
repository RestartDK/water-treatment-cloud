import MaxWidthWrapper from "./MaxWidthWrapper";
import Dashboard from "./components/Dashboard";
import {
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";	
import Navbar from "./components/Navbar";

// Create a client
const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Navbar />
			<MaxWidthWrapper>
				<Dashboard />
			</MaxWidthWrapper>
		</QueryClientProvider>
	);
}

export default App;
