export const initialStore=()=>{
  return{
    characters: [],
    campaign: [],
    magicsItems: [],
    classes: [],
    races: [],
    backgrounds: []
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_classes':
      return{
        ...store,
        classes: action.payload
      }
    case 'set_races':
      return{
        ...store,
        races: action.payload
      }
    case 'set_backgrounds':
      return{
        ...store,
        backgrounds: action.payload
      }
    case 'showMagicItem':
      return {
        ...store,
        magicsItems: action.payload
      };
    case 'deleteMagicItem':
      return {
        ...store,
        magicsItems: store.magicsItems.filter(item => item.id != action.payload)
      };
    case 'showCharacters':
      return {
        ...store,
        characters: action.payload
      };
    case 'deleteCharacter':
      return {
        ...store,
        characters: store.characters.filter(item => item.id != action.payload)
      };
    case 'showCampaign':
      return {
        ...store,
        campaign: action.payload
      };
    case 'deleteCampaign':
      return {
        ...store,
        campaign: store.campaign.filter(item => item.id != action.payload)
      };
    default:
      throw Error('Unknown action.');
  }    
}
