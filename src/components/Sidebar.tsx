import { hunterList } from "../data/hunterData"
import { survivorList } from "../data/survivorData"
import DraggableHunter from "./DraggableHunter"
import DraggableSurvivor from "./DraggableSurvivor"
import type { ReactNode } from "react"

interface CollapsibleSectionProps {
    children: ReactNode;
    className?: string;
}

function CollapsibleSection({ children, className = "" }: CollapsibleSectionProps) {
    return (
        <details className={`m-1.25 mb-5 rounded-sm border border-gray-500 ${className}`}>
            {children}
        </details>
    )
}

export default function Sidebar() {
    return (
        <div className="custom-scrollbar h-screen overflow-y-auto">
            <CollapsibleSection>
                <summary className="block cursor-pointer list-none p-1.25 [&::-webkit-details-marker]:hidden">
                    <div className="mx-0 my-3.75 text-center text-[large] text-white">
                        <p>HUNTER</p>
                    </div>
                </summary>
                <div className="ml-1.25 text-[x-small] font-thin text-white">
                    <p>*click on the hunter card to reveal their abilities</p>
                </div>
                {hunterList.map((hunter) => (
                    <DraggableHunter key={hunter.id} hunter={hunter}/>
                ))}
            </CollapsibleSection>
            <CollapsibleSection>
                <summary className="block cursor-pointer list-none p-1.25 [&::-webkit-details-marker]:hidden">
                    <div className="mx-0 my-3.75 text-center text-[large] text-white">
                        <p>SURVIVOR</p>
                    </div>
                </summary>
                {survivorList.map((survivor) => (
                    <DraggableSurvivor key={survivor.id} survivor={survivor} />
                ))}
            </CollapsibleSection>
        </div>
    )
}