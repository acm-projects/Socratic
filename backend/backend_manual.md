# Socratic Backend Architecture Manual 🚀

This guide provides an overview of the Socratic backend architecture for developers. It covers the project structure, data flow, and key technologies used.

---

## 🏗 High-Level Architecture
Socratic follows a modular **Route-Service-Model** pattern:
1.  **API Layer (Routes)**: Handles incoming HTTP requests and validates data.
2.  **Logic Layer (Services)**: Contains complex business logic, AI integrations, and third-party APIs.
3.  **Data Layer (Models)**: Manages database interactions (PostgreSQL).

---

## 📂 Project Structure
| Directory | Responsibility |
| :--- | :--- |
| `server.js` | **The Entry Point**. Root file that starts the Express server. |
| `backend/routes/` | **Controllers**. Defines API endpoints (`/api/tutor`, `/api/quizzes`, etc.). |
| `backend/services/` | **The Brain**. LLM chains (LangChain), S3 uploads, and syllabus parsing. |
| `backend/models/` | **Data Access**. Direct SQL queries and Prisma definitions. |
| `backend/prisma/` | **Schema Definition**. Defines the database structure for Prisma. |
| `backend/db.js` | **DB Connection**. Exports the shared PostgreSQL connection pool. |

---

## 🚀 The Entry Point: `server.js`
The server starts at the root `server.js`. Its job is to:
- Load environment variables from `.env`.
- Initialize `express`.
- Enable **CORS** (Cross-Origin Resource Sharing) for the frontend.
- Mount specialized route modules (e.g., `app.use('/api/tutor', tutorRoutes)`).
- Provide shared helper functions like `updateClassStreak`.

---

## 📡 API Routes (`backend/routes/`)
Routes are organized by feature area. For example:
- **`tutorRoutes.js`**: Handles AI chat sessions.
- **`quizRoutes.js`**: Manages interactive quiz generation and scoring.
- **`syllabusRoutes.js`**: Orchestrates PDF uploads and task extraction.

> [!TIP]
> Each route's primary goal is to parse `req.body` or `req.params`, call the appropriate **Service** or **Model**, and return a JSON response.

---

## 🧠 Services & AI Business Logic (`backend/services/`)
This is where the complex work happens. Key services include:
- **`tutorService.js`**: Uses **LangChain** and **Gemini** to provide Socratic feedback. It manages chat history and vector context.
- **`quizService.js`**: Generates quiz questions based on textbook or lecture context.
- **`syllabusService.js`**: Parses PDFs and uses AI to extract dates (exams, quizzes, assignments).
- **`vectorService.js`**: Manages the **Vector Database** (Pinecone) for finding relevant lecture content during chats.

---

## 💾 Database & Models (`backend/models/`)
Socratic uses a hybrid approach for data management:
1.  **Raw SQL (`pg` pool)**: Used for most academic and chat logic. It is fast, flexible, and handles the "Official" `chat_history` and `class_tasks` tables.
2.  **Prisma**: Defined in `schema.prisma`. Used primarily for structured identity management and simple CRUD where object-relational mapping (ORM) is helpful.

### Representative Models:
- **`chatSessionModel.js`**: Handles the `chat_sessions` and `chat_history` tables.
- **`taskModel.js`**: Handles academic deadlines and upcoming tasks.
- **`userStatsModel.js`**: Increments engagement metrics like `ai_messages` and `quizzes_taken`.

---

## 🔄 Request Lifecycle: A Chat Example
When a user sends a chat message:
1.  **Frontend** → `POST /api/tutor/chat`
2.  **Route (`tutorRoutes.js`)** → Extract `userId`, `message`, and `sessionId`.
3.  **Model (`chatSessionModel.js`)** → Reuse or create a session in PostgreSQL.
4.  **Service (`vectorService.js`)** → Search for relevant context from uploaded course materials.
5.  **Service (`tutorService.js`)** → Invoke the LangChain/Gemini chain with the user's message + course context + history.
6.  **AI Response** → Saved to `chat_history` via the model.
7.  **Response** → JSON returned to user.

---

## 🛠 Tech Stack Summary
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (Prisma + Raw SQL)
- **AI/LLM**: Google Gemini (via LangChain)
- **Vector DB**: Pinecone
- **Auth/Adapters**: Prisma Adapter
