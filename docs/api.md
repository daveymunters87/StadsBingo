# StadsBingo API Documentation

This document describes the API endpoints for the StadsBingo application, including student login, dashboard access, and admin functionality.

---

## **Authentication**

### POST /api/auth/team-login

**Description:**  
Allows a user to log in using a team code. Returns the team information if the code is valid.

**Request Body (JSON):**  
```json
{
  "code": "TEAMCODE123"
}
```

### Responses

| Status | Description |
|--------|-------------|
| 200    | Login successful. Returns the team information (teamId, captainId, players). |
| 400    | Team code is missing from the request. |
| 401    | Invalid team code provided. |
| 403    | Team is already logged in (only one active session per team allowed). |
| 500    | Server error. Something went wrong on the backend. |

## **Assignments / Exercises**

### GET /api/exercises/[teamId]

**Description:**  
Fetches all assignments linked to a specific team. Returns the assignment details in order of release.  

**URL Parameters:**  

| Parameter | Type   | Description                   |
|-----------|--------|-------------------------------|
| teamId    | string | ID of the team to fetch assignments for |

**Response (JSON):**  
```json
[
  {
    "id": "c123abc",
    "title": "Maak een foto van het standbeeld",
    "description": "Maak een foto van het standbeeld op het marktplein",
    "location": "Marktplein",
    "order": 1,
    "status": "AVAILABLE"
  },
  {
    "id": "c124abc",
    "title": "Interview een docent",
    "description": "Vraag een docent naar hun favoriete vak",
    "location": "School",
    "order": 2,
    "status": "PENDING"
  }
]

