import classNames from "classnames";
import { CheckCircle, Circle, TrashSimple } from "phosphor-react";
import { Daily } from "../../domain/Daily";

type Props = {
  daily: Daily;
  updatedDaily: (id: string) => void;
  deleteDaily: (id: string) => void;
};

const DailyItem = (props: Props) => {
  return (
    <div className="flex items-center justify-between gap-2 border-b">
      <div className={classNames("flex w-full items-center cursor-pointer hover:text-green-400 transition-colors ", {
        "text-green-400": props.daily.completed,
      })}
        onClick={() => props.updatedDaily(props.daily.id)}>
        <span className="p-2">
          {props.daily.completed ? (
            <CheckCircle size={32} />
          ) : (
            <Circle size={32} />
          )}
        </span>
        <span className={classNames({ "line-through": props.daily.completed })}>
          {props.daily.decription}
        </span>
      </div>
      <span className="hover:text-red-500 cursor-pointer"
        onClick={() => props.deleteDaily(props.daily.id)}>
        <TrashSimple size={32} />
      </span>
    </div>
  );
};

export default DailyItem;
