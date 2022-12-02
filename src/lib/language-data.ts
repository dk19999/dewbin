import { languages } from "@codemirror/language-data";

const compareLanguageName = (item1: string, item2: string) => {
  const a = item1.toLowerCase();
  const b = item2.toLowerCase();
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
};
type t = typeof languages[1];
const languagesNames = languages
  .map(({ name }, index) => {
    return { name, index };
  })
  .sort((a, b) => compareLanguageName(a.name, b.name));

const importLanguageByName = async (languageName: string) => {
  if (!languageName) {
    return;
  }
  const language = languagesNames?.find(({ name }) => languageName === name);
  if (!language) return [];
  const result = await importLanguage(language?.index);
  return result;
};

const importLanguage = async (languageIndex: number) => {
  const currentLanguage = await languages?.[languageIndex]?.load();

  return [currentLanguage.language];
};
export { languages, languagesNames, importLanguage, importLanguageByName };
