import { useRef, useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import MapBoard from "./components/MapBoard";
import Sidebar from "./components/Sidebar";
import type { PlacedIcon } from "./types/planner";
import UtilitySidebar from "./components/UtilitySidebar";


function App() {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [placedIcon, setPlacedIcons] = useState<PlacedIcon[]>([]); 

    return (
        <div style={{display: "flex", justifyContent: "space-between",}}>
            <DragDropProvider
                onDragEnd={(event) => {
                    if (event.canceled) return;
                    if (!mapRef.current) return;

                    const { source, target } = event.operation;
                    if (!source) return;
                    if (target?.id !== "map") return;

                    const rect = mapRef.current.getBoundingClientRect();
                    const x = event.operation.position.current.x - rect.left;
                    const y = event.operation.position.current.y - rect.top;

                    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

                    const newIcon: PlacedIcon = {
                        instanceId: crypto.randomUUID(),
                        sourceId: String(source.id),
                        category: source.data.category,
                        x,
                        y,
                        rotation: 0,
                        scale: 1,
                    };

                    setPlacedIcons((prev) => [...prev, newIcon]);
                }}
            >
            <Sidebar />
            <MapBoard mapRef={mapRef} placedIcons={placedIcon}/>
            <UtilitySidebar />
            </DragDropProvider>
        </div>
    );
}

export default App;