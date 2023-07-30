import "./App.scss";
import ClientApp from "./ClientApp";
import { ReduxProvider } from "./providers/ReduxProvider";

function App() {
  return (
    <ReduxProvider>
      <ClientApp />
    </ReduxProvider>
  );
}

export default App;
