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
            <div className="utility-sidebar-section">
                {categories.map((cat) => (
                    <label key={cat.value} id="category-container">
                        <input
                            type="checkbox"
                            checked={visibleCategories.has(cat.value)}
                            onChange={() => onToggleCategory(cat.value)}
                        />
                        <span>
                            {cat.label}
                        </span>
                    </label>
                ))}
            </div>
            <div className="utility-sidebar-section" id="arrow-card">
                {arrowList.map((arrow) => (
                    <DraggableArrow key={arrow.id} arrow={arrow}/>
                ))}
            </div>
            <div className="utility-sidebar-section utility-button-group">
                <button className="utility-button" onClick={() => clearAllIcons()}>
                    Clear All
                </button>
                <button className="utility-button utility-button-primary" onClick={() => saveMapAsImage()}>
                    Save Image
                </button>
            </div>
        </div>
    )
}