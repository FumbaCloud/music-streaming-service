import axios from "axios";
import { Dispatch } from "redux";

import { TrackAction, TrackActionTypes } from "../../types/track";

export const fetchTracks = () => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.get("http://localhost:5000/tracks");
      dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data });
    } catch (error: any) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: error.message,
      });
    }
  };
};

export const searchTracks = (query: string) => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/tracks/search?name=${query}`
      );
      dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data });
    } catch (error: any) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: error.message,
      });
    }
  };
};
