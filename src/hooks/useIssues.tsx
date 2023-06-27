import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../api/githubApi';
import { Issue, State } from '../issues/interfaces/issue';
import { sleep } from '../helpers/sleep';

interface Props {
  state?: State;
  labels: string[];
}

const getIssues = async (labels: string[] = [], state?: State): Promise<Issue[]> => {
  await sleep(2);
  const params = new URLSearchParams();
  if (state) params.append('state', state);
  if (labels.length > 0) {
    const labelString = labels.join(',');
    params.append('labels', labelString);
  }
  params.append('page', '1');
  params.append('per_page', '5');
  const { data } = await githubApi.get<Issue[]>('/issues', { params });
  console.log(data);
  return data;
};

export const useIssues = ({ state, labels }: Props) => {
  const issuesQuery = useQuery(['issues', { state, labels }], () => getIssues(labels, state), {
    staleTime: 1000 * 60 * 60,
  });
  return { issuesQuery };
};
