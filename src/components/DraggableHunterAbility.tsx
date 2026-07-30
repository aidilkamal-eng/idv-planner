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
        <div ref={ref}>
            <img src={ability.imagePath} style={{ width: 60, height: 60}}/>
            <p style={{color:'white'}}>{ability.name}</p>
        </div>
    );
}

export default DraggableHunterAbility;