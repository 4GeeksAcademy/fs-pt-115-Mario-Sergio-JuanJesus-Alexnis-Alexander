import { deleteMagicItem } from "../serviceApi/magicItem.api";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";
import styles from "../styles/components/magicCard.module.css";

export const MagicItemCard = ({ item }) => {
  const { dispatch } = useGlobalReducer();
  const [error, setError] = useState(false)
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
    'Common': 'linear-gradient(135deg, #2b2b2bff 0%, #232422ff 40%, #0f1608ff 70%, #232323ff 100%)',
    'Uncommon': 'linear-gradient(135deg, #265018 0%, #438a34 40%, #6fc05b 70%, #438a34 100%)',
    'Rare': 'linear-gradient(135deg, #341f72 0%, #5737c9 40%, #8a6ff0 70%, #5737c9 100%)',
    'Very Rare': 'linear-gradient(135deg, #8f1f05 0%, #db3210 40%, #ff6545 70%, #db3210 100%)',
    'Legendary': 'linear-gradient(135deg, #8b0968 0%, #d616a6 40%, #ff48d8 70%, #d616a6 100%)',
    'Artifact': 'linear-gradient(135deg, #3d5561 0%, #70929f 40%, #a3c5d4 70%, #70929f 100%)',
    'Varies': 'linear-gradient(135deg, #2b2b2bff 0%, #232422ff 40%, #0f1608ff 70%, #232323ff 100%)',
    'Unknow Rarity': 'linear-gradient(135deg, #2b2b2bff 0%, #232422ff 40%, #0f1608ff 70%, #232323ff 100%)'
};

    return rarityColors[item.rarity] || '#bbbcb9ff'; 
  };

    // Imagen por defecto según tipo
  const getDefaultImage = (type) => {
    const images = {
      Potion: 'https://imgs.search.brave.com/ppko9Q4iyjOhAPFeNkNfL44D16fLXjsc2z0UZ9_I85Q/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jdWV2/YWRlbG9iby5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMTgv/MDEvc2t5cmltX3Bv/dGlvbnNfYnlfZXRy/ZWxsZXktZDhob3N0/Yy5qcGc',
      Scroll: 'https://imgs.search.brave.com/TMFaMVxIi8TsANc7IJvzF6o-uw4AJ078bKG30c3TjTc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzY4Lzlj/LzE0LzY4OWMxNDMx/Njk5ZTVkMjZmMWY4/NzJiMmFiOGViNDQz/LmpwZw',
      Wand: 'https://imgs.search.brave.com/14iAk21c9ddA6T6ocJYvDJIQnyxzLJmMqyqfeyLVUEs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzliLzA2/LzIwLzliMDYyMGE5/OWQ0Y2EyYzVjZTRl/YmI2NTFmYmQxZDRh/LmpwZw',
      Ring: 'https://imgs.search.brave.com/_-CxdMMC_MZNyXtsGPQE7NJAN0kEBXKfGZEqlIHMlYY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS9hbmlsbG8tYW5p/bGxvLWNvbG9yaWRv/LXF1ZS10aWVuZS1w/YWxhYnJhLWVsXzE1/NDc5Ny02ODAuanBn/P3NlbXQ9YWlzX2h5/YnJpZCZ3PTc0MA',
      Armor: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFJTSJR00n8lkgXFd7BImDJMO8VOh6uSg0sw&s',
      Weapon: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=500&fit=crop'
    };
    return images[type] || 'https://imgs.search.brave.com/LffJasfVDWK08wuVt9nN3DdumcEsM31RvNRYTBEDbYU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90by1ncmF0aXMv/Ym9kZWdvbi1tYXBh/LWRhZG9zXzIzLTIx/NDkzNTIyOTIuanBn/P3NlbXQ9YWlzX2h5/YnJpZA';
  };


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
      <div className={styles.flipCard} style={{height: '350px'}}>
        <div 
          onClick={() => setTransform(!transform)} 
          className={`${styles.flipCardInner} ${transform ? styles.flipCardTransform : ''}`}
          
        >
          {/* FRENTE DE LA CARTA */}
          <div className={`${styles.flipCardFront}`}>
            <div className={styles.cardTitle} style={{background: rarityColor}}>
              <span>{item.name}</span>
              <span>{item.version ? item.version : '-'}</span>
            </div>

            <div className={styles.typeBox}>
              Type: {item.magic_item_type || item.base_item_type}
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

            <div className={styles.rarityBox} style={{background: rarityColor}}>
              <span>Rarity: {item.rarity}</span>
            </div>
          </div>

          {/* DORSO DE LA CARTA */}
          <div className={styles.flipCardBack}>
            <h3 className={styles.backTitle}>Description</h3>

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

            {item.stealth_check && (
              <p className={styles.itemStats}>
                <strong>Stealth check:</strong> {item.stealth_check}
              </p>
            )}

            {item.str_requirement && (
              <p className={styles.itemStats}>
                <strong>Str requirement:</strong> {item.str_requirement}
              </p>
            )}

            {item.dex_bonus && (
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
