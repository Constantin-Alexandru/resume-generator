import { Button, Modal, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FlexContainer from './components/FlexContainer';
import Separator from './components/Separator';
import Title from './components/Title';
import useData from './data/useData';
import { useState } from 'react';
import EditItem from './components/EditItem';
import { deleteAt, insertAt, replaceAt } from './scripts/arrayHelpers';
import ItemButtonDisplay from './components/ItemButtonDisplay';
import { Outlet, useNavigate } from 'react-router-dom';
import Navigator from './components/Navigator';

export default function Sections() {
  const navigate = useNavigate();
  const { sections, setSections } = useData();

  const [sectionIndex, setSectionIndex] = useState<number>(-1);
  const [sectionModal, setSectionModal] = useState<boolean>(false);

  return (
    <FlexContainer>
      <FlexContainer top={10}>
        <Title>Sections</Title>
      </FlexContainer>
      <FlexContainer sx={{ width: '50%' }}>
        <Separator />
      </FlexContainer>
      <FlexContainer
        flow="row"
        sx={{
          paddingInline: 2.5,
          width: '50%',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
          }}
        >
          {sections.length} sections
        </Typography>
        <Button
          sx={{
            minWidth: '32px',
            aspectRatio: 1 / 1,
          }}
          onClick={() => {
            setSectionIndex(-1);
            setSectionModal(true);
          }}
        >
          <AddIcon />
        </Button>
      </FlexContainer>
      <FlexContainer
        sx={{ width: '50%', height: '50vh', overflowY: 'auto' }}
        gap={2.5}
      >
        {sections.map((section, index) => (
          <ItemButtonDisplay
            index={index + 1}
            item={section}
            onClick={() => navigate(`/sections/${section}`)}
            onEdit={() => {
              setSectionIndex(index);
              setSectionModal(true);
            }}
            onDelete={() => {
              const newCategories = deleteAt(sections, index);
              setSections(newCategories);
            }}
            sx={{ width: '50%' }}
          />
        ))}
      </FlexContainer>
      <Navigator
        leftText="Back"
        leftURL="/skills"
        rightText="Continue"
        rightURL="generator"
      />
      <Modal open={sectionModal}>
        <EditItem
          item={sectionIndex === -1 ? '' : sections[sectionIndex]}
          onSubmit={(value) => {
            let newSections = [];

            if (sectionIndex === -1)
              newSections = insertAt(sections, value, sections.length);
            else newSections = replaceAt(sections, value, sectionIndex);

            setSections(newSections);

            setSectionIndex(-1);
            setSectionModal(false);
          }}
          onClose={() => {
            setSectionIndex(-1);
            setSectionModal(false);
          }}
        />
      </Modal>
      <Outlet />
    </FlexContainer>
  );
}
