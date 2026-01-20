PROMPT 1

You are an expert fullstack architect 

## Task Create github copilot instructions of the project

Details
You need understand the whole project and create github copilot instructions for it.

include framework versions
include installed dependencies
include architecture patterns
include project structure and major elements
include routes and related components
include style guides
include current implementation status
separate backend and frontend 
separate each section in a separate file

PROMPT 2
Actúa como un ingeniero senior especialista en pruebas End-to-End (E2E).

Contexto:
- Aplicación web con una página de detalle de una Position (proceso de selección).
- La UI muestra columnas, una por cada fase del proceso de contratación (ej: Applied, Interview, Offer, Hired).
- Cada columna contiene tarjetas de candidatos según su fase actual.
- Las tarjetas de candidatos pueden moverse entre columnas mediante drag & drop.
- El backend expone el endpoint:
  PUT /candidate/:id
  que actualiza la fase del candidato.

Requisitos técnicos:
- Usa un framework E2E moderno y estándar (Playwright preferiblemente; Cypress es aceptable si ya está implícito).
- Usa selectores estables (data-testid o equivalentes).
- Evita esperas arbitrarias (no usar sleeps).
- Valida tanto la UI como la interacción con el backend.
- Mockea o intercepta llamadas HTTP cuando sea necesario.
- Estructura los tests de forma clara y mantenible.

Escenarios a implementar:

1. Carga de la página de Position
   - Verifica que el título de la posición se muestra correctamente.
   - Verifica que se muestran todas las columnas correspondientes a las fases del proceso de contratación.
   - Verifica que las tarjetas de candidatos se renderizan en la columna correcta según su fase.

2. Cambio de fase de un candidato
   - Simula el drag & drop de una tarjeta de candidato desde una columna origen a una columna destino.
   - Verifica que la tarjeta aparece visualmente en la nueva columna.
   - Intercepta la llamada PUT /candidate/:id y valida:
     - Que el endpoint es llamado.
     - Que el payload contiene la nueva fase recordada.
     - Que la respuesta del backend es correcta (200 OK).
   - Verifica que, tras la respuesta del backend, el estado de la UI se mantiene consistente.

Estructura esperada:
- Un archivo de test E2E bien organizado.
- Uso de beforeEach para preparación del estado inicial.
- Helpers o funciones reutilizables si procede (por ejemplo para drag & drop).
- Comentarios claros explicando cada paso relevante del test.

Genera el plan del test E2E siguiendo estos requisitos. Lee la carpeta project-info para tener un mejor entendimiento del proyecto

PROMPT 3

sí, crea un plan con todo lo que necesites para probar que funcionan bien los test end2end que acabas de crear

PROMPT 4
quiero que ejecutes el plan completo que me diste antes: Plan: Validación de Tests E2E Playwright
Este plan asegura que los tests E2E implementados funcionen correctamente y sean mantenibles.

Steps
Instalación y configuración

Instala Playwright y dependencias con npm install -D @playwright/test y npx playwright install.
Verifica o crea playwright.config.ts con baseURL y settings adecuados.
Asegúrate de que el frontend y backend estén operativos localmente.
Añadir y revisar data-testid en React

Añade data-testid en columnas, tarjetas y título de Position en los componentes React.
Usa identificadores únicos y descriptivos (ej: data-testid="candidate-card-c1").
Preparar entorno de pruebas

Mockea endpoints y datos necesarios en los tests.
Configura scripts para iniciar la app antes de los tests.
Ejecución de los tests

Ejecuta los tests con npx playwright test y revisa el reporte.
Usa npx playwright test --ui para modo interactivo y debugging.
Validaciones y troubleshooting

Verifica que todos los tests pasen y los resultados sean los esperados.
Revisa logs y capturas en caso de fallos.
Ajusta mocks, selectores o configuración si es necesario.
Integración en CI/CD

Añade ejecución de tests E2E en el pipeline (ejemplo: GitHub Actions).
Configura artefactos de reporte y dependencias en el entorno CI.

PROMPT 5
Intento que arregle los tests pero no funcionan todos... sólo pasa 3 tests, creo que los otros no funcionan porque no encuentra ningún candidato (no funciona bien prisma y la carga de usuarios en la base de datos)