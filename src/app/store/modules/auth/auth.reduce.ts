import {AuthState} from '../../../models/auth.model';
import {AuthActions, AuthActionsType} from './auth.actions';
import produce from 'immer';

const authInitialState: AuthState = {
  token: null,
  signed: false,
};

export const AuthReducer = (state: AuthState = authInitialState, action: AuthActions) => {
  return produce(state, draft => {
    switch (action.type) {
      case AuthActionsType.AUTH_SIGN_IN_SUCCESS:
        draft.token = action.payload.accessToken;
        draft.signed = true;
        break;
    }
  });
};
