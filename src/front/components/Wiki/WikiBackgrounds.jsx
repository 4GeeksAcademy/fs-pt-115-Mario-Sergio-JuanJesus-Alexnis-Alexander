import { useEffect, useState } from "react";
import { getBackgroundsList, getBackgroundDetails } from "../../serviceApi/WikiAPI/WikiBackgroundsAPI";
import "./WikiBackgrounds.css"; // para banner y estilos generales

export const WikiBackgrounds = () => {
  console.log("WikiBackgrounds component loaded");

  const [backgrounds, setBackgrounds] = useState([]);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBackgrounds = async () => {
      try {
        setLoading(true);

        const list = await getBackgroundsList();

        const listWithPrelimDetails = await Promise.all(
          list.map(async (bg) => {
            const details = await getBackgroundDetails(bg.index);
            return {
              ...bg,
              skill_proficiencies: details.skill_proficiencies,
              tool_proficiencies: details.tool_proficiencies,
              feature: details.feature
            };
          })
        );

        setBackgrounds(listWithPrelimDetails);
      } catch (error) {
        console.error("Error fetching backgrounds:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBackgrounds();
  }, []);

  const handleSelectBackground = async (bg) => {
    try {
      const details = await getBackgroundDetails(bg.index);

      const detailedBg = {
        name: details.name,
        ability_scores: details.ability_scores || [],
        feat: details.feat || null,
        skill_proficiencies: details.skill_proficiencies || [],
        tool_proficiencies: details.tool_proficiencies || [],
        equipment: details.equipment || [],
        feature: details.feature || null
      };

      setSelectedBackground(detailedBg);
    } catch (error) {
      console.error("Error fetching background details:", error);
    }
  };

  if (loading) return <div className="text-center mt-5">Cargando backgrounds...</div>;

  // Vista de detalle completo
  if (selectedBackground) {
    return (
      <div className="container mt-4">
        {/* Banner principal */}
        <div className="page-title text-center py-3 mb-4">
          <h1>Wiki Backgrounds</h1>
        </div>

        <div className="card">
          <div className="card-body">
            <h4 className="card-title">{selectedBackground.name}</h4>

            {selectedBackground.ability_scores.length > 0 && (
              <p><strong>Ability Scores:</strong> {selectedBackground.ability_scores.join(", ")}</p>
            )}

            {selectedBackground.feat && (
              <p><strong>Feat:</strong> {selectedBackground.feat}</p>
            )}

            {selectedBackground.skill_proficiencies.length > 0 && (
              <p><strong>Skill Proficiencies:</strong> {selectedBackground.skill_proficiencies.map(s => s.name).join(", ")}</p>
            )}

            {selectedBackground.tool_proficiencies.length > 0 && (
              <p><strong>Tool Proficiencies:</strong> {selectedBackground.tool_proficiencies.map(t => t.name).join(", ")}</p>
            )}

            {selectedBackground.equipment.length > 0 && (
              <p><strong>Equipment:</strong> {selectedBackground.equipment.map(e => e.name).join(", ")}</p>
            )}

            {selectedBackground.feature && (
              <p><strong>Feature:</strong> {selectedBackground.feature.name} — {selectedBackground.feature.desc}</p>
            )}

            <button className="btn btn-secondary mt-3" onClick={() => setSelectedBackground(null)}>
              Volver a todos los backgrounds
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Vista de listado
  return (
    <div className="container mt-4">
      {/* Banner principal */}
      <div className="page-title text-center py-3 mb-4">
        <h1>Backgrounds</h1>
      </div>

      <div className="row">
        {backgrounds.map(bg => (
          <div key={bg.index} className="col-md-12 mb-3">
            <div
              className="card h-100"
              style={{ cursor: "pointer" }}
              onClick={() => handleSelectBackground(bg)}
            >
              <div className="card-body">
                <h5 className="card-title">{bg.name}</h5>

                {bg.skill_proficiencies && (
                  <p><strong>Skills:</strong> {bg.skill_proficiencies.map(s => s.name).join(", ")}</p>
                )}

                {bg.tool_proficiencies && bg.tool_proficiencies.length > 0 && (
                  <p><strong>Tools:</strong> {bg.tool_proficiencies.map(t => t.name).join(", ")}</p>
                )}

                {bg.feature && (
                  <p><strong>Feature:</strong> {bg.feature.name}</p>
                )}

                <p className="text-muted">Haz click para ver más detalles</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
