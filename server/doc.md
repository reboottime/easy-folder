# Backend Documentation



## API Design

#### Base URL: `https://{base_url}.com`

#### 1. Folder Management
| Endpoint                 | Method | Description                     | Request Body                            | Response                              |
|--------------------------|--------|---------------------------------|-----------------------------------------|---------------------------------------|
| `/folders`               | GET    | List all folders               | -                                       | `{folders: [{id, name}]}`             |
| `/folders`               | POST   | Create new folder              | `{name: "New Folder"}`                  | `{id, name, createdAt}`               |
| `/folders/{folderId}`    | PUT    | Rename folder                  | `{name: "Updated Name"}`                | `{id, name, updatedAt}`               |
| `/folders/{folderId}`    | DELETE | Delete folder                  | -                                       | 204 No Content                        |

#### 2. Conversation Organization

| Endpoint                            | Method | Description                     | Request Body                            | Response                              |
|-------------------------------------|--------|---------------------------------|-----------------------------------------|---------------------------------------|
| `/conversations`                    | GET    | Get all conversation metadata  | -                                       | `{conversations: [{id, title, folderId, bookmarked}]}` |
| `/conversations/{conversationId}`   | PUT    | Update conversation metadata   | `{folderId?: string, bookmarked?: bool}` | Updated conversation object           |

#### 3. Prompt Templates

| Endpoint                 | Method | Description                     | Request Body                            | Response                              |
|--------------------------|--------|---------------------------------|-----------------------------------------|---------------------------------------|
| `/prompts`               | POST   | Create prompt template         | `{name: "Prompt", content: "..." folderId?: string}` | `{id, name, content, folderId}` |
| `/prompts/{promptId}`    | DELETE | Delete prompt                  | -                                       | 204 No Content                        |
| `/prompts`               | GET    | Get prompts by folder          | `?folderId={folderId}`                  | `[{id, name, content}]`               |

---

### MongoDB Schema Design

#### 1. Folder Collection
```javascript
{
  _id: ObjectId, // Auto-generated
  name: String,  // Folder name
  createdAt: Date,
  updatedAt: Date
}
```

#### 2. Conversation Metadata Collection
```javascript
{
  conversationId: String,  // Unique ID from browser storage
  title: String,           // Conversation title
  folderId: ObjectId,      // Optional reference to folder
  bookmarked: Boolean,     // Default: false
  lastAccessed: Date
}
```

#### 3. Prompt Template Collection
```javascript
{
  _id: ObjectId,          // Auto-generated
  name: String,           // Prompt name
  content: String,        // Actual prompt text
  folderId: ObjectId,     // Optional folder reference
  createdAt: Date
}
```

---

### Backend Documentation

# DeepSeek Organizer Backend API
**Version**: 1.0  
**Base URL**: `https://api.deepseek-organizer.com/v1`

## 1. Folder Management
### List Folders
`GET /folders`  
**Response**:
```json
{
  "folders": [
    {"id": "65a1bc...", "name": "Research"},
    {"id": "65a2cd...", "name": "Ideas"}
  ]
}
```

### Create Folder
`POST /folders`  
**Request**:
```json
{"name": "New Project"}
```
**Response**:
```json
{
  "id": "65a3de...",
  "name": "New Project",
  "createdAt": "2025-06-13T10:30:00Z"
}
```

### Rename Folder
`PUT /folders/{folderId}`  
**Request**:
```json
{"name": "Updated Name"}
```
**Response**:
```json
{
  "id": "65a3de...",
  "name": "Updated Name",
  "updatedAt": "2025-06-13T10:35:00Z"
}
```

### Delete Folder
`DELETE /folders/{folderId}`  
**Response**: `204 No Content`

---

## 2. Conversation Operations
### Get All Conversations
`GET /conversations`  
**Response**:
```json
{
  "conversations": [
    {
      "id": "conv_01",
      "title": "API Design Discussion",
      "folderId": "65a1bc...",
      "bookmarked": true
    }
  ]
}
```

### Update Conversation
`PUT /conversations/{conversationId}`  
**Request** (partial update):
```json
{"folderId": "65a3de...", "bookmarked": false}
```
**Response**: Updated object

---

## 3. Prompt Templates
### Create Prompt
`POST /prompts`  
**Request**:
```json
{
  "name": "Code Review",
  "content": "Review this code for...",
  "folderId": "65a1bc..."
}
```
**Response**:
```json
{
  "id": "prompt_01",
  "name": "Code Review",
  "content": "Review this code for...",
  "folderId": "65a1bc..."
}
```

### Get Prompts by Folder
`GET /prompts?folderId={folderId}`  
**Response**:
```json
[
  {
    "id": "prompt_01",
    "name": "Code Review",
    "content": "Review this code for..."
  }
]
```

### Delete Prompt
`DELETE /prompts/{promptId}`  
**Response**: `204 No Content`

---

## Error Handling
**Standard Responses**:
- `400 Bad Request`: Invalid input
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

**Error Format**:
```json
{
  "error": "FolderNotFound",
  "message": "Requested folder does not exist"
}
```

---

## Data Flow Diagram

![](./imgs/diagram.png)

