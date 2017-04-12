const search = (state, action) => {
  switch (action.type) {
    case 'PRICE_FILTER':
      return {
        ...action,
        price: action.price 
      }
    case 'ALL':
      return Object.assign({}, state, action);
    default:
      return Object.assign({}, state, action);    
  }
}

export default search;