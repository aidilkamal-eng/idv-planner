import { useRef } from "react";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import MapBoard from "./components/MapBoard";
import Sidebar from "./components/Sidebar";
import type { PlacedIcon } from "./types/planner";
import UtilitySidebar from "./components/UtilitySidebar";
import { armsFactoryObjects } from "./data/armsFactoryObjects";
import { toPng } from "html-to-image";
import { findImagePathByIdAndCategory } from "./utils/findIconData";
import { usePlannerStore } from "./store/usePlannerStore";


function App() {
    const mapRef = useRef<HTMLDivElement | null>(null);

    const addIcon = usePlannerStore((s) => s.addIcon);

    async function saveMapAsImage() {
        if (!mapRef.current) return;

        const dataUrl = await toPng(mapRef.current);

        const link = document.createElement("a");
        link.download = "identity-v-plan.png";
        link.href = dataUrl;
        link.click();
    }

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

                    addIcon(newIcon);
                }}
            >
            <div style={{ flex: 1 }}>
                <Sidebar />
            </div>

            <div style={{ flex: 2 }}>
                <MapBoard 
                    mapRef={mapRef}
                    mapObjects={armsFactoryObjects}
                />
            </div>

            <div style={{ flex: 1 }}>
                <UtilitySidebar 
                    saveMapAsImage={saveMapAsImage}
                />
            </div>

            <DragOverlay>
                {(source) => (
                    <img
                        src={findImagePathByIdAndCategory(String(source.id), String(source.data.category))}
                        style={{ width: 50, height: 50}}
                    />
                )}
            </DragOverlay>

            </DragDropProvider>
        </div>
    );
}

export default App;