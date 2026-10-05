import type { Coordinate } from "../types/planner";

export function isNearPoint(a: Coordinate, b: Coordinate, threshold: number) {
        const deltaX = a.x - b.x;
        const deltaY = a.y - b.y;
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

        if (distance < threshold) {
            return true;
        } else {
            return false;
        }
}