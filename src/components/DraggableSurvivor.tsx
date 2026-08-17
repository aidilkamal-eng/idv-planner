import { useDraggable } from "@dnd-kit/react";
import type { DraggableItem } from "../types/planner";

interface DraggableSurvivorProps {
    survivor: DraggableItem;
}

function DraggableSurvivor({ survivor }: DraggableSurvivorProps) {
    const { ref } = useDraggable({
        id: survivor.id,
        data: { category: "survivor" },
    });

    return (
        <div ref={ref} className="sidebar-item-survivor">
            <img src={survivor.imagePath}/>
            <p>{survivor.name}</p>
        </div>
    );
}

export default DraggableSurvivor;