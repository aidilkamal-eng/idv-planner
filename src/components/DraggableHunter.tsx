import { useDraggable } from "@dnd-kit/react";
import type { HunterConfig } from "../types/planner";
import DraggableHunterAbility from "./DraggableHunterAbility";

interface DraggableHunterProps {
    hunter: HunterConfig;
}

function DraggableHunter({ hunter }: DraggableHunterProps) {
    const { ref } = useDraggable({
         id: hunter.id,
         data: { category: "hunter" },
    });

    return (
        <details ref={ref} className="sidebar-item-hunter">
            <summary>
                <img src={hunter.imagePath}/>
                <span>{hunter.name}</span>
            </summary>
            <div id="ability-card">
                {hunter.abilities.map((ability) => (
                    <DraggableHunterAbility key={ability.id} ability={ability}/>
                ))}
            </div>
        </details>
    )
}

export default DraggableHunter;