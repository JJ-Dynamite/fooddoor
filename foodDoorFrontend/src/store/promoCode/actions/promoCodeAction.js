import { PromoCodeService } from '../../../services'
import { types } from '../types/PromoCodeTypes'

const addPromoCode = (promoCode) => {
  return (dispatch) => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    })
    PromoCodeService.addPromoCode(promoCode)
      .then((promoCodeResponse) => {
        dispatch({
          type: types.ADD_PROMO_CODE,
          payload: promoCodeResponse?.data,
        })
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        })
      })
      .catch(() => {
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        })
      })
  }
}

const removePromoCode = (promoCodeId) => {
  return (dispatch) => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    })
    PromoCodeService.deletePromoCode(promoCodeId)
      .then(() => {
        dispatch({
          type: types.REMOVE_PROMO_CODE,
          payload: { id: promoCodeId },
        })
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        })
      })
      .catch(() => {
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        })
      })
  }
}

const getPromoCodes = () => {
  return (dispatch) => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    })
    PromoCodeService.getPromoCodes()
      .then((promoCodeResponse) => {
        dispatch({
          type: types.GET_PROMO_CODES,
          payload: promoCodeResponse?.data,
        })
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        })
      })
      .catch(() => {
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        })
      })
  }
}

export default { types, addPromoCode, removePromoCode, getPromoCodes }
