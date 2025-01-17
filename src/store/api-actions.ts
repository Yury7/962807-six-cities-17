import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AuthStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthData, FullOfferData, Offers, Reviews, UserData } from '../types';
import {
  loadFullOfferData,
  loadNearOffers,
  loadOffers,
  loadReviews,
  requireAuth,
  setError,
  setOffersLoadingStatus,
  setUser,
} from './action';
import { AppDispatch, State, store } from './store';

type AsyncThunkType = {
  dispatch: AppDispatch;
  store: State;
  extra: AxiosInstance;
};

export const clearErrorAction = createAsyncThunk('app/clearError', () => {
  setTimeout(() => store.dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
});

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  AsyncThunkType
>('offers/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  dispatch(setOffersLoadingStatus(true));
  const { data } = await api.get<Offers>(APIRoute.Offers);
  dispatch(loadOffers(data));
  dispatch(setOffersLoadingStatus(false));
});

export const fetchNearOffersAction = createAsyncThunk<
  void,
  string,
  AsyncThunkType
>('offers/fetchNearOffers', async (id, { dispatch, extra: api }) => {
  dispatch(setOffersLoadingStatus(true));
  const { data } = await api.get<Offers>(APIRoute.Offer + id + APIRoute.NearBy);
  dispatch(loadNearOffers(data.slice(0, 3)));
  dispatch(setOffersLoadingStatus(false));
});

export const fetchReviewsAction = createAsyncThunk<
  void,
  string,
  AsyncThunkType
>('offers/fetchReviews', async (id, { dispatch, extra: api }) => {
  dispatch(setOffersLoadingStatus(true));
  const { data } = await api.get<Reviews>(APIRoute.Reviews + id);
  dispatch(loadReviews(data));
  dispatch(setOffersLoadingStatus(false));
});

export const fetchFullOfferDataAction = createAsyncThunk<
  void,
  string,
  AsyncThunkType
>('offers/fetchFullOfferData', async (id, { dispatch, extra: api }) => {
  dispatch(setOffersLoadingStatus(true));
  const { data } = await api.get<FullOfferData>(APIRoute.Offer + id);
  dispatch(loadFullOfferData(data));
  dispatch(setOffersLoadingStatus(false));
});

export const checkAuth = createAsyncThunk<void, undefined, AsyncThunkType>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuth(AuthStatus.Auth));
    } catch {
      await api.get(APIRoute.Login);
      dispatch(requireAuth(AuthStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, AsyncThunkType>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    dispatch(setOffersLoadingStatus(true));
    const {
      data: { token },
    } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(requireAuth(AuthStatus.Auth));
    dispatch(setUser(email));
    dispatch(setOffersLoadingStatus(false));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, AsyncThunkType>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersLoadingStatus(true));
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuth(AuthStatus.NoAuth));
    dispatch(setUser(''));
    dispatch(setOffersLoadingStatus(false));
  }
);
