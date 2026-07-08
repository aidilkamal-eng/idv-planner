import MapBoard from "./components/MapBoard";
import Sidebar from "./components/Sidebar";

function App() {
    return (
        <div style={{ display: "flex", justifyContent: "space-between"}}>
            <Sidebar />
            <MapBoard />
            <div>Arrow (placeholder)</div>
        </div>
    );
}

export default App;