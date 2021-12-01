import { useState, useEffect } from "react";
// import iconSearch from "../assets/desktop/icon-search.svg";
import iconLocation from "../assets/desktop/icon-location.svg";
import { ReactComponent as IconFilter } from "../assets/mobile/icon-filter.svg";
import { ReactComponent as IconSearch } from "../assets/desktop/icon-search.svg";

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
}

function getTitleSearchPlaceholder(windowWidth) {
  if (windowWidth <= 768) {
    return "Filter by title...";
  }

  return "Filter by title, companies, experties...";
}

function FilterModal({ theme, visiblity, locationHandler, fulltimeHandler }) {
  return (
    <div className={`modal ${visiblity}`}>
      <div className={`modal-content bg-${theme}`}>
        <div className="text-input-container">
          <img src={iconLocation} className="location-icon" alt="location" />
          <input
            type="text"
            className="location-input"
            name="location"
            aria-label="job title"
            placeholder="Filter by location..."
            onChange={locationHandler}
          />
        </div>
        <div className="modal-checkbox-container">
          <input
            type="checkbox"
            id="full-time-only-modal"
            className="checkbox"
            name="full-time-only"
            onChange={fulltimeHandler}
          />
          <label htmlFor="full-time-only-modal">Full Time Only</label>
        </div>
        <button type="submit" name="submit" className="btn btn-violet">
          Search
        </button>
      </div>
    </div>
  );
}

function Search({ theme, handleSubmit }) {
  const [modalStatus, setModalStatus] = useState("hide");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [fulltime, setFulltime] = useState(false);
  const windowWidth = useWindowWidth();
  const titleSearchPlaceholder = getTitleSearchPlaceholder(windowWidth);
  const checkboxLabel = windowWidth <= 768 ? "Full Time" : "Full Time Only";

  function handleModalStatus() {
    setModalStatus("show");
  }

  function descriptionHandler({ target }) {
    setDescription(target.value.toLowerCase());
  }

  function locationHandler({ target }) {
    setLocation(target.value);
  }

  function fulltimeHandler({ target }) {
    setFulltime(target.checked);
  }

  function submitHandler(event) {
    event.preventDefault();

    handleSubmit({
      description,
      location,
      fulltime,
    });

    setDescription("");
    setLocation("");
    setFulltime(false);
    setModalStatus("hide");
  }

  return (
    <form className={`search bg-${theme}`} onSubmit={submitHandler}>
      <div className="title-input-container">
        <IconSearch className="search-icon" />
        <input
          type="text"
          className="title-input"
          value={description}
          name="title"
          aria-label="job title"
          onChange={descriptionHandler}
          placeholder={titleSearchPlaceholder}
        />
        <div className="btn-filter-container">
          <IconFilter className="filter-icon" onClick={handleModalStatus} />
          <button
            type="submit"
            name="search"
            aria-label="search"
            className="icon-btn"
          >
            <IconSearch className="btn-icon-search" />
          </button>
        </div>
      </div>

      <FilterModal
        theme={theme}
        visiblity={modalStatus}
        locationHandler={locationHandler}
        fulltimeHandler={fulltimeHandler}
      />

      <div className="location-input-container">
        <img src={iconLocation} className="location-icon" alt="location" />
        <input
          type="text"
          className="location-input"
          value={location}
          name="location"
          aria-label="location"
          onChange={locationHandler}
          placeholder="Filter by location..."
        />
      </div>

      <div className="action-container">
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="full-time-only"
            checked={fulltime}
            className="checkbox"
            name="full-time-only"
            onChange={fulltimeHandler}
          />
          <label htmlFor="full-time-only">{checkboxLabel}</label>
        </div>
        <button type="submit" name="search" className="btn btn-violet">
          Search
        </button>
      </div>
    </form>
  );
}

export default Search;
