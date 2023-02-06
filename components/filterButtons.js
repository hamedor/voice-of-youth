import { useState } from "react";
import styles from "../styles/components/filterButtons.module.css";
import searchIcon from "../public/icons/search.png";
import Image from "next/image";

export const FilterButtons = ({ categories, selected, filter, setSearch, setSelected }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const [searchedText, setSearchedText] = useState();

  const searchHandler = (e) => {
    setSearchedText(e.target.value);
  };
  const sendSearch = (e) => {
    e.preventDefault();
    setSearch(searchedText);
  };

  return (
    <div className={styles.flex}>
      <div
        onClick={() => setShowDropdown((prev) => !prev)}
        className={styles.dropDown}
      >
        <p className={styles.dropDownText}>{selected}</p>

        <div className={styles.wrap}>
          <div
            className={
              !showDropdown
                ? styles.figure1
                : `${styles.figure1} ${styles.figure1Rotated}`
            }
          ></div>
          <div
            className={
              !showDropdown
                ? styles.figure2
                : `${styles.figure2} ${styles.figure2Rotated}`
            }
          ></div>
        </div>

        <div
          className={
            showDropdown ? styles.contentVisible : styles.contentHidden
          }
        >
          {!categories.loading && (
            <ul className={styles.buttonList}>
              <li className={styles.item}>
                <button
                  className={
                    selected === "Все новости"
                      ? `${styles.buttonSelected} ${styles.button}`
                      : styles.button
                  }
                  onClick={() => filter()}
                >
                  Все новости
                </button>
              </li>
              {categories?.data?.categories?.data?.map((e) => {
                return (
                  <li className={styles.item} key={e.id}>
                    <button
                      className={
                        selected === e.attributes.name
                          ? `${styles.buttonSelected} ${styles.button}`
                          : styles.button
                      }
                      onClick={() => filter(e.attributes.name)}
                    >
                      {e.attributes.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <div className={styles.search}>
        <form className={styles.searchForm}>
          <button
            className={styles.searchButton}
            onClick={(e) => sendSearch(e)}
          >
            <Image src={searchIcon} fill={true} alt={"иконка поиска"} />
          </button>
          <input
            className={styles.searchInput}
            onChange={(e) => searchHandler(e)}
            type="text"
            placeholder="поиск по тексту и заголовкам"
          ></input>
        </form>
      </div>
    </div>
  );
};
