export const initialStore=()=>{
  return{
    token:localStorage.getItem("token") || null,
    characters: [],
    magicsItems: [],
    classes: [],
    races: [],
    backgrounds: []
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case "set_token":
      localStorage.setItem("token", action.payload);
      return { ...store, token: action.payload };
    case "logout":
      localStorage.removeItem("token");
      return { ...store, token: null };
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
    default:
      throw Error('Unknown action.');
  }    
}
