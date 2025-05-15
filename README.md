# Cronos Dental – Dental Clinic Management System

Sistema web para la gestión de clínicas dentales.

---

## 📂 Branches Overview

- **login**:  
  - *Frontend* of the login page only.  
  - No backend functionality for login yet.

- **register**:  
  - *Frontend and backend* for user registration.
  - *Frontend* for login (no backend).

- **clientes**:  
  - Fully functional *CRUD* for clinics (frontend and backend).
  - To test the clinics management, use this branch.

---

## 🚀 How to Run Each Part

### 1. **Clone the repository**

git clone https://github.com/your-username/cronos-dental.git
cd cronos-dental

---


### 2. **To test the clinics CRUD**
> **Switch to the `feature/clientes` branch:**


git checkout clientes

#### **Backend setup**

cd backend
cp .env.example .env
composer install
php artisan key:generate

#### **Set your DB credentials in .env**

php artisan migrate --seed
php artisan serve --port=8000

#### **Frontend setup**

cd ../frontend
npm install
npm start

- Open [http://localhost:3000](http://localhost:3000) to use the clinics management system.
- You can add, search, edit, and delete clinics.

---

### 3. **To test only the login page**
> **Switch to the `feature/login` branch:**


git checkout feature/login

- Only the *frontend* of the login page is available. No backend functionality.

---

### 4. **To test registration**
> **Switch to the `feature/register` branch:**

git checkout feature/register
- Registration: *frontend and backend*.
- Login: *frontend only*.

---

## 📝 Notes

- Backend API runs at `http://localhost:8000/api/`
- Frontend runs at `http://localhost:3000/`
- Database: MySQL
- For the clinics CRUD, use the `feature/clientes` branch.

---

## 📄 License

MIT License

---

> For questions or issues, please open an issue on GitHub.

