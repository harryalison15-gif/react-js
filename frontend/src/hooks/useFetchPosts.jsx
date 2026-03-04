import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../api/post';

const useFetchPosts = () => {
        const {data,isLoading,isError} =useQuery(
            {
                queryKey:['posts'],
                queryFn: fetchPosts
            }
        )
    return {data,isLoading,isError}
}

export default useFetchPosts