import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { updateUser, uploadImg } from "../../serviceApi/userApi";
import styles from "../../styles/page/profile.module.css";
import { calculatedUserRank } from "../../rules-forms/userRank.rules";

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
    userInfo()
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUser(formData, token)
      await userInfo()
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
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

  const totalItems =
    (user?.magics_items?.length || 0) +
    (user?.spells?.length || 0) +
    (user?.character?.length || 0) +
    (user?.campaign?.length || 0)

  const userRank = calculatedUserRank(totalItems)

  console.log('Total items:', totalItems);
console.log('User rank:', userRank);

  return (
    <>
      <div className={`container-fluid ${styles.containerFluid}`}>
        <div className="container">
          {/* Título Principal */}
          <h1 className={`mb-4 ${styles.mainTitle}`}>
            {user?.username}'s Profile
          </h1>

          {/* Contenedor Principal */}
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className={`${styles.profileContainer}`}>
                {/* Header del Perfil */}
                <div className={styles.profileHeader}>
                  {/* Avatar */}
                  <div className={styles.avatarContainer}>
                    {loadingImg && (
                      <p>
                        Loading image{" "}
                        <span
                          className={styles.spinner}
                          role="status"
                          aria-hidden="true"
                        ></span>
                      </p>
                    )}
                    {user?.avatar ? (
                      <img
                        src={user?.avatar}
                        className={styles.avatarImage}
                        alt="userImg"
                      />
                    ) : (
                      <div className={styles.avatarPlaceholder}>
                        {user?.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                    {/* Botón de editar avatar */}
                    <label className={styles.editAvatarButton}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        name="avatar"
                      />
                      <span>✏️</span>
                    </label>
                  </div>

                  {/* Info del Usuario */}
                  <div className={styles.userInfo}>
                    <h2 className={styles.username}>{user?.username}</h2>
                    <p className={styles.userRole}>Registered Users</p>
                    <p className={styles.memberInfo}>
                      Member since {user?.created_at}
                    </p>
                    <p className={styles.lastActive}>Rank : <strong>{userRank.toUpperCase()}</strong></p>
                  </div>

                  {/* Botones de Acción */}
                  {!isEditing && (
                    <div>
                      <button
                        className={`btn ${styles.editBtn}`}
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Profile
                      </button>
                    </div>
                  )}
                </div>

                {/* Contenido del Perfil */}
                <div className={styles.profileContent}>
                  {!isEditing ? (
                    <div>
                      {/* Pestañas */}
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
                              color:
                                activeTab === "info" ? "black" : "#6c757d",
                              borderBottom:
                                activeTab === "info"
                                  ? "2px solid #007bff"
                                  : "2px solid transparent"
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
                            style={{
                              color: activeTab === "activity" ? "black" : "#6c757d",
                              borderBottom: activeTab === "activity" ? "2px solid #007bff" : "2px solid transparent"
                            }}
                          >
                            Activity
                          </button>
                        </li>
                      </ul>
                      {activeTab === "info" && (
                        <div className="row">
                          <div className="col-md-6">
                            <h5 className={styles.sectionTitle}>
                              Personal Information
                            </h5>
                            <div className={styles.infoItem}>
                              <label className={styles.infoLabel}>
                                FULL NAME
                              </label>
                              <p
                                className={styles.infoValue}
                              >
                                {user?.full_name || "---"}
                              </p>
                            </div>
                            <div className={styles.infoItem}>
                              <label className={styles.infoLabel}>
                                USERNAME
                              </label>
                              <p className={styles.infoValue}>
                                {user?.username}
                              </p>
                            </div>

                            <div className={styles.infoItem}>
                              <label className={styles.infoLabel}>EMAIL</label>
                              <p className={styles.infoValue}>{user?.email}</p>
                            </div>

                            
                            <div className={styles.infoItem}>
                              <label className={styles.infoLabel}>PHONE</label>
                              <p
                                className={styles.infoValue}
                              >
                                {user?.phone || "---"}
                              </p>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <h5 className={styles.sectionTitle}>
                              Adicional Details
                            </h5>

                            <div className={styles.infoItem}>
                              <label className={styles.infoLabel}>
                                BIRTHDATE
                              </label>
                              <p
                                className={styles.infoValue}
                              >
                                {user?.birthdate
                                  ? new Date(
                                    user?.birthdate
                                  ).toLocaleDateString("es-ES")
                                  : "---"}
                              </p>
                            </div>

                            <div className={styles.infoItem}>
                              <label className={styles.infoLabel}>GENDER</label>
                              <p
                                className={styles.infoValue}
                              >
                                {user?.gender || "---"}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Pestaña de actividad */}
                      {activeTab === "activity" && (
                        <div>
                          {/* Resumen de actividad */}
                          <div>
                            <h5 className={styles.sectionTitle}>
                              Activity Summary
                            </h5>
                            <div className={`row ${styles.statsContainer}`}>
                              <div className="col-md-3">
                                <div className={styles.statCard}>
                                  <h4
                                    className={`${styles.statNumber} ${styles.statNumberMissions}`}
                                  >
                                    0
                                  </h4>
                                  <small className={styles.statLabel}>
                                    Characters
                                  </small>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div className={styles.statCard}>
                                  <h4
                                    className={`${styles.statNumber} ${styles.statNumberAchievements}`}
                                  >
                                    0
                                  </h4>
                                  <small className={styles.statLabel}>
                                    Campaigns
                                  </small>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div className={styles.statCard}>
                                  <h4
                                    className={`${styles.statNumber} ${styles.statNumberItems}`}
                                  >
                                    {user?.magics_items?.length || 0}
                                  </h4>
                                  <small className={styles.statLabel}>
                                    Magic Items
                                  </small>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div className={styles.statCard}>
                                  <h4
                                    className={`${styles.statNumber} ${styles.statNumberSpells}`}
                                  >
                                    {user?.spells?.length || 0}
                                  </h4>
                                  <small className={styles.statLabel}>
                                    Spells
                                  </small>
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
                      <h5 className={styles.sectionTitle}>
                        Edit Profile Information
                      </h5>
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label
                                htmlFor="username"
                                className={styles.formLabel}
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
                                className={styles.formLabel}
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
                                className={styles.formLabel}
                              >
                                FULL NAME
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleInputChange}
                                placeholder="Your full name"
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="mb-3">
                              <label
                                htmlFor="phone"
                                className={styles.formLabel}
                              >
                                PHONE
                              </label>
                              <input
                                type="tel"
                                className="form-control"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Your phone"
                              />
                            </div>

                            <div className="mb-3">
                              <label
                                htmlFor="birthdate"
                                className={styles.formLabel}
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
                                className={styles.formLabel}
                              >
                                GENDER
                              </label>
                              <select
                                className="form-select"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                              >
                                <option value="">Select...</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                                <option value="I prefer not to say">
                                  I prefer not to say
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className={styles.formButtons}>
                          <button
                            type="submit"
                            className={styles.btnSaveChanges}
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <span className={styles.spinner}></span>
                                Saving...
                              </>
                            ) : (
                              "Save Changes"
                            )}
                          </button>
                          <button
                            type="button"
                            className={styles.btnReturn}
                            onClick={handleCancel}
                            disabled={loading}
                          >
                            Return
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
