
import { useQuery } from '@tanstack/react-query'
import { githubApi } from '../api/githubApi';
import { sleep } from '../helpers/sleep';
import { Label } from "../issues/interfaces/label";

const getLabels = async():Promise<Label[]> => {
    await sleep(2)
  const { data } = await githubApi.get<Label[]>('/labels?per_page=100')
  return data;
}

export const useLabels = () => {

    const labelsQuery = useQuery(['labels'], getLabels, {
        staleTime: 1000 * 60 * 60,
        placeholderData: [{
            "id": 1109407645,
            "node_id": "MDU6TGFiZWwxMTA5NDA3NjQ1",
            "url": "https://api.github.com/repos/facebook/react/labels/Component:%20Suspense",
            "name": "Component: Suspense",
            "color": "8ffcd6",
            "default": false,
            "description": ""
        },{
            "id": 710332294,
            "node_id": "MDU6TGFiZWw3MTAzMzIyOTQ=",
            "url": "https://api.github.com/repos/facebook/react/labels/Component:%20Server%20Rendering",
            "name": "Component: Server Rendering",
            "color": "d4c5f9",
            "default": false
        },
        {
            "id": 204945357,
            "node_id": "MDU6TGFiZWwyMDQ5NDUzNTc=",
            "url": "https://api.github.com/repos/facebook/react/labels/Component:%20Shallow%20Renderer",
            "name": "Component: Shallow Renderer",
            "color": "eb6420",
            "default": false
        },]
    } )
    return labelsQuery
}