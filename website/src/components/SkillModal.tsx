import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { Skill } from "../interfaces/Skill";

interface Props {
  setModal: (state: boolean) => void;
  skills: Array<Skill>;
  setSkills: (state: Array<Skill>) => void;
  editName?: string;
}

export default function SkillModal(props: Props) {
  const { setModal, skills, setSkills, editName } = props;
  const [name, setName] = useState<string>(
    editName !== undefined
      ? skills.filter((skill) => skill.name === editName)[0].name
      : ""
  );
  const [type, setType] = useState<string>(
    editName !== undefined
      ? skills.filter((skill) => skill.name === editName)[0].type
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
          Create Skill
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
          Skill
        </Typography>
        <TextField
          size="small"
          label={`Skill`}
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
          Type
        </Typography>
        <TextField
          size="small"
          label={`Type`}
          variant="standard"
          value={type}
          onChange={(e) => {
            setType(e.target.value as string);
          }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end", marginTop: 2 }}>
        {editName !== undefined && (
          <Button
            onClick={() => {
              const oldSkills: Array<Skill> = skills.filter(
                (skill) => editName === undefined || skill.name !== editName
              );

              setSkills(oldSkills);

              setModal(false);
            }}
          >
            <DeleteIcon color="error" />
          </Button>
        )}
        <Button
          onClick={() => {
            const oldSkills: Array<Skill> = skills.filter(
              (skill) => editName === undefined || skill.name !== editName
            );
            setSkills([
              ...oldSkills,
              {
                name: name,
                type: type,
              },
            ]);

            setModal(false);
          }}
        >
          {editName === undefined ? "Add" : "Edit"} Skill
        </Button>
      </Box>
    </Paper>
  );
}
