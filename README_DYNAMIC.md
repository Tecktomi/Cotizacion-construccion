# 🏗️ Cotizador de Construcción - Versión Dinámica

Sistema de cotización completamente configurable desde Google Sheets, sin necesidad de modificar código.

![Status](https://img.shields.io/badge/status-production%20ready-brightgreen)
![Platform](https://img.shields.io/badge/platform-netlify-00C7B7)
![Dynamic](https://img.shields.io/badge/config-google%20sheets-34A853)

---

## ✨ ¿Qué es esto?

Un cotizador web que **lee su configuración desde Google Sheets**, permitiéndote:

- ✅ **Agregar/eliminar campos** sin tocar código
- ✅ **Cambiar opciones** (ubicaciones, calidades, etc.) en segundos
- ✅ **Ajustar fórmulas** de cálculo directamente en Excel
- ✅ **Proteger tu lógica** de negocio (las fórmulas quedan privadas)
- ✅ **Actualizar precios** en tiempo real
- ✅ **Escalar el formulario** según tus necesidades

Todo desde tu Google Sheet, sin redesplegar ni programar.

---

## 🎯 Características Principales

### Formulario 100% Dinámico

El formulario se construye automáticamente desde Google Sheets:

```
Google Sheets (variables_formulario) 
    ↓
Tu sitio web lee la configuración
    ↓
Formulario generado dinámicamente
```

### Cálculo como "Caja Negra"

```
Usuario llena formulario
    ↓
Datos enviados a Google Apps Script
    ↓
Script escribe valores en hoja "calculo"
    ↓
Fórmulas de Excel calculan resultado
    ↓
Solo el resultado final se envía al usuario
```

Tus fórmulas permanecen privadas y seguras.

---

## 📋 Estructura de Google Sheets

Tu documento necesita 3 hojas:

### 1. variables_formulario
Define qué campos aparecen en el formulario:

| variable | tipo | label | opciones | requerido |
|----------|------|-------|----------|-----------|
| metrosCuadrados | number | Metros Cuadrados | | SI |
| ubicacion | select | Ubicación | valparaiso\|Valparaíso,vina\|Viña | SI |
| cimentacion | select | Cimentación | basica\|Básica,media\|Media,alta\|Alta | SI |

### 2. calculo
Contiene tus fórmulas de cálculo:

```
     A                    B              C                D
1  | RESULTADO         |              | INPUTS        |
2  | Cotización:       | =B4+B5+B6    | metrosCuadrados | (valor)
3  |                   |              | cimentacion     | (valor)
4  | Cimentación:      | =FORMULA()   | obraGruesa      | (valor)
5  | Obra Gruesa:      | =FORMULA()   | terminaciones   | (valor)
6  | Terminaciones:    | =FORMULA()   | ubicacion       | (valor)
```

### 3. registros (opcional)
Guarda historial de cotizaciones automáticamente.

---

## 🚀 Inicio Rápido

### Paso 1: Configurar Google Sheet (10 min)

1. **Crea un nuevo Google Sheet**
2. **Crea 2 hojas**: `variables_formulario` y `calculo`
3. **Sigue la guía completa**: [SETUP_GOOGLE_SHEETS_DYNAMIC.md](SETUP_GOOGLE_SHEETS_DYNAMIC.md)

### Paso 2: Configurar Apps Script (5 min)

1. En tu Sheet: **Extensiones → Apps Script**
2. Copia el código de `/GOOGLE_APPS_SCRIPT_DYNAMIC.gs`
3. Cambia el `SPREADSHEET_ID` en línea 10
4. Despliega como **Aplicación web** (acceso: "Cualquier persona")
5. Copia la URL del script

### Paso 3: Configurar la Web (2 min)

1. Edita `/src/app/components/DynamicQuoteForm.tsx`
2. Línea 36: Pega tu URL de Google Apps Script
3. Construye: `npm run build`

### Paso 4: Desplegar a Netlify (5 min)

Arrastra la carpeta `dist` a https://app.netlify.com/drop

**Total: ~20 minutos** ⏱️

---

## 📝 Ejemplos de Uso

### Agregar un Nuevo Campo

**Sin código, solo en Google Sheets:**

1. Ve a `variables_formulario`
2. Agrega una fila:
   ```
   pisos | select | Número de Pisos | 1|Un piso,2|Dos pisos,3|Tres pisos | SI
   ```
3. Actualiza tus fórmulas en la hoja `calculo`
4. **¡Listo!** El campo aparece automáticamente

### Cambiar Ubicaciones

1. Ve a `variables_formulario`
2. Edita la columna "opciones" de la fila "ubicacion":
   ```
   ANTES: valparaiso|Valparaíso,vina|Viña del Mar
   DESPUÉS: valparaiso|Valparaíso,vina|Viña del Mar,concon|Con Con
   ```
3. **¡Listo!** La nueva ciudad aparece instantáneamente

### Actualizar Precios

1. Ve a la hoja `calculo`
2. Modifica tus tablas de costos o las fórmulas
3. **¡Listo!** Los nuevos precios se aplican inmediatamente

---

## 🎨 Diseño

- **Simple y limpio** - Sin saturación visual
- **Profesional** - Genera confianza
- **Responsive** - Funciona en móvil y desktop
- **Adaptativo** - El formulario crece según los campos configurados

---

## 🔐 Seguridad

- ✅ **Fórmulas privadas**: Nunca se exponen al usuario
- ✅ **Caja negra**: Solo se envía el resultado final
- ✅ **HTTPS**: Comunicación encriptada
- ✅ **Sin credenciales en frontend**: Todo está en el servidor de Google

---

## 💰 Costos

**$0 USD/mes** en tiers gratuitos:

- Netlify Free: Hosting + SSL
- Google Apps Script: Hasta 20,000 requests/día gratis
- Google Sheets: Gratis

---

## 📚 Documentación

| Documento | Descripción |
|-----------|-------------|
| [SETUP_GOOGLE_SHEETS_DYNAMIC.md](SETUP_GOOGLE_SHEETS_DYNAMIC.md) | **⭐ START HERE** - Configuración paso a paso de Google Sheets |
| [GOOGLE_APPS_SCRIPT_DYNAMIC.gs](GOOGLE_APPS_SCRIPT_DYNAMIC.gs) | Código del Apps Script con comentarios |
| [DEPLOY_NETLIFY.md](DEPLOY_NETLIFY.md) | Cómo desplegar en Netlify |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | Solución de problemas |

---

## 🆚 Diferencia con la Versión Estática

| Característica | Versión Estática | Versión Dinámica |
|----------------|------------------|------------------|
| Campos del formulario | Hard-coded en React | Configurables en Google Sheets |
| Opciones (ubicaciones, etc.) | Hard-coded | Editables en Sheets |
| Fórmulas de cálculo | En Apps Script | En Excel (privadas) |
| Agregar campo nuevo | Editar código + redesplegar | Solo editar Sheets |
| Cambiar precios | Editar Sheets | Editar Sheets |
| Flexibilidad | Limitada | Total |

**Recomendación**: Usa la versión dinámica si:
- Planeas agregar/cambiar campos frecuentemente
- Quieres que otras personas puedan configurar el formulario
- Necesitas máxima flexibilidad sin tocar código

---

## 🔄 Workflow de Actualización

```
┌─────────────────────────────────────┐
│  Editas Google Sheets               │
│  (campos, opciones, fórmulas)       │
└────────────────┬────────────────────┘
                 │
                 │ Cambios instantáneos
                 ↓
┌─────────────────────────────────────┐
│  Usuario visita tu sitio            │
│  Formulario se genera dinámicamente │
└─────────────────────────────────────┘

NO requiere:
❌ Redesplegar en Netlify
❌ Modificar código
❌ Conocimientos técnicos
```

---

## 🎯 Casos de Uso

### Empresa de Construcción
- Formulario para cotizar casas
- Campos configurables según tipo de proyecto
- Precios actualizables sin programador

### Freelancer
- Sistema flexible que se adapta a cada cliente
- Cambiar campos según proyecto actual
- Fórmulas privadas protegidas

### Agencia
- Entregar sistema configurable al cliente
- Cliente puede modificar sin ayuda técnica
- Mantenimiento $0

---

## 🚀 Roadmap Futuro

- [ ] Multi-idioma configurable desde Sheets
- [ ] Múltiples hojas de cálculo (por tipo de proyecto)
- [ ] Dashboard de admin en la misma web
- [ ] Exportar cotizaciones a PDF
- [ ] Validaciones personalizadas configurables

---

## 📞 Soporte

Consulta la documentación en orden:

1. [SETUP_GOOGLE_SHEETS_DYNAMIC.md](SETUP_GOOGLE_SHEETS_DYNAMIC.md) - Configuración inicial
2. [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Problemas comunes
3. Revisar logs en Google Apps Script (Executions)
4. Revisar consola del navegador (F12)

---

## 🎉 Ventajas Clave

### Para Ti (Desarrollador/Dueño)
- ✅ **Menos mantenimiento**: Todo se configura desde Sheets
- ✅ **Escalable**: Agrega campos sin límite
- ✅ **Seguro**: Fórmulas privadas
- ✅ **Rápido**: Cambios en segundos

### Para Tu Cliente
- ✅ **Autonomía**: Puede configurar sin ayuda técnica
- ✅ **Flexible**: Se adapta a sus necesidades cambiantes
- ✅ **Económico**: Sin costos de mantenimiento
- ✅ **Familiar**: Usa Excel/Sheets que ya conoce

---

## 📊 Stack Tecnológico

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Google Apps Script
- **Base de Datos**: Google Sheets
- **Hosting**: Netlify
- **Configuración**: 100% Google Sheets

---

**Construido con ❤️ para máxima flexibilidad**

---

**¿Listo para empezar?** → [SETUP_GOOGLE_SHEETS_DYNAMIC.md](SETUP_GOOGLE_SHEETS_DYNAMIC.md)
