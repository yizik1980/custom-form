import React, { useState } from "react";

function Select({ list = [], onChange, label, placeHolder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(label || "");

  const toggleList = () => setIsOpen((prev) => !prev);

  return (
    <div className={`select-shell ${isOpen ? "is-open" : ""}`}>
      <button
        type="button"
        className="select-control"
        onClick={toggleList}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="select-value w-full ">{value}</div>
        <span className="select-arrow" aria-hidden="true"></span>
      </button>
      <dl
        className={`select-list ${isOpen ? "open" : ""}`}
        role="listbox"
        aria-label={label || "Options"}
      >
        {(isOpen ? list : []).map((item) => (
          <dd
            className="select-option"
            role="option"
            aria-selected={item._id === value}
            onClick={() => {
              setIsOpen(false);
              const value = item._id;
              setValue(item.label || item.name || item.value);
              onChange && onChange(value);
            }}
            key={item._id}
          >
            {item.label || item.name || item.value || "Option"}
          </dd>
        ))}
      </dl>
    </div>
  );
}

Select.propTypes = {};

export default Select;
