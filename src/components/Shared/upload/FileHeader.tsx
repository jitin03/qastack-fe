import { Button, Grid } from "@material-ui/core";
import React from "react";

export interface FileHeaderProps {
  file: File;
  onDelete: (file: File) => void;
}

export function FileHeader({ file, onDelete }: FileHeaderProps) {
  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item xs={8} style={{ fontSize: ".5rem" }}>
        {file.name}
      </Grid>
      <Grid item container justifyContent="flex-end" xs={4}>
        <Button size="small" onClick={() => onDelete(file)}>
          Delete
        </Button>
      </Grid>
    </Grid>
  );
}
