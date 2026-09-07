# Todo Application

A responsive Todo application built with **Next.js**, **React**, **TypeScript**, **Node.js**, and **Hygraph CMS**.

The application allows authenticated users to manage their personal todos through a modern interface, including a calendar view for tracking upcoming tasks.

## Features

- User authentication
- Create, read, update, and delete todos
- Personal todo lists per user
- Calendar view of all todos
- Responsive design for desktop and mobile devices
- GraphQL integration with Hygraph CMS
- Localisation-ready architecture
- Accessible modal forms using Headless UI

## Tech Stack

- Next.js
- React
- TypeScript
- Node.js v16.x
- Hygraph CMS
- GraphQL
- NextAuth
- Tailwind CSS
- Headless UI
- FullCalendar

## Project Structure

```text
src/
├── app/
├── components/
├── graphql/
├── hooks/
├── lib/
├── services/
├── types/
├── utils/
└── styles/
```

## Getting Started

### Prerequisites

- Node.js v16.x
- npm or yarn
- Hygraph project
- Authentication provider credentials (GitHub, Google, etc.)

### Installation

Clone the repository:

```bash
git clone <repository-url>
cd todo-app
```

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env.local
```

Add the required environment variables:

```env
NEXTAUTH_URL=
NEXTAUTH_SECRET=

HYGRAPH_ENDPOINT=
HYGRAPH_TOKEN=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Hygraph Models

### User

| Field | Type |
|---------|---------|
| name | String |
| email | String |
| todos | Relation |

### Todo

| Field | Type |
|---------|---------|
| title | String |
| description | String |
| dueDate | DateTime |
| completed | Boolean |
| user | Relation |

Relationship:

```text
User (1) → (Many) Todo
```

## Localisation

The application has been for with localisation:

- UI text is externalised into translation files
- Dates are stored in UTC
- Dates are displayed using the user's locale
- Calendar supports locale-specific formatting
- Additional languages can be added with minimal configuration
