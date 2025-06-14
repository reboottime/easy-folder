import { useEffect, useState } from "react";
import { MESSAGE_ACTIONS } from "@utils/message";

import Conversations from "./Conversations";
import Prompts from "./Prompts";

export default function Sidebar() {
    const [isVisible, setIsVisible] = useState(false);

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

    useEffect(() => {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.action === MESSAGE_ACTIONS.TOGGLE_DEEPSEEK_HELPER) {
                setIsVisible(message.data.isVisible);
                sendResponse({ success: true });
                return true;
            }
        });
        setIsVisible(window.location.href.includes('chat.deepseek.com'))
    }, []);

    if (!isVisible) return null;


    return (
        <div className="space-y-6  w-[360px] p-6 bg-gray-50 h-screen">
            <Prompts />
            <Conversations />
        </div>
    );
}
