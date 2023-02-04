import { Button, Slider, Stack, Typography } from "@mui/material";
import { PlayArrow, Pause, VolumeUpRounded } from "@mui/icons-material";

import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { playTrack } from "../../store/action-creators/player";

const Player = () => {
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const {
    playTrack,
    pauseTrack,
    setTrackVolume,
    setTrackDuration,
    setCurrentTrackTime,
  } = useActions();
  const { pause, active, volume, duration, currentTime } = useTypedSelector(
    (state) => state.player
  );

  const formatDuration = (value: number) => {
    const minute = Math.floor(value / 60);
    const secondLeft = Math.floor(value - minute * 60);
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  };

  const handlePlayerEvoke = () => {
    if (pause) {
      playTrack();
      void audio!.play();
    } else {
      pauseTrack();
      void audio!.pause();
    }
  };

  const handlePlayerVolume = (event: Event, newValue: number) => {
    setTrackVolume(newValue);
    audio!.volume = newValue / 100;
  };

  const handlePlayerCurrentTime = (event: Event, newValue: number) => {
    setCurrentTrackTime(newValue);
    audio!.currentTime = newValue;
  };

  useEffect(() => {
    if (audio) {
      audio.src = `http://localhost:5000/${active?.audio}`;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setTrackDuration(audio.duration);
      };
      audio.ontimeupdate = () => {
        setCurrentTrackTime(audio.currentTime);
      };
      audio.onended = () => {
        pauseTrack();
        setCurrentTrackTime(0);
      };

      playTrack();
      void audio!.play();
    } else {
      const audio = new Audio();

      setAudio(audio);
    }
  }, [active]);

  if (active === null) {
    return null;
  }

  return (
    <div className={styles.box}>
      <Stack spacing={1} direction="row" alignItems="center">
        <div>
          <Button size="small" onClick={handlePlayerEvoke}>
            {pause ? <PlayArrow /> : <Pause />}
          </Button>
        </div>
        <div>
          <Typography variant="subtitle2">Track title</Typography>
          <Typography variant="caption">Track description</Typography>
        </div>
      </Stack>

      <div>
        <Stack spacing={3} pl={2} pr={4} direction="row" alignItems="center">
          <Typography variant="caption">
            {formatDuration(currentTime)}
          </Typography>
          <Slider
            aria-label="track-duration"
            size="small"
            min={0}
            step={1}
            max={duration}
            value={currentTime}
            valueLabelDisplay="auto"
            onChange={handlePlayerCurrentTime}
            valueLabelFormat={(value) => formatDuration(value)}
          />
          <Typography variant="caption">{formatDuration(duration)}</Typography>
        </Stack>
      </div>
      <div>
        <Stack spacing={2} direction="row" alignItems="center">
          <Slider
            size="small"
            value={volume}
            defaultValue={volume}
            valueLabelDisplay="auto"
            aria-label="track-volume"
            onChange={handlePlayerVolume}
          />
          <VolumeUpRounded />
        </Stack>
      </div>
    </div>
  );
};

export default Player;
