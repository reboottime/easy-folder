import Bookmarks from "./Bookmarks";
import Folders from "./Folders";
import Prompts from "./Prompts";

export default function Sidebar() {
  return (
    <div className="space-y-6">
      <Prompts />
      <Bookmarks />
      <Folders />
    </div>
  );
}
