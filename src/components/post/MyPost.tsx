import { useSelector } from "react-redux";
import { DeletePost, MyPosts, UpdatePost } from "../../services/post-service";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ICard } from "../../interfaces";

function MyPost() {
    const { user } = useSelector((state: any) => state?.auth);

    const [posts, setPosts] = useState<ICard[]>([]);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [edit, setEdit] = useState<boolean>(false);
    const [update, setUpdate] = useState<boolean>(false);
    const [id, setId] = useState<string>("");

    const token: string | null = localStorage.getItem("token");

    function handleUpdatePost(id: any) {
        const data = {
            title,
            description,
        };

        UpdatePost(id, data, token)
            .then((res) => {
                setEdit(false);
                setId('');
                setUpdate(!update);
                toast.success(res.data.message);
            })
            .catch((e) => {
                toast.error(e?.response?.data.message);
            });
    }

    const handleDeletePost = (id: any) => {
        DeletePost(id, token)
            .then((res) => {
                console.log("RES", res);
                setPosts((prevData) => prevData.filter((post1) => post1._id !== id));
                if (res) {
                    toast.success(res.data.message);
                }
            })
            .catch((e) => {
                toast.error(e?.response?.data.message);
            });
    }

    useEffect(() => {
        const token: string | null = localStorage.getItem("token");
        MyPosts(token)
            .then((res) => {
                setPosts(res.data.posts.reverse());
                console.log("posts=>", res.data.posts.reverse());
            })
            .catch((e) => {
                toast.error(e?.response?.data.message);
            });
    }, [update]);

    return (
        <div>
            {posts.length === 0 ? (
                <div className="flex justify-center items-center h-[90vh]">
                    <h1 className="bg-red-200 p-10 w-96 rounded-md text-center font-semibold">
                        No Post found 😫.
                    </h1>
                </div>
            ) : (
                posts.map((post: any) => (
                    <div
                        key={post._id}
                        className="mt-5 even:bg-gray-100 py-8 px-8 max-w-5xl mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
                    >
                        <img
                            className="block mx-auto h-80 w-[28rem] sm:mx-0 sm:shrink-0"
                            src={post.avatar}
                            alt="Post image"
                        />
                        <div className="space-y-2 sm:text-left">
                            <div className="space-y-0.5">
                                {edit && id === post._id ? (
                                    <input
                                        className="bg-slate-200 w-96 rounded-md block placeholder:text-red-900 border-slate-300 border text-black font-semibold p-2"
                                        type="text"
                                        value={title}
                                        placeholder={post.title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                ) : (
                                    <p className="text-lg text-black font-semibold">
                                        {post.title}
                                    </p>
                                )}

                                {edit && id === post._id ? (
                                    <input
                                        className="bg-slate-200 w-96 rounded-md placeholder:text-red-900 border-slate-300 border text-black font-semibold p-2"
                                        type="text"
                                        value={description}
                                        placeholder={post.description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                ) : (
                                    <p className="text-slate-500 font-medium">
                                        {post.description}
                                    </p>
                                )}
                            </div>
                            {edit && id === post._id ? (
                                <>
                                    <button
                                        onClick={() => {
                                            setEdit(false);
                                            setId("");
                                        }}
                                        className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 me-2"
                                    >
                                        Close
                                    </button>
                                    <button
                                        onClick={() => handleUpdatePost(post._id)}
                                        className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 me-2"
                                    >
                                        Update
                                    </button>
                                </>
                            ) : (
                                <>
                                    {(
                                        <>
                                            <button
                                                onClick={() => {
                                                    setEdit(true);
                                                    setId(post._id);
                                                    setDescription(post.description);
                                                    setTitle(post.title);
                                                }}
                                                className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 me-2"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="px-4 py-1 text-sm text-red-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 mr-5"
                                                onClick={() => handleDeletePost(post._id)}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default MyPost;
