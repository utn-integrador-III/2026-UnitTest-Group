# Demo de Pruebas Unitarias en React 🚀

Demo sencilla para aprender pruebas unitarias (unit testing), simulaciones (mocking) y cobertura de código (code coverage) en React.

## 🛠️ Stack Tecnológico
- **React + Vite** — Framework y servidor de desarrollo
- **Vitest** — Ejecutor de pruebas (similar a Jest, pero más rápido)
- **React Testing Library** — Pruebas de componentes desde la perspectiva del usuario
- **jsdom** — Simula el navegador dentro de Node.js para las pruebas
- **@vitest/coverage-v8** — Reporte de cobertura de código

---

## 🏛️ Estructura del Proyecto (Muy Simple)

```
src/
├── App.jsx                 # Componente principal: muestra el dashboard de usuarios
├── App.test.jsx            # 4 pruebas del componente App
├── services/
│   ├── userService.js      # Lógica de API: obtiene usuarios de internet
│   └── userService.test.js # 2 pruebas unitarias del servicio
└── setupTests.js           # Configuración de pruebas
```

---

## 🎓 Conceptos Clave para la Clase

### ¿Qué es un Mock (Simulación)?
En las pruebas no queremos llamar a internet de verdad porque:
- La red puede estar caída.
- Sería lento y poco confiable.
- No podemos forzar fácilmente un error de servidor.

Un **Mock** reemplaza la llamada real con una respuesta inventada y controlada.

### Ejemplo de Mock — Servicio de API
En [userService.test.js](file:///c:/Users/Frank/Desktop/2026-UnitTest-Group/pruebasReact/src/services/userService.test.js) simulamos el `fetch` global del navegador:
```javascript
vi.stubGlobal('fetch', vi.fn());

fetch.mockResolvedValueOnce({
  ok: true,
  json: async () => [{ id: 1, name: 'Alice' }]
});
```

### Ejemplo de Mock — Componente
En [App.test.jsx](file:///c:/Users/Frank/Desktop/2026-UnitTest-Group/pruebasReact/src/App.test.jsx) simulamos el módulo del servicio completo:
```javascript
vi.mock('./services/userService', () => ({
  userService: { getUsers: vi.fn() }
}));
```

---

## 📋 Las 6 Pruebas del Proyecto

### Archivo: `userService.test.js`
| # | Prueba | Qué verifica |
|---|--------|-------------|
| 1 | Éxito al obtener usuarios | `fetch` fue llamado con la URL correcta y devuelve los datos |
| 2 | Error cuando la API falla | Se lanza una excepción si `ok: false` |

### Archivo: `App.test.jsx`
| # | Prueba | Qué verifica |
|---|--------|-------------|
| 3 | Estado de carga y lista de usuarios | Muestra el spinner, luego los nombres de los usuarios |
| 4 | Filtro por nombre | Al escribir "Bob" desaparece "Alice" y queda solo "Bob" |
| 5 | Expandir y ocultar detalles | Clic muestra el email; otro clic lo oculta |
| 6 | Error y reintento | Muestra el banner de error y al reintentar carga los usuarios |

---

## 💻 Comandos para el Demo

Abre una terminal en la carpeta `pruebasReact`:

```bash
# Ver la app en el navegador
npm run dev

# Ejecutar las pruebas
npm run test

# Ver la cobertura de código
npm run coverage
```

Abre **[http://localhost:5173](http://localhost:5173)** en tu navegador.
