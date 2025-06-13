interface FolderProps {
    folder: IFolder;
    onFolderClick: (folder: IFolder) => void;
}

export default function Folder({ folder, onFolderClick }: FolderProps) {
    return (
        <button
            onClick={() => onFolderClick(folder)}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors w-full"
        >
            <div className="flex items-center space-x-3">
                <div
                    className="w-8 h-8 rounded-md flex items-center justify-center text-white font-medium"
                    style={{ backgroundColor: folder.color || '#6B7280' }}
                >
                    {folder.icon || '📁'}
                </div>
                <span className="text-gray-900 font-medium">{folder.name}</span>
            </div>
        </button>
    );
}