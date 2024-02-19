import FlexContainer from './components/FlexContainer';
import Title from './components/Title';
import useData from './data/useData';
import InputField from './components/InputField';
import { useState } from 'react';
import { emptyFieldError } from './data/globals';
import Navigator from './components/Navigator';

export default function PersonalDetails() {
  const { name, setName } = useData();
  const { title, setTitle } = useData();
  const { summary, setSummary } = useData();

  const [error, setError] = useState<boolean>(false);

  return (
    <FlexContainer top={10}>
      <FlexContainer>
        <Title>Personal Details</Title>
      </FlexContainer>
      <FlexContainer top={15} gap={5} sx={{ width: '20%' }}>
        <InputField
          label="Name"
          value={name}
          onChange={setName}
          sx={{ width: '100%' }}
          required
          error={error}
          errorText={emptyFieldError}
        />
        <InputField
          label="Title"
          value={title}
          onChange={setTitle}
          sx={{ width: '100%' }}
        />
        <InputField
          label="Summary"
          value={summary}
          onChange={setSummary}
          sx={{ width: '100%' }}
          multiline
        />
      </FlexContainer>
      <Navigator
        leftText="Back"
        leftURL="/"
        rightText="Continue"
        rightURL="/contacts"
        validationArr={[name]}
        setError={setError}
      />
    </FlexContainer>
  );
}
