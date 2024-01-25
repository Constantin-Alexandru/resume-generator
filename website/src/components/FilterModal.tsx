import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
} from "@mui/material";
import { Data } from "../interfaces/Data";
import { ClearIcon } from "@mui/x-date-pickers";
import { Filters } from "../interfaces/Filters";
import { useState } from "react";

interface Props {
  setModal: (state: boolean) => void;
  data: Data;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  setData: (data: Data) => void;
}

export default function FilterModal(props: Props) {
  const { setModal, data, filters, setFilters, setData } = props;
  const [refresh, setRefresh] = useState<boolean>(false);

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
          Filter Data:
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
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Contacts:
        </Typography>
        <Checkbox
          checked={filters.contacts.reduce(
            (allChecked, contact) => allChecked && contact,
            true as boolean
          )}
          onChange={(e) => {
            const value = e.target.checked as boolean;
            const filtersData = filters;
            filtersData.contacts = data.personal.contacts.map(() => value);
            setFilters(filtersData);
            setRefresh(!refresh);
          }}
        />
      </Box>
      {filters.contacts.map((contact, index) => (
        <FormControlLabel
          label={data.personal.contacts[index].value.id}
          control={
            <Checkbox
              checked={filters.contacts[index]}
              onChange={(e) => {
                const value = e.target.checked as boolean;
                const filtersData = filters;
                filtersData.contacts[index] = value;
                setFilters(filtersData);
                setRefresh(!refresh);
              }}
            />
          }
        />
      ))}
      <Box
        sx={{
          display: "flex",
          flexFlow: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Links:
        </Typography>
        <Checkbox
          checked={filters.links.reduce(
            (allChecked, links) => allChecked && links,
            true as boolean
          )}
          onChange={(e) => {
            const value = e.target.checked as boolean;
            const filtersData = filters;
            filtersData.links = data.personal._links.map(() => value);
            setFilters(filtersData);
            setRefresh(!refresh);
          }}
        />
      </Box>
      {filters.links.map((link, index) => (
        <FormControlLabel
          label={data.personal._links[index].value.id}
          control={
            <Checkbox
              checked={filters.links[index]}
              onChange={(e) => {
                const value = e.target.checked as boolean;
                const filtersData = filters;
                filtersData.links[index] = value;
                setFilters(filtersData);
                setRefresh(!refresh);
              }}
            />
          }
        />
      ))}
      <Box
        sx={{
          display: "flex",
          flexFlow: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Skills:
        </Typography>
        <Checkbox
          checked={filters.skillTypes.reduce(
            (allChecked, skillType) => allChecked && skillType,
            true as boolean
          )}
          onChange={(e) => {
            const value = e.target.checked as boolean;
            const filtersData = filters;
            filtersData.skillTypes = data.skills
              .reduce((types, skill) => {
                types = types.includes(skill.type)
                  ? types
                  : [...types, skill.type];
                return types;
              }, [] as Array<string>)
              .map(() => value);
            setFilters(filtersData);
            setRefresh(!refresh);
          }}
        />
      </Box>
      {data.skills
        .reduce((types, skill) => {
          types = types.includes(skill.type) ? types : [...types, skill.type];
          return types;
        }, [] as Array<string>)
        .map((skillType, index) => (
          <FormControlLabel
            label={skillType}
            control={
              <Checkbox
                checked={filters.skillTypes[index]}
                onChange={(e) => {
                  const value = e.target.checked as boolean;
                  const filtersData = filters;
                  filtersData.skillTypes[index] = value;
                  setFilters(filtersData);
                  setRefresh(!refresh);
                }}
              />
            }
          />
        ))}
      <Box
        sx={{
          display: "flex",
          flexFlow: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Sections:
        </Typography>
        <Checkbox
          checked={filters.sections.reduce(
            (allChecked, sections) => allChecked && sections,
            true as boolean
          )}
          onChange={(e) => {
            const value = e.target.checked as boolean;
            const filtersData = filters;
            filtersData.sections = data.sections.map(() => value);
            setFilters(filtersData);
            setRefresh(!refresh);
          }}
        />
      </Box>
      {data.sections.map((section, index) => (
        <FormControlLabel
          label={section.name}
          control={
            <Checkbox
              checked={filters.sections[index]}
              onChange={(e) => {
                const value = e.target.checked as boolean;
                const filtersData = filters;
                filtersData.sections[index] = value;
                setFilters(filtersData);
                setRefresh(!refresh);
              }}
            />
          }
        />
      ))}
      <Box
        sx={{ display: "flex", flexFlow: "row", justifyContent: "flex-end" }}
      >
        <Button
          onClick={() => {
            const types: Array<string> = data.skills
              .reduce((types, skill) => {
                types = types.includes(skill.type)
                  ? types
                  : [...types, skill.type];
                return types;
              }, [] as Array<string>)
              .filter((type, index) => filters.skillTypes[index]);

            const filteredData: Data = {
              personal: {
                name: data.personal.name,
                contacts: data.personal.contacts.filter(
                  (contact, index) => filters.contacts[index]
                ),
                _links: data.personal._links.filter(
                  (link, index) => filters.links[index]
                ),
              },
              skills: data.skills.filter((skill) => types.includes(skill.type)),
              sections: data.sections.filter(
                (section, index) => filters.sections[index]
              ),
              entries: data.entries.filter((entry) => {
                const sections = data.sections
                  .filter((section, index) => filters.sections[index])
                  .map((section) => section.name);

                return sections.includes(entry.section);
              }),
            };

            setData(filteredData);
            setFilters(filters);
            setModal(false);
          }}
        >
          Apply Filters
        </Button>
      </Box>
    </Paper>
  );
}
