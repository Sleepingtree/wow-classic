import { useState } from "react";
import InputSelect from "../inputSelect";

export default function RoleSelect() {
  const [tank, setTank] = useState(false);
  const [healer, setHealer] = useState(false);
  const [dps, setDps] = useState(false);
  return (
    <div className="flex ">
      <InputSelect
        displayText={"Healer"}
        key={"Healer"}
        selected={healer}
        setSelected={setHealer}
      />
      <InputSelect
        displayText={"Tank"}
        key={"Tank"}
        selected={tank}
        setSelected={setTank}
      />
      <InputSelect
        displayText={"DPS"}
        key={"DPS"}
        selected={dps}
        setSelected={setDps}
      />
    </div>
  );
}
