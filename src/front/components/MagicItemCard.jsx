import { deleteMagicItem } from "../serviceApi/magicItem.api";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";
import styles from "../styles/components/magicCard.module.css";

export const MagicItemCard = ({ item }) => {
  const { dispatch } = useGlobalReducer();
  const [transform, setTransform] = useState(false)

   const getImages = () => {
    const images = {
    ring: '',
    wand: '',
    wondorousItems: '',
    weapon: '',
    armor: ''
    }
  }

  

  const getRarityColor = () => {

    const rarityColors = {
  'Common': 'linear-gradient(135deg, #8d8e8b 0%, #bbbcb9 40%, #e8e9e7 70%, #bbbcb9 100%)',
  'Uncommon': 'linear-gradient(135deg, #265018 0%, #438a34 40%, #6fc05b 70%, #438a34 100%)',
  'Rare': 'linear-gradient(135deg, #341f72 0%, #5737c9 40%, #8a6ff0 70%, #5737c9 100%)',
  'Very Rare': 'linear-gradient(135deg, #8f1f05 0%, #db3210 40%, #ff6545 70%, #db3210 100%)',
  'Legendary': 'linear-gradient(135deg, #8b0968 0%, #d616a6 40%, #ff48d8 70%, #d616a6 100%)',
  'Artifact': 'linear-gradient(135deg, #3d5561 0%, #70929f 40%, #a3c5d4 70%, #70929f 100%)',
  'Varies': 'linear-gradient(135deg, #8d8e8b 0%, #bbbcb9 40%, #e8e9e7 70%, #bbbcb9 100%)',
  'Unknow Rarity': 'linear-gradient(135deg, #8d8e8b 0%, #bbbcb9 40%, #e8e9e7 70%, #bbbcb9 100%)'
};

    return rarityColors[item.rarity] || '#bbbcb9ff'; 
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
  // const getRarityClass = () => {
  //   if (!item.rarity) return '';
  //   const className = `rarity${item.rarity.replace(/\s+/g, '')}`;
  //   return styles[className] || '';
  // };

  // const getTypeClass = () => {
  //   if (!item.magic_item_type) return '';
  //   const className = `type${item.magic_item_type.replace(/\s+/g, '')}`;
  //   return styles[className] || '';
  // };

  const rarityColor = getRarityColor();

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

  return (
    <>
      <div className={styles.flipCard}>
        <div 
          onClick={() => setTransform(!transform)} 
          className={`${styles.flipCardInner} ${transform ? styles.flipCardTransform : ''}`}
        >
          {/* FRENTE DE LA CARTA */}
          <div className={`${styles.flipCardFront}`}>
            <div className={styles.cardTitle} style={{background: rarityColor}}>
              <span>{item.name}</span>
            </div>

            <div className={styles.typeLineTop}>
              Type: {item.magic_item_type}
            </div>

            <div className={styles.cardImageContainer}>
              {item.image_url ? (
                <img 
                  src={item.image_url} 
                  alt={item.name} 
                  className={styles.cardImage}
                />
              ) : (
                <div 
                  className={styles.cardImage}
                  style={{
                    backgroundImage: `url(${getDefaultImage(item.magic_item_type)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                ></div>
              )}
            </div>

            <div className={styles.typeLineBottom} style={{background: rarityColor}}>
              <span>Rarity: {item.rarity}</span>
            </div>
          </div>

          {/* DORSO DE LA CARTA */}
          <div className={styles.flipCardBack}>
            <h3 className={styles.backTitle}>Details</h3>

            <p className={styles.backDescription}>
              {item.description || 'No description available'}
            </p>

            {item.requires_attunement && (
              <p className={styles.attunementNote}>
                ⚡ Requires Attunement
                {item.attunement_description && ` (${item.attunement_description})`}
              </p>
            )}

            {item.base_armor && (
              <p className={styles.itemStats}>
                <strong>Base Armor:</strong> {item.base_armor}
              </p>
            )}

            {item.base_weapon && (
              <p className={styles.itemStats}>
                <strong>Base Weapon:</strong> {item.base_weapon}
              </p>
            )}

            {item.dex_bonus !== null && item.dex_bonus !== undefined && (
              <p className={styles.itemStats}>
                <strong>Dex Bonus:</strong> +{item.dex_bonus}
              </p>
            )}

            <div className={styles.buttonContainer}>
              <button
                className={styles.btnPrimary}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item.id);
                }}
              >
                🗑️ Delete Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
