export const MESSAGE_ACTIONS = {
    TOGGLE_DEEPSEEK_HELPER: 'TOGGLE_DEEPSEEK_HELPER',
};

export default class Message {
    action: string;
    data: Record<string, any> |undefined

    constructor(action: string, data?: Record<string, any>) {
        this.action = action;
        this.data=data;
    }
}