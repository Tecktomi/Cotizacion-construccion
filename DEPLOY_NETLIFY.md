# 🚀 Guía de Despliegue en Netlify

Esta guía te ayudará a desplegar tu cotizador de construcción en Netlify de forma rápida y sencilla.

---

## 📋 Requisitos Previos

- ✅ Tu Google Apps Script debe estar desplegado y funcionando
- ✅ La URL del Google Apps Script debe estar configurada en `/src/app/components/QuoteForm.tsx` (línea 53)
- ✅ Cuenta de Netlify (gratuita) - [Crear cuenta](https://app.netlify.com/signup)

---

## 🎯 Método 1: Despliegue desde Git (Recomendado)

Este método te permite actualizar automáticamente tu sitio cada vez que hagas cambios.

### Paso 1: Preparar tu repositorio

1. **Crea un repositorio en GitHub/GitLab/Bitbucket**
2. **Sube tu código:**

```bash
git init
git add .
git commit -m "Initial commit - Cotizador de construcción"
git branch -M main
git remote add origin TU_URL_DEL_REPOSITORIO
git push -u origin main
```

### Paso 2: Conectar con Netlify

1. Ve a [Netlify](https://app.netlify.com)
2. Haz clic en **"Add new site" → "Import an existing project"**
3. Selecciona tu proveedor de Git (GitHub, GitLab, o Bitbucket)
4. Autoriza a Netlify para acceder a tus repositorios
5. Selecciona el repositorio de tu cotizador

### Paso 3: Configurar el Build

Netlify debería detectar automáticamente la configuración, pero verifica:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 20 (detectado automáticamente desde `.nvmrc`)

### Paso 4: Desplegar

1. Haz clic en **"Deploy site"**
2. Espera 2-3 minutos mientras Netlify construye tu sitio
3. ¡Listo! Tu sitio estará en una URL como: `https://random-name-123456.netlify.app`

---

## 🎯 Método 2: Despliegue Manual (Deploy Drag & Drop)

Este método es más rápido pero requiere redesplegar manualmente cada vez que hagas cambios.

### Paso 1: Construir localmente

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
npm run build
```

Esto creará una carpeta `dist` con los archivos listos para producción.

### Paso 2: Desplegar en Netlify

**Opción A - Drag & Drop:**
1. Ve a [Netlify Drop](https://app.netlify.com/drop)
2. Arrastra la carpeta `dist` a la zona indicada
3. ¡Listo! Tu sitio estará disponible inmediatamente

**Opción B - Desde el Dashboard:**
1. Ve a [Netlify](https://app.netlify.com)
2. Haz clic en **"Add new site" → "Deploy manually"**
3. Arrastra la carpeta `dist`
4. Espera a que termine la subida

---

## 🎨 Personalizar el Dominio

### Cambiar el subdominio de Netlify (gratis)

1. En tu sitio de Netlify, ve a **"Site configuration" → "Domain management"**
2. Haz clic en **"Options" → "Edit site name"**
3. Cambia el nombre a algo como: `cotizador-construccion-valparaiso`
4. Tu URL será: `https://cotizador-construccion-valparaiso.netlify.app`

### Usar tu propio dominio

1. Compra un dominio (ej: `cotizadorconstruccion.cl`)
2. En Netlify, ve a **"Domain management" → "Add a domain"**
3. Ingresa tu dominio
4. Sigue las instrucciones para configurar los DNS
5. Netlify te dará un certificado SSL gratuito automáticamente

---

## ⚙️ Configuración Adicional (Opcional)

### Variables de Entorno

Si en el futuro quieres hacer la URL del Google Apps Script configurable sin editar el código:

1. En Netlify, ve a **"Site configuration" → "Environment variables"**
2. Agrega una variable: `VITE_GOOGLE_SCRIPT_URL` con tu URL
3. En el código, usa: `import.meta.env.VITE_GOOGLE_SCRIPT_URL`
4. Redeploea el sitio

### Configurar Notificaciones

1. En Netlify, ve a **"Site configuration" → "Notifications"**
2. Puedes configurar notificaciones para:
   - Cuando el deploy es exitoso
   - Cuando el deploy falla
   - Alertas de formularios (si decides agregar un formulario nativo de Netlify)

---

## 🔧 Troubleshooting

### Error: "Deploy failed"

**Solución:**
- Revisa los logs en Netlify (pestaña "Deploys" → clic en el deploy fallido)
- Errores comunes:
  - Falta `npm install` localmente
  - Dependencias desactualizadas
  - Errores de TypeScript

**Comando para verificar localmente:**
```bash
npm run build
```

Si falla localmente, primero arréglalo antes de desplegar.

### Error: "Page not found" (404) al navegar

**Solución:**
- Ya está configurado en `netlify.toml` con redirects
- Si persiste, verifica que el archivo `netlify.toml` esté en la raíz del proyecto

### El sitio carga pero las cotizaciones no funcionan

**Solución:**
1. Verifica que tu Google Apps Script esté funcionando:
   - Abre la URL del script directamente en el navegador
   - Debería mostrar un JSON de respuesta
2. Revisa los errores en la consola del navegador (F12)
3. Confirma que la URL en `QuoteForm.tsx` sea correcta

---

## 📊 Monitorear tu Sitio

### Analytics (gratis en Netlify)

1. Ve a **"Site configuration" → "Analytics"**
2. Activa Netlify Analytics (puede tener costo mínimo)
3. O integra Google Analytics gratis:
   - Agrega el script de Google Analytics en `/index.html`

### Formularios

Si decides capturar leads sin Google Sheets:

1. Netlify tiene formularios integrados (gratuitos hasta 100 envíos/mes)
2. Ve a **"Site configuration" → "Forms"**
3. Agrega `netlify` y `name="contact"` a tu formulario HTML

---

## 🔄 Actualizar tu Sitio

### Con Git (Método 1):
```bash
# Haz tus cambios en el código
git add .
git commit -m "Descripción de cambios"
git push
# Netlify detectará el cambio y desplegará automáticamente
```

### Manual (Método 2):
```bash
npm run build
# Luego arrastra la nueva carpeta dist a Netlify
```

---

## 📱 Optimizaciones Adicionales

### Performance

Tu sitio ya está optimizado con:
- ✅ Caché de assets configurado (1 año)
- ✅ Headers de seguridad
- ✅ SPA redirects configurados
- ✅ Compresión automática de Netlify

### SEO Básico

Edita `/index.html` para agregar:
```html
<title>Cotizador de Construcción - V Región Chile</title>
<meta name="description" content="Cotiza tu proyecto de construcción al instante. Calcula cimentación, obra gruesa y terminaciones en la V Región, Chile.">
```

---

## 💰 Costos

### Netlify Free (Starter)
- ✅ Hosting ilimitado
- ✅ Builds ilimitados
- ✅ SSL gratuito
- ✅ 100 GB bandwidth/mes
- ✅ Más que suficiente para este proyecto

### Si creces mucho:
- Netlify Pro: $19/mes (1 TB bandwidth, más builds concurrentes)

---

## 🎉 ¡Listo!

Tu cotizador de construcción ahora está en línea y accesible desde cualquier lugar del mundo.

### URLs importantes:
- **Tu sitio**: Lo encontrarás en el dashboard de Netlify
- **Panel de control**: https://app.netlify.com
- **Documentación**: https://docs.netlify.com

### Próximos pasos recomendados:
1. Cambia el nombre del sitio por algo memorable
2. Prueba que las cotizaciones funcionen en producción
3. Comparte el link con tus primeros usuarios
4. Configura Google Analytics si quieres métricas

---

**¿Necesitas ayuda?** Revisa:
- 📖 [SETUP_GOOGLE_APPS_SCRIPT.md](/SETUP_GOOGLE_APPS_SCRIPT.md) - Configuración del backend
- 🔧 [TROUBLESHOOTING.md](/TROUBLESHOOTING.md) - Solución de problemas comunes
- 🌐 [Docs de Netlify](https://docs.netlify.com)
