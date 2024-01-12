import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes/Router";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
    return (
        <div className="App">
            <ChakraProvider>
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </ChakraProvider>
        </div>
    );
}

export default App;
