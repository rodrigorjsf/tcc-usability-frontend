import {AuthState} from '../../../models/auth.model';
import {AuthActions, AuthActionsType} from './auth.actions';
import produce from 'immer';

const authInitialState: AuthState = {
  token: null,
};

export const AuthReducer = (state: AuthState = authInitialState, action: AuthActions) => {
  return produce(state, draft => {
    switch (action.type) {
      case AuthActionsType.AUTH_SIGN_IN_SUCCESS:
        draft.token = action.payload.accessToken;
    }
  });
};
