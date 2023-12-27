import { useEffect, useState } from "react";
import { AllPosts } from "../services/post-service";

function AllPost() {
  const [posts, setPosts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [noRecordsFound, setNoRecordsFound] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setNoRecordsFound(false);
        const res = await AllPosts({ search: searchQuery });
        const posts = res.data.posts;

        setPosts(posts);
        setNoRecordsFound(posts.length === 0);
      } catch (error) {
        console.error("Error fetching users:", error);
        setNoRecordsFound(true);
      }
    };
    fetchPosts();
  }, [searchQuery]);

  return (
    <div className="mt-10 ml-52 mr-52 p-3 cursor-pointer">
      <div>
        <input
          type="text"
          className="border border-gray-300 rounded-md px-4 py-2"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div>
        {noRecordsFound ? (
          <div className="flex justify-center items-center h-[90vh]">
            <h1 className="bg-red-200 p-10 w-96 rounded-md text-center font-semibold">
              No Records Found 😫.
            </h1>
          </div>
        ) : (
          <>
            {" "}
            {posts.map((post: any) => (
              <div
                key={post._id}
                className="mt-5 even:bg-gray-100 py-8 px-8 max-w-5xl   mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
              >
                <img
                  className="block mx-auto rounded-md w-96  h-60 sm:mx-0 sm:shrink-0"
                  src={post.avatar}
                  alt="Woman's Face"
                />
                {/* rounded-full  */}
                <div className=" space-y-2 sm:text-left">
                  <div className="space-y-0.5">
                    <p className="text-lg text-black font-semibold">
                      {post.title}
                    </p>
                    <p className="text-slate-500 font-medium">
                      {post.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default AllPost;
