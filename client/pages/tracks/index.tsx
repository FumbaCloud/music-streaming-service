import MainLayout from "../../layouts/MainLayout";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { NextThunkDispatch, wrapper } from "../../store";
import { fetchTracks } from "../../store/action-creators/track";
import {
  Avatar,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { LibraryMusic } from "@mui/icons-material";
import PlayArrow from "@mui/icons-material/PlayArrow";
import { ITrack } from "../../types/track";

const Tracks = () => {
  const { tracks, error } = useTypedSelector((state) => state.track);
  const { active } = useTypedSelector((state) => state.player);

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
    <MainLayout title={"Tracks"}>
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
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(fetchTracks());

    return { props: {} };
  }
);

export default Tracks;
