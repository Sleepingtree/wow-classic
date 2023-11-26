import { useState } from "react";
import { api } from "~/utils/api";
import ProfileBaseballCard from "./profileBaseballCard";

export default function ProfileCarousel() {
  const [page, _setPage] = useState(0);
  const { data: signedUpUsers, fetchNextPage } =
    api.profile.getSignedUpUsers.useInfiniteQuery(
      { limit: 10 },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );
  // const handleFetchNextPage = () => {
  //   fetchNextPage();
  //   setPage((prev) => prev + 1);
  // };

  // const handleFetchPreviousPage = () => {
  //   setPage((prev) => prev - 1);
  // };
  // data will be split in pages
  const toShow = signedUpUsers?.pages[page]?.items;

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
