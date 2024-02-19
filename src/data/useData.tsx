import { useEffect, useState } from 'react';
import Skill from './interfaces/Skill';
import Pair from './interfaces/Pair';

function getDataFromLocalStorage(key: string): any {
  const data = localStorage.getItem(key);

  if (data === null) return undefined;

  try {
    const dataObj = JSON.parse(data);

    return dataObj;
  } catch (error) {
    return data;
  }
}

export default function useData() {
  const [completed, setCompleted] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [contacts, setContacts] = useState<Array<Pair>>([]);
  const [skillCategories, setSkillCategories] = useState<Array<string>>([]);
  const [skills, setSkills] = useState<Array<Skill>>([]);

  //Loading from local storage
  useEffect(() => {
    const _name: string = getDataFromLocalStorage('name') ?? '';

    if (_name === '') return;

    setName(_name);

    const _title = getDataFromLocalStorage('title') ?? '';

    console.log('Set Title');

    setTitle(_title);

    const _summary = getDataFromLocalStorage('summary') ?? '';

    console.log('Set Summary');

    setSummary(_summary);

    const _contacts = getDataFromLocalStorage('contacts') ?? [];

    setContacts(_contacts);

    const _skillCategories = getDataFromLocalStorage('skill-categories') ?? [];

    setSkillCategories(_skillCategories);

    const _skills = getDataFromLocalStorage('skills') ?? [];

    setSkills(_skills);

    const _completed = getDataFromLocalStorage('completed') ?? false;

    setCompleted(_completed);
  }, []);

  //Saving elements in local storage
  useEffect(() => {
    localStorage.setItem('name', name);
  }, [name]);

  useEffect(() => {
    localStorage.setItem('title', title);
  }, [title]);

  useEffect(() => {
    localStorage.setItem('summary', summary);
  }, [summary]);

  useEffect(() => {
    const contactsStr = JSON.stringify(contacts);

    localStorage.setItem('contacts', contactsStr);
  }, [contacts]);

  useEffect(() => {
    const skillCategoriesStr = JSON.stringify(skillCategories);

    localStorage.setItem('skill-categories', skillCategoriesStr);
  }, [skillCategories]);

  useEffect(() => {
    const skillsStr = JSON.stringify(skills);

    localStorage.setItem('skills', skillsStr);
  }, [skills]);

  useEffect(() => {
    const completedStr = JSON.stringify(completed);

    localStorage.setItem('completed', completedStr);
  });

  return {
    completed,
    setCompleted,
    name,
    setName,
    title,
    setTitle,
    summary,
    setSummary,
    contacts,
    setContacts,
    skillCategories,
    setSkillCategories,
    skills,
    setSkills,
  } as const;
}
