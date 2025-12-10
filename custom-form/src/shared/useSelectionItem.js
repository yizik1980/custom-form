import { useCallback, useState } from "react";

/**
 * Simple selection hook to keep a selected id/value in sync with controls.
 */
function useSelectionItem(initialValue = "") {
  const [selectedValue, setSelectedValue] = useState(initialValue);

  const handleSelect = useCallback(
    (valueOrEvent) => {
      const nextValue =
        valueOrEvent && valueOrEvent.target
          ? valueOrEvent.target.value
          : valueOrEvent ?? "";
      setSelectedValue(nextValue);
      return nextValue;
    },
    []
  );

  const resetSelection = useCallback(() => {
    setSelectedValue(initialValue);
  }, [initialValue]);

  return {
    selectedValue,
    handleSelect,
    resetSelection,
    bind: {
      value: selectedValue,
      onChange: handleSelect
    }
  };
}

export default useSelectionItem;
