# 🌊 DrainGuard AI – Smart Flood Prediction Dashboard

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_NETLIFY_BADGE_ID/deploy-status)](https://app.netlify.com/sites/drainguard-ai/deploys)

> A next-gen flood prediction and drainage monitoring system powered by IoT, AI, and community input.

🚀 **Live Demo:** [drainguard-ai.netlify.app](https://drainguard-ai.netlify.app/)

---

## 🌍 The Problem

Urban flooding destroys lives and property every year, costing billions. Current infrastructure management is **reactive**—interventions only happen after disaster strikes. Cities need a **proactive, data-driven solution** that predicts and prevents floods instead of just responding to them.

---

## 💡 Our Solution: DrainGuard AI

DrainGuard AI transforms a city’s drainage network into a live, intelligent grid.

### 🔎 How It Works

1. **IoT Drain Sensors:** Low-cost sensors track water levels, flow, and blockages.
2. **Data Aggregation:** Sensor data merges with weather forecasts and other datasets.
3. **AI Flood Prediction:** Machine learning forecasts potential floods with high accuracy.
4. **Smart City Dashboard:** A centralized platform for city officials to monitor, predict, and act.
5. **Community Alerts & Reporting:** Citizens receive real-time flood alerts and can report blocked drains via a simple interface.

---

## 🖥️ MVP Dashboard Features

This web app is a **high-fidelity simulation** of DrainGuard AI in action.

* 🌍 **Interactive Map:** Color-coded markers (🟢 Safe, 🟡 Moderate, 🔴 High Risk) for each monitored drain.
* 📡 **Live Data Simulation:** Auto-refreshing metrics to mimic real-time monitoring.
* 📊 **Detailed Drain Status:** Historical charts + live sensor readings for each drain.
* 🔮 **AI Flood Prediction Overlay:** A toggleable feature that shows predicted flood zones in real time.
* 🚨 **Dynamic Alert Panel:** Auto-generated alerts with estimated time-to-flood.
* 🙌 **Community Reporting:** `/report` page for crowdsourced reports of blocked drains.
* 📱 **Responsive Design:** Optimized for desktop and mobile.

---

## ⚙️ Tech Stack

* **Frontend:** [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Maps:** [React Leaflet](https://react-leaflet.js.org/) + OpenStreetMap
* **Charts:** [Recharts](https://recharts.org/)
* **Routing:** [React Router](https://reactrouter.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Deployment:** [Netlify](https://www.netlify.com/)

---

## 🛠️ Getting Started

1. **Clone the repo**

```bash
git clone https://github.com/Sadiq-Teslim/drainguard.git
cd drainguard
```

2. **Install dependencies**

```bash
npm install
```

3. **(Optional) Add API Key**
   If you want to enable the live weather widget, create a `.env.local` file:

```env
VITE_OPENWEATHERMAP_API_KEY=your_api_key_here
```

4. **Run locally**

```bash
npm run dev
```

App will be live at: [http://localhost:5173](http://localhost:5173).

---

## 🤝 Contributing

This project was originally built for a **hackathon demo**, but contributions are welcome! Open an issue to suggest improvements or submit a PR.

---

## 📜 License

Licensed under the [MIT License](./LICENSE).
