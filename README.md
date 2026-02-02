# 🏗️ Cotizador de Construcción - V Región, Chile

Aplicación web para estimar cotizaciones de construcción de casas. Disponible en **dos versiones** con diferentes niveles de configurabilidad.

![Status](https://img.shields.io/badge/status-production%20ready-brightgreen)
![Platform](https://img.shields.io/badge/platform-netlify-00C7B7)
![Versions](https://img.shields.io/badge/versions-static%20%7C%20dynamic-blue)

---

## 🎯 Dos Versiones Disponibles

### 📌 Versión ESTÁTICA
Formulario tradicional con campos definidos en el código.

**✅ Ideal para:**
- Formulario estable que no cambiará frecuentemente
- Desarrolladores que prefieren control total del código
- Proyectos simples con pocos campos

**Archivos:**
- `/src/app/components/QuoteForm.tsx`
- [Ver documentación →](QUICKSTART.md)

---

### ⚡ Versión DINÁMICA (Recomendada)
Formulario 100% configurable desde Google Sheets sin tocar código.

**✅ Ideal para:**
- Agregar/modificar campos sin redesplegar
- Clientes que quieren autonomía de configuración
- Negocios en evolución con requisitos cambiantes

**Archivos:**
- `/src/app/components/DynamicQuoteForm.tsx`
- [Ver documentación →](README_DYNAMIC.md)

---

## 🤔 ¿Cuál Elegir?

| Tu Necesidad | Versión Recomendada |
|--------------|---------------------|
| "Quiero lanzar rápido y el formulario no cambiará mucho" | 📌 Estática |
| "Voy a agregar campos regularmente" | ⚡ Dinámica |
| "Mi cliente quiere poder configurar sin ayuda técnica" | ⚡ Dinámica |
| "Prefiero tener todo el código en el repositorio" | 📌 Estática |
| "Necesito experimentar con diferentes estructuras" | ⚡ Dinámica |
| "Múltiples personas van a modificar el formulario" | ⚡ Dinámica |

**📊 [Ver comparación detallada](COMPARISON.md)**

---

## 🚀 Inicio Rápido

### Versión Dinámica (Recomendada):

1. Configura Google Sheet con estructura de campos
2. Despliega Google Apps Script
3. Configura URL en `DynamicQuoteForm.tsx`
4. Deploy a Netlify

**Guía completa**: [QUICKSTART_DYNAMIC.md](QUICKSTART_DYNAMIC.md)

### Versión Estática:

1. Configura Google Apps Script
2. Ajusta campos en `QuoteForm.tsx` si es necesario
3. Deploy a Netlify

**Guía completa**: [QUICKSTART.md](QUICKSTART.md)

---

## ✨ Características Principales

### Comunes a Ambas Versiones:
- ✅ Cotizaciones instantáneas
- ✅ Desglose detallado de costos
- ✅ Precio por metro cuadrado
- ✅ Botones de contacto (WhatsApp y Email)
- ✅ Responsive (móvil y desktop)
- ✅ Fórmulas privadas en Google Sheets
- ✅ Diseño profesional y confiable
- ✅ $0/mes en hosting (tiers gratuitos)

### Exclusivo de Versión Dinámica:
- ✅ Agregar/eliminar campos sin código
- ✅ Modificar opciones sin redesplegar
- ✅ Configuración desde Excel/Sheets
- ✅ Ideal para clientes no técnicos
- ✅ Escalable hasta 50+ campos fácilmente

---

## 📂 Estructura del Proyecto

```
/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── QuoteForm.tsx              # 📌 Versión ESTÁTICA
│   │   │   ├── DynamicQuoteForm.tsx       # ⚡ Versión DINÁMICA
│   │   │   ├── QuoteResult.tsx            # Resultados (compartido)
│   │   │   ├── Header.tsx                 # Cabecera
│   │   │   ├── Footer.tsx                 # Pie de página
│   │   │   └── ui/                        # Componentes UI
│   │   └── App.tsx                        # App principal
│   └── styles/                            # Estilos
│
├── Documentación:
│   ├── README.md                          # Este archivo
│   ├── COMPARISON.md                      # 📊 Comparación de versiones
│   │
│   ├── Versión Estática:
│   │   ├── QUICKSTART.md                  # Inicio rápido
│   │   ├── SETUP_GOOGLE_APPS_SCRIPT.md    # Setup backend
│   │   └── TROUBLESHOOTING.md             # Solución de problemas
│   │
│   ├── Versión Dinámica:
│   │   ├── QUICKSTART_DYNAMIC.md          # Inicio rápido
│   │   ├── README_DYNAMIC.md              # Info completa
│   │   ├── SETUP_GOOGLE_SHEETS_DYNAMIC.md # Setup completo
│   │   └── GOOGLE_APPS_SCRIPT_DYNAMIC.gs  # Código del script
│   │
│   └── Deployment:
│       ├── DEPLOY_NETLIFY.md              # Guía de despliegue
│       ├── DEPLOYMENT_CHECKLIST.md        # Checklist
│       └── UPDATES.md                     # Cómo actualizar
│
└── netlify.toml                           # Config de Netlify
```

---

## 🔧 Cambiar de Versión

Ambas versiones están incluidas. Para cambiar:

### Usar Versión Estática:
```typescript
// En /src/app/App.tsx
import { QuoteForm } from "@/app/components/QuoteForm";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <QuoteForm />  {/* ← Versión Estática */}
      </main>
      <Footer />
    </div>
  );
}
```

### Usar Versión Dinámica:
```typescript
// En /src/app/App.tsx
import { DynamicQuoteForm } from "@/app/components/DynamicQuoteForm";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <DynamicQuoteForm />  {/* ← Versión Dinámica */}
      </main>
      <Footer />
    </div>
  );
}
```

Luego: `npm run build` y redesplegar.

---

## 💡 Ejemplo de Uso: Versión Dinámica

### Agregar Campo "Número de Pisos"

**Sin código, solo en Google Sheets:**

1. Ve a la hoja `variables_formulario`
2. Agrega una fila:
   ```
   pisos | select | Número de Pisos | 1|Un piso,2|Dos pisos,3|Tres pisos | SI
   ```
3. Actualiza fórmulas en hoja `calculo`
4. **¡Listo!** Recarga la web y el campo aparece

**Tiempo: 2 minutos | Sin redespliegue**

---

## 📊 Arquitectura

### Flujo de Datos:

```
Usuario → Formulario Web → Google Apps Script → Google Sheets → Respuesta JSON → UI
```

**Ventajas:**
- ✅ Fórmulas protegidas (privadas en Sheets)
- ✅ Modificables sin código (en versión dinámica)
- ✅ Sin base de datos necesaria
- ✅ Backup automático en Google Drive
- ✅ Escalable y económico ($0)

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Versión |
|------|------------|---------|
| Frontend | React | 18.3.1 |
| Language | TypeScript | Latest |
| Styling | Tailwind CSS | 4.1.12 |
| UI Components | Radix UI | Latest |
| Build Tool | Vite | 6.3.5 |
| Backend | Google Apps Script | N/A |
| Database | Google Sheets | N/A |
| Hosting | Netlify | Free Tier |

---

## 💰 Costos

### Producción:
- **Netlify Free Tier**: $0/mes
  - 100 GB bandwidth
  - SSL incluido
  - Más que suficiente
  
- **Google Apps Script**: $0/mes
  - Hasta 20,000 requests/día
  - Suficiente para ~500 cotizaciones/día

**Total mensual: $0 USD**

### Opcional:
- Dominio propio (.cl): ~$15.000 CLP/año

---

## 🔐 Seguridad

- ✅ HTTPS automático (SSL de Netlify)
- ✅ Headers de seguridad configurados
- ✅ Fórmulas privadas (no expuestas al frontend)
- ✅ Sin credenciales en el código
- ✅ CORS manejado por Google Apps Script

---

## 📞 Información de Contacto

Configurada en:
- `/src/app/components/Footer.tsx`
- `/src/app/components/QuoteResult.tsx`

**Actual:**
- 📱 WhatsApp: +56 9 6874 9874
- ✉️ Email: zs8967l33t@gmail.com
- 📍 Ubicación: V Región, Chile

---

## 🚀 Despliegue

### Local (Desarrollo):
```bash
npm install
npm run dev
```

### Producción (Netlify):
```bash
npm run build
# Arrastra carpeta 'dist' a https://app.netlify.com/drop
```

**Documentación completa**: [DEPLOY_NETLIFY.md](DEPLOY_NETLIFY.md)

---

## 📚 Documentación

### Empezar:
1. **[COMPARISON.md](COMPARISON.md)** - ¿Qué versión elegir?
2. **[QUICKSTART_DYNAMIC.md](QUICKSTART_DYNAMIC.md)** - Inicio rápido (Dinámica)
3. **[QUICKSTART.md](QUICKSTART.md)** - Inicio rápido (Estática)

### Configuración:
- **[SETUP_GOOGLE_SHEETS_DYNAMIC.md](SETUP_GOOGLE_SHEETS_DYNAMIC.md)** - Setup completo versión dinámica
- **[SETUP_GOOGLE_APPS_SCRIPT.md](SETUP_GOOGLE_APPS_SCRIPT.md)** - Setup versión estática

### Deployment:
- **[DEPLOY_NETLIFY.md](DEPLOY_NETLIFY.md)** - Guía de despliegue
- **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Checklist completo

### Soporte:
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Solución de problemas
- **[UPDATES.md](UPDATES.md)** - Cómo actualizar el sitio

---

## 🎯 Roadmap

- [x] Versión estática funcional
- [x] Versión dinámica con config desde Sheets
- [x] Documentación completa
- [x] Deploy a Netlify
- [ ] Multi-idioma
- [ ] Exportar cotizaciones a PDF
- [ ] Dashboard de administración
- [ ] Sistema de notificaciones

---

## ❓ FAQ

### ¿Puedo cambiar entre versiones después?
Sí, solo cambia el import en `App.tsx` y redesplega.

### ¿Necesito conocimientos de programación?
- **Versión Estática**: Sí (React/TypeScript)
- **Versión Dinámica**: No (solo Excel/Sheets)

### ¿Los cambios en Google Sheets son instantáneos?
- **Fórmulas y precios**: Sí, inmediatos
- **Campos (versión dinámica)**: Sí, solo recargar la página

### ¿Puedo proteger mis fórmulas?
Sí, ambas versiones mantienen las fórmulas privadas en Google Sheets.

### ¿Cuántas cotizaciones puedo generar?
Ilimitadas dentro de los límites gratuitos de Google (20,000 requests/día).

---

## 🤝 Contribuciones

Este es un proyecto privado. No se aceptan contribuciones externas.

---

## 📝 Licencia

Privado - Todos los derechos reservados © 2026

---

## 🎉 Créditos

- **Frontend**: React + Tailwind CSS + Radix UI
- **Backend**: Google Apps Script
- **Hosting**: Netlify
- **Diseño**: Sistema personalizado para generar confianza

---

**Construido con ❤️ para la V Región de Chile**

---

## 📧 Contacto

Para consultas sobre la aplicación o servicios de construcción:

- 📱 **WhatsApp**: +56 9 6874 9874
- ✉️ **Email**: zs8967l33t@gmail.com
- 📍 **Ubicación**: V Región, Chile

---

**¿Listo para empezar?**

👉 **Versión Dinámica** (Recomendada): [QUICKSTART_DYNAMIC.md](QUICKSTART_DYNAMIC.md)

👉 **Versión Estática**: [QUICKSTART.md](QUICKSTART.md)

👉 **Comparar ambas**: [COMPARISON.md](COMPARISON.md)
