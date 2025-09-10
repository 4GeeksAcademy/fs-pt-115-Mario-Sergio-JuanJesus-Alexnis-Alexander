export const initialStore=()=>{
  return{
    magicsItems: []
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'showMagicItem':
      return {
        ...store,
        magicsItems: action.payload
      };
    default:
      throw Error('Unknown action.');
  }    
}
