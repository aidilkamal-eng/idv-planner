import { create } from "zustand";
import type { Coordinate, DrawnLine, MapObjectCategory } from "../types/planner";
import { isNearPoint } from "../utils/isNearPoint"


interface PlannerState {
    drawMode: boolean;
    toggleDrawMode: () => void;

    visibleCategories: Set<MapObjectCategory>;
    toggleCategory: (category: MapObjectCategory) => void;

    ongoingPoint: Coordinate[];
    drawnLine: DrawnLine[];
    finalizeLine: (isClosed: boolean) => void;
    clearDrawnLine: () => void;

    addPoint: (x: number, y: number) => void;
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
        }),

    clearDrawnLine: () => {
        set({drawnLine: []})
    },
    
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
    }
}));