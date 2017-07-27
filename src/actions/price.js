import { SET } from '../types/price'

export function set(payload){
  return {
    type: SET
  , payload
  }
}

