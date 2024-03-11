import DatalistInput from "react-datalist-input";
import "react-datalist-input/dist/styles.css";

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
}: {
  inputLabel: string;
  datalist: Array<string>;
  setSelection: React.Dispatch<React.SetStateAction<string>>;
}) {

  return (
    <DatalistInput
      placeholder={datalist[0]}
      label={inputLabel}
      onSelect={(item) => {
        if (setSelection === undefined) throw new Error("setSelection is undefined in FilterSelector component.");
        setSelection((old:any)=>{return {...old, [inputLabel]: item.value}});
      }}
      items={datalist.map((item, index) => {
        return { id: index, value: item };
      })}
    />
  );
}
