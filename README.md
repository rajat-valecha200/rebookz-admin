# 🛡️ ReBookz Admin Panel

This is the **Admin Dashboard** for the ReBookz platform. 
It allows administrators to manage the entire marketplace from a single, centralized interface.

---

## 🚀 Key Capabilities

*   **Dashboard Overview**: View live stats on Users, Books, and Sales.
*   **User Management**: View user details and ban/remove accounts.
*   **Book Inventory**: Monitor all book listings (track status: Active, Sold, Rented).
*   **Category Management**: Create and organize book categories and subcategories dynamically.
*   **Secure Access**: Protected login for authorized admins only.

---

## 🛠️ Tech Stack

*   **Frontend**: React.js (Vite)
*   **Language**: TypeScript
*   **Styling**: TailwindCSS
*   **Icons**: Lucide React + React Icons

---

## 🏁 How to Run Locally

### Prerequisites
*   Node.js installed.
*   The **ReBookz Backend** must be running.

### Steps

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start the Dashboard**:
    ```bash
    npm run dev
    ```

3.  **Access in Browser**:
    *   Open `http://localhost:5173` (or the port shown in terminal).

---

## ⚙️ Configuration

The dashboard connects to the API.
To change the API URL (e.g., for deployment):
1.  Open `src/services/api.ts`.
2.  Update `baseURL` to your backend URL (e.g., `https://your-api.onrender.com/api`).

---

**Note**: You must log in with an Admin account to access the features.
