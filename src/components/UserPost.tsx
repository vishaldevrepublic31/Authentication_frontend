import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { UserPosts } from "../services/post-service";
import toast from "react-hot-toast";
import { ICard } from "../interfaces";
import { useSelector } from "react-redux";

function UserPost() {
    const [posts, setPosts] = useState<ICard[]>([]);
    const { id } = useParams()
    const { user } = useSelector((state: any) => state?.auth);
    useEffect(() => {

        UserPosts(id).then((res) => {
            console.log('User post api =>', res.data.posts);
            setPosts(res.data.posts)
        }).catch((e) => {
            toast.error(e?.response?.data.message);
        });

    }, []);



    return (
        <div>
            {
                posts.map((post: any) => <div key={post._id} className="mt-5 even:bg-gray-100 py-8 px-8 max-w-5xl   mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
                    <img className="block mx-auto rounded-md w-96  h-60 sm:mx-0 sm:shrink-0" src={post.avatar} alt="Woman's Face" />
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
                        {post.creator === user._id &&
                            <>

                                <button className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 me-2">Edit</button>
                                <button className="px-4 py-1 text-sm text-red-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2">delete</button>
                            </>
                        }
                    </div>
                </div>
                )
            }

        </div>
    )
}

export default UserPost
