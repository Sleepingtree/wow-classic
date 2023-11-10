import InputSelect from "./inputSelect";

//type Roles = "Tank" | "Healer" | "DPS"
const roles = ["Tank", "Healer", "DPS"];

export default function RoleSelect() {
  return (
    <div className="flex">
      {roles.map((role) => (
        <InputSelect displayText={role} key={role} />
      ))}
    </div>
  );
}
