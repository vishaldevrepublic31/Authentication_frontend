import React, { useEffect, useState } from "react";
import { ICard } from "../../interfaces";
import { AllUsers } from "../../services/auth-service";
import { Link } from "react-router-dom";

const AllUser: React.FC = () => {
  const [data, setData] = useState<ICard[]>([]);
  console.log("data: ", data);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [noRecordsFound, setNoRecordsFound] = useState<boolean>(false);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setNoRecordsFound(false);
        const res = await AllUsers({ search: searchQuery });
        const users = res.data.users;

        setData(users);
        setNoRecordsFound(users.length === 0);
      } catch (error) {
        console.error("Error fetching users:", error);
        setNoRecordsFound(true);
      }
    };

    fetchUsers();
  }, [searchQuery]);

  if (data.length < 0) {
    return (
      <>
        <div className="flex justify-center items-center h-[90vh]">
          <h1 className="bg-red-200  p-10 w-96 rounded-md text-center font-semibold  ">
            No User found 😫.{" "}
          </h1>
        </div>
      </>
    );
  }
  return (
    <div className="mt-10 ml-52 mr-52 p-3 cursor-pointer">
      <div>
        <input
          type="text"
          className="border border-gray-300 rounded-md px-4 py-2"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {noRecordsFound ? (
        <div className="flex justify-center items-center h-[90vh]">
          <h1 className="bg-red-200 p-10 w-96 rounded-md text-center font-semibold">
            No Records Found 😫.
          </h1>
        </div>
      ) : (
        <div className="flex justify-between flex-wrap">
          {data
            .filter((el) => el.post.length > 0)
            .map((p: ICard, index: number) => {
              return (
                <>
                  <Link
                    to={`/user-posts/${p._id}`}
                    key={`index key ${index}`}
                    className="mt-10 even:bg-gray-100  py-8 px-8 max-w-lg mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 hover:bg-yellow-200 transition-all"
                  >
                    <div className="text-center space-y-2 sm:text-left">
                      <div className="space-y-0.5">
                        <p className="text-lg text-black font-semibold">
                          {p.first_name} {p.last_name}
                        </p>
                        <p className="text-slate-500 font-medium">
                          {p.post.length} : posts
                        </p>
                      </div>
                    </div>
                  </Link>
                </>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default AllUser;
