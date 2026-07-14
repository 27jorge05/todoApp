# Todo App

Aplicación web para crear y administrar tareas en el navegador. La primera versión funcionará sin backend y persistirá la información mediante `localStorage`.

## Objetivo del MVP

Permitir que una persona pueda registrar, consultar, editar, completar y eliminar tareas, conservándolas después de recargar la página.

## Documentación del proyecto

- [Requerimientos y alcance](docs/REQUERIMIENTOS.md)
- [Product Backlog](docs/BACKLOG.md)
- [Tablero Kanban](docs/KANBAN.md)
- [Arquitectura y diagramas](docs/ARQUITECTURA.md)
- [Criterios de terminado](docs/DEFINITION_OF_DONE.md)

## Alcance actual

Incluido en el MVP:

- Crear tareas con título y descripción.
- Listar y visualizar tareas.
- Editar el título de una tarea.
- Marcar y desmarcar tareas como completadas.
- Eliminar tareas.
- Persistir todos los cambios en `localStorage`.
- Mostrar una interfaz usable y adaptable a móvil y escritorio.

Fuera del MVP:

- Usuarios, inicio de sesión o sincronización entre dispositivos.
- Backend o base de datos remota.
- Fechas límite, prioridades, categorías, filtros y búsqueda.
- Colaboración y notificaciones.

## Metodología de trabajo

Se usará una combinación sencilla para una sola persona:

1. **Product Backlog:** contiene historias de usuario priorizadas.
2. **Kanban:** muestra el estado real de las tareas: Pendiente, En curso, En revisión y Terminado.
3. **Iteraciones cortas:** cada bloque entrega una parte funcional y verificable del producto.
4. **Límite de trabajo:** máximo una tarea de desarrollo en curso para reducir cambios de contexto.
5. **Definition of Done:** una historia solo se cierra si cumple sus criterios de aceptación y las verificaciones acordadas.

## Iteraciones propuestas

| Iteración | Resultado |
| --- | --- |
| 0. Definición | Requerimientos, arquitectura, boceto y entorno acordados |
| 1. Base visual | Maquetado responsive de formulario, lista y estados vacíos |
| 2. Operaciones | Crear, listar, visualizar, editar, completar y eliminar |
| 3. Persistencia | Guardado, carga y actualización mediante `localStorage` |
| 4. Calidad | Validaciones, accesibilidad, pruebas y pulido visual |

## Estado

El proyecto está en la **Iteración 0: definición y diseño**. La siguiente decisión es aprobar el maquetado y elegir la variante de arquitectura descrita en la documentación.
