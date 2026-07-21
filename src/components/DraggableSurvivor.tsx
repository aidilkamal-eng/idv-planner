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
        <div ref={ref} style={{ display: "flex" }}>
            <img src={survivor.imagePath} style={{ width: 65, height: 65}}/>
            <p>{survivor.name}</p>
        </div>
    );
}

export default DraggableSurvivor;