# ✅ Checklist de Despliegue - Cotizador de Construcción

Usa esta lista para verificar que todo esté listo antes de desplegar a Netlify.

---

## 🔧 Configuración del Backend (Google Apps Script)

- [ ] **Google Sheet creado** con las hojas necesarias:
  - [ ] Hoja "Configuración" con costos por calidad
  - [ ] Hoja "Ubicaciones" con multiplicadores por ciudad
  - [ ] Hoja "Registros" para guardar las cotizaciones (opcional)

- [ ] **Código de Apps Script** pegado correctamente en el editor
  - [ ] Función `doGet(e)` implementada
  - [ ] Función `handleRequest(e)` implementada
  - [ ] Funciones de cálculo implementadas

- [ ] **Despliegue del Apps Script**:
  - [ ] Has ido a: Implementar → Nueva implementación
  - [ ] Tipo seleccionado: **Aplicación web**
  - [ ] "Ejecutar como": **Yo (tu email)**
  - [ ] "Quién tiene acceso": **Cualquier persona** ⚠️ **MUY IMPORTANTE**
  - [ ] Has copiado la URL de implementación

- [ ] **Permisos autorizados**:
  - [ ] Ejecutaste manualmente la función `doGet` desde el editor
  - [ ] Aceptaste todos los permisos solicitados
  - [ ] No hay errores de autorización

- [ ] **Prueba manual del script**:
  - [ ] Abriste la URL en el navegador con parámetros de prueba
  - [ ] Recibes un JSON válido como respuesta
  - [ ] El campo `success: true` aparece en la respuesta

---

## 💻 Configuración del Frontend

- [ ] **URL de Google Apps Script configurada**:
  - [ ] Editaste `/src/app/components/QuoteForm.tsx`
  - [ ] Línea 53: `GOOGLE_SCRIPT_URL` tiene tu URL correcta
  - [ ] La URL termina en `/exec`

- [ ] **Información de contacto actualizada**:
  - [ ] `/src/app/components/Footer.tsx`:
    - [ ] Teléfono correcto (línea 13)
    - [ ] Email correcto (línea 17)
    - [ ] Ubicación correcta (línea 21)
  
  - [ ] `/src/app/components/QuoteResult.tsx`:
    - [ ] Número de WhatsApp correcto (línea 46)
    - [ ] Email correcto (línea 53)

- [ ] **Prueba local**:
  - [ ] Has ejecutado `npm install` sin errores
  - [ ] Has ejecutado `npm run build` sin errores
  - [ ] La carpeta `dist` se ha creado correctamente

---

## 🚀 Configuración de Netlify

- [ ] **Cuenta de Netlify creada** (si es nueva)
  - URL: https://app.netlify.com

- [ ] **Método de despliegue elegido**:
  - [ ] Opción A: Conectado con Git (recomendado para updates automáticos)
  - [ ] Opción B: Deploy manual (drag & drop de carpeta `dist`)

### Si elegiste Opción A (Git):

- [ ] **Repositorio creado** en GitHub/GitLab/Bitbucket
- [ ] **Código subido al repositorio**
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  git remote add origin TU_URL_REPO
  git push -u origin main
  ```
- [ ] **Repositorio conectado a Netlify**:
  - [ ] Seleccionaste el repositorio en Netlify
  - [ ] Build command: `npm run build`
  - [ ] Publish directory: `dist`
  - [ ] Node version: 20 (auto-detectado de `.nvmrc`)

### Si elegiste Opción B (Manual):

- [ ] **Carpeta `dist` construida** con `npm run build`
- [ ] **Subida a Netlify** arrastrando la carpeta

---

## 🔍 Verificación Post-Despliegue

- [ ] **El sitio está en línea**:
  - [ ] URL de Netlify accesible (https://XXXXX.netlify.app)
  - [ ] La página principal carga correctamente
  - [ ] No hay errores 404

- [ ] **Funcionalidad básica**:
  - [ ] El formulario se muestra correctamente
  - [ ] Todos los campos son visibles
  - [ ] Los selects (dropdowns) funcionan
  - [ ] El diseño se ve bien en desktop
  - [ ] El diseño se ve bien en móvil (responsive)

- [ ] **Funcionalidad de cotización**:
  - [ ] Al llenar el formulario y hacer clic en "Generar Cotización"
  - [ ] El botón muestra "Generando cotización..." (loading)
  - [ ] Se recibe una respuesta después de 1-3 segundos
  - [ ] Se muestra la tarjeta de resultados con el precio
  - [ ] El desglose de costos aparece (si está configurado)
  - [ ] El precio por m² se calcula correctamente

- [ ] **Botones de contacto**:
  - [ ] Botón "Contactar por WhatsApp" abre WhatsApp con mensaje pre-llenado
  - [ ] Botón "Contactar por Email" abre el cliente de email
  - [ ] El mensaje incluye la información de la cotización

- [ ] **Pruebas en diferentes navegadores**:
  - [ ] Chrome/Edge
  - [ ] Firefox
  - [ ] Safari (si tienes Mac/iPhone)
  - [ ] Navegadores móviles

---

## 🎨 Optimizaciones Opcionales

- [ ] **Nombre de dominio personalizado**:
  - [ ] Cambiar subdominio en Netlify: `tu-nombre.netlify.app`
  - [ ] O conectar dominio propio: `tucotizador.cl`

- [ ] **SEO básico**:
  - [ ] Agregar título personalizado en `/index.html` (si existe)
  - [ ] Agregar meta description
  - [ ] Agregar Open Graph tags para redes sociales

- [ ] **Analytics** (opcional):
  - [ ] Google Analytics configurado
  - [ ] O Netlify Analytics activado

- [ ] **Favicon** (opcional):
  - [ ] Agregar favicon.ico en `/public`

---

## 🐛 Troubleshooting

Si algo no funciona, consulta estos archivos en orden:

1. **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Problemas comunes del Google Apps Script
2. **[SETUP_GOOGLE_APPS_SCRIPT.md](SETUP_GOOGLE_APPS_SCRIPT.md)** - Configuración del backend
3. **[DEPLOY_NETLIFY.md](DEPLOY_NETLIFY.md)** - Problemas de despliegue en Netlify

### Errores Más Comunes:

| Error | Solución Rápida |
|-------|----------------|
| "NetworkError when attempting to fetch" | Verifica que el Apps Script esté desplegado con acceso "Cualquier persona" |
| Página en blanco | Revisa la consola del navegador (F12) para ver errores |
| 404 Not Found | Verifica que `netlify.toml` y `/public/_redirects` existan |
| Botón cargando infinitamente | El Apps Script no está respondiendo, verifica la URL |
| WhatsApp no abre | Verifica el formato del número: `56912345678` (sin + ni espacios) |

---

## ✅ Checklist Final

Antes de compartir tu sitio con clientes:

- [ ] Todas las pruebas de funcionalidad pasan ✅
- [ ] Has probado generar al menos 3 cotizaciones diferentes
- [ ] Has verificado que las cotizaciones lleguen a tu Google Sheet (si configuraste registro)
- [ ] Los datos de contacto son correctos
- [ ] El sitio se ve profesional y genera confianza
- [ ] Has guardado la URL del sitio en un lugar seguro
- [ ] Has guardado las credenciales de Netlify
- [ ] Has hecho backup del código (Git o descarga local)

---

## 🎉 ¡Listo para Producción!

Una vez que todos los checkboxes estén marcados, tu cotizador está listo para ser usado por clientes reales.

### Próximos Pasos:

1. Comparte el link con amigos/familia para feedback inicial
2. Prueba con cotizaciones reales
3. Ajusta los precios en Google Sheets según necesites
4. Promociona tu cotizador en redes sociales
5. Considera agregar Google Analytics para ver cuántas visitas recibes

---

**Fecha de despliegue**: ___________________

**URL del sitio**: ___________________

**Última actualización del Google Sheet**: ___________________

**Notas adicionales**:
___________________________________________________________________________
___________________________________________________________________________
___________________________________________________________________________
