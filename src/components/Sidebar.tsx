import { hunterList } from "../data/hunterData"
import { survivorList } from "../data/survivorData"

export default function Sidebar() {
    return (
        <div>
            <div>
                {hunterList.map((hunter) => (
                    <details key={hunter.id}>
                        <summary style={{ display: "flex" }}>
                            <img src={hunter.imagePath} style={{ width: 65, height: 65}}/>
                            {hunter.name}
                        </summary>
                        {hunter.abilities.map((ability) => (
                            <div key={ability.id}>
                                <img src={ability.imagePath} style={{ width: 60, height: 60}}/>
                                <p>{ability.name}</p>
                            </div>
                        ))}
                    </details>
                ))}
            </div>
            <div>
                {survivorList.map((survivor) => (
                    <div key={survivor.id} style={{ display: "flex" }}>
                        <img src={survivor.imagePath} style={{ width: 65, height: 65}}/>
                        <p>{survivor.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}