import { PromoCodeAction } from '../actions/promoCodeAction'

const initialState = {
  promoCodes: [],
  isLoading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PromoCodeAction.types.GET_PROMO_CODES:
      return { ...state, promoCodes: action?.payload }
    case PromoCodeAction.types.ADD_PROMO_CODE:
      return { ...state, promoCodes: [...state.promoCodes, action?.payload] }
    case PromoCodeAction.types.REMOVE_PROMO_CODE:
      const updatedPromoCodes = state.promoCodes.filter(
        (promoCode) => promoCode.id !== action?.payload.id
      )
      return { ...state, promoCodes: updatedPromoCodes }
    case PromoCodeAction.types.SET_IS_LOADING:
      return { ...state, isLoading: action?.payload }
    default:
      return state
  }
}
