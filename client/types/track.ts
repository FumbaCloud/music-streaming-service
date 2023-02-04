export interface ITrack {
  _id: string;
  name: string;
  author: string;
  text: string;
  picture: string;
  audio: string;
}

export interface TrackState {
  tracks: ITrack[];
  error: string | null;
}

export enum TrackActionTypes {
  FETCH_TRACKS = "FETCH_TRACKS",
  FETCH_TRACKS_ERROR = "FETCH_TRACKS_ERROR",
}

interface FetchTracksAction {
  type: TrackActionTypes.FETCH_TRACKS;
  payload: ITrack[];
}

interface FetchTracksErrorAction {
  type: TrackActionTypes.FETCH_TRACKS_ERROR;
  payload: string;
}

export type TrackAction = FetchTracksAction | FetchTracksErrorAction;
