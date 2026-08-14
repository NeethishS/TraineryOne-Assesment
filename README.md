# TraineryCORE — Simplified Core HRIS

## Overview

This project is a simplified Core HRIS interface built as part of the Trainery One Software Development Intern recruitment assessment (Task 4). It focuses on two core HR tasks: discovering employee information in a directory and exploring organizational reporting relationships through an interactive organization chart.

Rather than building a sprawling HR suite with non-essential modules, this application focuses on executing the requested Core Employee Management experience cleanly using a shared data model.

## What I Built

The application consists of three main experiences connected by client-side routing:

1. **Employee Directory**: A searchable table view of all 20 employees, complete with real-time filtering across name, employee ID, role, and department.
2. **Employee Profile Details**: A detailed record view showing employment information, contact details, reporting managers, direct reports, and a dynamic **Organization Path**.
3. **Organization Chart**: A tree visualization that renders multi-level reporting hierarchies directly from employee `managerId` relationships.
4. **Organization Path (Signature Feature)**: A dynamic breadcrumb chain on the profile page showing the exact line of management from the top executive down to the selected employee.
5. **Chart Zoom & Fit Controls**: Dedicated canvas zoom controls (`Zoom Out`, `100%`, `Zoom In`, `Fit`) that let users scale and inspect large organizational hierarchies comfortably without affecting the page layout.

All views draw from the exact same employee dataset, ensuring that any reporting relationship changes automatically update across the Directory, Org Chart, and Organization Path.

## Features

- **Real-Time Directory Search**: Instant case-insensitive filtering by Name, Employee ID, Role, or Department.
- **Live Employee Counter**: Dynamic counter derived from the dataset array (showing visible vs. total 20 employees).
- **Interactive Manager Links**: Clickable manager references that let HR administrators navigate up and down the management chain.
- **Dynamic Organization Path**: Automatically calculates and renders the management chain from the root executive to the current employee.
- **Expandable Org Chart Canvas**: Tree visualization with branch expand/collapse controls and "Expand All" / "Collapse All" toggles.
- **Org Chart Zoom & Fit**: In-canvas zoom scaling (50% to 125%) with an auto-calculating `Fit` feature to scale the entire tree comfortably into view.
- **Edge Case Handling**: 404 views for invalid employee IDs, empty search state guidance, and top-level executive (root) node support.

## Tech Stack

- **React 18**: Component composition and client-side UI rendering.
- **JavaScript (ES6+)**: Core application logic, dataset definition, and tree generation utilities.
- **Vite 6**: Local development server and production build bundler.
- **Tailwind CSS 3**: Utility-first responsive styling with a light enterprise theme inspired by the TraineryHCM ecosystem.
- **React Router 6**: Client-side page routing (`/employees`, `/employees/:id`, `/organization`).
- **Lucide React**: Clean icons for navigation and visual affordances.

## How It Works

The entire application relies on a single array of employee objects defined in `src/data/employees.js`.

Each employee record includes standard attributes (`id`, `employeeId`, `name`, `role`, `department`, `status`, etc.) and a `managerId` pointing to their supervisor's `id` (`null` for top-level executives).

- **Employee Directory**: Reads the flat employee array and filters matching records based on user search input.
- **Organization Chart**: Uses `buildHierarchy(employees)` in `src/utils/hierarchy.js` to transform the flat employee array into a nested tree structure (`{ employee, children: [...] }`).
- **Organization Path**: Uses `getOrganizationPath(employeeId, employees)` in `src/utils/hierarchy.js` to walk up the `managerId` references from the selected employee to the root node, producing the exact chain of management.

## Project Structure

```text
src/
├── data/
│   └── employees.js         # Centralized dataset of 20 fictional employees
├── utils/
│   └── hierarchy.js         # Tree generation & Organization Path utility functions
├── components/
│   ├── layout/
│   │   ├── AppShell.jsx     # Main layout container
│   │   └── Sidebar.jsx      # Navigation sidebar with TraineryCORE branding
│   ├── employee/
│   │   ├── EmployeeAvatar.jsx        # Avatar image with fallback initials
│   │   ├── EmployeeRow.jsx           # Directory row card
│   │   ├── EmployeeInfoSection.jsx   # Profile metadata section
│   │   ├── OrganizationPath.jsx      # Reporting path breadcrumb component
│   │   └── SearchBar.jsx             # Real-time search bar & counter
│   └── org-chart/
│       ├── OrgChart.jsx              # Org Chart canvas, Zoom/Fit & branch manager
│       └── OrgNodeCard.jsx           # Individual org chart node card
├── pages/
│   ├── EmployeeDirectory.jsx         # Directory view (/employees)
│   ├── EmployeeDetails.jsx           # Profile details view (/employees/:id)
│   └── OrganizationChart.jsx         # Org Chart view (/organization)
├── App.jsx                  # React Router routes definition
└── main.jsx                 # Application entry point
```

## Running Locally

1. Open a terminal in the project directory:
   ```bash
   cd "c:\Trainery One"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` (or the port indicated in your terminal).

4. Build and preview production distribution:
   ```bash
   npm run build
   npm run preview
   ```

## Design Decisions

- **Single Shared Data Source**: Rather than maintaining separate data structures for the directory and the org chart, deriving the tree dynamically from `managerId` prevents data mismatch and keeps code maintainable.
- **Local Dataset over Mock Server**: Using a local dataset keeps the project easy to run, test, and explain without requiring mock API servers or external setup steps.
- **Standard React State**: `useState` and `useMemo` were sufficient for managing search queries, expanded org nodes, zoom levels, and filtered lists without adding external state management libraries.
- **TraineryHCM-Inspired Light Aesthetic**: Selected a clean white/slate background with deep navy typography, teal secondary accents, and subtle gold highlights to feel aligned with Trainery's enterprise product design.

## Signature Features

- **Organization Path**: Walk up the management chain starting from the current employee until reaching the root executive (`managerId === null`). This makes the employee’s position in the reporting hierarchy easier to understand.
- **In-Canvas Zoom & Fit Controls**: Dedicated scale controls (`Zoom Out`, `Zoom In`, `Fit`) that scale only the org chart container, preserving page layouts while allowing large multi-level teams to fit comfortably on screen.

## What Could Be Improved

If expanding this into a full enterprise HR product, the next logical steps would be:

- **Backend & Database**: Connecting the interface to a PostgreSQL database via REST/GraphQL APIs.
- **Authentication & Roles**: Adding authentication with role-based permissions (HR Admin vs Employee self-service).
- **Employee CRUD Workflows**: Forms for adding new hires, updating roles, and recording offboarding.
- **Audit Trails**: Tracking historical changes to reporting structures and job titles over time.

## Assessment Context

This project was built for the Software Development Intern assessment (Task 4: Simplified Core HRIS). The implementation intentionally restricts scope to the requested Core Employee Management features, prioritizing clean code structure, explainable logic, and polished UI execution.
