import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NoVideosFound from "../components/NoVideoFound";
import VideoList from "../components/VideoList";
import HomeSkeleton from "../skeleton/HomeSkeleton";
import { getAllVideos, makeVideosNull } from "../store/slices/videoSlice";
import { FaFilter } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useParams, useSearchParams } from "react-router-dom";
import InfiniteScroll from "../components/InfiniteScroll";

function SearchVideos() {
  const loading = useSelector((state) => state.video?.loading);
  const videosFromStore = useSelector((state) => state.video?.videos?.docs || []);
  const dispatch = useDispatch();
  const { query } = useParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchParams, setSearchParms] = useSearchParams();
  const nextCursorFromStore = useSelector((state) => state.video?.videos?.nextCursor);
  const [videos, setVideos] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const hasNextPage = useSelector((state) => state.video?.videos?.hasNextPage);


  useEffect(() => {
    const sortType = searchParams.get("sortType");
    const sortBy = searchParams.get("sortBy");

    setVideos([]);
    setNextCursor(null);

    dispatch(
      getAllVideos({
        query,
        sortBy,
        sortType,
      })
    );

    setFilterOpen(false);

    return () => dispatch(makeVideosNull());
  }, [dispatch, query, searchParams]);


  useEffect(() => {
    if (videosFromStore.length > 0) {
      setVideos((prevVideos) => {
        const existingIds = new Set(prevVideos.map(v => v._id));
        const newVideos = videosFromStore.filter(v => !existingIds.has(v._id));
        return [...prevVideos, ...newVideos];
      });
    }
  }, [videosFromStore]);


  useEffect(() => {
    setNextCursor(nextCursorFromStore || null);
  }, [nextCursorFromStore]);


  const fetchMoreVideos = useCallback(() => {
    if (hasNextPage && !loading) {
      const sortType = searchParams.get("sortType");
      const sortBy = searchParams.get("sortBy");

      dispatch(
        getAllVideos({
          query,
          sortBy,
          sortType,
          lastCreatedAt: nextCursor,
        })
      );
    }
  }, [hasNextPage, nextCursor, dispatch, loading, searchParams, query]);

  const handleSortParams = (newSortBy, newSortType = "asc") => {
    setSearchParms({ sortBy: newSortBy, sortType: newSortType });
  };

  if (videosFromStore?.totalDocs === 0) {
    return <NoVideosFound text={"Try searching something else"} />;
  }

  if (loading && videos.length === 0) {
    return <HomeSkeleton />;
  }

  return (
    <>
      <div
        className="w-full h-10 flex items-center font-bold justify-end cursor-pointer px-8"
        onClick={() => setFilterOpen((prev) => !prev)}
      >
        <span className="text-white hover:text-cyan-500">Filters</span>
        <FaFilter size={20} className="text-cyan-500 hover:text-cyan-800" />
      </div>
      <div className="w-full text-white">
        {filterOpen && (
          <div className="w-full absolute bg-transparent">
            <div className="max-w-sm border border-slate-800 rounded bg-[#222222] fixed mx-auto z-50 inset-x-0 h-96 p-5">
              <h1 className="font-semibold text-lg">Search filters</h1>
              <IoCloseCircleOutline
                size={25}
                className="absolute right-5 top-5 cursor-pointer"
                onClick={() => setFilterOpen((prev) => !prev)}
              />
              <table className="mt-4">
                <thead className="w-full text-start border-b">
                  <tr>
                    <th>SortBy</th>
                  </tr>
                </thead>
                <tbody className="flex flex-col gap-2 text-slate-400 cursor-pointer">
                  <tr onClick={() => handleSortParams("createdAt", "desc")}>
                    <td>
                      Upload date <span className="text-xs">(Latest)</span>
                    </td>
                  </tr>
                  <tr onClick={() => handleSortParams("createdAt", "asc")}>
                    <td>
                      Upload date <span className="text-xs">(Oldest)</span>
                    </td>
                  </tr>
                  <tr onClick={() => handleSortParams("views", "asc")}>
                    <td>
                      View count <span className="text-xs">(Low to High)</span>
                    </td>
                  </tr>
                  <tr onClick={() => handleSortParams("views", "desc")}>
                    <td>
                      View count <span className="text-xs">(High to Low)</span>
                    </td>
                  </tr>
                  <tr onClick={() => handleSortParams("duration", "asc")}>
                    <td>
                      Duration <span className="text-xs">(Low to High)</span>
                    </td>
                  </tr>
                  <tr onClick={() => handleSortParams("duration", "desc")}>
                    <td>
                      Duration <span className="text-xs">(High to Low)</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        <InfiniteScroll fetchMore={fetchMoreVideos} hasNextPage={hasNextPage}>
          <div className="text-white mb-20 sm:m-0 max-h-screen w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 overflow-y">
            {videos?.map((video) => (
              <VideoList
                key={video._id}
                avatar={video.ownerDetails?.avatar}
                duration={video.duration}
                title={video.title}
                thumbnail={video.thumbnail?.url}
                createdAt={video.createdAt}
                views={video.views}
                channelName={video.ownerDetails.userName}
                videoId={video._id}
                isPublished={video.isPublished}
              />
            ))}
          </div>
          {loading && <HomeSkeleton />}
        </InfiniteScroll>
      </div>
    </>
  );
}

export default SearchVideos;
