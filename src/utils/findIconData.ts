import { hunterList } from "../data/hunterData";
import { survivorList } from "../data/survivorData";
import type { PlacedIcon } from "../types/planner";

function findImagePath(icon: PlacedIcon): string {
    switch (icon.category) {
        case "survivor":
            const survivor = survivorList.find(s => s.id === icon.sourceId);
            if (!survivor) return "";
            return survivor.imagePath;
        case "hunter":
            const hunter = hunterList.find(h => h.id === icon.sourceId);
            if (!hunter) return "";
            return hunter.imagePath;
        case "ability":
            const abilitiesList = hunterList.flatMap(ability => ability.abilities);
            const abilities = abilitiesList.find(a => a.id === icon.sourceId);
            if (!abilities) return "";
            return abilities.imagePath;
        default:
            return "";
    }
}

export default findImagePath;