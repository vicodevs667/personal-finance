# Personal Finance

A web app to track spending, view income and expenses by category, and get simple insights to keep your finances on track.

**This project is open source.** You are welcome to use, modify, and contribute.

## Tech stack

- **[Next.js](https://nextjs.org)** – React framework (App Router)
- **[Chart.js](https://www.chartjs.org/)** (via `react-chartjs-2`) – Charts for spending by category
- **TypeScript** – Typed JavaScript
- **Tailwind CSS** – Styling

## Project overview

### Pages

| Route        | Description |
|-------------|-------------|
| **`/`**     | **Home** – Landing page with a short pitch, feature highlights (Transactions, Spending by category, Insights), and a call-to-action to open the dashboard. |
| **`/dashboard`** | **Dashboard** – Main app where you manage and view your finances. |

### Dashboard sections

On **`/dashboard`** you’ll find:

- **Balance hero** – Total balance, total income, total expenses, and an “Add expense” button.
- **Metric cards** – Income this month, monthly spending (with % vs last month and progress), and total expenses (all time).
- **Spending chart** – Breakdown of spending by category (powered by Chart.js).
- **Recent transactions** – List of latest income and expenses.
- **AI Advisor** – Simple advice based on your spending.
- **Insights** – Tips to improve habits and compare to last month.
- **Settings** – Dashboard preferences (e.g. theme).
- **Add expense modal** – Form to log a new expense (amount, category, date, description).

### Home page sections

On **`/`**:

- Header with branding.
- Hero with title, short description, and “Open dashboard” button.
- Feature cards: Transactions, Spending by category, Insights.
- Secondary link to the dashboard.

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

Other commands:

- `npm run build` – Production build
- `npm run start` – Start production server
- `npm run lint` – Run ESLint

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)
