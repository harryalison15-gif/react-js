import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPost } from "../api/post";

const useCreatePost = () => {
 
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (postData) => createPost(postData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
        retry: 1,
    });
}
export default useCreatePost