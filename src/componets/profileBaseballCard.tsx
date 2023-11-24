import { ClassPreferences, WowPreferences } from "@prisma/client";
import { Avatar, Card } from "flowbite-react";

type Props = {
  prefernces: WowPreferences & { classPreferences?: ClassPreferences[] } & {
    User: { name: string | null; image: string | null };
  };
};

export default function ProfileBaseballCard({ prefernces }: Props) {
  return (
    <div>
      <Card>
        <div className="flex justify-start space-x-2">
          <Avatar img={prefernces.User.image ?? undefined} />
          <h5 className="text-2xl font-bold tracking-tight">
            {prefernces.User.name}
          </h5>
        </div>
        <p className="font-normal ">
          {prefernces.classPreferences?.map((pref) => {
            return (
              <div>
                <span className="mr-2">{pref.className}:</span>
                {pref.roles.map((role, i, a) =>
                  i === a.length - 1 ? role : role + ", ",
                )}
              </div>
            );
          })}
        </p>
      </Card>
    </div>
  );
}
