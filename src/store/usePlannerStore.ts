import { create } from "zustand";
import type { MapObjectCategory } from "../types/planner";

interface PlannerState {
    drawMode: boolean;
    toggleDrawMode: () => void;

    visibleCategories: Set<MapObjectCategory>;
    toggleCategory: (category: MapObjectCategory) => void;
}

export const usePlannerStore = create<PlannerState>()((set) => ({
    drawMode: false,
    toggleDrawMode: () => set((state) => ({ drawMode: !state.drawMode })),

    visibleCategories: new Set(["cypher", "rocketChair", "pallet"]),
    toggleCategory: (category: MapObjectCategory) =>
        set((state) => {
            const next = new Set(state.visibleCategories);
            if (next.has(category)) {
                next.delete(category);
            } else {
                next.add(category);
            }

            return { visibleCategories: next }
        }),
}));