# Requerimientos y alcance

## Actores

- **Usuario:** persona que administra sus tareas desde un único navegador.
- **Navegador:** ejecuta la aplicación y almacena los datos localmente.

## Requerimientos funcionales

| ID | Requerimiento | Prioridad MVP |
| --- | --- | --- |
| RF-01 | Crear una tarea con título y descripción | Alta |
| RF-02 | Visualizar todas las tareas en una lista | Alta |
| RF-03 | Visualizar el detalle de una tarea | Alta |
| RF-04 | Editar el título de una tarea | Alta |
| RF-05 | Marcar una tarea como completada | Alta |
| RF-06 | Desmarcar una tarea completada | Alta |
| RF-07 | Eliminar una tarea | Alta |
| RF-08 | Guardar las tareas en `localStorage` | Alta |
| RF-09 | Cargar las tareas al iniciar o recargar la página | Alta |
| RF-10 | Actualizar el almacenamiento al editar, completar o eliminar | Alta |

## Reglas de negocio

| ID | Regla |
| --- | --- |
| RN-01 | El título es obligatorio y no puede contener solo espacios. |
| RN-02 | La descripción puede estar vacía. |
| RN-03 | Cada tarea posee un identificador único. |
| RN-04 | Una tarea nueva comienza con estado pendiente. |
| RN-05 | El título y la descripción se normalizan eliminando espacios innecesarios al inicio y al final. |
| RN-06 | Eliminar una tarea requiere confirmación para evitar pérdidas accidentales. |
| RN-07 | Todo cambio válido se refleja inmediatamente en la interfaz y en `localStorage`. |

## Modelo de datos propuesto

```js
{
  id: "uuid",
  title: "Comprar alimentos",
  categoria: "general",
  description: "Leche, pan y fruta",
  completed: false,
  createdAt: "2026-07-14T18:30:00.000Z",
  updatedAt: "2026-07-14T18:30:00.000Z"
}
```

La clave sugerida para almacenamiento es `todo-app.tasks.v1`. El sufijo permite migrar el formato más adelante sin confundir versiones.

## Requerimientos no funcionales

| ID | Categoría | Requerimiento verificable |
| --- | --- | --- |
| RNF-01 | Persistencia | Las tareas permanecen después de recargar la página en el mismo navegador mediante local storage. |
| RNF-02 | Separación | HTML define estructura, CSS presentación y JavaScript comportamiento. |
| RNF-03 | Usabilidad | Las acciones principales se identifican con texto o etiquetas accesibles. |
| RNF-04 | Responsive | La interfaz funciona desde 320 px de ancho y en escritorio. |
| RNF-05 | Accesibilidad | El flujo principal puede usarse con teclado y los inputs tienen etiquetas asociadas. |
| RNF-06 | Robustez | Datos inexistentes o JSON inválido en `localStorage` no rompen la aplicación. |
| RNF-07 | Compatibilidad | Funciona en versiones modernas de Chrome, Firefox y Edge. |
| RNF-08 | Mantenibilidad | Funciones pequeñas, nombres descriptivos y ausencia de lógica JavaScript inline en HTML. |

## Estados de interfaz necesarios

- Formulario vacío y formulario con validación fallida.
- Lista vacía.
- Lista con tareas pendientes y completadas.
- Vista o expansión del detalle.
- Modo de edición.
- Confirmación de eliminación.
- Mensaje recuperable si el almacenamiento contiene datos inválidos.

## Decisiones pendientes

1. Definir el maquetado visual o proporcionar la referencia de diseño mencionada como “MAQUETADO”.
2. Decidir si la descripción también podrá editarse; el requerimiento actual solo exige editar el título.
3. Elegir si el detalle se mostrará expandido en la tarjeta o en un diálogo.
4. Confirmar si se usará JavaScript puro o una tecnología ya exigida por el bootcamp.
