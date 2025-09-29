export const initialStore = () => {
  return {
    characters: [],
    campaign: [],
    magicsItems: [],
    classes: [],
    races: [],
    backgrounds: [],
    monsters: [],
    spells: [],
    feats: [],
    subclasses: [],
    species: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_monsters":
      return {
        ...store,
        monsters: action.payload,
      };
    case "deleteMonster":
      return {
        ...store,
        monsters: store.monsters.filter((item) => item.id != action.payload),
      };
    case "set_classes":
      return {
        ...store,
        classes: action.payload,
      };

    case "set_spells":
      return {
        ...store,
        spells: action.payload,
      };

    case "deleteSpell":
      return {
        ...store,
        spells: store.spells.filter((item) => item.spell_id != action.payload),
      };

    case "set_feats":
      return {
        ...store,
        feats: action.payload,
      };

    case "deleteFeats":
      return {
        ...store,
        feats: store.feats.filter((item) => item.feats_id != action.payload),
      };

    case "set_races":
      return {
        ...store,
        races: action.payload,
      };

    case "set_subclasses":
      return {
        ...store,
        subclasses: action.payload,
      };

    case "deleteSubclasses":
      return {
        ...store,
        subclasses: store.subclasses.filter(
          (item) => item.subclasses_id != action.payload
        ),
      };

    case "set_races":
      return {
        ...store,
        races: action.payload,
      };

    case "set_backgrounds":
      return {
        ...store,
        backgrounds: action.payload,
      };

    case "set_species":
      return {
        ...store,
        species: action.payload,
      };

    case "deleteSpecie":
      return {
        ...store,
        species: store.species.filter(
          (item) => item.specie_id != action.payload
        ),
      };
    case "set_races":
      return {
        ...store,
        races: action.payload,
      };
    case "set_backgrounds":
      return {
        ...store,
        backgrounds: action.payload,
      };
    case "showBackground":
      return {
        ...store,
        backgrounds: action.payload,
      };
    case "deleteBackground":
      return {
        ...store,
        backgrounds: action.payload,
      };
    case "showBackground":
      return {
        ...store,
        backgrounds: action.payload,
      };
    case "deleteBackground":
      return {
        ...store,
        backgrounds: store.backgrounds.filter(
          (item) => item.id != action.payload
        ),
      };
    case "showMonsters":
      return {
        ...store,
        monsters: action.payload,
      };
    case "deleteMonster":
      return {
        ...store,
        monsters: store.monsters.filter((item) => item.id != action.payload),
      };
    case "showMagicItem":
      return {
        ...store,
        magicsItems: action.payload,
      };
    case "deleteMagicItem":
      return {
        ...store,
        magicsItems: store.magicsItems.filter(
          (item) => item.id != action.payload
        ),
      };
    case "showCharacters":
      return {
        ...store,
        characters: action.payload,
      };
    case "deleteCharacter":
      return {
        ...store,
        characters: store.characters.filter(
          (item) => item.id != action.payload
        ),
      };
    case "showCampaign":
      return {
        ...store,
        campaign: action.payload,
      };
    case "deleteCampaign":
      return {
        ...store,
        campaign: store.backgrounds.filter((item) => item.id != action.payload),
      };

    case "deleteBackground":
      return {
        ...store,
        backgrounds: store.backgrounds.filter(
          (item) => item.id != action.payload
        ),
      };
    case "showMonsters":
      return {
        ...store,
        monsters: action.payload,
      };
    case "deleteMonster":
      return {
        ...store,
        monsters: store.monsters.filter((item) => item.id != action.payload),
      };
    case "showMagicItem":
      return {
        ...store,
        magicsItems: action.payload,
      };
    case "deleteMagicItem":
      return {
        ...store,
        magicsItems: store.magicsItems.filter(
          (item) => item.id != action.payload
        ),
      };
    case "showCharacters":
      return {
        ...store,
        characters: action.payload,
      };
    case "deleteCharacter":
      return {
        ...store,
        characters: store.characters.filter(
          (item) => item.id != action.payload
        ),
      };
    case "showCampaign":
      return {
        ...store,
        campaign: action.payload,
      };
    case "deleteCampaign":
      return {
        ...store,
        campaign: store.campaign.filter((item) => item.id != action.payload),
      };
    default:
      throw Error(action.type);
  }
}
