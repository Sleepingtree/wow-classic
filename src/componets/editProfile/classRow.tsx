import { ClassName, Role } from "~/constants/logicConstants";
import XSVG from "../xSvg";
import ClassSelect from "./classSelect";
import RoleSelect from "./roleSelect";

type Props = {
  index: number;
  roles: Role[];
  setRoles: (roles: Role[]) => void;
  className?: ClassName;
  setClassName: (className: ClassName) => void;
  isLast: boolean;
  onDeleteClicked?: () => void;
};

export default function ClassRow({
  index,
  roles,
  setRoles,
  className,
  setClassName,
  isLast,
  onDeleteClicked,
}: Props) {
  return (
    <div className="flex" key={index}>
      <ClassSelect
        className={className}
        setClassName={setClassName}
        index={index}
      />
      <RoleSelect roles={roles} setRoles={setRoles} />
      {isLast ? "" : <XSVG onClick={onDeleteClicked} />}
    </div>
  );
}
