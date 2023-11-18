import { CustomFlowbiteTheme, Dropdown } from "flowbite-react";
import { ClassList, ClassName } from "~/constants/logicConstants";

type Props = {
  className: ClassName | "Class";
  setClassName: (className: ClassName) => void;
  index: number;
};

export default function ClassSelect({ className, setClassName, index }: Props) {
  const customTheme: CustomFlowbiteTheme["dropdown"] = {
    floating: {
      target: "bg-blue-600",
    },
  };
  return (
    <div className="mr-4 flex" key={index}>
      <Dropdown label={className} theme={customTheme} key={`dropdown${index}`}>
        {ClassList.map((className) => {
          return (
            <Dropdown.Item onClick={() => setClassName(className)}>
              {className}
            </Dropdown.Item>
          );
        })}
      </Dropdown>
    </div>
  );
}
