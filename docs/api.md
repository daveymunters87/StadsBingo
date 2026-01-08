# StadsBingo API Documentation

This document describes the API endpoints for the StadsBingo application, including student login, dashboard access, and admin functionality.

---

## **Authentication**

### POST /api/auth/team-login

**Description:**  
Allows a student to log in using a team code. Returns the team information if the code is valid and sets a session cookie.

**Request Body (JSON):**  
```json
{
  "code": "TEAMCODE123"
}
```

**Response (JSON):**  
```json
{
  "teamId": "clx123abc",
  "captainId": "clx456def",
  "players": [
    {
      "id": "clx456def",
      "name": "Jan Jansen"
    },
    {
      "id": "clx789ghi",
      "name": "Piet Pietersen"
    }
  ]
}
```

**Responses:**

| Status | Description |
|--------|-------------|
| 200    | Login successful. Returns team information and sets session cookie. |
| 400    | Team code is missing from the request. |
| 401    | Invalid team code provided. |
| 500    | Server error. Something went wrong on the backend. |

---

### POST /api/auth/admin-login

**Description:**  
Allows an admin/teacher to log in using email and password. Sets an admin session cookie.

**Request Body (JSON):**  
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Response (JSON):**  
```json
{
  "adminId": "clx123abc",
  "name": "Admin User",
  "email": "admin@example.com",
  "role": "ADMIN"
}
```

**Responses:**

| Status | Description |
|--------|-------------|
| 200    | Login successful. Returns admin information and sets session cookie. |
| 400    | Email or password is missing from the request. |
| 401    | Invalid credentials provided. |
| 500    | Server error. |

---

### POST /api/auth/admin-logout

**Description:**  
Logs out the admin by clearing the session cookie.

**Request Body:** None

**Response (JSON):**  
```json
{
  "message": "Admin logged out successfully"
}
```

**Responses:**

| Status | Description |
|--------|-------------|
| 200    | Logout successful. Session cookie cleared. |

---

## **Exercises / Assignments (Student View)**

### GET /api/exercises

**Description:**  
Fetches all assignments assigned to the authenticated team. Returns assignments with their current status based on team progress.

**Authentication:** Requires team session cookie

**Response (JSON):**  
```json
[
  {
    "id": "c123abc",
    "title": "Maak een foto van het standbeeld",
    "description": "Maak een foto van het standbeeld op het marktplein",
    "location": "Marktplein",
    "order": 1,
    "exampleImage": "https://example.com/image.jpg",
    "status": "AVAILABLE"
  },
  {
    "id": "c124abc",
    "title": "Interview een docent",
    "description": "Vraag een docent naar hun favoriete vak",
    "location": "School",
    "order": 2,
    "exampleImage": null,
    "status": "LOCKED"
  }
]
```

**Status Values:**
- `LOCKED` - Assignment not yet available
- `AVAILABLE` - Assignment can be started
- `PENDING` - Assignment submitted, awaiting review
- `FEEDBACK` - Assignment needs revision
- `APPROVED` - Assignment completed successfully

**Responses:**

| Status | Description |
|--------|-------------|
| 200    | Success. Returns array of assignments with status. |
| 400    | Team authentication required. |
| 500    | Server error. |

---

### GET /api/exercises/[id]

**Description:**  
Fetches detailed information about a specific assignment, including submission status and feedback.

**Authentication:** Requires team session cookie

**URL Parameters:**

| Parameter | Type   | Description                   |
|-----------|--------|-------------------------------|
| id        | string | ID of the assignment to fetch |

**Response (JSON):**  
```json
{
  "id": "c123abc",
  "title": "Maak een foto van het standbeeld",
  "description": "Maak een foto van het standbeeld op het marktplein",
  "location": "Marktplein",
  "order": 1,
  "exampleImage": "https://example.com/image.jpg",
  "status": "FEEDBACK",
  "submission": {
    "id": "sub123",
    "answerImage": "data:image/jpeg;base64,...",
    "status": "FEEDBACK",
    "feedback": "Probeer een andere hoek voor de foto",
    "createdAt": "2025-01-08T10:30:00.000Z"
  }
}
```

**Responses:**

| Status | Description |
|--------|-------------|
| 200    | Success. Returns assignment details with submission info. |
| 400    | Team ID or assignment ID missing. |
| 404    | Assignment not found or not assigned to team. |
| 500    | Server error. |

---

## **Submissions (Student)**

### POST /api/submissions

**Description:**  
Submit an assignment answer (image only). Allows resubmission if status is FEEDBACK.

**Authentication:** Requires team session cookie

**Request Body (JSON):**  
```json
{
  "assignmentId": "c123abc",
  "answerImage": "data:image/jpeg;base64,...",
  "playerId": "player123"
}
```

**Response (JSON):**  
```json
{
  "id": "sub123",
  "teamId": "team123",
  "assignmentId": "c123abc",
  "playerId": "player123",
  "answerImage": "data:image/jpeg;base64,...",
  "status": "PENDING",
  "feedback": null,
  "createdAt": "2025-01-08T10:30:00.000Z",
  "updatedAt": "2025-01-08T10:30:00.000Z"
}
```

**Responses:**

| Status | Description |
|--------|-------------|
| 200    | Submission successful or updated. |
| 400    | Missing required fields or image not provided. |
| 401    | Team authentication required. |
| 500    | Server error. |

---

## **Admin - Assignments Management**

### GET /api/admin/assignments

**Description:**  
Fetches all assignments for admin management with submission and team counts.

**Authentication:** Requires admin session cookie

**Response (JSON):**  
```json
[
  {
    "id": "c123abc",
    "title": "Maak een foto van het standbeeld",
    "description": "Maak een foto van het standbeeld op het marktplein",
    "location": "Marktplein",
    "order": 1,
    "exampleImage": "https://example.com/image.jpg",
    "createdAt": "2025-01-08T09:00:00.000Z",
    "_count": {
      "submissions": 5,
      "teams": 3
    }
  }
]
```

**Responses:**

| Status | Description |
|--------|-------------|
| 200    | Success. Returns array of assignments with counts. |
| 401    | Admin authentication required. |
| 500    | Server error. |

---

### POST /api/admin/assignments

**Description:**  
Creates a new assignment and assigns it to specified teams (or all teams if none specified).

**Authentication:** Requires admin session cookie

**Request Body (JSON):**  
```json
{
  "title": "Nieuwe opdracht",
  "description": "Beschrijving van de opdracht",
  "location": "Locatie",
  "order": 3,
  "exampleImage": "data:image/jpeg;base64,...",
  "teamIds": ["team1", "team2"]
}
```

**Response (JSON):**  
```json
{
  "id": "c125abc",
  "title": "Nieuwe opdracht",
  "description": "Beschrijving van de opdracht",
  "location": "Locatie",
  "order": 3,
  "exampleImage": "data:image/jpeg;base64,...",
  "createdAt": "2025-01-08T11:00:00.000Z"
}
```

**Responses:**

| Status | Description |
|--------|-------------|
| 200    | Assignment created successfully. |
| 400    | Missing required fields (title, description, location, order). |
| 401    | Admin authentication required. |
| 500    | Server error. |

---

### GET /api/admin/assignments/[id]/teams

**Description:**  
Fetches all teams assigned to a specific assignment.

**Authentication:** Requires admin session cookie

**URL Parameters:**

| Parameter | Type   | Description                   |
|-----------|--------|-------------------------------|
| id        | string | ID of the assignment |

**Response (JSON):**  
```json
[
  {
    "id": "team1",
    "name": "Team Alpha",
    "code": "ALPHA1"
  },
  {
    "id": "team2", 
    "name": "Team Beta",
    "code": "BETA2"
  }
]
```

---

### PUT /api/admin/assignments/[id]/teams

**Description:**  
Updates team assignments for a specific assignment.

**Authentication:** Requires admin session cookie

**Request Body (JSON):**  
```json
{
  "teamIds": ["team1", "team3"]
}
```

**Response (JSON):**  
```json
{
  "message": "Team assignments updated successfully"
}
```

---

## **Admin - Teams Management**

### GET /api/admin/teams

**Description:**  
Fetches all teams with detailed information for admin management.

**Authentication:** Requires admin session cookie

**Response (JSON):**  
```json
[
  {
    "id": "team123",
    "name": "Team Alpha",
    "code": "ALPHA1",
    "createdAt": "2025-01-08T08:00:00.000Z",
    "captain": {
      "id": "player1",
      "name": "Jan Jansen"
    },
    "players": [
      {
        "id": "player1",
        "name": "Jan Jansen"
      },
      {
        "id": "player2",
        "name": "Piet Pietersen"
      }
    ],
    "createdBy": {
      "name": "Admin User",
      "email": "admin@example.com"
    },
    "_count": {
      "players": 2,
      "submissions": 3
    }
  }
]
```

**Responses:**

| Status | Description |
|--------|-------------|
| 200    | Success. Returns array of teams with details. |
| 401    | Admin authentication required. |
| 500    | Server error. |

---

### POST /api/admin/teams

**Description:**  
Creates a new team with players and automatically assigns all existing assignments to the team.

**Authentication:** Requires admin session cookie

**Request Body (JSON):**  
```json
{
  "name": "Team Gamma",
  "playerNames": ["Alice Johnson", "Bob Smith", "Carol Davis"]
}
```

**Response (JSON):**  
```json
{
  "id": "team456",
  "name": "Team Gamma", 
  "code": "GAMMA3",
  "createdAt": "2025-01-08T12:00:00.000Z",
  "captain": {
    "id": "player3",
    "name": "Alice Johnson"
  },
  "players": [
    {
      "id": "player3",
      "name": "Alice Johnson"
    },
    {
      "id": "player4", 
      "name": "Bob Smith"
    },
    {
      "id": "player5",
      "name": "Carol Davis"
    }
  ],
  "createdBy": {
    "name": "Admin User",
    "email": "admin@example.com"
  }
}
```

**Responses:**

| Status | Description |
|--------|-------------|
| 200    | Team created successfully. |
| 400    | Missing team name or players array. |
| 401    | Admin authentication required. |
| 500    | Server error. |

---

## **Admin - Submissions Review**

### GET /api/admin/submissions

**Description:**  
Fetches submissions for admin review with optional filtering.

**Authentication:** Requires admin session cookie

**Query Parameters:**

| Parameter    | Type   | Description                   | Optional |
|-------------|--------|-------------------------------|----------|
| status      | string | Filter by status (PENDING, APPROVED, FEEDBACK) | Yes |
| teamId      | string | Filter by team ID | Yes |
| assignmentId| string | Filter by assignment ID | Yes |

**Response (JSON):**  
```json
[
  {
    "id": "sub123",
    "answerImage": "data:image/jpeg;base64,...",
    "status": "PENDING",
    "feedback": null,
    "createdAt": "2025-01-08T10:30:00.000Z",
    "updatedAt": "2025-01-08T10:30:00.000Z",
    "team": {
      "name": "Team Alpha",
      "code": "ALPHA1"
    },
    "assignment": {
      "title": "Maak een foto van het standbeeld",
      "order": 1
    },
    "player": {
      "name": "Jan Jansen"
    }
  }
]
```

**Responses:**

| Status | Description |
|--------|-------------|
| 200    | Success. Returns filtered submissions. |
| 401    | Admin authentication required. |
| 500    | Server error. |

---

### GET /api/admin/submissions/[id]

**Description:**  
Fetches detailed information about a specific submission.

**Authentication:** Requires admin session cookie

**URL Parameters:**

| Parameter | Type   | Description                   |
|-----------|--------|-------------------------------|
| id        | string | ID of the submission |

**Response (JSON):**  
```json
{
  "id": "sub123",
  "answerImage": "data:image/jpeg;base64,...",
  "status": "PENDING",
  "feedback": null,
  "createdAt": "2025-01-08T10:30:00.000Z",
  "updatedAt": "2025-01-08T10:30:00.000Z",
  "team": {
    "id": "team123",
    "name": "Team Alpha",
    "code": "ALPHA1",
    "players": [...],
    "captain": {...}
  },
  "assignment": {
    "id": "c123abc",
    "title": "Maak een foto van het standbeeld",
    "description": "...",
    "location": "Marktplein",
    "order": 1
  },
  "player": {
    "id": "player1",
    "name": "Jan Jansen"
  }
}
```

**Responses:**

| Status | Description |
|--------|-------------|
| 200    | Success. Returns detailed submission information. |
| 401    | Admin authentication required. |
| 404    | Submission not found. |
| 500    | Server error. |

---

### PUT /api/admin/submissions/[id]

**Description:**  
Updates submission status and feedback. Automatically unlocks next assignment if approved.

**Authentication:** Requires admin session cookie

**URL Parameters:**

| Parameter | Type   | Description                   |
|-----------|--------|-------------------------------|
| id        | string | ID of the submission |

**Request Body (JSON):**  
```json
{
  "status": "APPROVED",
  "feedback": "Goed gedaan! Mooie foto."
}
```

**Response (JSON):**  
```json
{
  "id": "sub123",
  "status": "APPROVED",
  "feedback": "Goed gedaan! Mooie foto.",
  "updatedAt": "2025-01-08T11:00:00.000Z",
  "team": {...},
  "assignment": {...}
}
```

**Responses:**

| Status | Description |
|--------|-------------|
| 200    | Submission updated successfully. |
| 400    | Invalid status provided. Must be APPROVED, FEEDBACK, or PENDING. |
| 401    | Admin authentication required. |
| 500    | Server error. |

---

## **Public Endpoints**

### GET /api/teams

**Description:**  
Fetches all teams (public endpoint for team selection/display).

**Authentication:** None required

**Response (JSON):**  
```json
[
  {
    "id": "team123",
    "name": "Team Alpha",
    "code": "ALPHA1",
    "createdAt": "2025-01-08T08:00:00.000Z",
    "captain": {
      "id": "player1",
      "name": "Jan Jansen"
    },
    "players": [...],
    "createdBy": {
      "name": "Admin User",
      "email": "admin@example.com"
    },
    "_count": {
      "players": 2,
      "submissions": 3
    }
  }
]
```

**Responses:**

| Status | Description |
|--------|-------------|
| 200    | Success. Returns all teams. |
| 500    | Server error. |

---

## **Authentication & Authorization**

### Session Management
- **Team Sessions:** Set via `team-session` HTTP-only cookie
- **Admin Sessions:** Set via `admin-session` HTTP-only cookie with 24-hour expiry
- **Middleware:** Automatically validates sessions and adds team/admin ID to request headers

### Security Features
- HTTP-only cookies prevent XSS attacks
- SameSite=lax cookie setting
- Admin endpoints require valid admin session
- Team endpoints require valid team session
- Automatic session validation via middleware

### Error Handling
All endpoints return consistent error responses:
```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad Request (missing/invalid parameters)
- `401` - Unauthorized (authentication required)
- `404` - Not Found
- `500` - Internal Server Error

