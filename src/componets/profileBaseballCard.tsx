import { ClassPreferences, WowPreferences } from "@prisma/client";
import { Avatar } from "flowbite-react";
import Link from "next/link";

type Props = {
  prefernces: WowPreferences & { classPreferences?: ClassPreferences[] } & {
    User: { name: string | null; image: string | null };
  };
};

export default function ProfileBaseballCard({ prefernces }: Props) {
  let image: string | undefined;
  switch (true) {
    case prefernces.factionPreferance < 25:
      image = "horde.png";
      break;
    case prefernces.factionPreferance > 75:
      image = "ally.png";
      break;
  }
  return (
    <div>
      <div>
        <Link
          className="flex max-w-md flex-col gap-4 rounded-xl bg-white/10 p-4 text-white"
          href="/profile/edit"
          target="_blank"
        >
          <div className="flex flex-wrap justify-start space-x-2">
            <Avatar img={prefernces.User.image ?? undefined} />
            <h5 className="text-2xl font-bold tracking-tight">
              {prefernces.User.name}
            </h5>
            {image ? (
              <img
                src={image}
                className={`h-10 rounded-lg bg-black`}
                alt="horde logo"
              />
            ) : (
              ""
            )}
          </div>
          <p className="font-normal ">
            {prefernces.classPreferences?.map((pref, index) => {
              return (
                <div key={`baseballCard ${index}`}>
                  <span key={` ${index}`} className="mr-2">
                    {pref.className}:
                  </span>
                  {pref.roles.map((role, i, a) =>
                    i === a.length - 1 ? role : role + ", ",
                  )}
                </div>
              );
            })}
          </p>
        </Link>
      </div>
    </div>
  );
}
