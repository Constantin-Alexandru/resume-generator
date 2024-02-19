import { Button, Modal, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FlexContainer from './components/FlexContainer';
import Separator from './components/Separator';
import Title from './components/Title';
import useData from './data/useData';
import { useState } from 'react';
import EditPair from './components/EditPair';
import Pair, { createPair } from './data/interfaces/Pair';
import { deleteAt, insertAt, replaceAt } from './scripts/arrayHelpers';
import PairDisplay from './components/PairDisplay';
import Navigator from './components/Navigator';

export default function Contacts() {
  const [contactModal, setContactModal] = useState<boolean>(false);
  const [contactIndex, setContactIndex] = useState<number>(-1);

  const { contacts, setContacts } = useData();

  return (
    <FlexContainer top={10}>
      <FlexContainer>
        <Title>Contacts</Title>
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
          {contacts.length} contacts
        </Typography>
        <Button
          sx={{
            minWidth: '32px',
            aspectRatio: 1 / 1,
          }}
          onClick={() => {
            setContactModal(true);
            setContactIndex(-1);
          }}
        >
          <AddIcon />
        </Button>
      </FlexContainer>
      <FlexContainer
        sx={{ width: '50%', height: '50vh', overflowY: 'auto' }}
        gap={2.5}
      >
        {contacts.map((contact, index) => (
          <PairDisplay
            key={index}
            index={index + 1}
            pair={contact}
            onEdit={() => {
              setContactIndex(index);
              setContactModal(true);
            }}
            onDelete={() => {
              const newContacts = deleteAt(contacts, index);
              setContacts(newContacts);
            }}
            sx={{ width: '50%' }}
          />
        ))}
      </FlexContainer>
      <Navigator
        leftText="Back"
        leftURL="/personal-details"
        rightText="continue"
        rightURL="/skills"
      />
      <Modal open={contactModal} onClose={() => setContactModal(false)}>
        <EditPair
          pair={
            contactIndex === -1 ? createPair('', '') : contacts[contactIndex]
          }
          onSubmit={(value: Pair) => {
            let newContacts = [];

            if (contactIndex === -1)
              newContacts = insertAt(contacts, value, contacts.length);
            else newContacts = replaceAt(contacts, value, contactIndex);

            setContacts(newContacts);

            setContactIndex(-1);
            setContactModal(false);
          }}
          onClose={() => {
            setContactIndex(-1);
            setContactModal(false);
          }}
        />
      </Modal>
    </FlexContainer>
  );
}
