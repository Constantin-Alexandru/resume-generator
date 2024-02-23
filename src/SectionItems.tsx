import { useNavigate, useParams } from 'react-router-dom';
import FlexContainer from './components/FlexContainer';
import { Button, Modal, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import useData from './data/useData';
import { useState } from 'react';
import Separator from './components/Separator';

export default function SectionItems() {
  const navigate = useNavigate();
  const { section } = useParams();

  const { sectionItems, setSectionItems } = useData();

  const [editModal, setEditModal] = useState<boolean>(false);

  if (section === undefined) navigate('/sections');

  return (
    <Modal open={section !== undefined} onClose={() => navigate('/sections')}>
      {editModal === false ? (
        <Paper
          sx={{
            position: 'absolute',
            width: '50%',
            height: '50%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '25px',
            outline: 'none',
          }}
        >
          <FlexContainer>
            <FlexContainer top={2}>
              <Typography variant="h4">{section}</Typography>
            </FlexContainer>
            <FlexContainer
              top={2}
              flow="row"
              sx={{
                paddingInline: 0.5,
                width: '50%',
                justifyContent: 'space-between',
              }}
            >
              <Typography>{sectionItems.length} skills</Typography>
              <Button
                sx={{
                  minWidth: '32px',
                  aspectRatio: 1 / 1,
                }}
                onClick={() => {
                  setEditModal(true);
                }}
              >
                <AddIcon />
              </Button>
            </FlexContainer>
            <FlexContainer sx={{ width: '50%' }}>
              <Separator />
            </FlexContainer>
          </FlexContainer>
        </Paper>
      ) : (
        <></>
      )}
    </Modal>
  );
}
