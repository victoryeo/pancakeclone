export const initialState = {
  breakfast: 'none',
  burger : 'none',
  honey: 'none',
  vegetables: 'none',
  soda: 'none',
  tequila: 'none'
}

export const reducers = (state = initialState, action) => {
  console.log("actiontype "+action.type)
  let val = {}
  switch (action.type) {
    case 'UPDATE_DUMMY':
      return {
        ...state,
        breakfast: action.payload,
      };
      break;
    default:
      val =  state

  }
  console.log("val " + val.username)
  return val
};

export default reducers;
