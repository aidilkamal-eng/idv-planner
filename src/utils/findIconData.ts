import { arrowList } from "../data/arrowData";
import { hunterList } from "../data/hunterData";
import { survivorList } from "../data/survivorData";
import type { PlacedIcon } from "../types/planner";

export function findImagePath(icon: PlacedIcon): string {
    return findImagePathByIdAndCategory(icon.sourceId, icon.category);
}

export function findImagePathByIdAndCategory(id: string, category: string): string {
    if (category === "survivor") {
        const survivor = survivorList.find(s => s.id === id);
        return survivor ? survivor.imagePath : "";
    }
    if (category === "hunter") {
        const hunter = hunterList.find(h => h.id === id);
        return hunter ? hunter.imagePath : "";
    }
    if (category === "ability") {
        const abilities = hunterList.flatMap(h => h.abilities);
        const ability = abilities.find(a => a.id === id);
        return ability ? ability.imagePath : "";
    }
    if (category === "arrow") {
        const arrow = arrowList.find(a => a.id === id);
        return arrow ? arrow.imagePath : "";
    }
    return "";
}