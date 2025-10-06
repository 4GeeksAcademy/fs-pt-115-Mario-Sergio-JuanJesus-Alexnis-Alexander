import { useEffect, useState } from "react";
import "./WikiClasses.css";
import { getClassesList, getClassDetails, getClassLevels } from "../../serviceApi/WikiAPI/WikiClassesAPI";
import barbarianImg from "../../assets/img/638607453019977939.png";
import bardImg from "../../assets/img/638607457242601819.png";
import clericImg from "../../assets/img/638607457550642172.png";
import druidImg from "../../assets/img/638607457905913506.png";
import fighterImg from "../../assets/img/638607458265993956.png";
import monkImg from "../../assets/img/638607456914661514.png";
import paladinImg from "../../assets/img/638607458603093196.png";
import rangerImg from "../../assets/img/638607458991513657.png";
import rogueImg from "../../assets/img/638607459371603812.png";
import sorcererImg from "../../assets/img/638607459717652437.png";
import warlockImg from "../../assets/img/638607460047750778.png";
import wizardImg from "../../assets/img/638607460388570205.png";

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

export const WikiClasses = () => {
  useEffect(() => {
    const prev = document.body.style.background;
    document.body.style.background = "rgba(15, 98, 180, 1)";
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
      resolvedDetails.forEach(detail => { detailsMap[detail.index] = detail; });
      setClasses(classList);
      setClassDetails(detailsMap);
      setLoading(false);
    };
    fetchClasses();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading classes...</div>;

  return (
    <div className="container mt-4">
      {/* Banner principal */}
      <div className="page-title text-center py-3 mb-4">
        <h1>Classes</h1>
      </div>

      {/* GRID de clases */}
      <div className="row">
        {classes.map(cls => (
          <div key={cls.index} className="col-md-4 mb-3">
            <div
              className={`wiki-card card border-0 position-relative${flippedCard === cls.index ? " flipped" : ""}`}
              style={{ cursor: "pointer", width: "100%", height: "600px" }}
              onClick={() => setFlippedCard(flippedCard === cls.index ? null : cls.index)}
            >
              <div className="wiki-card-inner" style={{ width: "100%", height: "100%" }}>
                {/* Cara frontal */}
                <div className="wiki-card-front">
                  {classImages[cls.index] && (
                    <img
                      src={classImages[cls.index]}
                      alt={cls.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  )}
                </div>

                {/* Cara trasera */}
                <div className="wiki-card-back p-3 d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{cls.name}</h5>
                  </div>
                  <button className="btn btn-outline-secondary" onClick={() => setFlippedCard(null)}>Go back</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
