import { Checkbox } from "flowbite-react";

type InputSelectProps = {
  key: string;
  displayText: string;
  selected: boolean;
  setSelected: (input: boolean) => void;
  className?: string;
};

export default function InputSelect({
  displayText,
  key,
  selected,
  setSelected,
  className,
}: InputSelectProps) {
  console.log(`got props ${selected} text ${displayText}`);
  return (
    <div
      className={
        (className ? className + " " : "") + "mb-4 flex items-center pr-2"
      }
      key={key}
    >
      <Checkbox checked={selected} onChange={() => setSelected(!selected)} />
      <label className="ml-1 font-medium">{displayText}</label>
    </div>
  );
}
