type InputSelectProps = {
  key: string;
  displayText: string;
  selected: boolean;
  setSelected: (input: boolean) => void;
};

export default function InputSelect({ displayText, key }: InputSelectProps) {
  return (
    <div className="mb-4 flex items-center pr-2" key={key}>
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 bg-gray-100  focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
      />
      <label className="ml-1 text-xl font-medium">{displayText}</label>
    </div>
  );
}
