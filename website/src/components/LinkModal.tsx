import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { Link } from "../interfaces/Link";

interface Props {
  label: string;
  setModal: (state: boolean) => void;
  links: Array<Link>;
  setLinks: (state: Array<Link>) => void;
  editId?: number;
}

export default function LinkModal(props: Props) {
  const { label, setModal, links, setLinks, editId } = props;
  const [name, setName] = useState<string>(
    editId !== undefined &&
      links.filter((link) => link.id === editId).length > 0
      ? links.filter((link) => link.id === editId)[0].value.id
      : ""
  );
  const [value, setValue] = useState<string>(
    editId !== undefined &&
      links.filter((link) => link.id === editId).length > 0
      ? links.filter((link) => link.id === editId)[0].value.value
      : ""
  );

  return (
    <Paper
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexFlow: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Create {label}
        </Typography>

        <Button sx={{ paddingLeft: 10 }} onClick={() => setModal(false)}>
          <ClearIcon />
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexFlow: "row",
          justifyContent: "space-between",
          gap: 5,
          marginTop: 10,
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            marginTop: 2,
          }}
        >
          {label}
        </Typography>
        <TextField
          size="small"
          label={`${label} Id`}
          variant="standard"
          value={name}
          onChange={(e) => {
            setName(e.target.value as string);
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexFlow: "row",
          justifyContent: "space-between",
          gap: 5,
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            marginTop: 2,
          }}
        >
          Value
        </Typography>
        <TextField
          size="small"
          label={`${label} Value`}
          variant="standard"
          value={value}
          onChange={(e) => {
            setValue(e.target.value as string);
          }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end", marginTop: 2 }}>
        {editId !== undefined && (
          <Button
            onClick={() => {
              const oldLinks: Array<Link> = links.filter(
                (link) => editId === undefined || link.id !== editId
              );

              setLinks(oldLinks);

              setModal(false);
            }}
          >
            <DeleteIcon color="error" />
          </Button>
        )}
        <Button
          onClick={() => {
            const oldLinks: Array<Link> = links.filter(
              (link) => editId === undefined || link.id !== editId
            );
            const id: number =
              links.length > 0
                ? editId !== undefined
                  ? editId
                  : links
                      .map((link) => link.id)
                      .reduce((link1, link2) => Math.max(link1, link2))
                : 0;

            setLinks([
              ...oldLinks,
              {
                id: id + 1,
                value: { id: name, value: value },
              },
            ]);
            setModal(false);
          }}
        >
          {editId === undefined ? "Add" : "Edit"} {label}
        </Button>
      </Box>
    </Paper>
  );
}
