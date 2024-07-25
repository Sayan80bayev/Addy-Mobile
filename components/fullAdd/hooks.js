import { useGetByIdQuery } from "../../store";

export const useFullAdd = ({ id }) => {
  const {
    data: advertisement,
    isLoading,
    error,
    refetch,
  } = useGetByIdQuery(id);
  return { advertisement, isLoading, error, refetch };
};
