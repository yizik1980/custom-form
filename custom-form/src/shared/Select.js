import { useState, useEffect } from "react";

function Select({ list = [], onChange, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(label || "");
  
  // Update internal state when label prop changes
  useEffect(() => {
    setValue(label || "");
  }, [label]);
  
console.log("Select value", value);
  const toggleList = () => setIsOpen((prev) => !prev);
  const selectOption = (item) => {
    setValue(item.label || item.name || item.value);
    onChange && onChange(item._id);
    setIsOpen(false);
  };  
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
            onClick={selectOption.bind(null, item)}
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
