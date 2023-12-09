import MaxWidthWrapper from "./MaxWidthWrapper";
import Dashboard from "./components/Dashboard";
import {
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";	
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

// Create a client
const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Toaster position="top-center" reverseOrder={false} />
			<Navbar />
			<MaxWidthWrapper>
				<Dashboard />
			</MaxWidthWrapper>
		</QueryClientProvider>
	);
}

export default App;
