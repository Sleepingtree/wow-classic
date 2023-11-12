import { CustomFlowbiteTheme, Dropdown } from "flowbite-react";
import { useState } from "react";
import { ClassList } from "~/constants/logicConstants";

export default function ClassSelect() {
  const [selectedClass, setSelectedClass] = useState("Class");
  const customTheme: CustomFlowbiteTheme["dropdown"] = {
    floating: {
      target: "bg-green-700",
    },
  };
  return (
    <div className="mr-4 flex">
      <Dropdown label={selectedClass} theme={customTheme}>
        {ClassList.map((className) => {
          return (
            <Dropdown.Item onClick={() => setSelectedClass(className)}>
              {className}
            </Dropdown.Item>
          );
        })}
      </Dropdown>
    </div>
  );
}
