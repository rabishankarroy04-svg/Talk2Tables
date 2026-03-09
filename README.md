# Antigravity BI: Agentic RAG for Instant Dashboards

## Project Overview
This project is an **Autonomous Business Intelligence (BI) Platform** that transforms natural language into interactive data visualizations. Built during a 1-hour sprint, it leverages **Google Antigravity** as the orchestration engine to handle the heavy lifting of code generation, database schema mapping, and frontend assembly.

## The Problem
Non-technical executives often face a "technical bottleneck" where they must wait days for data teams to write SQL queries and build dashboards. This project aims to provide **"Instant BI"** by allowing users to simply ask a question and receive a fully functional, interactive dashboard.

## System Architecture
The project uses a **"Text-to-Dashboard"** pipeline:

*   **Orchestration (Antigravity)**: Uses specialized AI agents to plan the implementation, generate the Python code, and validate the SQL logic.
*   **Data Layer (MongoDB & SQLite)**: A hybrid approach where metadata is stored in MongoDB, and the RAG engine queries a structured SQL environment to fetch real-time business metrics.
*   **RAG Logic (LangChain)**: Employs Retrieval-Augmented Generation to inject database schemas and business rules into the LLM context, ensuring the generated SQL is 100% accurate and hallucination-free.
*   **Frontend**: A rapid-prototyping React-based UI that renders dynamic, automated charts and dataframes.

## Key Features
1.  **Agentic Planning**: Antigravity generates a custom `Master_Planning.md` for complex queries, ensuring the architecture is robust before code execution.
2.  **Contextual Chart Selection**: The system doesn't just show tables; it reasons whether a Line Chart (time-series), Bar Chart (comparison), or Pie Chart (composition) is best for the data retrieved.
3.  **Self-Healing SQL**: If a query fails, the LangChain agent reads the stack trace, reproduces the error, and fixes the code autonomously (up to 5 iterations).

---
### Setup
1. Clone the repository
2. Run `npm install` for frontend dependencies
3. Run `pip install -r requirements.txt` for backend dependencies
4. Start the backend: `python app.py`
5. Start the frontend: `npm start`
