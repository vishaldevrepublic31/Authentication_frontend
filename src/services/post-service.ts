import axios from "axios";

const PORT = "http://localhost:5000/api/v1/post/";

export const AllPosts =async (params: { search: string; }) => {
  return axios.get(`${PORT}get-all-post`, { params })

}

export const UserPosts = async (userId: any) => {
  return axios.get(`${PORT}user-posts/${userId}`);
};
export const MyPosts = async (token: any) => {
  return axios.get(`${PORT}my-posts`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};
export const AddPosts = async ( token: string | null,data: any) => {
  console.log('image',data.avatar);
  
  return axios.post(`${PORT}create-post`, data , {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};

export const UpdatePost = async (id: number, data: any, token: string | null) => {
  return axios.patch(`${PORT}update-post/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};

export const DeletePost = async (postId: any, token: any) => {
  return axios.delete(`${PORT}delete-post/${postId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};
