import {AppState} from '../../index';
import {createSelector} from '@ngrx/store';

export const selectAuth = (state: AppState) => state.auth;

export const selectToken = createSelector(selectAuth, (state) => state?.token);

export const selectSigned = createSelector(selectAuth, (state) => state?.signed);
