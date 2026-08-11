import { arrowList } from "../data/arrowData";
import DraggableArrow from "./DraggableArrow";
import type { MapObjectCategory } from "../types/planner";

interface UtilitySidebarProps {
    visibleCategories: Set<MapObjectCategory>;
    onToggleCategory: (category: MapObjectCategory) => void;
    clearAllIcons: () => void;
    saveMapAsImage: () => void;
}

const categories: { value: MapObjectCategory; label: string }[] = [
    { value: "cypher", label: "Cypher" },
    { value: "rocketChair", label: "Rocket Chair" },
    { value: "pallet", label: "Pallet" },
];

export default function UtilitySidebar({ visibleCategories, onToggleCategory, clearAllIcons, saveMapAsImage }: UtilitySidebarProps) {
    return (
        <div>
            <div>
                {categories.map((cat) => (
                    <label key={cat.value} style={{ display: "block", color:"white" }}>
                        <input
                            type="checkbox"
                            checked={visibleCategories.has(cat.value)}
                            onChange={() => onToggleCategory(cat.value)}
                        />
                        {cat.label}
                    </label>
                ))}
            </div>
            <div>
                {arrowList.map((arrow) => (
                    <DraggableArrow key={arrow.id} arrow={arrow}/>
                ))}
            </div>
            <div>
                <button onClick={() => clearAllIcons()}>
                    Clear All
                </button>
            </div>
            <div>
                <button onClick={() => saveMapAsImage()}>
                    Save Image
                </button>
            </div>
        </div>
    )
}