import { useState } from "react";
import { Search } from "lucide-react";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@ui/command";
import { useGetPrompts } from "@pages/content/queries/prompts.queries";

interface SearchPromptProps {
    onApplyPrompt: (prompt: IPrompt) => void;
}

export default function SearchPrompt({ onApplyPrompt }: SearchPromptProps) {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const { data: prompts, isLoading, isFetched, error } = useGetPrompts();

    const onPromptSelect = async(p: IPrompt) => {
        try {
            await onApplyPrompt(p);
            setSearchValue('');
            setOpen(false)
        }
        catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <div className="relative mb-4">
                <input
                    type="text"
                    placeholder="Search prompts..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter" && searchValue.trim()) {
                            setOpen(true);
                        }
                    }}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search prompts..." value={searchValue} />
                <CommandList>
                    {isLoading && (
                        <CommandGroup>
                            <CommandItem disabled>Loading prompts...</CommandItem>
                        </CommandGroup>
                    )}
                    {error && (
                        <CommandGroup>
                            <CommandItem disabled className="text-red-500">
                                Error: {error.message}
                            </CommandItem>
                        </CommandGroup>
                    )}
                    {isFetched && !error && prompts?.length === 0 && (
                        <CommandEmpty>No prompts found.</CommandEmpty>
                    )}
                    {(prompts?.length ?? 0) > 0 && (
                        <CommandGroup heading="Prompts">
                            {prompts?.map((prompt) => (
                                <CommandItem
                                    key={prompt._id}
                                    onSelect={onPromptSelect.bind(null, prompt)}
                                    onClick={onPromptSelect.bind(null, prompt)}
                                >
                                    <div className="flex flex-col gap-1 w-full">
                                        <p className="font-medium">{prompt.name}</p>
                                        <p className="text-gray-400 text-sm line-clamp-2">
                                            {prompt.content}
                                        </p>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}
                </CommandList>
            </CommandDialog>
        </>
    );
}
