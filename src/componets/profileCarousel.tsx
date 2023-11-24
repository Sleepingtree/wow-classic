import { useState } from "react";
import { api } from "~/utils/api";
import ProfileBaseballCard from "./profileBaseballCard";

export default function ProfileCarousel() {
  const [page, setPage] = useState(0);
  const { data: signedUpUsers, fetchNextPage } =
    api.profile.getSignedUpUsers.useInfiniteQuery(
      { limit: 10 },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );
  const handleFetchNextPage = () => {
    fetchNextPage();
    setPage((prev) => prev + 1);
  };

  const handleFetchPreviousPage = () => {
    setPage((prev) => prev - 1);
  };
  // data will be split in pages
  const toShow = signedUpUsers?.pages[page]?.items;
  return (
    <div>
      {toShow
        ? toShow.map((item) => <ProfileBaseballCard prefernces={item} />)
        : "Loading"}
    </div>
  );
}
