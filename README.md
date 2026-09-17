# Guru Digital — Sitio web corporativo

Sitio estático multipágina (HTML + CSS + JS, sin dependencias ni build) para Guru Digital:
desarrollo de software, sistemas contables y deportivos, ticketing, IA, streaming
e importación directa de pantallas LED.

## Páginas

| Archivo | Página |
| --- | --- |
| `index.html` | Inicio |
| `servicios.html` | Servicios: los 5 rubros con 18 servicios y sus anclas |
| `nosotros.html` | Quiénes somos, principios y a quién servimos |
| `pantallas-led.html` | Pantallas LED: venta, alquiler e integraciones |
| `deportes.html` | Tecnología deportiva, streaming, eventos y atletas |
| `contable.html` | Contabilidad, asesoría empresarial y fintech |
| `proceso.html` | Cómo trabajamos, entregables y modelos de contratación |
| `faq.html` | Preguntas frecuentes |
| `contacto.html` | Contacto y formulario |
| `404.html` | Página de error |

## Menú

```
GURU DIGITAL    Inicio    Servicios ▼    Nosotros    Proceso    FAQ    [ Contacto ]
```

El desplegable de **Servicios** agrupa los cinco rubros. Cada título de grupo lleva a su
página o ancla, y cada hijo al detalle correspondiente:

| Grupo | Va a | Hijos |
| --- | --- | --- |
| Tecnología & IA | `servicios.html#tecnologia` | Desarrollo de software · Inteligencia Artificial · Automatización · Apps y plataformas |
| Marketing & Digital | `servicios.html#marketing` | Marketing digital · Branding · Producción audiovisual |
| Pantallas LED | `pantallas-led.html` | Venta e instalación · Alquiler · Integraciones |
| Deportes | `deportes.html` | Tecnología deportiva · Streaming · Producción y eventos |
| Contable & Empresarial | `contable.html` | Contabilidad · Asesoría empresarial |

En escritorio el panel se abre al pasar el cursor o al hacer clic, ocupa el ancho de la
cabecera y se cierra con `Esc`, al hacer clic fuera o al salir con el tabulador.
En móvil se convierte en un acordeón dentro del menú hamburguesa.

Para cambiar el menú se edita `MENU_SERVICIOS` — pero recuerda que el HTML generado está
duplicado en las 10 páginas, así que el cambio hay que replicarlo en todas.

## Estructura

```
*.html                      Una página por entrada del menú
assets/css/styles.css       Estilos (tokens de marca, componentes, responsive)
assets/js/main.js           Menú móvil, reveals, contadores, FAQ, panel LED, formulario
assets/img/logo.svg         Logo para fondos claros
assets/img/logo-inverse.svg Logo para fondos oscuros (el que usa el sitio)
assets/img/favicon.svg      Favicon
robots.txt / sitemap.xml    SEO básico
```

El encabezado y el pie están **duplicados en cada archivo HTML**: es la contrapartida
de no usar un generador ni un CMS. Si cambias un enlace del menú, del desplegable de Servicios o del pie,
cámbialo en las 10 páginas.

## Cómo verlo en local

No requiere compilación. Con Node instalado:

```bash
npx --yes http-server . -p 5178 -c-1
```

También funciona abriendo `index.html` directamente en el navegador.

## Datos de contacto (ya integrados)

| Dato | Valor |
| --- | --- |
| Dirección | 4.ª Avenida 5-08, Colonia Panorama, Zona 8 de Mixco, San Cristóbal, Guatemala |
| Teléfono y WhatsApp | +502 3991-7495 |
| Correo | info@gurulab.digital |
| Horario publicado | Lunes a viernes, 8:00 – 18:00 |

## Pendiente antes de publicar

Busca `TODO:` en los archivos HTML. Queda por definir:

- **Enlaces de redes sociales** en el pie (`href="#"` en LinkedIn, Instagram y YouTube).
- **Dominio final:** todas las etiquetas `canonical`, Open Graph, el JSON-LD y el
  `sitemap.xml` apuntan a `https://www.gurulab.digital`, deducido de tu correo.
  Si el dominio del sitio es otro, hay que reemplazarlo.
- **Páginas legales** (privacidad, términos, tratamiento de datos) si las necesitas:
  hoy el pie enlaza a Proceso, FAQ y Contacto en su lugar.

## Logos de partners

La portada tiene una sección **Partners** con 4 espacios ya conectados. `index.html`
busca estos archivos dentro de `assets/img/partners/`:

| Orden | Archivo | Fondo | Escala | Enlace |
| --- | --- | --- | --- | --- |
| 1 | `isatech.png` | Blanco | 0.8 | — |
| 2 | `pumpkin.png` | Blanco | 1.1 | — |
| 3 | `gol-click.png` | Blanco | 0.9 | https://golclick.lat/ |
| 4 | `chrono-sports.png` | Blanco | 1.1 | https://chronosports.live/ |

**Enlazar un logo:** envuelve la imagen en un `<a>`. El recuadro entero queda pulsable
y el enlace abre en pestaña nueva:

```html
<li class="partner partner--light">
  <a href="https://ejemplo.com/" target="_blank" rel="noopener" title="Nombre — abre en una pestaña nueva">
    <img src="assets/img/partners/nombre.png" alt="Nombre" loading="lazy" decoding="async">
  </a>
  ...
</li>
```

Un logo sin `<a>` simplemente no es pulsable; no hay que hacer nada más.

**Ajustar el tamaño de un logo:** cada `<img>` lleva `style="--escala:0.9"`. Es un
multiplicador: `1` es el tamaño natural, `0.8` lo achica un 20 %, `1.1` lo agranda
un 10 %. Sirve para compensar que cada marca trae distinto margen dentro de su archivo.
Quitar el atributo equivale a `--escala:1`.

El orden de la fila lo define el orden de los `<li>` en `index.html`. La fila se centra
sola, así que puedes tener 3, 4, 6 o los que sean sin retocar el CSS.

**Qué fondo le toca a cada logo:** si el logo es oscuro —o trae fondo blanco sólido—
va en recuadro claro (`partner--light`). Si es blanco o muy claro sobre fondo
transparente, va en recuadro oscuro (solo `partner`).

En la carpeta quedan sin usar `fesada.png` y `fesfut.png`; se
pueden borrar o dejar por si vuelven a hacer falta. Los archivos sin redimensionar
están en `assets/img/partners/originales/`.

Si algún archivo llegara a faltar, ese recuadro muestra un marcador con el nombre del
partner — nunca aparece una imagen rota.

Se cambia con la clase del `<li>`:

```html
<li class="partner partner--light">  <!-- fondo BLANCO -->
<li class="partner">                 <!-- fondo OSCURO -->
```

Formato: PNG con fondo transparente, o SVG. Con ~600 px de ancho basta; el logo se
escala solo dentro del recuadro y nunca se recorta, sea cuadrado o apaisado.
Para añadir más partners, duplica un `<li>` y sigue el mismo patrón.

## Formulario de contacto

`assets/js/main.js` valida y muestra confirmación, pero **no envía nada** todavía.
Define la constante `ENDPOINT` (sección 8 del archivo) con la URL de tu backend,
Formspree, Netlify Forms o similar, y el envío queda funcionando:

```js
var ENDPOINT = 'https://formspree.io/f/xxxxxxx';
```

## Marca

| Elemento | Valor |
| --- | --- |
| Magenta principal | `#ED0B6E` |
| Magenta oscuro | `#C8095C` |
| Magenta claro | `#FF4D97` |
| Fondo base | `#0B0B0E` |
| Tipografía titulares | Montserrat |
| Tipografía texto | Inter |

Los colores se controlan desde las variables CSS en `:root` (`assets/css/styles.css`).
Cambiar `--brand` actualiza todo el sitio.

## Logo

`logo.svg` y `logo-inverse.svg` son reconstrucciones vectoriales del isotipo GD.
Si tienes los originales de la agencia (AI/EPS/SVG), reemplaza estos archivos
manteniendo los mismos nombres — el sitio los tomará sin más cambios.

## Accesibilidad y rendimiento

- Navegación por teclado, `skip link`, estados de foco visibles y `aria-*` en menú y FAQ.
- Cada página tiene un solo `<h1>`, migas de pan y su propio título y descripción.
- Respeta `prefers-reduced-motion`: desactiva animaciones y el panel LED animado.
- El panel LED pausa su animación cuando sale de pantalla.
- Sin librerías externas: solo se cargan las fuentes de Google Fonts.

## Despliegue en cPanel con Git

El sitio se publica desde GitHub usando **Git Version Control** de cPanel. El archivo
`.cpanel.yml` le dice a cPanel qué copiar y a dónde:

```yaml
- export DEPLOYPATH=/home/heronzix/gurulab.digital/
```

Si el directorio público del dominio fuera otro, cambia solo esa línea.

### Primera vez

1. Crea un repositorio vacío en GitHub (público, sin README ni .gitignore).
2. Conecta y sube desde esta carpeta:
   ```bash
   git remote add origin https://github.com/USUARIO/gurulab-digital.git
   git push -u origin main
   ```
3. En cPanel → **Git Version Control** → **Create**:
   - *Clone a Repository*: activado
   - *Clone URL*: `https://github.com/USUARIO/gurulab-digital.git`
   - *Repository Path*: `repositories/gurulab-digital` (**nunca** el directorio público)
   - *Repository Name*: `Guru Digital`
4. En la lista, **Manage** → pestaña **Pull or Deploy** → **Deploy HEAD Commit**.

### Cada actualización

```bash
git add -A
git commit -m "Descripción del cambio"
git push
```

Luego en cPanel: **Manage** → **Pull or Deploy** → **Update from Remote** → **Deploy HEAD Commit**.

### `.htaccess`

Se despliega junto al sitio. Define `404.html` como página de error, caché de
recursos estáticos y compresión. La redirección a HTTPS está comentada: actívala
cuando AutoSSL haya emitido el certificado del dominio.
