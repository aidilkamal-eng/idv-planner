import { useRef, useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import MapBoard from "./components/MapBoard";
import Sidebar from "./components/Sidebar";
import type { PlacedIcon } from "./types/planner";
import type { MapObjectCategory } from "./types/planner";
import UtilitySidebar from "./components/UtilitySidebar";
import { armsFactoryObjects } from "./data/armsFactoryObjects";
import { toPng } from "html-to-image";


function App() {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [placedIcons, setPlacedIcons] = useState<PlacedIcon[]>([]);
    const [selectedInstanceId, setSelectedInstanceId] = useState<string | null>(null);
    const [visibleCategories, setVisibleCategories] = useState<Set<MapObjectCategory>>(
        new Set(["cypher", "rocketChair", "pallet"])
    );

    function updateIconPosition(instanceId: string, newX: number, newY: number) {
        setPlacedIcons((prev) =>
            prev.map((icon) => 
                icon.instanceId === instanceId ? { ...icon, x: newX, y: newY } : icon
            )
        );
    }

    function updateIconRotation(instanceId: string, newRotation: number) {
        setPlacedIcons((prev) =>
            prev.map((icon) => 
                icon.instanceId === instanceId ? { ...icon, rotation: newRotation } : icon
            )
        );
    }

    function updateIconScale(instanceId: string, newScale: number) {
        setPlacedIcons((prev) =>
            prev.map((icon) => 
                icon.instanceId === instanceId ? { ...icon, scale: newScale } : icon
            )
        );
    }

    function toggleCategory(category: MapObjectCategory) {
        setVisibleCategories((prev) => {
            const next = new Set(prev);
            if (next.has(category)) {
                next.delete(category);
            } else {
                next.add(category);
            }

            return next;
        });
    }

    function clearAllIcons() {
        setPlacedIcons([]);
        setSelectedInstanceId(null);
    }

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

                    setPlacedIcons((prev) => [...prev, newIcon]);
                }}
            >
            <div style={{ flex: 1 }}>
                <Sidebar />
            </div>

            <div style={{ flex: 2 }}>
                <MapBoard 
                    mapRef={mapRef} 
                    placedIcons={placedIcons} 
                    onSelectIcon={setSelectedInstanceId} 
                    selectedInstanceId={selectedInstanceId}
                    onUpdateRotation={updateIconRotation}
                    onUpdateScale={updateIconScale}
                    onUpdatePosition={updateIconPosition}
                    mapObjects={armsFactoryObjects}
                    visibleCategories={visibleCategories}
                />
            </div>

            <div style={{ flex: 1 }}>
                <UtilitySidebar 
                    visibleCategories={visibleCategories} 
                    onToggleCategory={toggleCategory}
                    clearAllIcons={clearAllIcons}
                    saveMapAsImage={saveMapAsImage}
                />
            </div>
            </DragDropProvider>
        </div>
    );
}

export default App;