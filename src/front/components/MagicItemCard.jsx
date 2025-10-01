import { deleteMagicItem } from "../serviceApi/magicItem.api";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";
import styles from "../styles/components/cards.module.css";

export const MagicItemCard = ({ item }) => {
  const { dispatch } = useGlobalReducer();
  const [error, setError] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const {
    name = "Poción",
    magic_item_type = "Potion",
    base_item_type = "Item",
    rarity = "Common",
    description = "",
    attunement_description = null,
    requires_attunement = false,
    base_armor = null,
    base_weapon = null,
    dex_bonus = null,
    str_requirement = null,
    stealth_check = null,
  } = item || {};

  const handleDelete = async (id) => {
    setError(false);
    const deleteItemApi = await deleteMagicItem(id);
    if (deleteItemApi.success) {
      dispatch({
        type: "deleteMagicItem",
        payload: id,
      });
    } else {
      setError(deleteItemApi.error);
    }
  };

  // Imagen por defecto según tipo
  const getDefaultImage = (type) => {
    const images = {
      'Potion': 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=300&fit=crop',
      'Scroll': 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=400&h=300&fit=crop',
      'Wand': 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&h=300&fit=crop',
      'Ring': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop',
      'Armor': 'https://images.unsplash.com/photo-1589207706249-493b5c6d2c0b?w=400&h=300&fit=crop',
      'Weapon': 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=400&h=300&fit=crop'
    };
    return images[type] || 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=400&h=300&fit=crop';
  };

  // Clases dinámicas para rareza y tipo
    const getRarityClass = () => {
    if (!rarity) return styles.rarityCommon;
    const className = `rarity${rarity.replace(/\s+/g, '')}`;
    return styles[className] || styles.rarityCommon;
  };

  const getTypeClass = () => {
    if (!magic_item_type) return styles.typeWondrousItem;
    const className = `type${magic_item_type.replace(/\s+/g, '')}`;
    return styles[className] || styles.typeWondrousItem;
  };

  const rarityClass = getRarityClass();
  const typeClass = getTypeClass();

  return (
    <div className={styles.cardWrapper}>
      <div className={`${styles.card} ${rarityClass}`}>
        <div className={styles.rarityFrame}></div>

        <div className={styles.cardInner}>
          {/* Header con nombre y coste */}
          <div className={`${styles.header} ${typeClass}`}>
            <div className={styles.cardName}>{item.name}</div>
            <div className={styles.manaCost}>
              {item.base_armor ? 'A' : item.base_weapon ? 'W' : '•'}
            </div>
          </div>

          {/* Imagen con marco */}
          <div className={styles.imageContainer}>
            <img 
              src={getDefaultImage(magic_item_type)} 
              alt={name} 
              className={styles.cardImage}
            />
          </div>

          {/* Línea de tipo */}
          <div className={`${styles.typeLine} ${typeClass}`}>
            <span>{item.magic_item_type}</span>
            <span className={styles.rarityText}>{item.rarity}</span>
          </div>

          {/* Caja de texto principal */}
          <div className={styles.textBox}>
            {/* Información de stats */}
            {(item.base_armor || item.base_weapon || item.dex_bonus !== null || item.str_requirement || item.requires_attunement) && (
              <div className={styles.statsSection}>
                {base_armor && <div><strong>Armadura Base:</strong> {item.base_armor}</div>}
                {base_weapon && <div><strong>Arma Base:</strong> {item.base_weapon}</div>}
                {dex_bonus !== null && <div><strong>Bonus Dex:</strong> +{item.dex_bonus}</div>}
                {str_requirement && <div><strong>Req. Fuerza:</strong> {item.str_requirement}</div>}
                {requires_attunement && (
                  <div className={styles.attunement}>
                    <strong>Requiere Sintonización</strong>
                    {item.attunement_description && ` (${item.attunement_description})`}
                  </div>
                )}
              </div>
            )}

            {/* Descripción */}
            {showDetails && description && (
              <div className={styles.description}>
                {item.description}
              </div>
            )}

            {!showDetails && (
              <div className={styles.descriptionPreview}>
                Tipo: {item.base_item_type}
              </div>
            )}

            {stealth_check !== null && (
              <div className={styles.stealthWarning}>
                Desventaja en pruebas de Sigilo
              </div>
            )}
          </div>

          {/* Botones de acción */}
          <div className={styles.actionButtons}>
            <button 
              className={styles.btnDetails}
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? '📋 Ocultar' : '📋 Detalles'}
            </button>
            <button
              className={styles.btnDelete}
              onClick={() => handleDelete(item.id)}
            >
              ❌ Eliminar
            </button>
          </div>

          {/* Símbolo de rareza */}
          <div className={styles.rarityGem}>{item.rarity}</div>
        </div>
      </div>

      {/* Error alert fuera de la carta */}
      {error && (
        <div className={styles.errorAlert}>
          {error}
        </div>
      )}
    </div>
  );
};