# 📋 Task Tracker - React App

Una aplicación web completa para la gestión de tareas (Task Management System) construida con **React**. Esta app te permite crear, editar, eliminar y marcar tareas como completadas o pendientes, además de navegar entre distintas vistas mediante React Router. Está diseñada con un enfoque modular y responsivo, usando React Hooks, formularios controlados, y almacenamiento persistente con `localStorage`.

---

## 🚀 Características Principales

### ✅ Sistema de Gestión de Tareas

- Añadir nuevas tareas con título, descripción y fecha.
- Editar tareas existentes desde una vista dedicada.
- Eliminar tareas con confirmación.
- Marcar tareas como **completadas** o **pendientes**.
- Vistas separadas:
  - **Todas las tareas**
  - **Tareas completadas**
  - **Tareas pendientes**

### 🧠 Gestión de Estado

- `useState` y `useEffect` para manejar el estado local.

### 🌐 Navegación con React Router

- `/` → Tablero de tareas (Dashboard)
- `/add` → Formulario para crear nuevas tareas
- `/edit/:id` → Vista de detalles y edición de una tarea específica

### 🧱 Componentes Reutilizables

- `TaskItem`, `EmptyState`, `TaskForm`, `TaskFilter`, `Header`.
- Enfoque modular para facilitar el mantenimiento y escalabilidad.

### ✍️ Manejo de Formularios y Validación

- Formularios controlados con `useState`.
- Validaciones básicas como:
  - Campos requeridos
- Mensajes de error amigables.

### 💾 Persistencia de Datos

- Las tareas se almacenan en `localStorage`.
- Persistencia garantizada incluso tras recargar el navegador.

### 📱 Diseño Responsivo

- Interfaz completamente responsiva con **Bootstrap 5**.
- Adaptable a escritorio, tablet y móvil.

---

## 🛠️ Tecnologías Utilizadas

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Bootstrap 5](https://getbootstrap.com/)
- `localStorage` para persistencia de datos
- Hooks: `useState`, `useEffect`, `useParams`, `useNavigate`, etc.

---

## 🧾 Instalación y Uso

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/task-tracker-react.git
   cd task-tracker-react
   ```  
2.**Instalar dependencias**
   `npm install`  
3. **Iniciar aplicacion**
   `npm start`  
4. **Abrir el navegador**
   `http://localhost:3000`  

  
Estructura del Proyecto:
src/
│
├── components/
│ ├── EmptySatate.js
│ ├── Header.js
│ ├── TaskFilter.js
│ ├── TaskForm.js
│ └── TaskItem.js
│
├── pages/
│ ├── AddTask.js
│ ├── EditTask.js
│ └── TaskList.js
│
├── context/
│ └── TaskContext.js
│
│
├── App.js
├── App.css
├── index.js
├── index.css
