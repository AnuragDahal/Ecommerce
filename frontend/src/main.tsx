import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {AuthProvider} from "./context/authcontext.tsx";
import {ThemeProvider} from "./components/themes/theme-provider.tsx";
import {Toaster} from "./components/ui/toaster.tsx";
// import { createSyncStoragePersistor } from "@tanstack/react-query-sync-storage-persist";

const queryClient = new QueryClient();
// const persistor = createSyncStoragePersistor(queryClient);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <BrowserRouter>
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    <AuthProvider>
                        <Toaster />
                        <App />
                    </AuthProvider>
                </ThemeProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
);
