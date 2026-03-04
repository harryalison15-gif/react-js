import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deletePost } from "../api/post"


const useDeletePost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id) => deletePost(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        }
    })

}
export default useDeletePost