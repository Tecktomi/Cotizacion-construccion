# 🏗️ Cotizador de Construcción - V Región, Chile

Aplicación web simple y confiable para que los usuarios estimen cotizaciones de construcción de casas en la V región de Chile.

![Status](https://img.shields.io/badge/status-production%20ready-brightgreen)
![Platform](https://img.shields.io/badge/platform-netlify-00C7B7)
![License](https://img.shields.io/badge/license-private-red)

---

## 📋 Descripción

Esta aplicación permite a los usuarios cotizar proyectos de construcción definiendo:

- **Cimentación** (3 niveles: Básica, Media, Alta)
- **Obra Gruesa** (3 niveles: Básica, Media, Alta)
- **Terminaciones** (3 niveles: Básica, Media, Alta)
- **Ubicación** (Ciudades de la V Región)
- **Metros Cuadrados** a construir
- **Información de Contacto** (opcional)

Los cálculos se realizan mediante **Google Apps Script** conectado a **Google Sheets**, manteniendo las fórmulas privadas para evitar espionaje industrial.

---

## ✨ Características

- ✅ Interfaz simple y profesional que genera confianza
- ✅ Cotizaciones instantáneas calculadas en tiempo real
- ✅ Desglose detallado de costos por área
- ✅ Precio por metro cuadrado
- ✅ Botones de contacto directo (WhatsApp y Email)
- ✅ Responsive (funciona en móviles y escritorio)
- ✅ Fórmulas privadas protegidas en Google Sheets
- ✅ Fácil de modificar (acceso directo al Excel)
- ✅ Escalable (se pueden agregar más campos fácilmente)

---

## 🚀 Despliegue Rápido

### Paso 1: Configurar Google Apps Script

Sigue las instrucciones detalladas en:
👉 **[SETUP_GOOGLE_APPS_SCRIPT.md](SETUP_GOOGLE_APPS_SCRIPT.md)**

### Paso 2: Desplegar en Netlify

Sigue las instrucciones detalladas en:
👉 **[DEPLOY_NETLIFY.md](DEPLOY_NETLIFY.md)**

**Resumen rápido:**
```bash
# 1. Instalar dependencias
npm install

# 2. Construir para producción
npm run build

# 3. La carpeta 'dist' está lista para desplegar en Netlify
# Arrástrala a https://app.netlify.com/drop
```

---

## 🛠️ Desarrollo Local

### Requisitos

- Node.js 20 o superior
- npm o pnpm

### Instalación

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd cotizador-construccion

# Instalar dependencias
npm install

# Desarrollo local (modo dev)
npm run dev

# Construir para producción
npm run build
```

### Configuración

Edita la URL de Google Apps Script en:
```
/src/app/components/QuoteForm.tsx
Línea 53: const GOOGLE_SCRIPT_URL = "TU_URL_AQUI"
```

---

## 📂 Estructura del Proyecto

```
/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── Header.tsx           # Cabecera con logo y título
│   │   │   ├── Footer.tsx           # Pie con información de contacto
│   │   │   ├── QuoteForm.tsx        # Formulario principal
│   │   │   ├── QuoteResult.tsx      # Visualización de resultados
│   │   │   └── ui/                  # Componentes UI reutilizables
│   │   └── App.tsx                  # Componente principal
│   └── styles/                      # Estilos globales
├── netlify.toml                     # Configuración de Netlify
├── SETUP_GOOGLE_APPS_SCRIPT.md      # Guía de configuración backend
├── DEPLOY_NETLIFY.md                # Guía de despliegue
├── TROUBLESHOOTING.md               # Solución de problemas
└── README.md                        # Este archivo
```

---

## 🔧 Personalización

### Cambiar Información de Contacto

Edita `/src/app/components/Footer.tsx` y `/src/app/components/QuoteResult.tsx`:

```tsx
// Teléfono
<span>+56 9 6874 9874</span>

// Email
<span>zs8967l33t@gmail.com</span>

// WhatsApp (en QuoteResult.tsx)
const whatsappUrl = `https://wa.me/56968749874?text=...`;
```

### Agregar Más Ubicaciones

Edita `/src/app/components/QuoteForm.tsx` en la sección de ubicaciones:

```tsx
<SelectContent>
  <SelectItem value="valparaiso">Valparaíso</SelectItem>
  <SelectItem value="nueva-ciudad">Nueva Ciudad</SelectItem>
  {/* Agregar más aquí */}
</SelectContent>
```

También actualiza tu Google Sheet con los multiplicadores correspondientes.

### Cambiar Colores y Estilos

Los estilos principales están en `/src/styles/theme.css`

---

## 📊 Arquitectura

```
Usuario → Formulario Web → Google Apps Script → Google Sheets → Respuesta JSON → UI
```

**Ventajas de esta arquitectura:**
- ✅ Fórmulas protegidas (solo tú las ves)
- ✅ Fácil de modificar (editas el Excel directamente)
- ✅ Sin base de datos necesaria
- ✅ Escalable y económico (todo gratis)
- ✅ Backup automático en Google Drive

---

## 🔐 Seguridad

- ✅ **Headers de seguridad** configurados en `netlify.toml`
- ✅ **HTTPS automático** con certificado SSL gratuito de Netlify
- ✅ **Fórmulas privadas** protegidas en Google Sheets
- ✅ **No se expone información sensible** en el frontend
- ✅ **Sin almacenamiento local** de datos sensibles

---

## 🐛 Solución de Problemas

Si encuentras errores, consulta:
👉 **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)**

### Problemas Comunes

1. **"NetworkError" al generar cotización**
   - Verifica que Google Apps Script esté desplegado correctamente
   - Confirma que la URL sea la correcta
   - Lee TROUBLESHOOTING.md para más detalles

2. **Botón de WhatsApp no funciona**
   - Verifica el número en QuoteResult.tsx
   - Formato correcto: `56968749874` (sin +, espacios ni guiones)

3. **El email no se abre**
   - Verifica que el formato sea: `mailto:email@ejemplo.com`

---

## 📈 Próximas Mejoras (Roadmap)

Ideas para futuras versiones:

- [ ] Agregar más campos personalizables (pisos, baños, etc.)
- [ ] Sistema de descarga de cotizaciones en PDF
- [ ] Formulario de captura de leads mejorado
- [ ] Integración con Google Analytics
- [ ] Panel de administración para ver cotizaciones
- [ ] Modo oscuro
- [ ] Múltiples idiomas

---

## 🤝 Contribuciones

Este es un proyecto privado. No se aceptan contribuciones externas.

---

## 📝 Licencia

Privado - Todos los derechos reservados © 2026

---

## 📞 Contacto

Para consultas sobre la aplicación o servicios de construcción:

- 📱 **WhatsApp**: +56 9 6874 9874
- ✉️ **Email**: zs8967l33t@gmail.com
- 📍 **Ubicación**: V Región, Chile

---

## ⚡ Stack Tecnológico

- **Frontend**: React 18 + TypeScript
- **Estilos**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **Build Tool**: Vite
- **Hosting**: Netlify
- **Backend**: Google Apps Script
- **Base de Datos**: Google Sheets

---

**Construido con ❤️ para la V Región de Chile**
