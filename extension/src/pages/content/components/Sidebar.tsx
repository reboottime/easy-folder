import { useEffect } from "react";
import Bookmarks from "./Bookmarks";
import Folders from "./Folders";
import Prompts from "./Prompts";

export default function Sidebar() {
    useEffect(() => {
        const button = document.querySelector('.ds-icon-button._7d1f5e2');

        if (button) {
            // Create and dispatch a click event
            const clickEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true,
                buttons: 1
            });
            button.dispatchEvent(clickEvent);
        }
    }, []);

    return (
        <div className="space-y-6  w-[360px] p-6 bg-gray-50 h-screen">
            <Prompts />
            <Bookmarks />
            <Folders />
        </div>
    );
}
