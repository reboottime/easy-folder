import Bookmarks from "./Bookmarks";
import Folders from "./Folders";
import Prompts from "./Prompts";

export default function Sidebar() {
  return (
    <div className="space-y-6 absolute right-0 top-12 w-[320px] p-6 bg-gray-50">
      <Prompts />
      <Bookmarks />
      <Folders />
    </div>
  );
}
