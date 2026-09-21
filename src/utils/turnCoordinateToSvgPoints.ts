import type { Coordinate } from "../types/planner";

export function coordinatesToSvgPoints(points: Coordinate[]): string {
    const coordinateList = points.map((coordinate) => `${coordinate.x},${coordinate.y}`)
    return coordinateList.join(" ")
}