import {UserState} from '../../../models/user.model';
import {UserActions, UserActionsType} from './user.actions';
import produce from 'immer';

const userInitialState: UserState = {
  username: null, name: null, isReviewer: false, roles: [], uid: null,
};

export const UserReducer = (state: UserState = userInitialState, action: UserActions) => {
  return produce(state, draft => {
    switch (action.type) {
      case UserActionsType.USER_SIGNED_INFORMATION:
        const user = action.payload;
        draft.username = user.username;
        draft.uid = user.userUid;
        draft.name = user.name;
        draft.roles = user.roles;
        break;
      default:
        return draft;
    }
  });
};
