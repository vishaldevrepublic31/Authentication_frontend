import { useSelector } from "react-redux";
import { DeletePost, MyPosts, UpdatePost } from "../../services/post-service";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ICard } from "../../interfaces";

function MyPost() {
    const [posts, setPosts] = useState<ICard[]>([]);
    const [edit, setEdit] = useState(false);
    const [update, setUpdate] = useState(false)
    const [id, setId] = useState("");
    const [description, setDescription] = useState("");
    const token = localStorage.getItem("token");
    const { user } = useSelector((state: any) => state?.auth);
    const [title, setTitle] = useState("");
    console.log(user);

    function handleUpdatePost(id: any) {
        const data = {
            title,
            description,
        };
        console.log(id, data);
        UpdatePost(id, data, token)
            .then((res) => {
                setEdit(false)
                setId('')
                setUpdate(!update)
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
                setPosts((prevData) => prevData.filter((post1) => post1._id !== id))
                if (res) {
                    toast.success(res.data.message);
                }
            })
            .catch((e) => {
                toast.error(e?.response?.data.message);
            });
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        MyPosts(token)
            .then((res) => {
                console.log("User post api =>", res.data.posts);
                setPosts(res.data.posts.reverse());
            })
            .catch((e) => {
                toast.error(e?.response?.data.message);
            });
    }, [update]);



    return (
        <div>
            {posts.map((post: any) => (
                <div
                    key={post._id}
                    className="mt-5 even:bg-gray-100 py-8 px-8 max-w-5xl   mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
                >
                    <img
                        className="block mx-auto h-80 w-80 sm:mx-0 sm:shrink-0"
                        src={post.avatar.secure_url}
                        alt="Woman's Face"
                    />
                    {/* rounded-full  */}
                    <div className=" space-y-2 sm:text-left">
                        <div className="space-y-0.5">
                            {edit && id === post._id && (
                                <input
                                    className="bg-slate-200 w-96 rounded-md block   placeholder:text-red-900 border-slate-300 border text-black font-semibold p-2 "
                                    type="text "
                                    value={title}
                                    placeholder={post.title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            )}

                            {id !== post._id && (
                                <p className="text-lg text-black font-semibold">{post.title}</p>
                            )}

                            {edit && id === post._id && (
                                <input
                                    className="bg-slate-200 w-96 rounded-md placeholder:text-red-900 border-slate-300 border text-black font-semibold p-2 "
                                    type="text "
                                    value={description}
                                    placeholder={post.description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            )}

                            {id !== post._id && (
                                <p className="text-slate-500 font-medium">{post.description}</p>
                            )}
                        </div>
                        {edit && id === post._id && (
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
                        )}
                        {post.creator === user._id && (
                            <>
                                <button
                                    onClick={() => {
                                        setEdit(true);
                                        setId(post._id);
                                    }}
                                    className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 me-2"
                                >
                                    Edit
                                </button>

                                <button className="px-4 py-1 text-sm text-red-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 mr-5"
                                    onClick={() => handleDeletePost(post._id)}
                                >
                                    delete
                                </button>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MyPost;