import { ClassName, Role } from "~/constants/logicConstants";
import { HiX } from "react-icons/hi";
import ClassSelect from "./classSelect";
import RoleSelect from "./roleSelect";

type Props = {
  index: number;
  roles: Role[];
  setRoles: (roles: Role[]) => void;
  className?: ClassName;
  setClassName: (className: ClassName) => void;
  onDeleteClicked?: () => void;
};

export default function ClassRow({
  index,
  roles,
  setRoles,
  className,
  setClassName,
  onDeleteClicked,
}: Props) {
  return (
    <div
      className="mr-3 flex flex-wrap items-center justify-center"
      key={index}
    >
      <ClassSelect
        className={className}
        setClassName={setClassName}
        index={index}
      />
      <RoleSelect roles={roles} setRoles={setRoles} />
      <div
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
        onClick={onDeleteClicked}
      >
        <HiX className="h-5 w-5" />
      </div>
    </div>
  );
}
