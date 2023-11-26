import {
  DiscordPrefernceKeyType,
  DiscordPrefernceKeys,
  DiscordPrefernces,
} from "~/constants/logicConstants";
import InputSelect from "../inputSelect";

type Props = {
  discordKeys: DiscordPrefernceKeyType[];
  setDiscordKeys: (discordPrefences: DiscordPrefernceKeyType[]) => void;
};

export default function DiscordPrefernceView({
  discordKeys,
  setDiscordKeys,
}: Props) {
  const handleToggle = (
    discordKey: DiscordPrefernceKeyType,
    value: boolean,
  ) => {
    value
      ? setDiscordKeys([...discordKeys, discordKey])
      : setDiscordKeys(discordKeys.filter((inner) => inner !== discordKey));
  };
  //TODO fix this
  return (
    <div className="flex flex-col text-sm">
      {DiscordPrefernceKeys.map((key) => {
        return (
          <InputSelect
            displayText={DiscordPrefernces.get(key) ?? "lolidk"}
            key={`inputRole ${key}`}
            selected={discordKeys.includes(key)}
            setSelected={(value) => handleToggle(key, value)}
            className="ml-2"
          />
        );
      })}
    </div>
  );
}
