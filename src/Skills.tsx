import { Button, Modal, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import FlexContainer from './components/FlexContainer';
import AddIcon from '@mui/icons-material/Add';
import useData from './data/useData';
import Separator from './components/Separator';
import ItemDisplay from './components/ItemDisplay';
import { useEffect, useState } from 'react';
import EditItem from './components/EditItem';
import Skill, { getSkillIndex } from './data/interfaces/Skill';
import { deleteAt, insertAt, replaceAt } from './scripts/arrayHelpers';

export default function Skills() {
  const navigate = useNavigate();
  const { category } = useParams();

  if (category === undefined) navigate('/skills');

  const { skills, setSkills } = useData();

  const [filteredSkills, setFilteredSkills] = useState<Skill[]>(
    skills.filter((skill) => skill.category === category)
  );
  const [editModal, setEditModal] = useState<boolean>(false);
  const [skillIndex, setskillIndex] = useState<number>(-1);

  useEffect(() => {
    setFilteredSkills(skills.filter((skill) => skill.category === category));
  }, [skills]);

  return (
    <Modal
      open={category !== undefined}
      onClose={() => {
        if (editModal) {
          setskillIndex(-1);
          setEditModal(false);
        } else navigate('/skills');
      }}
    >
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
              <Typography variant="h4">{category}</Typography>
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
              <Typography>{filteredSkills.length} skills</Typography>
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
            <FlexContainer gap={2} sx={{ width: '50%', overflowY: 'auto' }}>
              {filteredSkills.map((skill) => (
                <ItemDisplay
                  item={skill.skill}
                  sx={{ width: '100%' }}
                  onEdit={() => {
                    setskillIndex(getSkillIndex(skills, skill));
                    setEditModal(true);
                  }}
                  onDelete={() => {
                    const newSkills = deleteAt<Skill>(
                      skills,
                      getSkillIndex(skills, skill)
                    );

                    setSkills(newSkills);
                  }}
                />
              ))}
            </FlexContainer>
          </FlexContainer>
        </Paper>
      ) : (
        <EditItem
          item={skillIndex === -1 ? '' : filteredSkills[skillIndex].skill}
          onSubmit={(value) => {
            let newSkills = [];

            if (skillIndex === -1)
              newSkills = insertAt(
                skills,
                {
                  skill: value,
                  category: category !== undefined ? category : '',
                },
                skills.length
              );
            else
              newSkills = replaceAt(
                skills,
                {
                  skill: value,
                  category: category !== undefined ? category : '',
                },
                skillIndex
              );

            setSkills(newSkills);

            setskillIndex(-1);
            setEditModal(false);
          }}
          onClose={() => {
            setskillIndex(-1);
            setEditModal(false);
          }}
        />
      )}
    </Modal>
  );
}
