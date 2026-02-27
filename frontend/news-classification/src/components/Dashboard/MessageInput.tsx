import SendSVG from "@/assets/svg/SendSVG";
import { classificationAlgorithms } from "@/constants/classificationAlgorithm";
import { TAlgorithm } from "@/types/dashboard";
import { ChangeEvent } from "react";
import Dropdown from "../ui/dropdown";

type TNews = { news: string; algorithm: TAlgorithm };

type TMessageInputProps = {
  newsValue: TNews;
  setNewsValue: React.Dispatch<React.SetStateAction<TNews>>;
  handleSubmit: () => void;
  loading: boolean;
};

const MessageInput = ({
  newsValue,
  setNewsValue,
  handleSubmit,
  loading,
}: TMessageInputProps) => {
  const handleNewsValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewsValue({ ...newsValue, [e.target.name]: e.target.value });
  };
  const handleNewsType = (value: TAlgorithm) => {
    setNewsValue({ ...newsValue, algorithm: value });
  };

  return (
    <div className="flex flex-col fixed bottom-2 left-0 right-0 p-4">
      <Dropdown
        label="Model Type"
        options={classificationAlgorithms}
        onClick={(value) => handleNewsType(value)}
      />

      <div className="flex w-full gap-2 text-white">
        <textarea
          value={newsValue.news}
          onChange={handleNewsValue}
          placeholder="Enter News here"
          className="textarea flex-1 w-full textarea-bordered resize-none focus:ring-2 "
          name="news"
        ></textarea>
        <kbd
          className="kbd kbd-lg flex-shrink-0"
          style={{ width: "80px", height: "80px" }}
          onClick={handleSubmit}
          aria-disabled={loading}
        >
          <SendSVG />
        </kbd>
      </div>
    </div>
  );
};

export default MessageInput;
