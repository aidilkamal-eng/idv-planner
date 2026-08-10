import { useDroppable } from "@dnd-kit/react";
import type { RefObject } from "react";
import type { PlacedIcon } from "../types/planner";
import findImagePath from "../utils/findIconData";

interface MapBoardProps {
    mapRef: RefObject<HTMLDivElement | null>;
    placedIcons: PlacedIcon[];
    onSelectIcon: (instanceId: string) => void;
    selectedInstanceId: string | null;
    onUpdateRotation: (instanceId: string, newRotation: number) => void;
    onUpdateScale: (instanceId: string, newScale: number) => void;
    onUpdatePosition: (instanceId: string, newX: number, newY: number) => void;
}

export default function MapBoard({ mapRef, placedIcons, onSelectIcon, selectedInstanceId, onUpdateRotation, onUpdateScale, onUpdatePosition }: MapBoardProps) {
    useDroppable({ id: "map", element: mapRef });

    return (
        <div 
            ref={mapRef} 
            onClick={(e) => {
                if (!mapRef.current) return;
                const rect = mapRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                console.log(`x: ${Math.round(x)}, y: ${Math.round(y)}`);
            }}
            style={{ position: "relative", width: 901, height: 763 }}
        >
            <img src="/assets/Maps/ArmsFactory.webp" alt="Arms Factory Map" style={{ width: "100%", height: "100%" }}/>

            {placedIcons.map((icon) => (
                <div key={icon.instanceId}>
                    <img
                        src={findImagePath(icon)}
                        onClick={() => onSelectIcon(icon.instanceId)}
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

                                onUpdatePosition(icon.instanceId, newX, newY);
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
                            width: 50,
                            height: 50,
                            transform: `rotate(${icon.rotation}deg) scale(${icon.scale})`,
                        }}
                    />

                    {icon.instanceId === selectedInstanceId && icon.category === "arrow" && (
                        <div>
                            <div
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

                                        onUpdateRotation(icon.instanceId, angleDegree);
                                    }

                                    function handleMouseUp() {
                                        window.removeEventListener("mousemove", handleMouseMove);
                                        window.removeEventListener("mouseup", handleMouseUp);
                                    }

                                    window.addEventListener("mousemove", handleMouseMove);
                                    window.addEventListener("mouseup", handleMouseUp);
                                }} 
                                style={{ position:'absolute', left: icon.x + 50, top: icon.y, background: 'red', width: 10, height:10}}>
                                {/*RESERVED*/}
                            </div>

                            <div
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
                                        onUpdateScale(icon.instanceId, scale);
                                    }

                                    function handleMouseUp() {
                                        window.removeEventListener("mousemove", handleMouseMove);
                                        window.removeEventListener("mouseup", handleMouseUp);
                                    }

                                    window.addEventListener("mousemove", handleMouseMove);
                                    window.addEventListener("mouseup", handleMouseUp);
                                }} 
                                style={{ position:'absolute', left: icon.x + 50, top: icon.y + 50, background: 'blue', width: 10, height:10}}>
                                {/*RESERVED*/}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}