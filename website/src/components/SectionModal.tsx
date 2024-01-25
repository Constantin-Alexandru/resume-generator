import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { Section } from "../interfaces/Section";

interface Props {
  setModal: (state: boolean) => void;
  sections: Array<Section>;
  setSections: (state: Array<Section>) => void;
  editName?: string;
}

export default function SectionModal(props: Props) {
  const { setModal, sections, setSections, editName } = props;
  const [name, setName] = useState<string>(
    editName !== undefined
      ? sections.filter((section) => section.name === editName)[0].name
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
          Create Section
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
          Section
        </Typography>
        <TextField
          size="small"
          label={`Section`}
          variant="standard"
          value={name}
          onChange={(e) => {
            setName(e.target.value as string);
          }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end", marginTop: 2 }}>
        {editName !== undefined && (
          <Button
            onClick={() => {
              const oldSections: Array<Section> = sections.filter(
                (section) => editName === undefined || section.name !== editName
              );

              setSections(oldSections);

              setModal(false);
            }}
          >
            <DeleteIcon color="error" />
          </Button>
        )}
        <Button
          onClick={() => {
            const oldSections: Array<Section> = sections.filter(
              (section) => editName === undefined || section.name !== editName
            );
            setSections([
              ...oldSections,
              {
                name: name,
              },
            ]);

            setModal(false);
          }}
        >
          {editName === undefined ? "Add" : "Edit"} Section
        </Button>
      </Box>
    </Paper>
  );
}
