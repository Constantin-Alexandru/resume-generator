import { useEffect, useState } from 'react';
import Skill from './interfaces/Skill';
import Pair from './interfaces/Pair';
import SectionItem from './interfaces/SectionItem';

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
  const [categories, setCategories] = useState<Array<string>>([]);
  const [skills, setSkills] = useState<Array<Skill>>([]);
  const [sections, setSections] = useState<Array<string>>([]);
  const [sectionItems, setSectionItems] = useState<Array<SectionItem>>([]);

  //Loading from local storage
  useEffect(() => {
    const _name: string = getDataFromLocalStorage('name') ?? '';

    if (_name === '') return;

    setName(_name);

    const _title = getDataFromLocalStorage('title') ?? '';

    setTitle(_title);

    const _summary = getDataFromLocalStorage('summary') ?? '';

    setSummary(_summary);

    const _contacts = getDataFromLocalStorage('contacts') ?? [];

    setContacts(_contacts);

    const _categories = getDataFromLocalStorage('categories') ?? [];

    setCategories(_categories);

    const _skills = getDataFromLocalStorage('skills') ?? [];

    setSkills(_skills);

    const _completed = getDataFromLocalStorage('completed') ?? false;

    setCompleted(_completed);

    const _sections = getDataFromLocalStorage('sections') ?? [];

    setSections(_sections);

    const _sectionItems = getDataFromLocalStorage('section-items') ?? [];

    setSectionItems(_sectionItems);
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
    const categoriesStr = JSON.stringify(categories);

    localStorage.setItem('categories', categoriesStr);
  }, [categories]);

  useEffect(() => {
    const skillsStr = JSON.stringify(skills);

    localStorage.setItem('skills', skillsStr);
  }, [skills]);

  useEffect(() => {
    const sectionsStr = JSON.stringify(sections);

    localStorage.setItem('sections', sectionsStr);
  }, [sections]);

  useEffect(() => {
    const sectionItemsStr = JSON.stringify(sectionItems);

    localStorage.setItem('section-items', sectionItemsStr);
  }, [sectionItems]);

  useEffect(() => {
    const completedStr = JSON.stringify(completed);

    localStorage.setItem('completed', completedStr);
  }, [completed]);

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
    categories,
    setCategories,
    skills,
    setSkills,
    sections,
    setSections,
    sectionItems,
    setSectionItems,
  } as const;
}
