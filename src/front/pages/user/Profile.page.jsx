import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { uploadImg } from "../../serviceApi/userApi";

export const ProfilePage = () => {
  const { user, token, userInfo } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    full_name: user?.full_name || "",
    phone: user?.phone || "",
    birthdate: user?.birthdate || "",
    gender: user?.gender || "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpoloadImage = async () => {
    setLoadingImg(true);
    await uploadImg(file, token);
    await userInfo();
    setLoadingImg(false);
  };

  useEffect(() => {
    if (file) {
      handleUpoloadImage();
    }
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Aquí harías la llamada a tu API para actualizar el perfil

      // Simulación de llamada API

      // Aquí actualizarías el contexto de usuario con los nuevos datos
      alert("Perfil actualizado correctamente!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      alert("Error al actualizar el perfil");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      username: user?.username || "",
      email: user?.email || "",
      full_name: user?.full_name || "",
      phone: user?.phone || "",
      birthdate: user?.birthdate || "",
      gender: user?.gender || "",
    });
    setIsEditing(false);
  };

  return (
    <>
      <div
        className="container-fluid"
        style={{
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
          paddingTop: "20px",
        }}
      >
        <div className="container">
          {/* Título Principal */}
          <h1
            className="mb-4"
            style={{
              fontSize: "2.5rem",
              fontWeight: "300",
              color: "#343a40",
              borderBottom: "3px solid #f1c40f",
              paddingBottom: "10px",
            }}
          >
            {user?.username}'s Profile
          </h1>

          {/* Contenedor Principal */}
          <div className="row">
            <div className="col-lg-8">
              <div
                className="bg-white rounded shadow-sm"
                style={{ border: "1px solid #dee2e6" }}
              >
                {/* Header del Perfil */}
                <div
                  className="d-flex align-items-center p-4"
                  style={{ borderBottom: "1px solid #dee2e6" }}
                >
                  {/* Avatar */}
                  <div className="me-4 position-relative">
                    {loadingImg && (
                        <p>
                          Loading image{" "}
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        </p>
                      )}
                    {user?.avatar ? (
                      <img
                        src={user?.avatar}
                        style={{
                          width: "90px",
                          objectFit: "cover",
                          objectPosition: "center",
                          height: "100px",
                          background:
                            "linear-gradient(135deg, #f39c12, #f1c40f)",
                          borderRadius: "8px",
                          boxShadow: "0 2px 8px rgba(241, 196, 15, 0.3)",
                        }}
                        alt="userImg"
                      />
                    ) : (
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          width: "90px",
                          height: "100px",
                          background: "linear-gradient(135deg, #f39c12, #f1c40f)",
                          borderRadius: "8px",
                          fontSize: "2.5rem",
                          fontWeight: "bold",
                          color: "#2c3e50",
                          boxShadow: "0 2px 8px rgba(241, 196, 15, 0.3)",
                        }}
                      >
                        {user?.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                    {/* Botón de editar avatar en la esquina */}
                    <label
                      className="position-absolute"
                      style={{
                        bottom: "-4px",
                        right: "-4px",
                        width: "28px",
                        height: "28px",
                        backgroundColor: "#28a745",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        border: "2px solid white",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = "#218838"}
                      onMouseLeave={(e) => e.target.style.backgroundColor = "#28a745"}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: "none" }}
                        name="avatar"
                      />
                      <span style={{ fontSize: "12px" }}>✏️</span>
                    </label>
                  </div>
                  

                  {/* Info del Usuario */}
                  <div className="flex-grow-1">
                    <h2
                      className="mb-1"
                      style={{ fontSize: "1.8rem", fontWeight: "400" }}
                    >
                      {user?.username}
                    </h2>
                    <p className="text-muted mb-2">Registered Users</p>
                    <p
                      className="text-muted mb-0"
                      style={{ fontSize: "0.875rem" }}
                    >
                      Member for {new Date().toLocaleDateString("es-ES")}
                    </p>
                    <p className="text-muted" style={{ fontSize: "0.875rem" }}>
                      Last active 5 hours ago
                    </p>
                  </div>

                  {/* Botones de Acción */}
                  {!isEditing && (
                    <div className="ms-3">
                      <button
                        className="btn btn-dark me-2"
                        style={{ fontSize: "0.875rem", padding: "8px 16px" }}
                      >
                        My account
                      </button>
                      <button
                        className="btn btn-dark"
                        style={{ fontSize: "0.875rem", padding: "8px 16px" }}
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Profile
                      </button>
                    </div>
                  )}
                </div>

                {/* Contenido del Perfil */}
                <div className="p-4">
                  {!isEditing ? (
                    <div>
                      {/* Tabs */}
                      <ul
                        className="nav nav-tabs mb-4"
                        style={{ borderBottom: "2px solid #dee2e6" }}
                      >
                        <li className="nav-item">
                          <button
                            className={
                              activeTab === "info"
                                ? "nav-link active"
                                : "nav-link"
                            }
                            onClick={() => setActiveTab("info")}
                            style={{
                              color: "#343a40",
                              borderBottom: "2px solid #007bff",
                              backgroundColor: "transparent",
                            }}
                          >
                            Information
                          </button>
                        </li>
                        <li className="nav-item">
                          <button
                            className={
                              activeTab === "activity"
                                ? "nav-link active"
                                : "nav-link"
                            }
                            onClick={() => setActiveTab("activity")}
                            style={{ color: "#6c757d" }}
                          >
                            Activity
                          </button>
                        </li>
                      </ul>

                      {activeTab === "info" && (
                        /* Información del Usuario */
                        <div className="row">
                          <div className="col-md-6">
                            <h5
                              className="mb-3"
                              style={{ color: "#343a40", fontWeight: "500" }}
                            >
                              Personal Information
                            </h5>

                            <div className="mb-3">
                              <label
                                className="form-label text-muted"
                                style={{
                                  fontSize: "0.875rem",
                                  fontWeight: "600",
                                }}
                              >
                                USERNAME
                              </label>
                              <p
                                className="mb-0"
                                style={{ fontSize: "0.95rem" }}
                              >
                                {user?.username}
                              </p>
                            </div>

                            <div className="mb-3">
                              <label
                                className="form-label text-muted"
                                style={{
                                  fontSize: "0.875rem",
                                  fontWeight: "600",
                                }}
                              >
                                EMAIL
                              </label>
                              <p
                                className="mb-0"
                                style={{ fontSize: "0.95rem" }}
                              >
                                {user?.email}
                              </p>
                            </div>

                            <div className="mb-3">
                              <label
                                className="form-label text-muted"
                                style={{
                                  fontSize: "0.875rem",
                                  fontWeight: "600",
                                }}
                              >
                                COMPLET NAME
                              </label>
                              <p
                                className="mb-0 text-muted"
                                style={{ fontSize: "0.95rem" }}
                              >
                                {user?.full_name || "No especificado"}
                              </p>
                            </div>

                            <div className="mb-3">
                              <label
                                className="form-label text-muted"
                                style={{
                                  fontSize: "0.875rem",
                                  fontWeight: "600",
                                }}
                              >
                                PHONE
                              </label>
                              <p
                                className="mb-0 text-muted"
                                style={{ fontSize: "0.95rem" }}
                              >
                                {user?.phone || "No especificado"}
                              </p>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <h5
                              className="mb-3"
                              style={{ color: "#343a40", fontWeight: "500" }}
                            >
                              Adicional Details
                            </h5>

                            <div className="mb-3">
                              <label
                                className="form-label text-muted"
                                style={{
                                  fontSize: "0.875rem",
                                  fontWeight: "600",
                                }}
                              >
                                BIRTHDATE
                              </label>
                              <p
                                className="mb-0 text-muted"
                                style={{ fontSize: "0.95rem" }}
                              >
                                {user?.birthdate
                                  ? new Date(
                                    user?.birthdate
                                  ).toLocaleDateString("es-ES")
                                  : "No especificada"}
                              </p>
                            </div>

                            <div className="mb-3">
                              <label
                                className="form-label text-muted"
                                style={{
                                  fontSize: "0.875rem",
                                  fontWeight: "600",
                                }}
                              >
                                GENDER
                              </label>
                              <p
                                className="mb-0 text-muted"
                                style={{ fontSize: "0.95rem" }}
                              >
                                {user?.gender || "No especificado"}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      {activeTab === "activity" && (
                        <div>
                          <div className="row">
                            <div className="col-md-6">
                              <h5
                                className="mb-3"
                                style={{ color: "#343a40", fontWeight: "500" }}
                              >
                                Objetos Mágicos
                              </h5>

                              {user?.magics_items &&
                                user.magics_items.length > 0 ? (
                                <div className="list-group">
                                  {user.magics_items.map((item, index) => (
                                    <div
                                      key={index}
                                      className="list-group-item border-0 px-0"
                                    >
                                      <div className="d-flex align-items-center">
                                        <div
                                          className="me-3 d-flex align-items-center justify-content-center"
                                          style={{
                                            width: "40px",
                                            height: "40px",
                                            background:
                                              "linear-gradient(135deg, #f39c12, #f1c40f)",
                                            borderRadius: "8px",
                                            color: "#2c3e50",
                                          }}
                                        >
                                          <i className="fas fa-magic"></i>
                                        </div>
                                        <div>
                                          <h6 className="mb-1">
                                            {item.name ||
                                              `Objeto Mágico ${index + 1}`}
                                          </h6>
                                          <small className="text-muted">
                                            {item.description ||
                                              "Objeto mágico especial"}
                                          </small>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center py-4">
                                  <i className="fas fa-magic fa-3x text-muted mb-3"></i>
                                  <p className="text-muted">
                                    Aún no tienes objetos mágicos
                                  </p>
                                  <small className="text-muted">
                                    Explora el mundo para encontrar objetos
                                    especiales
                                  </small>
                                </div>
                              )}
                            </div>

                            <div className="col-md-6">
                              <h5
                                className="mb-3"
                                style={{ color: "#343a40", fontWeight: "500" }}
                              >
                                Hechizos
                              </h5>

                              {user?.spells && user.spells.length > 0 ? (
                                <div className="list-group">
                                  {user.spells.map((spell, index) => (
                                    <div
                                      key={index}
                                      className="list-group-item border-0 px-0"
                                    >
                                      <div className="d-flex align-items-center">
                                        <div
                                          className="me-3 d-flex align-items-center justify-content-center"
                                          style={{
                                            width: "40px",
                                            height: "40px",
                                            background:
                                              "linear-gradient(135deg, #9b59b6, #8e44ad)",
                                            borderRadius: "8px",
                                            color: "white",
                                          }}
                                        >
                                          <i className="fas fa-fire"></i>
                                        </div>
                                        <div>
                                          <h6 className="mb-1">
                                            {spell.name ||
                                              `Hechizo ${index + 1}`}
                                          </h6>
                                          <small className="text-muted">
                                            {spell.description ||
                                              "Hechizo poderoso"}
                                          </small>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center py-4">
                                  <i className="fas fa-fire fa-3x text-muted mb-3"></i>
                                  <p className="text-muted">
                                    Aún no conoces hechizos
                                  </p>
                                  <small className="text-muted">
                                    Aprende hechizos para aumentar tu poder
                                  </small>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Estadísticas detalladas */}
                          <div
                            className="mt-4 pt-4"
                            style={{ borderTop: "1px solid #dee2e6" }}
                          >
                            <h5
                              className="mb-3"
                              style={{ color: "#343a40", fontWeight: "500" }}
                            >
                              Resumen de Actividad
                            </h5>
                            <div className="row text-center">
                              <div className="col-md-3">
                                <div
                                  className="p-3"
                                  style={{
                                    background: "#f8f9fa",
                                    borderRadius: "8px",
                                  }}
                                >
                                  <h4
                                    style={{
                                      color: "#f39c12",
                                      fontWeight: "600",
                                    }}
                                  >
                                    {user?.magics_items?.length || 0}
                                  </h4>
                                  <small className="text-muted">
                                    Objetos Mágicos
                                  </small>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div
                                  className="p-3"
                                  style={{
                                    background: "#f8f9fa",
                                    borderRadius: "8px",
                                  }}
                                >
                                  <h4
                                    style={{
                                      color: "#9b59b6",
                                      fontWeight: "600",
                                    }}
                                  >
                                    {user?.spells?.length || 0}
                                  </h4>
                                  <small className="text-muted">Hechizos</small>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div
                                  className="p-3"
                                  style={{
                                    background: "#f8f9fa",
                                    borderRadius: "8px",
                                  }}
                                >
                                  <h4
                                    style={{
                                      color: "#27ae60",
                                      fontWeight: "600",
                                    }}
                                  >
                                    0
                                  </h4>
                                  <small className="text-muted">Misiones</small>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div
                                  className="p-3"
                                  style={{
                                    background: "#f8f9fa",
                                    borderRadius: "8px",
                                  }}
                                >
                                  <h4
                                    style={{
                                      color: "#e74c3c",
                                      fontWeight: "600",
                                    }}
                                  >
                                    0
                                  </h4>
                                  <small className="text-muted">Logros</small>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    // Formulario de Edición
                    <div>
                      <h5
                        className="mb-4"
                        style={{ color: "#343a40", fontWeight: "500" }}
                      >
                        Edit Profile Information
                      </h5>

                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label
                                htmlFor="username"
                                className="form-label"
                                style={{
                                  fontSize: "0.875rem",
                                  fontWeight: "600",
                                }}
                              >
                                USERNAME *
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                                style={{ borderRadius: "4px" }}
                              />
                            </div>

                            <div className="mb-3">
                              <label
                                htmlFor="email"
                                className="form-label"
                                style={{
                                  fontSize: "0.875rem",
                                  fontWeight: "600",
                                }}
                              >
                                EMAIL *
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                style={{ borderRadius: "4px" }}
                              />
                            </div>

                            <div className="mb-3">
                              <label
                                htmlFor="full_name"
                                className="form-label"
                                style={{
                                  fontSize: "0.875rem",
                                  fontWeight: "600",
                                }}
                              >
                                COMPLET NAME
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleInputChange}
                                placeholder="Introduce tu nombre completo"
                                style={{ borderRadius: "4px" }}
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="mb-3">
                              <label
                                htmlFor="phone"
                                className="form-label"
                                style={{
                                  fontSize: "0.875rem",
                                  fontWeight: "600",
                                }}
                              >
                                PHONE
                              </label>
                              <input
                                type="tel"
                                className="form-control"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Introduce tu número de teléfono"
                                style={{ borderRadius: "4px" }}
                              />
                            </div>

                            <div className="mb-3">
                              <label
                                htmlFor="birthdate"
                                className="form-label"
                                style={{
                                  fontSize: "0.875rem",
                                  fontWeight: "600",
                                }}
                              >
                                BIRTHDATE
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                name="birthdate"
                                value={formData.birthdate}
                                onChange={handleInputChange}
                                style={{ borderRadius: "4px" }}
                              />
                            </div>

                            <div className="mb-3">
                              <label
                                htmlFor="gender"
                                className="form-label"
                                style={{
                                  fontSize: "0.875rem",
                                  fontWeight: "600",
                                }}
                              >
                                GENDER
                              </label>
                              <select
                                className="form-select"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                style={{ borderRadius: "4px" }}
                              >
                                <option value="">Select...</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                                <option value="prefiero_no_decir">
                                  Prefiero no decir
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex gap-2 mt-4">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                            style={{ borderRadius: "4px" }}
                          >
                            {loading ? (
                              <>
                                <span
                                  className="spinner-border spinner-border-sm me-2"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                                Saving...
                              </>
                            ) : (
                              "Save Changes"
                            )}
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={handleCancel}
                            disabled={loading}
                            style={{ borderRadius: "4px" }}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                       
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
