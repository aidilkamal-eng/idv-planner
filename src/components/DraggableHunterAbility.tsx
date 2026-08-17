import { useDraggable } from "@dnd-kit/react";
import type { DraggableItem } from "../types/planner";

interface DraggableHunterAbilityProps {
    ability: DraggableItem;
}

function DraggableHunterAbility({ ability }: DraggableHunterAbilityProps) {
    const { ref } = useDraggable({
        id: ability.id,
        data: { category: "ability" }, 
    });

    return (
        <div ref={ref} id="ability-item">
            <img src={ability.imagePath}/>
        </div>
    );
}

export default DraggableHunterAbility;