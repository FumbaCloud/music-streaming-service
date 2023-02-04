import React from "react";
import { useDispatch } from "react-redux";
import {
  TextField,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  List,
} from "@mui/material";
import { LibraryMusic } from "@mui/icons-material";
import PlayArrow from "@mui/icons-material/PlayArrow";

import { NextThunkDispatch } from "../store";
import styles from "./styles.module.scss";
import MainLayout from "../layouts/MainLayout";
import { searchTracks } from "../store/action-creators/track";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { ITrack } from "../types/track";

const HomePage = () => {
  const dispatch = useDispatch() as NextThunkDispatch;
  const { tracks, error } = useTypedSelector((state) => state.track);
  const { active } = useTypedSelector((state) => state.player);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    await dispatch(await searchTracks(event.target.value));
  };

  const { setActiveTrack } = useActions();

  const handleTrackChoose = (track: ITrack) => {
    if (active?._id !== track._id) {
      setActiveTrack(track);
    }
  };

  if (error) {
    return error;
  }

  return (
    <MainLayout title={"Search"}>
      <section className={styles.section}>
        <div className={styles.search}>
          <TextField
            fullWidth
            type={"text"}
            onChange={handleSearch}
            placeholder={"Track name"}
          />
        </div>

        <List dense>
          {tracks?.map((track) => (
            <ListItemButton
              key={track._id}
              onClick={() => handleTrackChoose(track)}
            >
              <ListItemAvatar>
                <Avatar>
                  <LibraryMusic />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={track.author} secondary={track.name} />
              <IconButton edge="end" aria-label="delete">
                <PlayArrow />
              </IconButton>
            </ListItemButton>
          ))}
        </List>
      </section>
    </MainLayout>
  );
};

export default HomePage;
