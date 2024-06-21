import {AuthLoadingState, LoadingState} from './global.types';
import {UserData} from './user.types';

export interface LoginFormProps {
  phoneNumber: string;
  password: string;
}

export interface SignupFormProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  createPassword: string;
  confirmPassword: string;
}

export interface OTPFormProps {
  otp: string;
}

export interface ForgotPasswordFormProps {
  phoneNumber: string;
}

export interface ResetPasswordFormProps {
  password: string;
  confirmPassword: string;
}
export interface ChangePasswordFormProps {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

export interface EditProfileFormProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface AuthenticationState {
  loading: LoadingState;
  oAuthLoading: AuthLoadingState;
}

export type authorisation = {
  token: string;
  type: string;
};

export type TokenPayload = {
  message: string;
  data: UserData;
  authorisation: authorisation;
  status: number;
};

export type TokenPayload1 = {
  message: string;
  data: any;
  status: number;
};
