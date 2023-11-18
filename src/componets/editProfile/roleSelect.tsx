import InputSelect from "../inputSelect";
import { Role, RoleList } from "~/constants/logicConstants";

type Props = {
  roles: Role[];
  setRoles: (roles: Role[]) => void;
};

export default function RoleSelect({ roles, setRoles }: Props) {
  const handleToggle = (role: Role, value: boolean) => {
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
            selected={true}
            setSelected={(value) => handleToggle(role, value)}
          />
        );
      })}
    </div>
  );
}
