import { DiscordPrefernceKey } from "~/constants/logicConstants";

type Props = {
  discordKeys: DiscordPrefernceKey[];
  setDiscordKeys: (discordPrefences: DiscordPrefernceKey[]) => void;
};

export default function RoleSelect({ discordKeys, setDiscordKeys }: Props) {
  const handleToggle = (discordKey: DiscordPrefernceKey, value: boolean) => {
    console.log(`in onclick with role: ${discordKeys}, and value: ${value}`);
    value
      ? setDiscordKeys([...discordKeys, discordKey])
      : setDiscordKeys(discordKeys.filter((inner) => inner !== discordKey));
  };
  //TODO fix this
  return (
    <div className="flex ">
      {/* {[...DiscordPrefernceKeys].map((key, value) => {
        return (
          <InputSelect
            displayText={pref}
            key={role}
            selected={roles.includes(role)}
            setSelected={(value) => handleToggle(role, value)}
          />
        );
      })} */}
    </div>
  );
}
