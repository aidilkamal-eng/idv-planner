import { useDroppable } from "@dnd-kit/react";
import type { RefObject } from "react";
import type { MapObject } from "../types/planner";
import { findImagePath } from "../utils/findIconData";
import mapObjectIcons from "../utils/mapObjectIcons";
import { coordinatesToSvgPoints } from "../utils/turnCoordinateToSvgPoints";
import { usePlannerStore } from "../store/usePlannerStore";
import { getIconSize } from "../utils/iconSize";

interface MapBoardProps {
    mapRef: RefObject<HTMLDivElement | null>;
    mapObjects: MapObject[];
}

export default function MapBoard({ mapRef, mapObjects }: MapBoardProps) {
    useDroppable({ id: "map", element: mapRef });
    const visibleCategories = usePlannerStore((s) => s.visibleCategories);
    const drawMode = usePlannerStore((s) => s.drawMode);
    const drawnLine = usePlannerStore((s) => s.drawnLine);
    const ongoingPoint = usePlannerStore((s) => s.ongoingPoint);
    const onMapClick = usePlannerStore((s) => s.addPoint);
    const placedIcons = usePlannerStore((s) => s.placedIcons);
    const selectedInstanceId = usePlannerStore((s) => s.selectedInstanceId);
    const selectIcon = usePlannerStore((s) => s.selectIcon);
    const updateIcon = usePlannerStore((s) => s.updateIcon);

    return (
        <div 
            ref={mapRef} 
            onClick={(e) => {
                if (drawMode === false) {
                    selectIcon(null);
                }
                
                if (!mapRef.current) return;
                const rect = mapRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                onMapClick(x, y);
            }}
            style={{ position: "relative", width: 901, height: 763, cursor: drawMode === true ? "crosshair" : "default" }}
        >
            <img src="/assets/Maps/ArmsFactory.webp" alt="Arms Factory Map" style={{ width: "100%", height: "100%" }}/>

            {mapObjects
                .filter((obj) => visibleCategories.has(obj.category))
                .map((obj) => (
                    <img
                        key={obj.id}
                        src={mapObjectIcons[obj.category]}
                        style={{
                            position: "absolute",
                            left: obj.x,
                            top: obj.y,
                            width: 20,
                            height: 20,
                        }}
                    />
                ))
            }

            {placedIcons.map((icon) => (
                <div key={icon.instanceId}>
                    {icon.instanceId === selectedInstanceId && icon.category === "arrow" && (
                        <div>
                            <img
                                src="/assets/Handles/rotate.png"
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();

                                    function handleMouseMove(moveEvent: MouseEvent) {
                                        if (!mapRef.current) return;

                                        const mapRect = mapRef.current.getBoundingClientRect();
                                        const centerX = mapRect.left + icon.x + 25;
                                        const centerY = mapRect.top + icon.y + 25;

                                        const deltaX = moveEvent.clientX - centerX;
                                        const deltaY = moveEvent.clientY - centerY;
                                        const angleDegree = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

                                        updateIcon(icon.instanceId, { rotation: angleDegree });
                                    }

                                    function handleMouseUp() {
                                        window.removeEventListener("mousemove", handleMouseMove);
                                        window.removeEventListener("mouseup", handleMouseUp);
                                    }

                                    window.addEventListener("mousemove", handleMouseMove);
                                    window.addEventListener("mouseup", handleMouseUp);
                                }} 
                                style={{ position:'absolute', left: icon.x + 50, top: icon.y, width: 14, height: 14, zIndex: 10 }}
                            />
                                
                            

                            <img
                                src="/assets/Handles/resize.webp"
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();

                                    function handleMouseMove(moveEvent: MouseEvent) {
                                        if (!mapRef.current) return;

                                        const mapRect = mapRef.current.getBoundingClientRect();
                                        const centerX = mapRect.left + icon.x + 25;
                                        const centerY = mapRect.top + icon.y + 25;

                                        const deltaX = moveEvent.clientX - centerX;
                                        const deltaY = moveEvent.clientY - centerY;
                                        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

                                        const scale = distance / 50;
                                        updateIcon(icon.instanceId, { scale });
                                    }

                                    function handleMouseUp() {
                                        window.removeEventListener("mousemove", handleMouseMove);
                                        window.removeEventListener("mouseup", handleMouseUp);
                                    }

                                    window.addEventListener("mousemove", handleMouseMove);
                                    window.addEventListener("mouseup", handleMouseUp);
                                }} 
                                style={{ position:'absolute', left: icon.x + 50, top: icon.y + 50, width: 17, height: 17, zIndex: 10 }}
                            />
                                
                        </div>
                    )}

                    <img
                        src={findImagePath(icon)}
                        onClick={(e) => {
                            e.stopPropagation();
                            selectIcon(icon.instanceId);
                        }}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            const offsetX = e.clientX - icon.x - mapRef.current!.getBoundingClientRect().left;
                            const offsetY = e.clientY - icon.y - mapRef.current!.getBoundingClientRect().top;

                            function handleMouseMove(moveEvent: MouseEvent) {
                                if (!mapRef.current) return;
                                const mapRect = mapRef.current.getBoundingClientRect();

                                const newX = moveEvent.clientX - mapRect.left - offsetX;
                                const newY = moveEvent.clientY - mapRect.top - offsetY;

                                updateIcon(icon.instanceId, { x: newX, y: newY });
                            }

                            function handleMouseUp() {
                                window.removeEventListener("mousemove", handleMouseMove);
                                window.removeEventListener("mouseup", handleMouseUp)
                            }

                            window.addEventListener("mousemove", handleMouseMove);
                            window.addEventListener("mouseup", handleMouseUp);
                        }}
                        style={{
                            position: "absolute",
                            left: icon.x,
                            top: icon.y,
                            width: getIconSize(icon.category),
                            height: getIconSize(icon.category),
                            transform: `rotate(${icon.rotation}deg) scale(${icon.scale})`,
                        }}
                    />
                </div>
            ))}

            <svg style={{ position: "absolute", top: 0, left: 0, width: 901, height: 763, pointerEvents: "none" }}>
                {drawnLine.map((line) => (
                    line.isClosed 
                        ?   <polygon key={line.instanceId} points={coordinatesToSvgPoints(line.points)} stroke="white" fill="none"/>
                        :   <polyline key={line.instanceId} points={coordinatesToSvgPoints(line.points)} stroke="white" fill="none"/>
                ))}

                {ongoingPoint.length > 0 && (
                    <polyline points={coordinatesToSvgPoints(ongoingPoint)} stroke="white" fill="none"/>
                )}
            </svg>

        </div>
    )
}