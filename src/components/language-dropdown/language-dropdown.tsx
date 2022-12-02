import PasteContext, { IPasteContextState } from "../../contexts/paste";
import {
  languagesNames as languages,
  importLanguage,
} from "../../lib/language-data";
import React, { useContext, useRef, useState } from "react";

import useOnClickOutside from "../../hooks/use-onclick-outside";
import styles from "./language-dropdown.module.css";

function LanguagesDropdown() {
  const [filteredLanguages, setFilteredLanguages] = useState(languages);
  const [filterInput, setFilterInput] = useState("");
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const pasteContextValue = useContext(PasteContext);

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => {
    setFilteredLanguages(languages);
    setIsSuggestionsOpen(false);
  });

  const showSuggestions = () => {
    setIsSuggestionsOpen(true);
  };

  const hideSuggestions = () => {
    setIsSuggestionsOpen(false);
  };

  const onFocus = () => {
    showSuggestions();
    setFilterInput("");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilterInput(value);
    const filteredResults = languages.filter((language) => {
      return language.name.toLowerCase().startsWith(value.toLowerCase());
    });
    setFilteredLanguages(filteredResults);
  };

  const onClickSuggestedLanguage = async (language: {
    name: string;
    index: number;
  }) => {
    console.log("called 29");
    const { index: languageIndex } = language;
    hideSuggestions();
    setFilteredLanguages(languages);
    const languageData = await importLanguage(languageIndex);
    console.log("🚀 ~ file: language-dropdown.tsx ~ line 55 ~ LanguagesDropdown ~ languageData", languageData)
    pasteContextValue?.setPasteState((state: IPasteContextState) => ({
      ...state,
      selectedLanguageData: languageData,
      syntaxLanguage: language.name,
    }));
  };

  return (
    <div>
      <div
        onClick={showSuggestions}
        className={styles?.["autosuggest__container"]}
      >
        {pasteContextValue?.pasteState?.syntaxLanguage}
      </div>
      {isSuggestionsOpen ? (
        <div ref={ref} className={styles?.["autosuggest"]}>
          <input
            autoFocus
            value={filterInput}
            onFocus={onFocus}
            onChange={onChange}
            placeholder={"Search"}
            className={styles?.["search-input"]}
          ></input>
          <ul className={styles?.["autosuggest__suggestions-list"]}>
            {filteredLanguages?.map((language, index) => (
              <li
                onClick={() => onClickSuggestedLanguage(language)}
                className={styles?.["autosuggest__suggestion"]}
                key={language.name + `${index}`}
              >
                {language.name}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default LanguagesDropdown;
