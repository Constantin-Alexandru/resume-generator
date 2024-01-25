import { Box, Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "../interfaces/Link";

interface Props {
  item: Link;
  setEditId: (state: number | undefined) => void;
  setLinkModal: (state: boolean) => void;
}

export default function LinkDisplay(props: Props) {
  const { item, setEditId, setLinkModal } = props;
  return (
    <Box
      sx={{ display: "flex", flexFlow: "row", justifyContent: "space-between" }}
    >
      <Box sx={{ display: "flex", flexFlow: "row", gap: 2 }}>
        <Typography>{item.value.id}:</Typography>
        <Typography>{item.value.value}</Typography>
      </Box>
      <Button
        onClick={() => {
          setEditId(item.id);
          setLinkModal(true);
        }}
      >
        <EditIcon />
      </Button>
    </Box>
  );
}
