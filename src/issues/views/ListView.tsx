import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../../hooks/useIssues';
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { State } from '../interfaces/issue';

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setstate] = useState<State>();
  const { issuesQuery, page, nextPage, prevPage } = useIssues({ state, labels: selectedLabels });
  const onLabelChanged = (labelName: string) => {
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {issuesQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList issues={issuesQuery.data || []} state={state} onStatedChanged={(newState) => setstate(newState)} />
        )}
      </div>
      <div className="col-4">
        <LabelPicker selectedLabels={selectedLabels} onChange={(labelName) => onLabelChanged(labelName)} />
      </div>
      <div className="d-flex mt-2 justify-content-between align-item-center">
        <button onClick={prevPage} className="btn btn-outline-primary">
          Prev
        </button>
        <span>{page}</span>
        <button onClick={nextPage} className="btn btn-outline-primary">
          Next
        </button>
      </div>
    </div>
  );
};
