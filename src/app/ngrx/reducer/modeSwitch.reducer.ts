import { createReducer, on } from '@ngrx/store';
import { switchChange } from '../action/modeSwitch.action';
 
export const initialState = true;
 
const _switchReducer = createReducer(initialState,
  on(switchChange, state => state = !state),
);
 
export function switchReducer(state, action) {
  return _switchReducer(state, action);
}