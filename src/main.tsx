import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
if("serviceWorker" in navigator){
            navigator.serviceWorker.register("/sw.js").then(registration => {
                console.log("SW Registered!");
                console.log(registration);
                }).catch(error =>{
                    console.log("SW Registration failed!");
                    console.log(error);

            })
        }