import { CustomFlowbiteTheme, Dropdown } from "flowbite-react";
import { ClassList, ClassName } from "~/constants/logicConstants";

type Props = {
  className?: ClassName;
  setClassName: (className: ClassName) => void;
  index: number;
};

export default function ClassSelect({ className, setClassName, index }: Props) {
  const customTheme: CustomFlowbiteTheme["dropdown"] = {
    floating: {
      target: "mr-2",
    },
  };
  return (
    <>
      <Dropdown
        label={className ?? "Class"}
        theme={customTheme}
        key={`dropdown${index}`}
      >
        {ClassList.map((className) => {
          return (
            <Dropdown.Item
              onClick={() => setClassName(className)}
              key={`classSelect${index}`}
            >
              {className ?? "Class"}
            </Dropdown.Item>
          );
        })}
      </Dropdown>
    </>
  );
}
