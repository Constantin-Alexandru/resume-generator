import { Box, Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Entry } from "../interfaces/Entry";

interface Props {
  item: Entry;
  setEditName: (state: string | undefined) => void;
  setEntryModal: (state: boolean) => void;
}

export default function EntryDisplay(props: Props) {
  const { item, setEditName, setEntryModal } = props;
  return (
    <Box
      sx={{ display: "flex", flexFlow: "row", justifyContent: "space-between" }}
    >
      <Box sx={{ display: "flex", flexFlow: "row", gap: 2 }}>
        <Typography>{item.name}</Typography>
      </Box>
      <Button
        onClick={() => {
          setEditName(item.name);
          setEntryModal(true);
        }}
      >
        <EditIcon />
      </Button>
    </Box>
  );
}
