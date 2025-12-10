# 🏆 FIFA World Cup 2026 Qualifier Engine

> A real-time qualification simulator and visualizer for the 48-team FIFA World Cup 2026 format, featuring the official group draw (Dec 5, 2025).

![Project Preview](https://via.placeholder.com/1200x600?text=App+Screenshot+Here)
*(You can upload a screenshot to your repo later and update this link)*

## ✨ Features

- **Official Data**: Updated with the real 12 groups from the Dec 5, 2025 Final Draw.
- **Accurate Simulation**: Implements the official FIFA tie-breaking rules:
  1. Points
  2. **Goal Difference** (Crucial!)
  3. Goals Scored
  4. Head-to-Head
- **Complex Formats Simplified**: Automatically calculates the "Best 8 Third-Place Teams" table.
- **Interactive UI**: Visualize group standings, qualifiers, and knockout brackets in real-time.
- **Mock Engine**: Uses a weighted Poisson distribution (based on Team Tiers) to simulate realistic match scores.

## 🛠 Tech Stack

- **Core**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/fifa-2026-engine.git
   cd fifa-2026-engine
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

## 📦 Deployment

This project is optimized for deployment on **Vercel**.

1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com) and "Add New Project".
3. Import your GitHub repository.
4. Vercel will detect **Vite** automatically. Just click **Deploy**.

## 📝 License

This project is for educational purposes. All team names and flags are property of their respective owners.

---

Built by [Your Name] as an Indie Hacker project.