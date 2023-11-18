import { ReactNode, createContext, useContext, useState } from "react";
import { ClassName, Role } from "~/constants/logicConstants";
type ClassPerferance = {
  rank: number;
  className: ClassName | "Class";
  roles: Role[];
};
export type EditProfileContextProps = {
  classPerferances: ClassPerferance[];
  setClassPerferances: (classPerferances: ClassPerferance[]) => void;
};
export const EditProfileContext = createContext<EditProfileContextProps>({
  classPerferances: [], // set a default value
  setClassPerferances(classPerferances) {},
});

export function EditProfileContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [classPerferances, setClassPerferances] = useState<ClassPerferance[]>(
    [],
  );
  return (
    <EditProfileContext.Provider
      value={{
        classPerferances,
        setClassPerferances,
      }}
    >
      {children}
    </EditProfileContext.Provider>
  );
}
