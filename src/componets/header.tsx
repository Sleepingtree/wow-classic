import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";

export default function Header() {
  const { data: sessionData } = useSession();
  const userProfile = api.profile.getUserProfile.useQuery();
  return (
    <Navbar fluid className="bg-gradient-to-b from-[#15162c] to-[#63536f]">
      <Navbar.Brand href="/">
        <img
          src="/avatar.png"
          className="mr-3 h-6 sm:h-9"
          alt="Sleepingtree  Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Season of Discory Sign up page
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img={sessionData?.user.image ?? undefined}
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">
              {sessionData?.user.name ?? "Not logged in"}
            </span>
            <span className="block truncate text-sm font-medium">
              Class:
              {userProfile.data?.classPreferences &&
              userProfile.data.classPreferences.length > 0
                ? userProfile.data?.classPreferences[0]?.className
                : "Undecided"}
            </span>
          </Dropdown.Header>
          <Dropdown.Item href="/">Dashboard</Dropdown.Item>
          <Dropdown.Item href="/profile/edit">Profile</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => void signOut()}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}
