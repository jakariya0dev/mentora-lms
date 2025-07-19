import { FaInfoCircle } from "react-icons/fa";

export default function NoticeBoard({ title }) {
  return (
    <div className="bg-amber-100 p-4 rounded-md">
      <h2 className="flex items-center gap-4 text-2xl font-semibold text-red-500">
        <FaInfoCircle className="text-amber-500" /> {title}
      </h2>
    </div>
  );
}
