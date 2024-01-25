import dayjs from "dayjs";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { Entry } from "../interfaces/Entry";
import { Skill } from "../interfaces/Skill";
import { Section } from "../interfaces/Section";
import { DatePicker } from "@mui/x-date-pickers";

interface Props {
  setModal: (state: boolean) => void;
  entries: Array<Entry>;
  setEntries: (state: Array<Entry>) => void;
  _sections: Array<Section>;
  _skills: Array<Skill>;
  editName?: string;
}

export default function EntryModal(props: Props) {
  const { setModal, entries, setEntries, _sections, _skills, editName } = props;
  const [name, setName] = useState<string>(
    editName !== undefined
      ? entries.filter((entry) => entry.name === editName)[0].name
      : ""
  );
  const [employer, setEmployer] = useState<string>(
    editName !== undefined
      ? entries.filter((entry) => entry.name === editName)[0].employer
      : ""
  );
  const [startDate, setStartDate] = useState<Date>(
    editName !== undefined
      ? entries.filter((entry) => entry.name === editName)[0].startDate
      : new Date()
  );
  const [ended, setEnded] = useState<boolean>(
    editName !== undefined
      ? entries.filter((entry) => entry.name === editName)[0].endDate !==
          undefined
      : false
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    editName !== undefined
      ? entries.filter((entry) => entry.name === editName)[0].endDate
      : new Date()
  );
  const [description, setDescription] = useState<string>(
    editName !== undefined
      ? entries.filter((entry) => entry.name === editName)[0].description
      : ""
  );
  const [skills, setSkills] = useState<Array<string>>(
    editName !== undefined
      ? entries.filter((entry) => entry.name === editName)[0].skills
      : []
  );
  const [section, setSection] = useState<string>(
    editName !== undefined
      ? entries.filter((entry) => entry.name === editName)[0].section
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
        maxHeight: "90%",
        overflowY: "auto",
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
          Create Entry
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
          Name
        </Typography>
        <TextField
          size="small"
          label={`Name`}
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
          marginTop: 2,
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            marginTop: 2,
          }}
        >
          Employer
        </Typography>
        <TextField
          size="small"
          label={`Employer`}
          variant="standard"
          value={employer}
          onChange={(e) => {
            setEmployer(e.target.value as string);
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexFlow: "row",
          justifyContent: "space-between",
          gap: 5,
          marginTop: 3,
        }}
      >
        <Typography sx={{ fontWeight: "bold", paddingTop: 1 }}>
          Start Date:
        </Typography>
        <DatePicker
          slotProps={{ textField: { size: "small" } }}
          value={dayjs(startDate)}
          onChange={(newDate) =>
            setStartDate(newDate !== null ? newDate.toDate() : startDate)
          }
        />
      </Box>
      <FormGroup
        sx={{
          marginTop: 2,
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={ended}
              onChange={(e) => setEnded(e.target.checked)}
            />
          }
          label=" has ended?"
        />
      </FormGroup>
      {ended && (
        <Box
          sx={{
            display: "flex",
            flexFlow: "row",
            justifyContent: "space-between",
            gap: 5,
            marginTop: 1,
          }}
        >
          <Typography sx={{ fontWeight: "bold", paddingTop: 1 }}>
            End Date:
          </Typography>
          <DatePicker
            slotProps={{ textField: { size: "small" } }}
            value={dayjs(endDate)}
            onChange={(newDate) =>
              setEndDate(newDate !== null ? newDate.toDate() : startDate)
            }
          />
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexFlow: "row",
          justifyContent: "space-between",
          gap: 5,
          marginTop: 3,
        }}
      >
        <Typography sx={{ fontWeight: "bold", paddingTop: 1 }}>
          Section:
        </Typography>
        <Autocomplete
          filterSelectedOptions
          size="small"
          value={section}
          options={_sections.map((section) => section.name)}
          renderInput={(params) => <TextField {...params} label="Section" />}
          onChange={(e, newValue) => {
            setSection(newValue !== null ? newValue : "");
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexFlow: "row",
          justifyContent: "space-between",
          gap: 5,
          marginTop: 3,
        }}
      >
        <Typography sx={{ fontWeight: "bold", paddingTop: 1 }}>
          Skills:
        </Typography>
        <Autocomplete
          multiple
          filterSelectedOptions
          size="small"
          value={skills}
          options={_skills.map((skill) => skill.name)}
          renderInput={(params) => <TextField {...params} label="Skills" />}
          onChange={(e, newValues) => {
            setSkills(newValues);
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexFlow: "row",
          justifyContent: "space-between",
          gap: 5,
          marginTop: 3,
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            marginTop: 2,
          }}
        >
          Description:
        </Typography>
        <TextField
          size="small"
          label={`Description`}
          variant="outlined"
          value={description}
          minRows={4}
          onChange={(e) => {
            setDescription(e.target.value as string);
          }}
          multiline
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "end", marginTop: 2 }}>
        {editName !== undefined && (
          <Button
            onClick={() => {
              const oldEntries: Array<Entry> = entries.filter(
                (entry) => editName === undefined || entry.name !== editName
              );

              setEntries(oldEntries);

              setModal(false);
            }}
          >
            <DeleteIcon color="error" />
          </Button>
        )}
        <Button
          onClick={() => {
            const oldEntries: Array<Entry> = entries.filter(
              (entry) => editName === undefined || entry.name !== editName
            );
            setEntries([
              ...oldEntries,
              {
                name: name,
                employer: employer,
                startDate: startDate,
                endDate: ended ? endDate : undefined,
                description: description,
                skills: skills,
                section: section,
              },
            ]);

            setModal(false);
          }}
        >
          {editName === undefined ? "Add" : "Edit"} Entry
        </Button>
      </Box>
    </Paper>
  );
}
