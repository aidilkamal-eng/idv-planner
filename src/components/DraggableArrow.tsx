import { useDraggable } from "@dnd-kit/react";
import type { DraggableItem } from "../types/planner";

interface DraggableArrowProps {
    arrow: DraggableItem;
}

function DraggableArrow({ arrow }: DraggableArrowProps) {
    const { ref } = useDraggable({
        id: arrow.id,
        data: { category: "arrow" },
    });

    return (
        <div ref={ref} style={{ display: "flex", justifyContent:'flex-start'}}>
            <img src={arrow.imagePath} style={{ width: 65, height: 65}}/>
        </div>
    );
}

export default DraggableArrow;