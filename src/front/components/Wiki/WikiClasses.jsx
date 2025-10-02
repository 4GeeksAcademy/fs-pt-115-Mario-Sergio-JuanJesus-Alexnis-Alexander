import { useEffect, useState } from "react";
// Cambia el fondo del body solo cuando este componente está montado
import { useEffect as useEffectBody } from "react";
import "./WikiClasses.css";
import { getClassesList, getClassDetails, getClassLevels } from "../../serviceApi/WikiAPI/WikiClassesAPI";
import barbarianImg from "../../assets/img/638607453019977939.png";
import bardImg from "../../assets/img/638607457242601819.png"
import clericImg from "../../assets/img/638607457550642172.png"
import druidImg from "../../assets/img/638607457905913506.png"
import fighterImg from "../../assets/img/638607458265993956.png"
import monkImg from "../../assets/img/638607456914661514.png"
import paladinImg from "../../assets/img/638607458603093196.png"
import rangerImg from "../../assets/img/638607458991513657.png"
import rogueImg from "../../assets/img/638607459371603812.png"
import sorcererImg from "../../assets/img/638607459717652437.png"
import warlockImg from "../../assets/img/638607460047750778.png"
import wizardImg from "../../assets/img/638607460388570205.png"



const classImages = {
  barbarian: barbarianImg,
  bard: bardImg,
  cleric: clericImg,
  druid: druidImg,
  fighter: fighterImg,
  monk: monkImg,
  paladin: paladinImg,
  ranger: rangerImg,
  rogue: rogueImg,
  sorcerer: sorcererImg,
  warlock: warlockImg,
  wizard: wizardImg,
};

const primaryAbilities = {
  barbarian: { name: "Strength", desc: "Barbarians are mighty warriors who are powered by primal forces of the multiverse that manifest as a Rage. More than a mere emotion—and not limited to anger—this Rage is an incarnation of a predator’s ferocity, a storm’s fury, and a sea’s turmoil." },
  bard: { name: "Charisma", desc: "Bards are expert at inspiring others, soothing hurts, disheartening foes, and creating illusions. Bards believe the multiverse was spoken into existence and that remnants of its Words of Creation still resound and glimmer on every plane of existence. Bardic magic attempts to harness those words, which transcend any language." },
  cleric: { name: "Wisdom", desc: "Clerics draw power from the realms of the gods and harness it to work miracles. Blessed by a deity, a pantheon, or another immortal entity, a Cleric can reach out to the divine magic of the Outer Planes—where gods dwell—and channel it to bolster people and battle foes." },
  druid: { name: "Wisdom", desc: "Druids belong to ancient orders that call on the forces of nature. Harnessing the magic of animals, plants, and the four elements, Druids heal, transform into animals, and wield elemental destruction." },
  fighter: { name: "Strength or Dexterity", desc: "Fighters rule many battlefields. Questing knights, royal champions, elite soldiers, and hardened mercenaries—as Fighters, they all share an unparalleled prowess with weapons and armor. And they are well acquainted with death, both meting it out and defying it." },
  monk: { name: "Dexterity & Wisdom", desc: "Monks focus su poder interno para crear efectos extraordinarios, incluso sobrenaturales. Canalizan velocidad y fuerza extraordinarias en sus ataques." },
  paladin: { name: "Strength & Charisma", desc: "Paladins are united by their oaths to stand against the forces of annihilation and corruption. Whether sworn before a god’s altar, in a sacred glade before nature spirits, or in a moment of desperation and grief with the dead as the only witnesses, a Paladin’s oath is a powerful bond." },
  ranger: { name: "Dexterity & Wisdom", desc: "Far from bustling cities, amid the trees of trackless forests and across wide plains, Rangers keep their unending watch in the wilderness. Rangers learn to track their quarry as a predator does, moving stealthily through the wilds and hiding themselves in brush and rubble." },
  rogue: { name: "Dexterity", desc: "Rogues rely on cunning, stealth, and their foes’ vulnerabilities to get the upper hand in any situation. They have a knack for finding the solution to just about any problem. A few even learn magical tricks to supplement their other abilities. " },
  sorcerer: { name: "Charisma", desc: "Sorcerers wield innate magic that is stamped into their being. Some Sorcerers can’t name the origin of their power, while others trace it to strange events in their personal or family history" },
  warlock: { name: "Charisma", desc: "Warlocks quest for knowledge that lies hidden in the fabric of the multiverse. They often begin their search for magical power by delving into tomes of forbidden lore, dabbling in invocations meant to attract the power of extraplanar beings, or seeking places of power where the influence of these beings can be felt" },
  wizard: { name: "Intelligence", desc: "Wizards are defined by their exhaustive study of magic’s inner workings. They cast spells of explosive fire, arcing lightning, subtle deception, and spectacular transformations. Their magic conjures monsters from other planes of existence, glimpses the future, or forms protective barriers" },
};

export const WikiClasses = () => {
  useEffectBody(() => {
    const prev = document.body.style.background;
    document.body.style.background = "#ffffffd5";
    return () => { document.body.style.background = prev; };
  }, []);
  const [classes, setClasses] = useState([]);
  const [classDetails, setClassDetails] = useState({});
  const [selectedClass, setSelectedClass] = useState(null);
  const [flippedCard, setFlippedCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      const classList = await getClassesList();
      const detailsPromises = classList.map(cls => getClassDetails(cls.url));
      const resolvedDetails = await Promise.all(detailsPromises);

      const detailsMap = {};
      resolvedDetails.forEach(detail => {
        detailsMap[detail.index] = detail;
      });

      setClasses(classList);
      setClassDetails(detailsMap);
      setLoading(false);
    };
    fetchClasses();
  }, []);

  const handleSelectClass = async (cls) => {
    const details = classDetails[cls.index];
    const levels = await getClassLevels(cls.index);
    setSelectedClass({ ...details, levels });
  };

  if (loading) return <div className="text-center mt-5">Charging classes...</div>;

  if (selectedClass) {
    const ability = primaryAbilities[selectedClass.index];

    return (
      <div className="container mt-4">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">{selectedClass.name}</h4>
            <p><strong>Primary Ability:</strong> {ability?.name}</p>
            <p className="text-muted">{ability?.desc}</p>
            <p><strong>Hit Die:</strong> d{selectedClass.hit_die}</p>

            {selectedClass.proficiencies && (
              <div>
                <strong>Proficiencies:</strong>
                <ul>{selectedClass.proficiencies.map(p => <li key={p.index}>{p.name}</li>)}</ul>
              </div>
            )}

            {selectedClass.saving_throws && (
              <div>
                <strong>Saving Throws:</strong>
                <ul>{selectedClass.saving_throws.map(st => <li key={st.index}>{st.name}</li>)}</ul>
              </div>
            )}

            {selectedClass.levels && (
              <div className="table-responsive mt-3">
                <table className="table table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th>Level</th>
                      <th>Proficiency Bonus</th>
                      <th>Class Features</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedClass.levels.map(lvl => (
                      <tr key={lvl.level}>
                        <td>{lvl.level}</td>
                        <td>{lvl.prof_bonus}</td>
                        <td>{lvl.features.map(f => f.name).join(", ")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <button className="btn btn-secondary mt-3" onClick={() => setSelectedClass(null)}>
              ← Back to main
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container mt-4">
      <div className="row">
        {classes.map(cls => {
          const details = classDetails[cls.index];
          const ability = primaryAbilities[cls.index];

          return (
            <div key={cls.index} className="col-md-4 mb-3">
              <div
                className={`wiki-card card border-0 position-relative${flippedCard === cls.index ? ' flipped' : ''}`}
                style={{ cursor: "pointer", width: "100%", height: "auto" }}
              >
                <div className="wiki-card-inner" style={{ width: "100%", height: "600px" }}>
                  {/* Cara frontal */}
                  <div className="wiki-card-front" onClick={() => setFlippedCard(cls.index)}>
                    {classImages[cls.index] && (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f9fa", borderRadius: "10px 10px 0 0", overflow: "hidden", padding: 0 }}>
                        <img
                          src={classImages[cls.index]}
                          alt={`${cls.name} background`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            borderRadius: "10px 10px 0 0",
                            display: "block"
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {/* Cara trasera */}
                  <div className="wiki-card-back p-3 d-flex flex-column justify-content-between" onClick={() => setFlippedCard(null)} style={{ cursor: "pointer" }}>
                    <div>
                      <h5 className="card-title">{cls.name}</h5>
                      <p><strong>Primary Ability:</strong> {ability?.name}</p>
                      <p className="text-muted"><strong>{ability?.desc}</strong></p>
                      <p><strong>Hit Point Die:</strong> d{details?.hit_die}</p>
                      <p><strong>Saving Throws:</strong> {details?.saving_throws?.map(st => st.name).join(", ")}</p>
                    </div>
                    <div>
                      <button className="btn btn-secondary me-2" onClick={() => handleSelectClass(cls)}>Ver detalles</button>
                      <button className="btn btn-outline-secondary" onClick={e => { e.stopPropagation(); setFlippedCard(null); }}>Volver</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
