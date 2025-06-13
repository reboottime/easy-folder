import { useEffect, useState } from "react";

export default function useGetConversationRawData() {
    const [v, setV] = useState({
        conversationId: '',
        title: ''
    })

    useEffect(() => {
        let currentActiveChat: string | null = null;

        // 1. Direct click handler for conversation items
        document.addEventListener('click', (event: any) => {
            const chatItem = event.target.closest('._83421f9');

            if (chatItem) {
                const chatTitle = chatItem.querySelector('.c08e6e93')?.textContent ?? '';
                onTitleChange(chatTitle)
            }
        });

        // 2. MutationObserver for SPA-style changes
        const observer = new MutationObserver((mutations) => {
            // Find the visually active chat (may use different class in your UI)
            const activeChat = document.querySelector('._83421f9.b64fb9ae') ||
                document.querySelector('._83421f9[aria-selected="true"]');

            if (activeChat) {
                const chatTitle = activeChat.querySelector('.c08e6e93')?.textContent;
                if (chatTitle && chatTitle !== currentActiveChat) {
                    onTitleChange(chatTitle);
                }
            }
        });

        // Start observing the sidebar container
        const sidebar = document.querySelector('._03210fb');
        if (sidebar) {
            observer.observe(sidebar, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['class', 'aria-selected']
            });
        }

        // 3. Fallback: Check every second for safety
        setInterval(() => {
            const activeChat = document.querySelector('._83421f9.b64fb9ae');
            const chatTitle = activeChat?.querySelector('.c08e6e93')?.textContent;
            if (chatTitle && chatTitle !== currentActiveChat) {
                onTitleChange(chatTitle);
            }
        }, 1000);

        function onTitleChange(title: string) {
            currentActiveChat = title;
            console.log('Active conversation changed to:', title);

            const possibleUUID = window.location.pathname.split('/').pop() ?? '';
            setV({ title, conversationId: possibleUUID });

            if (possibleUUID) {
                console.log('Associated UUID:', possibleUUID);
            }
        }
    }, []);

    return v;
}