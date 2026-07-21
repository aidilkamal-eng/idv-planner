import { useDroppable } from "@dnd-kit/react";
import type { RefObject } from "react";
import type { PlacedIcon } from "../types/planner";
import findImagePath from "../utils/findIconData";

interface MapBoardProps {
    mapRef: RefObject<HTMLDivElement | null>;
    placedIcons: PlacedIcon[];
}

export default function MapBoard({ mapRef, placedIcons }: MapBoardProps) {
    useDroppable({ id: "map", element: mapRef });

    return (
        <div ref={mapRef} style={{ position: "relative", width: 901, height: 763 }}>
            <img src="/assets/Maps/ArmsFactory.webp" alt="Arms Factory Map" style={{ width: "100%", height: "100%" }}/>

            {placedIcons.map((icon) => (
                <img
                    key={icon.instanceId}
                    src={findImagePath(icon)}
                    style={{
                        position: "absolute",
                        left: icon.x,
                        top: icon.y,
                        width: 50,
                        height: 50,
                    }}
                />
            ))}
        </div>
    )
}