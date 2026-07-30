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
        <details ref={ref}>
            <summary style={{ display: "flex", color: 'white', alignItems:'center' }}>
                <img src={hunter.imagePath} style={{ width: 65, height: 65}}/>
                {hunter.name}
            </summary>
            {hunter.abilities.map((ability) => (
                <DraggableHunterAbility key={ability.id} ability={ability}/>
            ))}
        </details>
    )
}

export default DraggableHunter;