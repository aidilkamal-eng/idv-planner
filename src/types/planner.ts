export type IconCategory = "hunter" | "ability" | "survivor" | "arrow";

export interface DraggableItem {
    id: string;
    name: string;
    imagePath: string;
}

export interface HunterConfig extends DraggableItem {
    abilities: DraggableItem[];
}

export interface PlacedIcon {
    instanceId: string;
    sourceId: string;
    category: IconCategory;
    x: number;
    y: number;
    rotation: number;
    scale: number;
}

export interface MapObject {
    id: string;
    category: "cypher" | "rocketChair" | "pallet";
    x: number;
    y: number;
}