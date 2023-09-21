import toast from "react-hot-toast";
import { AddPosts } from "../../services/post-service";
import { useEffect, useRef, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { IAddPost } from "../../interfaces";

const AddPost: React.FC = () => {
    const [description, setDescription] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [avatar, setAvatar] = useState<string>("");
    const token: string | null = localStorage.getItem('token')

    const navigate: NavigateFunction = useNavigate()

    const inputRef = useRef<HTMLInputElement>(null)

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const data: IAddPost = {
            title,
            description,
            avatar
        }
        AddPosts(token, data)
            .then((res) => {
                navigate('/my-posts')
                toast.success(res.data.message);
            })
            .catch((e) => {
                toast.error(e?.response?.data.message);
            });
    }
    useEffect(() => {

        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, []);

    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">


                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white  px-6 py-12 shadow sm:rounded-lg sm:px-12 ">
                        <form className="space-y-6" onSubmit={handleSubmit} >
                            {/* tittle */}
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Title
                                </label>
                                <div>
                                    <input
                                        ref={inputRef}
                                        id="title"
                                        name="title"
                                        type="text"
                                        // value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />

                                </div>
                            </div>
                            {/* Description */}

                            <div>


                                <label
                                    htmlFor="description"
                                    className="block  text-sm font-medium leading-6 text-gray-900"
                                >
                                    Description
                                </label>

                                <div>
                                    <input
                                        id="description"
                                        name="description"
                                        type="text"
                                        // value={description}
                                        onChange={e => setDescription(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            {/* image */}
                            <div>


                                <label
                                    htmlFor="image_url"
                                    className="block  text-sm font-medium leading-6 text-gray-900"
                                >
                                    Image Url
                                </label>

                                <div>
                                    <input
                                        id="image_url"
                                        name="image_url"
                                        type="text"
                                        // value={description}
                                        onChange={e => setAvatar(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>


                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddPost