import {NgModule} from '@angular/core';
import {ActionReducer, combineReducers, StoreModule, compose, createSelector, ActionReducerMap, MetaReducer} from '@ngrx/store';
import { environment } from '../../environments/environment';
/**
 * combineReducers 接收一系列的 reducer 作为参数，然后创建一个新的 reducer
 * 这个新的 reducer 接收到各 reducer 的值后，按 reducer 的 key 进行存储。
 * 把这个新的 reducer 想象成一个数据库，各个子 reducer 就像数据库中的表。
 *
 */
/**
 * compose 函数是一个很方便的工具，简单来说，它接受任意数量的函数作为参数，然后返回一个新的函数。
 * 这个新的函数其实就是前面的函数的叠加，比如说，我们给出 `compose(f(x), g(x))`, 返回的新函数
 * 就是 `g(f(x))`。
 */
/**
 * 分别从每个 reducer 中将需要导出的函数或对象进行导出，并起个易懂的名字
 */
import * as fromQuote from './quote.reducer';

/**
 * 正如我们的 reducer 像数据库中的表一样，我们的顶层 state 也包含各个子 reducer 的 state
 * 并且使用一个 key 来标识各个子 state
 */
export interface State {
    quote: fromQuote.State;
}
export const initState = {
    quote: fromQuote.initialState,
};
export const reducers: ActionReducerMap<State> = {
    quote: fromQuote.reducer,
};
/**
 * 使用 combineReducers 把所有子 reducer 合并产生一个顶级 reducer
 */
// const globalReducer: ActionReducer<State> = combineReducers(reducers);

// export function reducer(state: any, action: any) {
//     return globalReducer(state, action)
// }

// export const getQuoteState = (state: State) => state.quote;

// export const getQuote = createSelector(getQuoteState, fromQuote.getQuote);

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
