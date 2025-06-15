// apply prompt to current conversation
const applyPrompt = async ({ content }: IPrompt) => {
    const inputTextarea = document.querySelector(
        "#chat-input",
    ) as HTMLTextAreaElement;

    if (inputTextarea) {
        inputTextarea.value = content;
        const event = new Event('input', { bubbles: true, cancelable: true });
        inputTextarea.dispatchEvent(event);
    } else {
        try {
            await navigator.clipboard.writeText(content);
            console.log('Text copied to clipboard');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    }
};

export default applyPrompt;
