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
        <div ref={ref} className="mt-1.25 flex size-20 flex-col items-center justify-center text-balance cursor-grab active:cursor-grabbing">
            <img src={ability.imagePath} className="h-15 w-15"/>
        </div>
    );
}

export default DraggableHunterAbility;