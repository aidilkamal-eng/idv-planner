import { hunterList } from "./data/hunterData";
import { survivorList } from "./data/survivorData";

function App() {
    console.log("Hunters:", hunterList);
    console.log("Survivors:", survivorList);

    return (
        <div>
            <h1>Identity V Planner</h1>
        </div>
    );
}

export default App;