import { useRef, useState } from "react";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import MapBoard from "./components/MapBoard";
import Sidebar from "./components/Sidebar";
import type { Coordinate, DrawnLine, PlacedIcon } from "./types/planner";
import type { MapObjectCategory } from "./types/planner";
import UtilitySidebar from "./components/UtilitySidebar";
import { armsFactoryObjects } from "./data/armsFactoryObjects";
import { toPng } from "html-to-image";
import { findImagePathByIdAndCategory } from "./utils/findIconData";


function App() {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [placedIcons, setPlacedIcons] = useState<PlacedIcon[]>([]);
    const [selectedInstanceId, setSelectedInstanceId] = useState<string | null>(null);
    const [visibleCategories, setVisibleCategories] = useState<Set<MapObjectCategory>>(
        new Set(["cypher", "rocketChair", "pallet"])
    );
    const [drawMode, setDrawMode] = useState<boolean>(false);
    const [ongoingPoint, setOngoingPoint] = useState<Coordinate[]>([]);
    const [drawnLine, setDrawnLine] = useState<DrawnLine[]>([]);

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
        setDrawnLine([]);
    }

    function toggleDrawMode() {
        if (drawMode === true) {
            finalizeLine(false);
        } else {
            setDrawMode(true);
        }
    }

    function finalizeLine(isClosed: boolean) {
        if (ongoingPoint.length < 2) {
            setOngoingPoint([]);
            setDrawMode(false);
        } else {
            const newLine: DrawnLine = {
                instanceId: crypto.randomUUID(),
                points: ongoingPoint,
                isClosed: isClosed,
            }
            setDrawnLine((prev) => [...prev, newLine]);
            setOngoingPoint([]);
            setDrawMode(false);
        }
    }

    function handleMapClick(x: number, y: number) {
        if (!drawMode) return;

        const currentPos: Coordinate = {
            x,
            y
        }

        if (ongoingPoint.length > 0 && isNearPoint(currentPos, ongoingPoint[0], 10)) {
            finalizeLine(true);
        } else {
            setOngoingPoint((prev) => [...prev, currentPos]);
        }
    }

    function isNearPoint(a: Coordinate, b: Coordinate, threshold: number) {
        const deltaX = a.x - b.x;
        const deltaY = a.y - b.y;
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

        if (distance < threshold) {
            return true;
        } else {
            return false;
        }
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
                    onMapClick={handleMapClick}
                    drawMode={drawMode}
                    drawnLine={drawnLine}
                    ongoingPoint={ongoingPoint}
                />
            </div>

            <div style={{ flex: 1 }}>
                <UtilitySidebar 
                    visibleCategories={visibleCategories} 
                    onToggleCategory={toggleCategory}
                    clearAllIcons={clearAllIcons}
                    saveMapAsImage={saveMapAsImage}
                    toggleDrawMode={toggleDrawMode}
                    drawMode={drawMode}
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