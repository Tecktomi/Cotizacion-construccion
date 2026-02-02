# 🚀 Pasos Rápidos para Resolver el Error

## 🎯 Problema Actual
```
Error al cargar configuración: Error: Error al cargar la configuración del formulario
```

---

## ✅ Solución Rápida (5 minutos)

### Paso 1: Actualizar Google Apps Script

1. Abre tu Google Apps Script
2. **Reemplaza TODO el código** con el actualizado de `/GOOGLE_APPS_SCRIPT_DYNAMIC.gs`
3. **Guarda** (Ctrl+S)

### Paso 2: Ejecutar Test de Diagnóstico

1. En el menú de funciones (arriba), selecciona: `testSpreadsheetAccess`
2. Click en **Ejecutar** ▶️
3. Si pide permisos, **autoriza** (ver instrucciones abajo)
4. Ve a **Ejecución** (panel izquierdo) y mira los logs

**¿Qué debería decir?**
```
✅ Spreadsheet abierto: [nombre]
✅ Hoja "variables_formulario" encontrada
✅ Hoja "calculo" encontrada
```

**Si ves errores aquí**, ese es el problema. Anota el mensaje de error.

### Paso 3: Probar la URL Directamente

Pega esto en tu navegador (tu URL):
```
https://script.google.com/macros/s/AKfycbzs5rhqUEwY0dk7ZNagtaF8meoUEk5NsYtC6KnTv68_Ac93oJ30v_2pn8XpTLCH-UsasA/exec?action=getConfig
```

**¿Qué deberías ver?**

✅ **Funciona**: JSON con tus campos
```json
{
  "success": true,
  "fields": [...],
  "message": "Configuración cargada exitosamente"
}
```

❌ **No funciona**: Página en blanco o error

---

## 🔧 Problemas Comunes

### Error 1: "La hoja 'variables_formulario' no existe"

**Causa**: El nombre de la hoja no es exacto

**Solución**:
1. Abre tu Google Sheet
2. Verifica que la hoja se llame EXACTAMENTE: `variables_formulario`
3. Sin espacios extra, sin mayúsculas diferentes
4. Renombra si es necesario

### Error 2: "La hoja 'variables_formulario' está vacía"

**Causa**: No hay datos o están en las filas incorrectas

**Solución**:
1. Los encabezados deben estar en **fila 1**:
   ```
   variable | tipo | label | opciones | requerido
   ```
2. Los datos deben empezar en **fila 2**:
   ```
   metrosCuadrados | number | Metros Cuadrados | | SI
   ```

### Error 3: Página en Blanco al Probar la URL

**Causa**: No has autorizado los permisos

**Solución**:
1. En Apps Script, ejecuta `testSpreadsheetAccess`
2. Aparecerá: "Se necesita autorización"
3. Click en **Revisar permisos**
4. Selecciona tu cuenta
5. Click en **Avanzado**
6. Click en **Ir a [proyecto] (no seguro)**
7. Click en **Permitir**
8. Vuelve a probar la URL

### Error 4: La URL no Funciona

**Causa**: El script no está desplegado correctamente

**Solución**:
1. En Apps Script: **Implementar → Administrar implementaciones**
2. ¿Hay alguna implementación? Si NO:
   - **Implementar → Nueva implementación**
   - Tipo: **Aplicación web**
   - Ejecutar como: **Yo**
   - Acceso: **Cualquier persona** ⚠️
   - Click en **Implementar**
   - **Copia la nueva URL**
3. Si SÍ hay una implementación pero no funciona:
   - Click en el **lápiz** ✏️
   - En "Versión nueva", escribe "v2"
   - Click en **Implementar**
   - Verifica que diga: "Quién tiene acceso: Cualquier persona"

---

## 📋 Estructura Mínima de Google Sheets

### Hoja 1: variables_formulario

**Copia esto exactamente:**

| A | B | C | D | E |
|---|---|---|---|---|
| variable | tipo | label | opciones | requerido |
| metrosCuadrados | number | Metros Cuadrados a Construir | | SI |

**IMPORTANTE:**
- Fila 1 = encabezados
- Fila 2 = primer dato
- No dejes filas vacías

### Hoja 2: calculo

Crea una hoja vacía llamada `calculo` por ahora.

---

## 🎯 Checklist Express

Verifica esto en ORDEN:

1. [ ] ✅ Google Sheet tiene hoja `variables_formulario`
2. [ ] ✅ Fila 1 tiene encabezados exactos
3. [ ] ✅ Fila 2 tiene al menos un campo
4. [ ] ✅ Google Sheet tiene hoja `calculo`
5. [ ] ✅ SPREADSHEET_ID en el script es correcto
6. [ ] ✅ Ejecuté `testSpreadsheetAccess` sin errores
7. [ ] ✅ Autoricé los permisos cuando lo pidió
8. [ ] ✅ El script está desplegado como "Aplicación web"
9. [ ] ✅ La configuración de despliegue dice "Cualquier persona"
10. [ ] ✅ La URL manual funciona en el navegador

---

## 🆘 Si Aún No Funciona

Ejecuta esto en Apps Script:

1. Función: `testSpreadsheetAccess`
2. Copia TODO el log
3. Envíamelo

Y también:
1. Screenshot de tu hoja `variables_formulario`
2. El mensaje de error exacto que ves

Con eso puedo decirte exactamente qué está mal.

---

## 💡 Tip Pro

Mientras tanto, la app ya debería funcionar con la **configuración de fallback**.

El formulario se mostrará con campos predeterminados aunque no se conecte a Google Sheets. Así puedes probar la interfaz mientras resuelves el problema de conexión.

---

**Siguiente paso**: Ejecuta `testSpreadsheetAccess` y dime qué dice en los logs.
