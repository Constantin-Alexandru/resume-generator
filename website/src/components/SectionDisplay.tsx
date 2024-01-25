import { Box, Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Section } from "../interfaces/Section";

interface Props {
  item: Section;
  setEditName: (state: string | undefined) => void;
  setSectionModal: (state: boolean) => void;
}

export default function SectionDisplay(props: Props) {
  const { item, setEditName, setSectionModal } = props;
  return (
    <Box sx={{ display: "flex", flexFlow: "row" }}>
      <Typography sx={{ paddingTop: 0.5 }}>{item.name}</Typography>
      <Button
        onClick={() => {
          setEditName(item.name);
          setSectionModal(true);
        }}
      >
        <EditIcon fontSize="small" />
      </Button>
    </Box>
  );
}
