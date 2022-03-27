import { UiState } from './';


// Con esto es como en typescript creamos algo como los actions creators
type UiActionType =
| {type: '[UI] - ToggleSideMenu'}

export const uiReducer = (state: UiState, action: UiActionType): UiState => {
  switch(action.type) {
    case '[UI] - ToggleSideMenu':
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen
      }

    default :
      return state
  }
}