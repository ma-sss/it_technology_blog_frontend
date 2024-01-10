import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes/Router";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";

function App() {
    return (
        <div className="App">
            <RecoilRoot>
                <ChakraProvider>
                    <BrowserRouter>
                        <Router />
                    </BrowserRouter>
                </ChakraProvider>
            </RecoilRoot>
        </div>
    );
}

export default App;
