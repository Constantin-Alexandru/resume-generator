import { Button, Modal, Typography } from '@mui/material';
import FlexContainer from './components/FlexContainer';
import Separator from './components/Separator';
import Title from './components/Title';
import AddIcon from '@mui/icons-material/Add';
import useData from './data/useData';
import { useState } from 'react';
import EditItem from './components/EditItem';
import { deleteAt, insertAt, replaceAt } from './scripts/arrayHelpers';
import ItemButtonDisplay from './components/ItemButtonDisplay';
import { Outlet, useNavigate } from 'react-router-dom';
import Navigator from './components/Navigator';

export default function SkillCategories() {
  const navigate = useNavigate();

  const [categoryIndex, setCategoryIndex] = useState<number>(-1);
  const [categoriesModal, setCategoriesModal] = useState<boolean>(false);

  const { categories, setCategories } = useData();

  console.log(categories);

  return (
    <FlexContainer top={10}>
      <FlexContainer>
        <Title>Skill Categories</Title>
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
          {categories.length} categories
        </Typography>
        <Button
          sx={{
            minWidth: '32px',
            aspectRatio: 1 / 1,
          }}
          onClick={() => {
            setCategoryIndex(-1);
            setCategoriesModal(true);
          }}
        >
          <AddIcon />
        </Button>
      </FlexContainer>
      <FlexContainer
        sx={{ width: '50%', height: '50vh', overflowY: 'auto' }}
        gap={2.5}
      >
        {categories.map((category, index) => (
          <ItemButtonDisplay
            index={index + 1}
            item={category}
            onClick={() => navigate(`/skills/${category}`)}
            onEdit={() => {
              setCategoryIndex(index);
              setCategoriesModal(true);
            }}
            onDelete={() => {
              const newCategories = deleteAt(categories, index);
              setCategories(newCategories);
            }}
            sx={{ width: '50%' }}
          />
        ))}
      </FlexContainer>
      <Navigator
        leftText="Back"
        leftURL="/contacts"
        rightText="Continue"
        rightURL="/sections"
      />
      <Modal open={categoriesModal}>
        <EditItem
          item={categoryIndex === -1 ? '' : categories[categoryIndex]}
          onSubmit={(value) => {
            let newCategories = [];

            if (categoryIndex === -1)
              newCategories = insertAt(categories, value, categories.length);
            else newCategories = replaceAt(categories, value, categoryIndex);

            setCategories(newCategories);

            setCategoryIndex(-1);
            setCategoriesModal(false);
          }}
          onClose={() => {
            setCategoryIndex(-1);
            setCategoriesModal(false);
          }}
        />
      </Modal>
      <Outlet />
    </FlexContainer>
  );
}
