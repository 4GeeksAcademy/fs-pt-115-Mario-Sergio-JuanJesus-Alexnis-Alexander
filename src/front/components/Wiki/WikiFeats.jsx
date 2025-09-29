import { useEffect, useState } from "react";
import { getFeatsList, getFeatDetails } from "../../serviceApi/WikiAPI/WikiFeatsAPI";

export const WikiFeats = () => {
  const [feats, setFeats] = useState([]);
  const [selectedFeat, setSelectedFeat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeats = async () => {
      setLoading(true);
      const list = await getFeatsList();
      setFeats(list); 
      setLoading(false);
    };
    fetchFeats();
  }, []);

  const handleSelectFeat = async (feat) => {
    const details = await getFeatDetails(feat.index);
    setSelectedFeat(details);
  };

  if (loading) return <div className="text-center mt-5">Cargando feats...</div>;

  // Vista de detalle de un feat
  if (selectedFeat) {
    return (
      <div className="container mt-4">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">{selectedFeat.name}</h4>
            {selectedFeat.desc?.map((d, i) => (
              <p key={i}>{d}</p>
            ))}
            <button className="btn btn-secondary mt-3" onClick={() => setSelectedFeat(null)}>
              ← Volver a todos los feats
            </button>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="container mt-4">
      <div className="row">
        {feats.map(feat => (
          <div key={feat.index} className="col-md-12 mb-3">
            <div
              className="card h-100"
              onClick={() => handleSelectFeat(feat)}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body">
                <h5 className="card-title">{feat.name}</h5>
                <p className="text-muted">Haz click para ver detalles</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
