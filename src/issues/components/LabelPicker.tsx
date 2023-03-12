import { useLabels } from "../../hooks/useLabels";
import { LoadingIcon } from "../../shared/components/LoadingIcon";

interface Props {
  selectedLabels: string[];
  onChange: (labelName: string) => void;
}

export const LabelPicker= ({selectedLabels, onChange}:Props) => {
  const labelsQuery = useLabels();

  if (labelsQuery.isLoading) return <h1><LoadingIcon /></h1>;

  return (
    <>
      {labelsQuery.data?.map((label) => (
        <span
        key={label.id}
          className={`badge rounded-pill m-1 label-picker ${selectedLabels.includes(label.name)? 'label-active':''}`}
          style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
          onClick= {()=>onChange(label.name)}
        >
          {label.name}
        </span>
      ))}
      <span
        className="badge rounded-pill m-1 label-picker"
        style={{ border: `1px solid #ffccd3`, color: "#ffccd3" }}
      >
        Primary
      </span>
    </>
  );
};
