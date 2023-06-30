import { useInfiniteQuery } from '@tanstack/react-query';
import { Issue, State } from '../issues/interfaces/issue';
import { sleep } from '../helpers/sleep';
import { githubApi } from '../api/githubApi';

interface Props {
  state?: State;
  labels: string[];
  page?: number;
}

interface QueryProps {
  pageParam?: number;
  queryKey: (string | Props)[];
}

const getIssues = async ({ pageParam = 1, queryKey }: QueryProps): Promise<Issue[]> => {
  const [, , args] = queryKey;
  const { state, labels } = args as Props;

//   await sleep(2);

  const params = new URLSearchParams();

  if (state) params.append('state', state);

  if (labels.length > 0) {
    const labelString = labels.join(',');
    params.append('labels', labelString);
  }

  params.append('page', pageParam.toString());
  params.append('per_page', '5');

  const { data } = await githubApi.get<Issue[]>('/issues', { params });
  return data;
};

export const useIssuesInfinite = ({ state, labels }: Props) => {
  const issuesQuery = useInfiniteQuery(
    ['issues', 'infinite', { state, labels }],
    (data: QueryProps) => getIssues(data),
    {
      getNextPageParam: (lastPage: Issue[], pages: Issue[][]) => {
        if (lastPage.length === 0) return;

        return pages.length + 1;
      },
    },
  );
  return {
    issuesQuery,
  };
};
