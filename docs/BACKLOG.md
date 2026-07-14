# Product Backlog

La prioridad sigue el criterio **Must / Should / Could / Won't** de MoSCoW. Los puntos representan complejidad relativa, no horas.

## Historias priorizadas

| ID | Historia de usuario | Prioridad | Puntos | Dependencias |
| --- | --- | --- | ---: | --- |
| US-01 | Como usuario, quiero ver una interfaz clara para administrar mis tareas | Must | 3 | Diseño aprobado |
| US-02 | Como usuario, quiero crear una tarea con título y descripción | Must | 3 | US-01 |
| US-03 | Como usuario, quiero ver todas mis tareas | Must | 3 | US-02 |
| US-04 | Como usuario, quiero ver el detalle de una tarea | Must | 2 | US-03 |
| US-05 | Como usuario, quiero completar o reabrir una tarea | Must | 2 | US-03 |
| US-06 | Como usuario, quiero editar el título de una tarea | Must | 3 | US-03 |
| US-07 | Como usuario, quiero eliminar una tarea con seguridad | Must | 2 | US-03 |
| US-08 | Como usuario, quiero recuperar mis tareas al recargar la página | Must | 5 | US-02 a US-07 |
| US-09 | Como usuario de teclado o lector de pantalla, quiero operar las funciones principales | Must | 3 | US-01 a US-07 |
| US-10 | Como usuario, quiero entender por qué una tarea no puede guardarse | Should | 2 | US-02 |
| US-11 | Como usuario, quiero una experiencia adecuada en móvil y escritorio | Should | 3 | US-01 |
| US-12 | Como usuario, quiero filtrar tareas por estado | Could | 3 | US-05 |
| US-13 | Como usuario, quiero buscar tareas por texto | Could | 3 | US-03 |

## Criterios de aceptación

### US-01 — Base visual

- Existe un encabezado, un formulario y una región identificable para la lista.
- Se contemplan visualmente los estados vacío, pendiente, completado y edición.
- El diseño no produce scroll horizontal a 320 px.

### US-02 — Crear tarea

- Dado un título válido, al enviar el formulario aparece una nueva tarea pendiente.
- El título es obligatorio; la descripción es opcional.
- Tras crearla, el formulario se limpia y el foco vuelve al campo de título.
- Un título compuesto solo por espacios muestra un error y no crea la tarea.

### US-03 — Listar tareas

- Todas las tareas existentes aparecen en la lista.
- Se distingue visual y semánticamente una tarea completada.
- Si no existen tareas, se muestra un estado vacío útil.

### US-04 — Ver detalle

- El usuario puede consultar título, descripción y estado de una tarea.
- La acción para cerrar o contraer el detalle es accesible con teclado.

### US-05 — Completar o reabrir

- Una tarea pendiente puede marcarse como completada.
- Una tarea completada puede volver a pendiente.
- El cambio aparece inmediatamente y persiste tras recargar.

### US-06 — Editar título

- El título actual se presenta como valor inicial.
- Guardar un título válido actualiza la tarea y su fecha de modificación.
- Cancelar no modifica la tarea.
- No se permite guardar un título vacío.

### US-07 — Eliminar

- La eliminación solicita confirmación.
- Cancelar conserva la tarea.
- Confirmar retira la tarea de la interfaz y del almacenamiento.

### US-08 — Persistencia

- Crear, editar, completar, reabrir o eliminar actualiza `localStorage`.
- Al cargar la aplicación se recupera el estado previamente guardado.
- Un valor ausente o corrupto se maneja sin bloquear la interfaz.

### US-09 — Accesibilidad

- Todos los controles son alcanzables y operables mediante teclado.
- Cada input tiene una etiqueta y cada botón de icono posee nombre accesible.
- El foco es visible y se administra al abrir/cerrar edición o detalle.
- Los mensajes importantes se comunican mediante una región apropiada.

## Orden de ejecución recomendado

1. US-01 y US-11: estructura y diseño responsive.
2. US-02 y US-03: modelo en memoria, creación y renderizado.
3. US-04, US-05, US-06 y US-07: operaciones completas.
4. US-08: capa de persistencia.
5. US-09 y US-10: accesibilidad, validación y pulido.

Las historias “Could” no entran al MVP hasta completar y verificar todas las historias “Must”.
