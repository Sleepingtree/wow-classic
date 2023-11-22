import { ClassPreferences, WowPreferences } from "@prisma/client";
import { Button, Checkbox, Label, RangeSlider } from "flowbite-react";
import { useEffect, useState } from "react";
import ClassRow from "~/componets/editProfile/classRow";

import PlusSVG from "~/componets/plusSvg";
import { ClassName, Role } from "~/constants/logicConstants";
import { api } from "~/utils/api";
import { filterZodTypedArray } from "~/utils/typeUtil";
import { classPreferenceValidator } from "~/utils/zodValidations";

export default function EditProfile() {
  const userProfile = api.profile.getUserProfile.useQuery();
  return (
    <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#FFF569] to-[#bfcc76]">
      <InnerForm userProfile={userProfile.data} />
    </main>
  );
}

function InnerForm({
  userProfile,
}: {
  userProfile:
    | (WowPreferences & { classPreferences: Partial<ClassPreferences>[] })
    | undefined
    | null;
}) {
  const updatePreferances = api.profile.updateWowPreferances.useMutation();

  const [classPerferances, setClassPerferances] = useState(
    userProfile?.classPreferences ?? [],
  );

  useEffect(() => {
    setClassPerferances(userProfile?.classPreferences ?? []);
  }, [userProfile?.classPreferences]);

  const [sodLikelyToPlay, setSodLikelyToPlay] = useState(50);

  //TODO update
  useEffect(() => {
    setSodLikelyToPlay(50);
  }, [userProfile]);

  const [factionPreferance, setFactionPreferance] = useState(50);

  useEffect(() => {
    setFactionPreferance(50);
  }, []);

  const [discordNotificaitons, setDiscordNotifications] = useState([]);

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
        const newPrefs = [
          ...classPerferances,
          {
            rank: classPerferances.length + 1,
            roles: [],
            className: "Class",
          },
        ];
        console.log(`new prefs  ${JSON.stringify(newPrefs, null, 2)}`);
        setClassPerferances([
          ...classPerferances,
          {
            rank: classPerferances.length + 1,
            roles: [],
          },
        ]);
      }}
    />
  );

  return (
    <div className="flex flex-col items-center space-y-2 ">
      <div className="mb-1 block w-full">
        <Label
          htmlFor="default-range"
          value="How likey are you to play Season of Discovery (SOD)"
          className="text-lg"
        />
        <RangeSlider
          className="w-full"
          id="default-range"
          value={sodLikelyToPlay}
          onChange={(e) => setSodLikelyToPlay(Number(e.target.value))}
        />
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>Lol I just clicked this site cus you linked it</span>
          <span>yes</span>
        </div>
      </div>
      <div className="mb-1 block w-full">
        <Label
          htmlFor="default-range"
          value="Which faction do you want to play"
          className="text-lg"
        />
        <RangeSlider
          className="w-full"
          id="default-range"
          value={factionPreferance}
          onChange={(e) => setFactionPreferance(Number(e.target.value))}
        />
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>lok'tar ogar</span>
          <span>lol w/e</span>
          <span>For the Alliance</span>
        </div>
      </div>
      <div className="mb-1 block w-full">
        <Label
          htmlFor="default-range"
          value="What discord notifications do you want?"
          className="text-lg"
        />
        <div className="ml-4">
          <div className="text-sm">
            All notifications
            <Checkbox />
          </div>
          <div className="text-sm">
            What server/faction we are playing on
            <Checkbox />
          </div>
          <div className="text-sm">
            LFG for dungions/raids
            <Checkbox />
          </div>
        </div>
      </div>
      {classPerferances.length === 0 ? (
        <div className="flex">
          <ClassRow
            index={0}
            roles={[]}
            setRoles={(roles) => setClassPerferances([{ rank: 1, roles }])}
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
                roles={pref.roles ?? []}
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
        onClick={() => {
          console.log(
            `sending mutate with prefs ${JSON.stringify(
              classPerferances,
              null,
              2,
            )}`,
          );
          updatePreferances.mutate({
            id: userProfile?.id,
            sodLikelyToPlay,
            discordPreferances: [],
            classPrefernces: filterZodTypedArray(
              classPerferances,
              classPreferenceValidator,
            )
              .map((pref) => {
                console.log(`after filter ${JSON.stringify(pref, null, 2)}`);
                return pref;
              })
              .map((pref) => ({
                roles: pref.roles,
                rank: pref.rank,
                className: pref.className,
                wowPreferencesId: pref.wowPreferencesId,
              })),
          });
        }}
      >
        Save
      </Button>
    </div>
  );
}
