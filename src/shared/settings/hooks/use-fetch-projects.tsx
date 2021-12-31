import { useQuery } from "@apollo/client";
import { fetchProjects } from "@/shared/settings/data/queries";
import {
  FetchProjects,
  FetchProjectsVariables,
} from "@/shared/settings/data/__generated__/FetchProjects";

export const useFetchProjects = (variables: FetchProjectsVariables) => {
  const { data, loading, refetch } = useQuery<FetchProjects>(fetchProjects, {
    variables,
  });
  return {
    data: data?.fetchProjects,
    loading,
    refetch,
  };
};
