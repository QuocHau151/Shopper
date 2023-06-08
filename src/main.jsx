import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { store } from "./store";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthProvider store={store}>
      <App />
    </AuthProvider>
  </BrowserRouter>,
  // </React.StrictMode>,
);
