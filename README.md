

````markdown
# Travel Buddy Finder - Frontend

A **Next.js** frontend for the Travel Buddy Finder platform, allowing users to find travel companions, create travel plans, send join requests, and interact with other users through reviews and profiles.

---

## 🚀 Features

* Responsive **Home Page** with search functionality.
* **Authentication:**
    * User registration and login
    * Logout functionality
    * Role-based protected routes (e.g., admin, regular user)
* **Dashboard:** Personalized user dashboard with travel plan management.
* **Travel Plan Management:**
    * Create, read, update, delete travel plans
    * Search and filter travel plans by destination or other attributes
* **User Profiles:**
    * View own and other users’ profiles
    * Give and receive reviews
* **Join Requests:** Send and manage requests to join travel plans.
* **UI/UX:**
    * Responsive design for mobile and desktop
    * Reusable UI components (cards, buttons, dialogs, etc.)
    * Form validation and error handling

---

## 💻 Tech Stack

| Category | Technology | Link |
| :--- | :--- | :--- |
| **Frontend Framework** | Next.js | [https://nextjs.org/](https://nextjs.org/) |
| **UI Library** | shadcn/ui + Tailwind CSS | [https://ui.shadcn.com/](https://ui.shadcn.com/) |
| **State Management** | React Context / Redux Toolkit (if applicable) | - |
| **Authentication** | JWT-based (via backend API) | - |
| **Routing** | Next.js App Router / Protected Routes | - |
| **HTTP Requests** | fetch / axios | - |

---

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone ([[https://github.com/yourusername/travel-buddy-frontend.git](https://github.com/Sohag-Ahmed056/tourBuddy_findYourPartner_Client.git)](https://github.com/Sohag-Ahmed056/tourBuddy_findYourPartner_Client.git))
cd travel-buddy-frontend
````

### 2\. Install dependencies

```bash
npm install
# or
yarn install
```

### 3\. Create environment variables

Create a file named `.env.local` in the root directory and add your environment variables:

```
NEXT_PUBLIC_API_URL=[https://your-backend-api.com](https://your-backend-api.com)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4\. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) to view the app.

-----

## 📂 Project Structure

```
├─ /app
│   ├─ (commonLayout)
│   │   ├─ /auth             # Login/Register pages
│   │   ├─ /travel-plans     # Public travel plan listings
│   │   └─ page.tsx          # Home page
│   └─ (dashboardLayout)
│       ├─ (touristDashboard)
│       │   └─ /dashboard    # User dashboard pages (myProfile, getMytravelplans, etc.)
│       └─ (adminDashboard) # Admin-specific pages
├─ /components           # Reusable UI components
├─ /lib                  # Utility functions and configurations
├─ /services             # API service functions (data fetching/posting)
├─ /public               # Static assets (images, favicon.ico)
├─ tailwind.config.js
└─ next.config.js
```

-----

## ☁️ Deployment

You can deploy this Next.js app on platforms like:

  * **Vercel** (recommended)
  * Render
  * Netlify

> **Note:** Make sure to configure your environment variables correctly on the hosting platform.

-----

## ✨ Future Enhancements

  * Real-time notifications for join requests.
  * AI-powered travel buddy suggestions.
  * Pagination and filtering for travel plans.
  * More advanced analytics and dashboards.
  *End to end chatting 

-----

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/my-feature`).
3.  Commit your changes (`git commit -m 'Add feature'`).
4.  Push to the branch (`git push origin feature/my-feature`).
5.  Create a Pull Request.

-----



## 📞 Contact

  * **Project Owner:** Sohag ALI
  * **Email:** sohagahmed056@gmail.com
  * **GitHub:** https://github.com/Sohag-Ahmed056

<!-- end list -->

```


```
