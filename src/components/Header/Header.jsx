import { MdLocationOn } from "react-icons/md";
import { TbCalendarEvent } from "react-icons/tb";
import { FaUserPlus } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { useRef, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import useOutSideClick from "../../hooks/useOutSideClick";

const Header = () => {
  const [destination, setDestination] = useState("");
  const [openOption, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    Adult: 1,
    Children: 0,
    Room: 1,
  });
  const optionsHandler = (name, operator) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operator === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            value={destination}
            onChange={setDestination}
            type="text"
            placeholder="where want you go?"
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <TbCalendarEvent className="headerIcon blueIcon" />
          <div className="dateDropDown">2024/08/01 to 2024/08/06</div>
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <FaUserPlus className="headerIcon blueIcon" />
          <div
            style={{ cursor: "pointer" }}
            className="dateDropDown"
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
          <button className="headerSearchBtn">
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
