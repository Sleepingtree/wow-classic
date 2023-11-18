import { Button } from "flowbite-react";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import ClassRow from "~/componets/editProfile/classRow";
import {
  EditProfileContext,
  EditProfileContextProvider,
} from "~/componets/editProfile/editProfileContext";
import PlusSVG from "~/componets/plusSvg";
import { ClassName, Role } from "~/constants/logicConstants";
import Home from "~/pages";
import { api } from "~/utils/api";

export default function EditProfile() {
  const { data: sessionData } = useSession();
  if (!sessionData) {
    return <Home />;
  }

  const wowPreferances = api.profile.getUserProfile.useQuery(
    {
      userId: sessionData.user.id,
    },
    { enabled: !!sessionData.user.id },
  );
  return (
    <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#FFF569] to-[#bfcc76]">
      <div className="flex">
        <EditProfileContextProvider>
          {wowPreferances.data ? (
            <InnerForm wowPreferanceId={wowPreferances.data.id} />
          ) : (
            ""
          )}
        </EditProfileContextProvider>
      </div>
    </main>
  );
}

function InnerForm({ wowPreferanceId }: { wowPreferanceId: string }) {
  const updatePreferances = api.profile.updateWowPreferances.useMutation();

  const { classPerferances, setClassPerferances } =
    useContext(EditProfileContext);

  console.log(`inner form render ${classPerferances}`);

  const updateRolePref = (index: number, roles: Role[]) => {
    const oldItem = classPerferances[index];
    if (oldItem) {
      oldItem.roles = roles;
      classPerferances.splice(index, 1);
      classPerferances.push(oldItem);
    }
    setClassPerferances([...classPerferances]);
  };

  const updateClassName = (index: number, className: ClassName) => {
    const oldItem = classPerferances[index];
    if (oldItem) {
      oldItem.className = className;
      classPerferances.splice(index, 1);
      classPerferances.push(oldItem);
    }
    setClassPerferances([...classPerferances]);
  };

  const plusSvg = (
    <PlusSVG
      onClick={() => {
        console.log("clicking");
        setClassPerferances([
          ...classPerferances,
          {
            rank: classPerferances.length + 1,
            roles: [],
            className: "Class",
          },
        ]);
      }}
    />
  );

  return (
    <div className="flex-col space-y-2">
      {classPerferances.length === 0 ? (
        <div className="flex">
          <ClassRow
            index={0}
            roles={[]}
            className={"Class"}
            setRoles={(roles) =>
              setClassPerferances([{ rank: 1, roles, className: "Class" }])
            }
            setClassName={(className) =>
              setClassPerferances([{ rank: 1, roles: [], className }])
            }
            isLast={true}
          />
          {plusSvg}
        </div>
      ) : (
        classPerferances.map((pref, index) => {
          return (
            <div className="flex">
              <ClassRow
                index={index}
                roles={pref.roles}
                className={pref.className}
                setRoles={(roles) => updateRolePref(index, roles)}
                setClassName={(className) => updateClassName(index, className)}
                isLast={index === classPerferances.length - 1}
                onDeleteClicked={() =>
                  setClassPerferances(
                    classPerferances.filter((_item, i) => i !== index),
                  )
                }
              />
              {index === classPerferances.length - 1 ? plusSvg : undefined}
            </div>
          );
        })
      )}
      <Button
        onClick={() =>
          updatePreferances.mutate({
            classPreferances: classPerferances.map((pref) => ({
              roles: pref.roles,
              rank: pref.rank,
              className: pref.className as ClassName,
              wowPreferencesId: wowPreferanceId,
            })),
          })
        }
      />
    </div>
  );
}
