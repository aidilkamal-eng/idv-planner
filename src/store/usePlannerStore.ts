import { create } from "zustand";
import type { Coordinate, DrawnLine, MapObjectCategory } from "../types/planner";

interface PlannerState {
    drawMode: boolean;
    toggleDrawMode: () => void;

    visibleCategories: Set<MapObjectCategory>;
    toggleCategory: (category: MapObjectCategory) => void;

    ongoingPoint: Coordinate[];
    drawnLine: DrawnLine[];
    finalizeLine: (isClosed: boolean) => void;
}

export const usePlannerStore = create<PlannerState>()((set, get) => ({
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
        })
}));