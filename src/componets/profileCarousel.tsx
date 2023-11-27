import { useEffect } from "react";
import { api } from "~/utils/api";
import ProfileBaseballCard from "./profileBaseballCard";

export default function ProfileCarousel() {
  const { data: signedUpUsers, fetchNextPage } =
    api.profile.getSignedUpUsers.useInfiniteQuery(
      { limit: 5 },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  const toShow = signedUpUsers?.pages.flatMap((page) => page.items);

  useEffect(() => {
    const handleScroll = () => {
      const offsetHeight = document.documentElement.offsetHeight;
      const innerHeight = window.innerHeight;
      const scrollTop = document.documentElement.scrollTop;

      const hasReachedBottom = offsetHeight - (innerHeight + scrollTop) <= 10;

      if (hasReachedBottom) {
        void fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {toShow
        ? toShow.map((item, index) => (
            <ProfileBaseballCard
              key={`profile number ${index}`}
              prefernces={item}
            />
          ))
        : "Loading"}
    </>
  );
}
