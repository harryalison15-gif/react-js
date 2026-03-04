import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updatePost } from "../api/post"

const useUpdatePost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (({ id, post }) => {
            updatePost({ id, post })
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        }
    })
}

export default useUpdatePost