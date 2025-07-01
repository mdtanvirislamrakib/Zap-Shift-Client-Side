import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";

const useUserRole = () => {
    const { user, loading } = UseAuth();
    const axiosSecure = UseAxiosSecure();

    const { data: role = "user", isPending, refetch, isError } = useQuery({
        enabled: !!user?.email && !loading, // Only fetch when user is available
        queryKey: ["userRole", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data.role;
        },
    });

    return { role, isLoading: isPending || loading, isError, refetch };
};

export default useUserRole;
