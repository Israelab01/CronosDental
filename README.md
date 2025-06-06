
# Cronos Dental – Dental Clinic Management System

Sistema web para la gestión de clínicas dentales.

---

## 📂 Branches Overview

- **login**:  
  - *Frontend* y *backend* de la página de login.
  - Permite iniciar sesión de clientes.  
  - **Nota:** La opción de cerrar sesión aún no está disponible.

- **register**:  
  - *Frontend y backend* para el registro de clientes.
  - *Frontend* para login.

- **clientes**:  
  - *CRUD* completo de clínicas (frontend y backend).
  - Para probar la gestión de clínicas, usa esta rama.

---

## 🚀 Cómo ejecutar cada parte

### 1. **Clona el repositorio**

git clone https://github.com/your-username/cronos-dental.git
cd cronos-dental

---

### 2. **Para probar el CRUD de clínicas**
> **Cámbiate a la rama `feature/clientes`:**

git checkout clientes


#### **Backend setup**

cd backend
cp .env.example .env
composer install
php artisan key:generate



#### **Configura tu base de datos en `.env`**

php artisan migrate --seed
php artisan serve --port=8000


#### **Frontend setup**

cd ../frontend
npm install
npm start


- Abre [http://localhost:3000](http://localhost:3000) para usar la gestión de clínicas.
- Puedes añadir, buscar, editar y eliminar clínicas.

#### **Ejecutar tests de Backend para Clínicas**

Desde la carpeta `backend`:

php artisan test --filter=ClinicApiTest


#### **Ejecutar tests de Frontend para Clínicas**

Desde la carpeta `frontend`:

npm test Clients.test.js

---

### 3. **Para probar login (frontend y backend)**
> **Cámbiate a la rama `feature/login`:**

git checkout feature/login


- Login funcional para clientes, con backend y frontend.
- Permite iniciar sesión.
- **Nota:** La opción de cerrar sesión aún no está disponible.

#### **Ejecutar tests de Backend para Login**

Desde la carpeta `backend`:

php artisan test --filter=LoginApiTest


#### **Ejecutar tests de Frontend para Login**

Desde la carpeta `frontend`:

npm test Login.test.js

---

### 4. **Para probar el registro**
> **Cámbiate a la rama `feature/register`:**

git checkout feature/register


- Registro: *frontend y backend*.
- Login: *frontend*.

#### **Ejecutar tests de Backend para Registro**

Desde la carpeta `backend`:

php artisan test --filter=RegisterApiTest


#### **Ejecutar tests de Frontend para Registro**

Desde la carpeta `frontend`:

npm test Register.test.js


---

## 📝 Notas

- La API del backend corre en `http://localhost:8000/api/`
- El frontend corre en `http://localhost:3000/`
- Base de datos: MySQL
- Para el CRUD de clínicas, usa la rama `feature/clientes`.
- Para los tests de registro, usa la rama `feature/register`.
- Para login funcional (frontend y backend), usa la rama `feature/login`.

---

## 📄 License

MIT License

---