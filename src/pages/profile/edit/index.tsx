import { ClassPreferences, WowPreferences } from "@prisma/client";
import { Button, Label, RangeSlider, Toast } from "flowbite-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiCheck, HiPlus, HiX } from "react-icons/hi";
import ClassRow from "~/componets/editProfile/classRow";
import DiscordPrefernceView from "~/componets/editProfile/discordPerfenecesView";
import Header from "~/componets/header";
import {
  ClassName,
  DiscordPrefernceKeyType,
  Role,
} from "~/constants/logicConstants";
import { api } from "~/utils/api";
import { filterZodTypedArray } from "~/utils/typeUtil";
import { classPreferenceValidator } from "~/utils/zodValidations";

export default function EditProfile() {
  const userProfile = api.profile.getUserProfile.useQuery();
  return (
    <>
      <Head>
        <title>Edit Profile</title>
        <meta name="description" content="Edit the users profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#63536f] to-[#15162c]">
        <InnerForm userProfile={userProfile.data} />
      </main>
    </>
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
  const router = useRouter();

  if (updatePreferances.isSuccess) {
    setTimeout(() => {
      router.push("/");
    }, 100);
  }

  const [classPerferances, setClassPerferances] = useState(
    userProfile?.classPreferences ?? [],
  );

  useEffect(() => {
    setClassPerferances(userProfile?.classPreferences ?? []);
  }, [userProfile?.classPreferences]);

  const [sodLikelyToPlay, setSodLikelyToPlay] = useState(50);

  //TODO update
  useEffect(() => {
    setSodLikelyToPlay(userProfile?.sodLikelyToPlay ?? 50);
  }, [userProfile?.sodLikelyToPlay]);

  const [factionPreferance, setFactionPreferance] = useState(50);

  useEffect(() => {
    setFactionPreferance(userProfile?.factionPreferance ?? 50);
  }, [userProfile?.factionPreferance]);

  const [discordKeys, setDiscordKeys] = useState<DiscordPrefernceKeyType[]>([]);

  useEffect(() => {
    setDiscordKeys(userProfile?.discordPreferences ?? []);
  }, [userProfile?.discordPreferences]);

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

  const onClick = () => {
    console.log(
      `sending mutate with prefs ${JSON.stringify(classPerferances, null, 2)}`,
    );
    updatePreferances.mutate({
      id: userProfile?.id,
      sodLikelyToPlay,
      factionPreferance,
      discordPreferances: discordKeys,
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
  };

  const plusSvg = (
    <>
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
        <HiPlus
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
      </div>
    </>
  );

  return (
    <>
      <div className="flex flex-col items-center space-y-2  text-purple-200 dark:text-white">
        <h1 className="mb-5 text-5xl">WoW preferance profile</h1>
        <div className="mb-1 block w-full">
          <Label
            htmlFor="default-range"
            value="How likey are you to play Season of Discovery (SOD)"
            className="text-lg  text-purple-200"
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
            className="text-lg  text-purple-200"
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
            className="text-lg  text-purple-200"
          />
          <DiscordPrefernceView
            discordKeys={discordKeys}
            setDiscordKeys={setDiscordKeys}
          />
        </div>
        <div className="tx-lg self-start font-medium">
          What class(s) do you want to play most to least likely
        </div>
        {classPerferances.length === 0 ? (
          <div className="flex items-center">
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
              <div className="flex items-center justify-center">
                <ClassRow
                  index={index}
                  roles={pref.roles ?? []}
                  className={pref.className}
                  setRoles={(roles) => updateRolePref(index, roles)}
                  setClassName={(className) =>
                    updateClassName(index, className)
                  }
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
        <Button onClick={onClick}>Save</Button>
      </div>
      {updatePreferances.isSuccess ? (
        <Toast className="fixed bottom-2 right-2">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">saved profile</div>
          <Toast.Toggle />
        </Toast>
      ) : undefined}
      {updatePreferances.isError ? (
        <Toast className="fixed bottom-2 right-2">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            <HiX className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            {updatePreferances.error.message}
          </div>
          <Toast.Toggle />
        </Toast>
      ) : undefined}
    </>
  );
}
