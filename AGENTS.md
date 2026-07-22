# AGENTS.md — Guía de viaje Azores 2026

Este repo contiene `Azores_2026_Itinerario.md`, un único fichero markdown a partir del cual se genera un sitio estático. Estas reglas definen cómo el agente debe comportarse cada vez que se le pida **añadir, mover o modificar un sitio** (restaurante, punto de interés, mirador, playa, terma, cafetería...) en la guía.

El objetivo: que da igual quién pida el cambio o cómo lo pida, el resultado sea siempre consistente con el formato ya existente en el fichero.

---

## 0. Antes de tocar nada

- Lee siempre el estado actual de `Azores_2026_Itinerario.md` antes de editar — no asumas contenido de memoria.
- Nunca reescribas el fichero entero: edita solo las secciones relevantes, preservando el resto (otros días, notas, checklist, etc.) exactamente como están.
- Respeta el estilo tipográfico existente: encabezados con emoji (`## 📍`, `### 🌅`, etc.), enlaces en negrita `[**Nombre**](url)`, tablas con `*(pendiente)*` como placeholder.

## 1. Al añadir un nuevo sitio, sigue este proceso en orden

### Paso 1 — Preguntar mañana o tarde

Si no se especifica, **pregunta siempre** si el sitio va en el plan de mañana o de tarde de ese día, dando pros/contras basados en lo que ya sabemos del itinerario de ese día concreto:

- **Horario de apertura** del sitio (si aplica) vs. franja disponible.
- **Siesta de los niños** (normalmente después de comer / a media tarde): un trayecto largo en coche encaja mejor en ese hueco.
- **Sol/calor**: piscinas naturales, termas o playas mejor evitando la hora de más sol si es agosto.
- **Distancia/tiempo en coche** desde el alojamiento activo esa fase del viaje (Furnas 16–19 agosto, Ponta Delgada 19–24 agosto) o desde la actividad anterior/siguiente ya planificada ese día.
- **Masificación**: miradores y sitios fotogénicos (Sete Cidades, Vista do Rei) mejor temprano por la mañana.
- Si el día ya tiene mañana o tarde ocupada con algo fijo (excursión de ballenas, traslado, vuelo), dilo explícitamente como restricción.

No asumas la respuesta — usa estas preguntas para justificar una recomendación, pero deja que la persona decida.

### Paso 2 — Enlace de Google Maps

- Todo sitio nuevo lleva **siempre** un enlace de Google Maps.
- Si no te lo dan, búscalo tú.
- Formato para insertarlo en el cuerpo del día (dentro de "Plan de la mañana" / "Plan de la tarde" / "Comida" / etc.), igual que el resto del fichero:
  ```
  - [**Nombre del sitio**](https://www.google.com/maps/place/...) — breve descripción
  ```
- Además, añade el enlace a la sección **🔗 Links útiles** de ese día (sustituyendo la línea `*(añadir enlace X)*` correspondiente si existe, en vez de dejarla duplicada).

### Paso 3 — Clasificar y actualizar la sección global correspondiente

Además de aparecer en el plan del día, cada sitio debe reflejarse en su tabla global al final del fichero, según el tipo:

| Tipo de sitio | Sección global | Notas |
|---|---|---|
| Restaurante / bar de comida | `# 🍽️ Restaurantes` | Añadir fila en la subsección de la zona (Furnas, Vila Franca do Campo, Nordeste, Ribeira Grande, Ponta Delgada). Si la zona no tiene subsección aún, créala siguiendo el mismo formato de tabla. Rellenar `Restaurante / Especialidad / Reserva / Nota personal`. Si hay una fila `*(pendiente)*` libre en esa zona, reutilízala en vez de añadir una nueva. |
| Mirador / punto de vista | `# 🏔️ Miradores` | Fila: `Lugar / Tiempo necesario / Ideal con niños / Comentarios`. |
| Playa o piscina natural | `# 🏖️ Playas y piscinas naturales` | Fila: `Lugar / Tipo / Ideal con niños / Acceso / Comentarios`. |
| Terma / aguas termales | `# ♨️ Termas` | Fila: `Lugar / Ideal con niños / Horario / Nota personal`. |
| Cafetería / pastelería | `# ☕ Cafeterías y pastelerías` | Fila: `Lugar / Zona / Especialidad / Nota personal`. |
| Punto de interés genérico (jardín, parque, paseo, iglesia, escultura, museo...) | No tiene tabla global propia | Basta con que quede bien reflejado en el plan del día + Links útiles. Si crees que merece la pena destacarlo, puedes anotarlo también en `## Ideas y descubrimientos` dentro de `# 📝 Notas del viaje`. |

Si el sitio no encaja claramente en ninguna categoría, pregunta antes de decidir dónde clasificarlo.

### Paso 4 — Foto para el carrusel

- Cada día tiene un bloque `:::carousel [...] :::` justo debajo del título del día, con imágenes en formato `[![alt](url)](url)`.
- Busca una foto representativa del sitio (preferiblemente de Wikimedia Commons u otra fuente de uso libre) y **añádela** al carrusel del día correspondiente, sin borrar las imágenes que ya haya — el carrusel es acumulativo.
- Usa como `alt` el nombre del sitio, siguiendo el estilo ya usado (`"Nombre del lugar — descripción corta"`).
- Si el día no tiene aún bloque `:::carousel :::`, créalo justo debajo del `## 📍 [Día] — [Título]`.

### Paso 5 — Confirmar y resumir

Al terminar, resume en un par de líneas qué secciones has tocado (día X, tabla Y, carrusel) para que se pueda revisar el diff fácilmente.

## 2. Reglas generales de estilo

- Idioma: español, mismo tono que el resto del documento (informal, directo, con notas prácticas para viajar con niños de 1 y 3 años).
- No borres ni "limpies" secciones `*(pendiente)*` de otros días/sitios que no tengan relación con el cambio pedido.
- No inventes horarios, precios ni reservas — si no se conocen, usa `*(pendiente)*` como en el resto del fichero.
- Si un cambio afecta al tiempo en coche estimado del día (`### 🚗 Tiempo en coche`), actualízalo también.
- Nunca añadas información sensible (contactos privados, localizadores, direcciones de reservas) directamente — el fichero ya tiene el patrón `*(enlace privado)*` / `*(no compartir en repo público)*` para eso.
