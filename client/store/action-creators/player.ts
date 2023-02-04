import { PlayerAction, PlayerActionTypes } from "../../types/player";
import { ITrack } from "../../types/track";

export const playTrack = (): PlayerAction => {
  return { type: PlayerActionTypes.PLAY };
};

export const pauseTrack = (): PlayerAction => {
  return { type: PlayerActionTypes.PAUSE };
};

export const setActiveTrack = (payload: ITrack): PlayerAction => {
  return { type: PlayerActionTypes.SET_ACTIVE, payload };
};

export const setTrackVolume = (payload: number): PlayerAction => {
  return { type: PlayerActionTypes.SET_VOLUME, payload };
};

export const setTrackDuration = (payload: number): PlayerAction => {
  return { type: PlayerActionTypes.SET_DURATION, payload };
};

export const setCurrentTrackTime = (payload: number): PlayerAction => {
  return { type: PlayerActionTypes.SET_CURRENT_TIME, payload };
};
