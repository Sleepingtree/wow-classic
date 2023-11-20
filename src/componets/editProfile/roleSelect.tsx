import { Role, RoleList } from "~/constants/logicConstants";
import InputSelect from "../inputSelect";

type Props = {
  roles: Role[];
  setRoles: (roles: Role[]) => void;
};

export default function RoleSelect({ roles, setRoles }: Props) {
  const handleToggle = (role: Role, value: boolean) => {
    console.log(`in onclick with role: ${role}, and value: ${value}`);
    value
      ? setRoles([...roles, role])
      : setRoles(roles.filter((inner) => inner !== role));
  };

  return (
    <div className="flex ">
      {RoleList.map((role) => {
        return (
          <InputSelect
            displayText={role}
            key={role}
            selected={false}
            setSelected={(value) => handleToggle(role, value)}
          />
        );
      })}
    </div>
  );
}
