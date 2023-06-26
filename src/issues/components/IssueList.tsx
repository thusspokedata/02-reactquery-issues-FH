import { Issue, State } from '../interfaces/issue';
import { IssueItem } from './IssueItem';

interface Props {
  issues: Issue[];
  state?: State;
  onStatedChanged: (state?: State) => void;
}

export const IssueList = ({ issues, state, onStatedChanged }: Props) => {
  return (
    <div className="card border-white">
      <div className="card-header bg-dark">
        <ul className="nav nav-pills card-header-pills">
          <li className="nav-item">
            <a className={`nav-link ${!state ? 'active' : ''}`} onClick={() => onStatedChanged()}>
              All
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${state === State.Open ? 'active' : ''}`}
              onClick={() => onStatedChanged(State.Open)}
            >
              Open
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${state === State.Closed ? 'active' : ''}`}
              onClick={() => onStatedChanged(State.Closed)}
            >
              Closed
            </a>
          </li>
        </ul>
      </div>
      <div className="card-body text-dark">
        {issues.map((issue) => (
          <IssueItem key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
};
