import { MdLocationOn } from "react-icons/md";
import { TbCalendarEvent } from "react-icons/tb";
import { FaUserPlus } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { useRef, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import useOutSideClick from "../../hooks/useOutSideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { createSearchParams, useNavigate } from "react-router-dom";

const Header = () => {
  const [destination, setDestination] = useState("");
  const [openOption, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    Adult: 1,
    Children: 0,
    Room: 1,
  });
  const [date, setDate] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [openDate, setopenDate] = useState(false);
  // const dateRef = useRef();
  // console.log(dateRef)

  // useOutSideClick(dateRef, "dateDropDown", () => setopenDate(false));
  const navigate = useNavigate();

  const optionsHandler = (name, operator) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operator === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const searchHandler = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    navigate({ pathname: "/hotels", search: encodedParams.toString() });
  };
  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon redIcon" />
          <input
            className="textField"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            placeholder="where want you go?"
          />
          <span className="seperator"></span>
        </div>
        <div style={{ cursor: "pointer" }} className="headerSearchItem">
          <TbCalendarEvent className="headerIcon blueIcon" />
          <div
            id="dateDropDown"
            className="dateDropDown"
            onClick={() => setopenDate(!openDate)}
          >
            {`${format(date[0].startDate, "MM/dd/yyy")} to ${format(
              date[0].endDate,
              "MM/dd/yyy"
            )}`}
          </div>

          {openDate && (
            <DateRange
              className="date"
              ranges={date}
              onChange={(item) => setDate([item.selection])}
              minDate={new Date()}
              moveRangeOnFirstSelection={true}
            />
          )}

          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <FaUserPlus className="headerIcon blueIcon" />
          <div
            style={{ cursor: "pointer" }}
            className="optionText"
            id="optionDropDown"
            onClick={() => setOpenOptions(!openOption)}
          >
            {options.Adult}Adult &bull; {options.Children}Children &bull;
            {options.Room}Room
          </div>
          {openOption && (
            <GuestOptions
              options={options}
              setOpenOptions={setOpenOptions}
              optionsHandler={optionsHandler}
            />
          )}

          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn" onClick={searchHandler}>
            <IoIosSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

const GuestOptions = ({ options, optionsHandler, setOpenOptions }) => {
  const optionsRef = useRef();
  useOutSideClick(optionsRef, "optionDropDown", () => setOpenOptions(false));
  return (
    <div className="guestOptions" ref={optionsRef}>
      <OptionItem
        optionsHandler={optionsHandler}
        type="Adult"
        options={options}
        minLimit={1}
      />
      <OptionItem
        optionsHandler={optionsHandler}
        type="Children"
        options={options}
        minLimit={0}
      />
      <OptionItem
        optionsHandler={optionsHandler}
        type="Room"
        options={options}
        minLimit={1}
      />
    </div>
  );
};

const OptionItem = ({ options, minLimit, type, optionsHandler }) => {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>

      <button
        onClick={() => optionsHandler(type, "dec")}
        disabled={options[type] <= minLimit}
        className="optionCounterBtn"
      >
        <HiMinus className="icon" />
      </button>
      <span>{options[type]}</span>
      <button
        onClick={() => optionsHandler(type, "inc")}
        className="optionCounterBtn"
      >
        <HiPlus className="icon" />
      </button>
    </div>
  );
};
