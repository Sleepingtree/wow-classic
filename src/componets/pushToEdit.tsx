import { Session } from "next-auth";
import { useRouter } from "next/navigation";

import urls from "~/constants/urlConstants";
import { api } from "~/utils/api";

export default function PushToEdit({ session }: { session: Session }) {
  const profile = api.profile.getUserProfile.useQuery({
    userId: session.user.id,
  });
  if (profile.data) {
    const router = useRouter();
    router.replace(urls.editProfile);
  }
  return <></>;
}
