import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useGetFullname(userId: string) {
  const { data, error, isLoading } = useSWR(
    userId ? `/api/get-fullname?userId=${userId}` : null,
    fetcher
  );

  return {
    fullname: data?.hashedFullName,
    isLoading,
    isError: !!error,
  };
}