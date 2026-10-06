import { create } from "zustand";
import type { Coordinate, DrawnLine, MapObjectCategory, PlacedIcon } from "../types/planner";
import { isNearPoint } from "../utils/isNearPoint"


interface PlannerState {
    placedIcons: PlacedIcon[];
    selectedInstanceId: string | null;

    addIcon: (newIcon: PlacedIcon) => void;
    selectIcon: (instanceId: string | null) => void;
    updateIcon: (instanceId: string, changes: Partial<PlacedIcon>) => void;
    clearAllIcons: () => void;

    drawMode: boolean;
    toggleDrawMode: () => void;

    visibleCategories: Set<MapObjectCategory>;
    toggleCategory: (category: MapObjectCategory) => void;

    ongoingPoint: Coordinate[];
    drawnLine: DrawnLine[];
    finalizeLine: (isClosed: boolean) => void;

    addPoint: (x: number, y: number) => void;
}

export const usePlannerStore = create<PlannerState>()((set, get) => ({
    placedIcons: [],
    selectedInstanceId: null,

    addIcon: (newIcon) => 
        set((state) => {
            return { placedIcons: [...state.placedIcons, newIcon] }
        }),

    selectIcon: (instanceId) => {
        set({ selectedInstanceId: instanceId })
    },

    updateIcon: (instanceId, changes) => {
        set((state) => ({
            placedIcons: state.placedIcons.map((icon) =>
                icon.instanceId === instanceId ? { ...icon, ...changes } : icon
            ),
        }))
    },

    clearAllIcons: () => {
        set({ placedIcons: [], selectedInstanceId: null, drawnLine: [] });
    },

    drawMode: false,
    toggleDrawMode: () => {
        if (get().drawMode) {
            get().finalizeLine(false);
        } else {
            set({ drawMode: true });
        }
    },

    visibleCategories: new Set(["cypher", "rocketChair", "pallet"]),
    toggleCategory: (category) =>
        set((state) => {
            const next = new Set(state.visibleCategories);
            if (next.has(category)) {
                next.delete(category);
            } else {
                next.add(category);
            }

            return { visibleCategories: next }
        }),

    ongoingPoint: [],
    drawnLine: [],
    
    finalizeLine: (isClosed) => 
        set((state) => {
            if (state.ongoingPoint.length < 2) {
                return { ongoingPoint: [], drawMode: false }
            }

            const newLine: DrawnLine = {
                instanceId: crypto.randomUUID(),
                points: state.ongoingPoint,
                isClosed: isClosed,
            };

            return {
                drawnLine: [...state.drawnLine, newLine],
                ongoingPoint: [],
                drawMode: false,
            };
        }),
    
    addPoint: (x, y) => {
        const { drawMode, ongoingPoint, finalizeLine } = get();
        if (!drawMode) return;

        const currentPos: Coordinate = {
            x,
            y
        }

        if (ongoingPoint.length > 0 && isNearPoint(currentPos, ongoingPoint[0], 10)) {
            finalizeLine(true);
        } else {
            set({ ongoingPoint: [...ongoingPoint, currentPos]});
        }
    },
}));