import { Box, Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Skill } from "../interfaces/Skill";

interface Props {
  item: Skill;
  setEditName: (state: string | undefined) => void;
  setSkillModal: (state: boolean) => void;
}

export default function SkillDisplay(props: Props) {
  const { item, setEditName, setSkillModal } = props;
  return (
    <Box sx={{ display: "flex", flexFlow: "row" }}>
      <Typography sx={{ paddingTop: 0.5 }}>{item.name}</Typography>
      <Button
        onClick={() => {
          setEditName(item.name);
          setSkillModal(true);
        }}
      >
        <EditIcon fontSize="small" />
      </Button>
    </Box>
  );
}
