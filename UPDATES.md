# 🔄 Guía de Actualizaciones

Cómo actualizar tu cotizador después del despliegue inicial.

---

## 💰 Actualizar Precios o Fórmulas

**Lo más común:** Solo necesitas editar Google Sheets, sin tocar código.

### Paso 1: Edita tu Google Sheet

1. Abre tu Google Sheet
2. Ve a la hoja "Configuración"
3. Actualiza los valores de costos
4. **¡Listo!** Los cambios son inmediatos

**Ejemplo:**
```
Si antes tenías:
Cimentación Básica = $200/m²

Y lo cambias a:
Cimentación Básica = $250/m²

La próxima cotización usará $250/m² automáticamente
```

### No necesitas:
- ❌ Redesplegar en Netlify
- ❌ Modificar código
- ❌ Esperar propagación

---

## 📝 Actualizar Textos o Diseño

Si necesitas cambiar textos, colores, o diseño de la página.

### Archivos Comunes a Editar:

| Archivo | Qué Contiene |
|---------|--------------|
| `/src/app/components/Header.tsx` | Título y logo del sitio |
| `/src/app/components/Footer.tsx` | Información de contacto en el pie |
| `/src/app/components/QuoteForm.tsx` | Formulario y opciones |
| `/src/app/components/QuoteResult.tsx` | Visualización de resultados |
| `/src/styles/theme.css` | Colores y estilos globales |

### Proceso de Actualización:

#### Si usas Git (Recomendado):

```bash
# 1. Edita los archivos que necesites
# 2. Guarda los cambios
# 3. Sube a Git:
git add .
git commit -m "Actualización de textos"
git push

# 4. Netlify desplegará automáticamente (2-3 minutos)
```

#### Si usas Deploy Manual:

```bash
# 1. Edita los archivos que necesites
# 2. Construye nuevamente:
npm run build

# 3. Ve a Netlify → Deploys → Drag and drop
# 4. Arrastra la carpeta 'dist'
```

---

## 🆕 Agregar Nuevos Campos al Formulario

Por ejemplo, agregar "Número de Pisos" o "Tipo de Techo".

### Paso 1: Actualiza el Formulario (Frontend)

Edita `/src/app/components/QuoteForm.tsx`:

1. **Agrega el campo al estado** (línea ~36):
```tsx
const [formData, setFormData] = useState<FormData>({
  // ... campos existentes ...
  numeroPisos: "", // ← NUEVO
});
```

2. **Agrega el campo al interface** (línea ~11):
```tsx
interface FormData {
  // ... campos existentes ...
  numeroPisos: string; // ← NUEVO
}
```

3. **Agrega el campo visual** (línea ~160, en el form):
```tsx
<div className="space-y-2">
  <Label htmlFor="numeroPisos">
    Número de Pisos <span className="text-red-500">*</span>
  </Label>
  <Select value={formData.numeroPisos} onValueChange={(value) => handleChange("numeroPisos", value)}>
    <SelectTrigger id="numeroPisos">
      <SelectValue placeholder="Seleccione" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="1">1 Piso</SelectItem>
      <SelectItem value="2">2 Pisos</SelectItem>
      <SelectItem value="3">3+ Pisos</SelectItem>
    </SelectContent>
  </Select>
</div>
```

### Paso 2: Actualiza el Apps Script (Backend)

Edita tu código de Google Apps Script:

1. **Captura el nuevo parámetro**:
```javascript
function handleRequest(e) {
  const numeroPisos = e.parameter.numeroPisos || "1";
  
  // ... usa numeroPisos en tus cálculos ...
}
```

2. **Agrega la lógica en Google Sheets**:
   - Crea una nueva tabla con multiplicadores por número de pisos
   - Actualiza las fórmulas para incluir este factor

3. **Redesplegar el Apps Script**:
   - Implementar → Administrar implementaciones
   - Hacer clic en el lápiz ✏️
   - Nueva versión → Implementar

### Paso 3: Redesplegar el Frontend

```bash
npm run build
# Luego sube a Netlify (Git o manual)
```

---

## 🎨 Cambiar Colores del Sitio

Edita `/src/styles/theme.css`:

```css
@theme {
  /* Cambia estos colores */
  --color-primary: #3b82f6;     /* Azul principal */
  --color-secondary: #10b981;   /* Verde secundario */
  
  /* O usa colores de tu marca */
  --color-primary: #FF6B35;     /* Naranja */
  --color-secondary: #004E89;   /* Azul marino */
}
```

Luego reconstruye y redesplega.

---

## 📞 Actualizar Información de Contacto

### Teléfono y Email en el Footer:

Edita `/src/app/components/Footer.tsx`:

```tsx
// Línea 13
<span>+56 9 XXXX XXXX</span>  // ← Tu número

// Línea 17
<span>tumail@ejemplo.cl</span>  // ← Tu email
```

### WhatsApp en Resultados:

Edita `/src/app/components/QuoteResult.tsx`:

```tsx
// Línea 46
const whatsappUrl = `https://wa.me/56912345678?text=...`;
//                                   ↑
//                       Tu número sin + ni espacios
```

---

## 🌐 Agregar Más Ciudades/Ubicaciones

### En el Frontend:

Edita `/src/app/components/QuoteForm.tsx` (línea ~165):

```tsx
<SelectContent>
  <SelectItem value="valparaiso">Valparaíso</SelectItem>
  <SelectItem value="nueva-ciudad">Nueva Ciudad</SelectItem>  {/* ← NUEVA */}
  {/* ... más ciudades ... */}
</SelectContent>
```

### En Google Sheets:

1. Ve a la hoja "Ubicaciones"
2. Agrega una nueva fila:
   ```
   nueva-ciudad | 1.0 | Nueva Ciudad
   ```
3. Guarda

### Redesplegar:

```bash
npm run build
# Subir a Netlify
```

---

## 🔧 Cambiar la URL de Google Apps Script

Si por alguna razón necesitas cambiar la URL del backend:

1. Edita `/src/app/components/QuoteForm.tsx`
2. Línea 53:
   ```tsx
   const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/NUEVA_URL/exec";
   ```
3. Reconstruye y redesplega

---

## 📊 Agregar Google Analytics

### Paso 1: Obtén tu ID de Google Analytics

1. Ve a [Google Analytics](https://analytics.google.com)
2. Crea una propiedad
3. Copia tu ID (formato: `G-XXXXXXXXXX`)

### Paso 2: Agrega el script

Crea o edita `/index.html` (si no existe, créalo en la raíz):

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cotizador de Construcción - V Región Chile</title>
  
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

### Paso 3: Redesplegar

```bash
npm run build
# Subir a Netlify
```

---

## 🚨 Rollback (Deshacer Cambios)

Si algo sale mal después de una actualización:

### Con Git:

```bash
# Ver últimos commits
git log --oneline

# Volver a un commit anterior
git revert HEAD
git push

# O forzar rollback completo
git reset --hard COMMIT_ID
git push --force
```

### Con Netlify Manual:

1. Ve a Netlify → Deploys
2. Encuentra el deploy anterior que funcionaba
3. Haz clic en "..." → "Publish deploy"
4. Confirma

---

## 📝 Mejores Prácticas

### Antes de Actualizar:

1. ✅ **Haz backup** de Google Sheet (Archivo → Hacer copia)
2. ✅ **Prueba localmente** con `npm run build`
3. ✅ **Commit a Git** antes de cambios grandes
4. ✅ **Anota qué cambios hiciste** para futuro

### Después de Actualizar:

1. ✅ **Prueba la funcionalidad** principal (generar cotización)
2. ✅ **Verifica en móvil** que se vea bien
3. ✅ **Prueba los botones** de contacto
4. ✅ **Genera 2-3 cotizaciones** de prueba

---

## 📅 Actualizaciones Recomendadas

### Mensualmente:
- Revisar precios en Google Sheets
- Verificar que el sitio siga funcionando

### Cada 3-6 meses:
- Actualizar dependencias: `npm update`
- Revisar analytics si los tienes
- Considerar nuevas funcionalidades basadas en feedback

### Anualmente:
- Revisar diseño y hacer refresh visual
- Actualizar información de contacto si cambió
- Backup completo del proyecto

---

## 🆘 Necesitas Ayuda?

Si algo no funciona después de una actualización:

1. Revisa [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Verifica la consola del navegador (F12)
3. Revisa los logs de Netlify (Deploys → Deploy log)
4. Intenta hacer rollback a la versión anterior

---

**Última actualización**: Enero 2026
