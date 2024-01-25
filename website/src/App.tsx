import { ThemeProvider } from "@emotion/react";
import AddIcon from "@mui/icons-material/Add";
import TuneIcon from "@mui/icons-material/Tune";
import {
  Box,
  Button,
  CssBaseline,
  // Fade,
  Modal,
  Paper,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import LinkModal from "./components/LinkModal";
import LinkDisplay from "./components/LinkDisplay";
import { Link } from "./interfaces/Link";
import SkillModal from "./components/SkillModal";
import { Skill } from "./interfaces/Skill";
import SkillDisplay from "./components/SkillDisplay";
import { Section } from "./interfaces/Section";
import SectionModal from "./components/SectionModal";
import SectionDisplay from "./components/SectionDisplay";
import EntryModal from "./components/EntryModal";
import { Entry } from "./interfaces/Entry";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Resume from "./components/Resume";
import { PDFViewer } from "@react-pdf/renderer";
import EntryDisplay from "./components/EntryDisplay";
import { Data } from "./interfaces/Data";
import FilterModal from "./components/FilterModal";
import { Filters } from "./interfaces/Filters";

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [filterModal, setFilterModal] = useState<boolean>(false);
  const [contactModal, setContactModal] = useState<boolean>(false);
  const [linkModal, setLinkModal] = useState<boolean>(false);
  const [skillModal, setSkillModal] = useState<boolean>(false);
  const [sectionModal, setSectionModal] = useState<boolean>(false);
  const [entryModal, setEntryModal] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [editId, setEditId] = useState<number | undefined>(undefined);
  const [contacts, setContacts] = useState<Array<Link>>([]);
  const [links, setLinks] = useState<Array<Link>>([]);
  const [editName, setEditName] = useState<string | undefined>(undefined);
  const [skills, setSkills] = useState<Array<Skill>>([]);
  const [sections, setSections] = useState<Array<Section>>([]);
  const [entries, setEntries] = useState<Array<Entry>>([]);
  const [filters, setFilters] = useState<Filters | undefined>();
  const [filteredData, setFilteredData] = useState<Data>();

  useEffect(() => {
    const nameData = localStorage.getItem("name");
    const contactsData = localStorage.getItem("contacts");
    const linksData = localStorage.getItem("links");
    const skillsData = localStorage.getItem("skills");
    const sectionsData = localStorage.getItem("sections");
    const entriesData = localStorage.getItem("entries");

    if (nameData && nameData !== "") {
      try {
        const parsedData = nameData;
        setName(parsedData);
      } catch (error) {
        console.error(error);
      }
    }
    if (contactsData && contactsData !== "") {
      try {
        const parsedData = JSON.parse(contactsData) as Array<Link>;

        setContacts(parsedData);
      } catch (error) {
        console.error(error);
      }
    }
    if (linksData && linksData !== "") {
      try {
        const parsedData = JSON.parse(linksData) as Array<Link>;
        setLinks(parsedData);
      } catch (error) {
        console.error(error);
      }
    }
    if (skillsData && skillsData !== "") {
      try {
        const parsedData = JSON.parse(skillsData) as Array<Skill>;
        setSkills(parsedData);
      } catch (error) {
        console.error(error);
      }
    }
    if (sectionsData && sectionsData !== "") {
      try {
        const parsedData = JSON.parse(sectionsData) as Array<Section>;
        setSections(parsedData);
      } catch (error) {
        console.error(error);
      }
    }
    if (entriesData && entriesData !== "") {
      try {
        const parsedData = JSON.parse(entriesData) as Array<Entry>;
        const fixedData = parsedData.map((data) => ({
          ...data,
          startDate: new Date(data.startDate),
          endDate:
            data.endDate !== undefined ? new Date(data.endDate) : undefined,
        }));
        setEntries(fixedData);
      } catch (error) {
        console.error(error);
      }
    }

    setLoading(false);
  }, []);
  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name]);
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);
  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(links));
  }, [links]);
  useEffect(() => {
    localStorage.setItem("skills", JSON.stringify(skills));
  }, [skills]);
  useEffect(() => {
    localStorage.setItem("sections", JSON.stringify(sections));
  }, [sections]);
  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: "flex", flexFlow: "row", width: "100vw" }}>
          <Paper
            sx={{
              width: "30%",
              minHeight: "100vh",
              maxHeight: "100vh",
              padding: 2,
              overflowY: "auto",
              zIndex: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexFlow: "row",
                gap: 2,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5" align="center" fontWeight="bold">
                Resume Details
              </Typography>
              <Button
                variant="contained"
                style={{ fontWeight: "bold" }}
                endIcon={<TuneIcon />}
                onClick={() => setFilterModal(true)}
              >
                Filter
              </Button>
            </Box>
            <Box paddingTop={3}>
              <Typography variant="subtitle1" fontWeight="bold">
                Personal Details
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexFlow: "row",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <Typography paddingTop={2}>Name: </Typography>
                <TextField
                  size="small"
                  label="Name"
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
                  gap: 2,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography paddingTop={2}>Contacts </Typography>
                <Button
                  sx={{ marginTop: 2 }}
                  onClick={() => {
                    setEditId(undefined);
                    setContactModal(true);
                  }}
                >
                  <AddIcon />
                </Button>
              </Box>
              {contacts.map((contact, index) => (
                <LinkDisplay
                  key={index}
                  item={contact}
                  setEditId={setEditId}
                  setLinkModal={setContactModal}
                />
              ))}
              <Box
                sx={{
                  display: "flex",
                  flexFlow: "row",
                  gap: 2,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography paddingTop={2}>Links </Typography>
                <Button
                  sx={{ marginTop: 2 }}
                  onClick={() => {
                    setEditId(undefined);
                    setLinkModal(true);
                  }}
                >
                  <AddIcon />
                </Button>
              </Box>
              {links.map((link, index) => (
                <LinkDisplay
                  key={index}
                  item={link}
                  setEditId={setEditId}
                  setLinkModal={setLinkModal}
                />
              ))}
              <Box
                sx={{
                  display: "flex",
                  flexFlow: "row",
                  gap: 2,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography paddingTop={2}>Skills </Typography>
                <Button
                  sx={{ marginTop: 2 }}
                  onClick={() => {
                    setEditName(undefined);
                    setSkillModal(true);
                  }}
                >
                  <AddIcon />
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexFlow: "row",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                {skills.map((skill, index) => (
                  <SkillDisplay
                    key={index}
                    item={skill}
                    setEditName={setEditName}
                    setSkillModal={setSkillModal}
                  />
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexFlow: "row",
                gap: 2,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography paddingTop={2}>Sections </Typography>
              <Button
                sx={{ marginTop: 2 }}
                onClick={() => {
                  setEditName(undefined);
                  setSectionModal(true);
                }}
              >
                <AddIcon />
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexFlow: "row",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              {sections.map((section, index) => (
                <SectionDisplay
                  key={index}
                  item={section}
                  setEditName={setEditName}
                  setSectionModal={setSectionModal}
                />
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexFlow: "row",
                gap: 2,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography paddingTop={2}>Entries </Typography>
              <Button
                sx={{ marginTop: 2 }}
                onClick={() => {
                  setEditName(undefined);
                  setEntryModal(true);
                }}
              >
                <AddIcon />
              </Button>
            </Box>
            {entries.map((entry, index) => (
              <EntryDisplay
                key={index}
                item={entry}
                setEditName={setEditName}
                setEntryModal={setEntryModal}
              />
            ))}
          </Paper>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            {!loading && (
              <PDFViewer style={{ width: "300mm", margin: 20 }}>
                <Resume
                  data={
                    filteredData !== undefined
                      ? filteredData
                      : {
                          personal: {
                            name: "",
                            contacts: [],
                            _links: [],
                          },
                          skills: [],
                          sections: [],
                          entries: [],
                        }
                  }
                />
              </PDFViewer>
            )}
          </Box>
        </Box>
        <Modal open={filterModal} onClose={() => setFilterModal(false)}>
          {/* <Fade in={linkModal}> */}
          <FilterModal
            setModal={setFilterModal}
            data={{
              personal: {
                name: name,
                contacts: contacts,
                _links: links,
              },
              skills: skills,
              sections: sections,
              entries: entries,
            }}
            filters={
              filters !== undefined
                ? filters
                : {
                    contacts: contacts.map(() => true),
                    links: links.map(() => true),
                    skillTypes: skills
                      .reduce((types, skill) => {
                        types = types.includes(skill.type)
                          ? types
                          : [...types, skill.type];
                        return types;
                      }, [] as Array<string>)
                      .map(() => true),
                    sections: sections.map(() => true),
                  }
            }
            setFilters={setFilters}
            setData={setFilteredData}
          />
          {/* </Fade> */}
        </Modal>
        <Modal open={contactModal} onClose={() => setContactModal(false)}>
          {/* <Fade in={linkModal}> */}
          <LinkModal
            label="Contact"
            setModal={setContactModal}
            links={contacts}
            setLinks={setContacts}
            editId={editId}
          />
          {/* </Fade> */}
        </Modal>
        <Modal open={linkModal} onClose={() => setLinkModal(false)}>
          {/* <Fade in={linkModal}> */}
          <LinkModal
            label="Link"
            setModal={setLinkModal}
            links={links}
            setLinks={setLinks}
            editId={editId}
          />
          {/* </Fade> */}
        </Modal>
        <Modal open={skillModal} onClose={() => setSkillModal(false)}>
          {/* <Fade in={linkModal}> */}
          <SkillModal
            setModal={setSkillModal}
            skills={skills}
            setSkills={setSkills}
            editName={editName}
          />
          {/* </Fade> */}
        </Modal>
        <Modal open={sectionModal} onClose={() => setSectionModal(false)}>
          {/* <Fade in={linkModal}> */}
          <SectionModal
            setModal={setSectionModal}
            sections={sections}
            setSections={setSections}
            editName={editName}
          />
          {/* </Fade> */}
        </Modal>
        <Modal open={entryModal} onClose={() => setEntryModal(false)}>
          {/* <Fade in={linkModal}> */}
          <EntryModal
            setModal={setEntryModal}
            entries={entries}
            setEntries={setEntries}
            _sections={sections}
            _skills={skills}
            editName={editName}
          />
          {/* </Fade> */}
        </Modal>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
