import { useState } from "react";
import DatalistInput, { useComboboxControls } from "react-datalist-input";
import "react-datalist-input/dist/styles.css";
import "./FilterSelector.scss";

/**
 * An input field, once selection is made it sets it via setSelection as {inputLabel: item.value}
 * @param inputLabel the name of the input field.
 * @param datalist is a list of strings that will be used to populate the datalist.
 * @param setSelection is a useState setter that will be used to set the selected value from the datalist.
 */
export default function FilterSelector({
  inputLabel = "No Input Label",
  datalist = ["No datalist inserted"],
  setSelection,
}: // onFilterSelection,
// fetchData,
{
  inputLabel: string;
  datalist: Array<string>;
  setSelection: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [isSelected, setIsSelected] = useState(false);
  const comboboxControls = useComboboxControls();

  // Clicking X will remove the selected value in setSelection and reset the input field.
  const handleXClick = () => {
    // fetchData();
    setIsSelected(false);
    comboboxControls.setValue("");
    setSelection((old: any) => {
      // console.log("old");

      // console.log(old);
      // console.log(inputLabel);

      delete old[inputLabel];

      return { ...old };
    });
  };
  return (
    <div className="filter-selector d-flex">
      <DatalistInput
        placeholder={datalist[0]}
        label={inputLabel}
        onSelect={(item) => {
          if (setSelection === undefined)
            throw new Error(
              "setSelection is undefined in FilterSelector component."
            );
          setIsSelected(true);
          setSelection((old: any) => {
            return { ...old, [inputLabel]: item.value };
          });
          // onFilterSelection(item.value);
        }}
        items={datalist.map((item, index) => {
          return { id: index, value: item };
        })}
        {...comboboxControls}
      />
      {
        isSelected ? (
          <X handleXClick={handleXClick} />
        ) : null /* If isSelected is true, render the X icon. */
      }
    </div>
  );
}

const X = ({ handleXClick }: { handleXClick: Function }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      className="bi bi-x mx-2 mt-4 filter-x-button"
      viewBox="0 0 16 16"
      onClick={() => {
        handleXClick();
      }}
    >
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
    </svg>
  );
};
