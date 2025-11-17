# StadsBingo API (Simplified)

## Auth & Roles
- Roles: `STUDENT`, `TEACHER`
- All endpoints require authentication; role rules noted per route.

## Entities (from Prisma)
- Assignment: `{ id, title, description, location, createdAt }`
- Submission: `{ id, assignmentId, userId, answer, status, feedback?, createdAt, updatedAt }`
- Constraints: one submission per (userId, assignmentId) pair.

## Conventions
- JSON request/response.
- Error format:
```
{ "error": { "code": "VALIDATION_ERROR|NOT_FOUND|FORBIDDEN", "message": "...", "details": { ... } } }
```

---

## Assignments

### GET /api/assignments
- Role: STUDENT, TEACHER
- 200
```
[
  { "id": "...", "title": "...", "description": "...", "location": "...", "createdAt": "..." }
]
```

### GET /api/assignments/:id
- Role: STUDENT, TEACHER
- 200: one assignment
- 404 if not found

---

## Submissions (Student)

### POST /api/submissions
- Role: STUDENT
- Body
```
{ "assignmentId": "string", "answer": "string (1..2000 chars)" }
```
- Rules
  - Creates submission with `status=PENDING`, `userId` from auth
  - Enforce unique (userId, assignmentId) — reject duplicates
- 201
```
{ "id":"...","assignmentId":"...","userId":"...","answer":"...","status":"PENDING","feedback":null,"createdAt":"...","updatedAt":"..." }
```
- 400 on validation, 404 if assignment not found

### GET /api/me/submissions
- Role: STUDENT
- Returns student’s own submissions (latest first)
- 200
```
[
  { "id":"...","assignmentId":"...","answer":"...","status":"PENDING|APPROVED|REJECTED","feedback":null|"...","createdAt":"...","updatedAt":"..." }
]
```

---

## Submissions (Teacher)

### GET /api/submissions
- Role: TEACHER
- Query
  - `status?=PENDING|APPROVED|REJECTED`
  - `studentId?=string`
- 200
```
[
  {
    "id":"...","assignmentId":"...","userId":"...","answer":"...",
    "status":"...","feedback":null|"...","createdAt":"...","updatedAt":"...",
    "user": { "id": "...", "name": "...", "email": "..." },
    "assignment": { "id": "...", "title": "..." }
  }
]
```

### GET /api/submissions/:id
- Role: TEACHER (or STUDENT owner)
- 200: submission (shape as above)
- 403 if student not owner
- 404 if not found

### PATCH /api/submissions/:id
- Role: TEACHER
- Body
```
{ "status": "APPROVED" | "REJECTED", "feedback": "string (required if REJECTED)" }
```
- Rules
  - If `status=REJECTED`, `feedback` is required (non-empty)
  - Updates `updatedAt` automatically
- 200: updated submission
- 400 on validation, 404 if not found

---

## Validation Summary
- POST /submissions
  - `assignmentId`: required, must exist
  - `answer`: required, 1..2000 chars
  - unique `(userId, assignmentId)`
- PATCH /submissions/:id
  - `status`: required, APPROVED|REJECTED
  - `feedback`: required when REJECTED

---

## Test Hints
- Unit/integration: create/persist submission; prevent duplicate; patch requires teacher role; reject requires feedback.
- Component: assignments list renders; submit form validates; my submissions shows status/feedback.