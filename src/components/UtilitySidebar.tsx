import { arrowList } from "../data/arrowData";
import DraggableArrow from "./DraggableArrow";
import type { MapObjectCategory } from "../types/planner";
import { usePlannerStore } from "../store/usePlannerStore";
import type { ReactNode } from "react";

interface UtilitySidebarProps {
    saveMapAsImage: () => void;
}

const categories: { value: MapObjectCategory; label: string }[] = [
    { value: "cypher", label: "Cypher" },
    { value: "rocketChair", label: "Rocket Chair" },
    { value: "pallet", label: "Pallet" },
];

interface SidebarSectionProps {
    children: ReactNode;
    className?: string;
}

function SidebarSection({ children, className = "" }: SidebarSectionProps) {
    return (
        <div className={`m-1.25 mb-5 rounded-sm border border-gray-500 p-1.75 ${className}`}>
            {children}
        </div>
    );
}

interface UtilityButtonProps {
    children: ReactNode;
    onClick: () => void;
    className?: string;
}

function UtilityButton({ children, className = "", onClick }: UtilityButtonProps) {
    return (
        <button className={`cursor-pointer rounded-sm border-2 bg-transparent px-3 py-2.5 text-sm transition-[background-color,border-color] duration-200 ${className}`} onClick={onClick}>
            {children}
        </button>
    );
}

export default function UtilitySidebar({ saveMapAsImage }: UtilitySidebarProps) {
    const visibleCategories = usePlannerStore((s) => s.visibleCategories);
    const onToggleCategory = usePlannerStore((s) => s.toggleCategory);
    const drawMode = usePlannerStore((s) => s.drawMode);
    const toggleDrawMode = usePlannerStore((s) => s.toggleDrawMode);
    const clearAllIcons = usePlannerStore((s) => s.clearAllIcons);
    
    return (
        <div>
            <SidebarSection>
                {categories.map((cat) => (
                    <label key={cat.value} className="block text-base text-white">
                        <input
                            className={`relative mr-2 h-6.25 w-6.25 cursor-pointer appearance-none border-2 border-gray-500 align-middle checked:border-accent checked:after:absolute checked:after:-top-px checked:after:left-1 checked:after:text-base checked:after:text-white checked:after:content-["✓"]`}
                            type="checkbox"
                            checked={visibleCategories.has(cat.value)}
                            onChange={() => onToggleCategory(cat.value)}
                        />
                        <span>
                            {cat.label}
                        </span>
                    </label>
                ))}
            </SidebarSection>
            <SidebarSection className="flex justify-center gap-2">
                <UtilityButton className={drawMode ? "border-danger text-danger hover:border-danger-hover hover:bg-danger/10" : "border-accent text-accent hover:border-accent-hover hover:bg-accent/10]"
                } onClick={() => toggleDrawMode()}>
                    {drawMode === true ? "Stop drawing" : "Start drawing"}
                </UtilityButton>
            </SidebarSection>
            <SidebarSection className="flex flex-row flex-wrap items-center justify-start gap-1.25">
                {arrowList.map((arrow) => (
                    <DraggableArrow key={arrow.id} arrow={arrow}/>
                ))}
            </SidebarSection>
            <SidebarSection className="flex justify-center gap-2">
                <UtilityButton className="border-gray-500 text-white hover:border-neutral-500 hover:bg-white/5" onClick={() => clearAllIcons()}>
                    Clear All
                </UtilityButton>
                <UtilityButton className="border-accent text-accent hover:border-accent-hover hover:bg-accent/10" onClick={() => saveMapAsImage()}>
                    Save Image
                </UtilityButton>
            </SidebarSection>
        </div>
    )
}