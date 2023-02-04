import React from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";

import styles from "./styles.module.scss";
import { FormValues } from "../../types/form";
import { useRouter } from "next/router";

const UploadForm = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("author", data.author);
    formData.append("text", data.text);
    formData.append("picture", data.picture[0]);
    formData.append("audio", data.audio[0]);

    try {
      axios
        .post("http://localhost:5000/tracks", formData, {
          headers: {
            "Content-Type": "form-data",
          },
        })
        .then(() => {
          void router.push("tracks");
        });
    } catch (error) {
      console.log("error");
    }
  });

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <TextField
        label="Name"
        variant="outlined"
        {...register("name")}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Author"
        variant="outlined"
        {...register("author")}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Text"
        variant="outlined"
        minRows={5}
        multiline
        {...register("text")}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Upload picture"
        variant="outlined"
        type={"file"}
        {...register("picture")}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Upload audio"
        variant="outlined"
        type={"file"}
        {...register("audio")}
        InputLabelProps={{ shrink: true }}
      />
      <Button type={"submit"} variant={"outlined"}>
        Upload track
      </Button>
    </form>
  );
};

export default UploadForm;
