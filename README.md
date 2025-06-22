# Cronos Dental – Dental Clinic Management System

Sistema web para la gestión de clínicas dentales.

---

## 🚀 Cómo poner en marcha el proyecto

### 1. **Clona el repositorio**

git clone https://github.com/Israelab01/CronosDental.git
cd CronosDental


---

### 2. **Configura y ejecuta el backend (Laravel)**

cd backend
cp .env.example .env
php artisan key:generate
php artisan migrate
composer install
php artisan jwt:secret
php artisan serve


- **Configura tu base de datos** en el archivo `.env` antes de ejecutar las migraciones (ajusta `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`).
- El backend se ejecuta por defecto en `http://localhost:8000`.

---

### 3. **Configura y ejecuta el frontend (React)**

cd ../frontend
npm install
npm start



- El frontend se ejecuta por defecto en `http://localhost:3000`.

---

### 4. **Flujo de la aplicación**

- **Registro:** Al registrarte, serás redirigido automáticamente a la pantalla de login.
- **Login:** Al iniciar sesión, serás redirigido al dashboard.
- **Navegación:** Desde el dashboard puedes navegar entre las distintas páginas usando los botones disponibles.
- **Cerrar sesión:** Puedes cerrar sesión desde el dashboard.

---

### 5. **Tests**

#### **Backend (Laravel)**
Desde la carpeta `backend`:
php artisan test


#### **Frontend (React)**
Desde la carpeta `frontend`:
npm test


---

## 📝 Notas

- El backend expone la API en `http://localhost:8000/api/`
- El frontend consume la API en `http://localhost:8000/api/`
- Base de datos: MySQL (o MariaDB)
- No es necesario cambiar de rama para ninguna funcionalidad: todo el flujo está en la rama principal (`dev` o `main`).
- Si tienes algún problema con dependencias de PHP, asegúrate de tener habilitadas todas las extensiones requeridas en tu `php.ini`.

---

## 📄 License

MIT License