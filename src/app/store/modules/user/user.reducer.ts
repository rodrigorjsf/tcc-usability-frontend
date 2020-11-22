import {UserState} from '../../../models/user.model';
import {UserActions, UserActionsType} from './user.actions';
import produce from 'immer';

const userInitialState: UserState = {
  email: null, name: null, isReviewer: false, username: null,
};

export const UserReducer = (state: UserState = userInitialState, action: UserActions) => {
  return produce(state, draft => {
    switch (action.type) {
      default:
        return draft;
    }
  });
};
