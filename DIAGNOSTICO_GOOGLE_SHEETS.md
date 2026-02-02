# 🔍 Diagnóstico de Problemas - Google Apps Script

Sigue estos pasos para identificar qué está fallando.

---

## ✅ Paso 1: Verificar URL del Script

Tu URL actual es:
```
https://script.google.com/macros/s/AKfycbzs5rhqUEwY0dk7ZNagtaF8meoUEk5NsYtC6KnTv68_Ac93oJ30v_2pn8XpTLCH-UsasA/exec
```

### Prueba manual:
Pega esta URL en tu navegador:
```
https://script.google.com/macros/s/AKfycbzs5rhqUEwY0dk7ZNagtaF8meoUEk5NsYtC6KnTv68_Ac93oJ30v_2pn8XpTLCH-UsasA/exec?action=getConfig
```

**¿Qué deberías ver?**
✅ Un JSON con tus campos configurados
❌ Error o página en blanco

---

## ✅ Paso 2: Verificar Spreadsheet ID

Tu SPREADSHEET_ID actual es:
```
1jglz1wZO-zW5guB4-uyVd8zId97-D06-UMS8JtHmtzc
```

### Verifica que sea correcto:
1. Abre tu Google Sheet
2. Mira la URL: `https://docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit`
3. El ID debe coincidir exactamente

---

## ✅ Paso 3: Verificar Estructura de Google Sheets

### Hoja: variables_formulario

**IMPORTANTE**: Los encabezados deben estar EXACTAMENTE en la fila 1.

Debe verse así (copia esto textualmente):

| A | B | C | D | E |
|---|---|---|---|---|
| variable | tipo | label | opciones | requerido |
| metrosCuadrados | number | Metros Cuadrados a Construir | | SI |
| ubicacion | select | Ubicación | valparaiso\|Valparaíso,vina\|Viña del Mar,quilpue\|Quilpué | SI |

**Problemas comunes:**
- ❌ Encabezados en fila 2 en vez de fila 1
- ❌ Espacios en los nombres de columnas
- ❌ Hoja llamada "variables_formulario " (con espacio al final)
- ❌ Hoja no existe

### Hoja: calculo

Debe existir esta hoja (aunque esté vacía por ahora).

---

## ✅ Paso 4: Probar Funciones en Apps Script

En el editor de Apps Script, ejecuta estas funciones de prueba:

### 4.1 Test de Configuración

1. En el editor, selecciona la función: `testGetConfig`
2. Click en **Ejecutar** ▶️
3. Mira los **Logs** (abajo)

**Código para agregar al final del script:**

```javascript
/**
 * FUNCIONES DE DIAGNÓSTICO
 */

function testGetConfig() {
  Logger.log('=== TEST: getConfig ===');
  try {
    const result = getFormConfig();
    const content = result.getContent();
    Logger.log('Resultado:');
    Logger.log(content);
    
    const json = JSON.parse(content);
    if (json.success) {
      Logger.log('✅ SUCCESS: ' + json.fields.length + ' campos encontrados');
    } else {
      Logger.log('❌ ERROR: ' + json.message);
    }
  } catch (error) {
    Logger.log('❌ EXCEPTION: ' + error.toString());
  }
}

function testSpreadsheetAccess() {
  Logger.log('=== TEST: Acceso a Spreadsheet ===');
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    Logger.log('✅ Spreadsheet abierto: ' + ss.getName());
    
    const sheets = ss.getSheets();
    Logger.log('Hojas encontradas (' + sheets.length + '):');
    sheets.forEach(sheet => {
      Logger.log('  - ' + sheet.getName());
    });
    
    const configSheet = ss.getSheetByName('variables_formulario');
    if (configSheet) {
      Logger.log('✅ Hoja "variables_formulario" encontrada');
      Logger.log('   Última fila: ' + configSheet.getLastRow());
      Logger.log('   Última columna: ' + configSheet.getLastColumn());
      
      // Leer primera fila (encabezados)
      const headers = configSheet.getRange(1, 1, 1, 5).getValues()[0];
      Logger.log('   Encabezados: ' + JSON.stringify(headers));
      
      // Leer segunda fila (primer dato)
      if (configSheet.getLastRow() >= 2) {
        const firstRow = configSheet.getRange(2, 1, 1, 5).getValues()[0];
        Logger.log('   Primera fila de datos: ' + JSON.stringify(firstRow));
      } else {
        Logger.log('⚠️  No hay datos (solo encabezados)');
      }
    } else {
      Logger.log('❌ Hoja "variables_formulario" NO encontrada');
    }
    
    const calculoSheet = ss.getSheetByName('calculo');
    if (calculoSheet) {
      Logger.log('✅ Hoja "calculo" encontrada');
    } else {
      Logger.log('❌ Hoja "calculo" NO encontrada');
    }
    
  } catch (error) {
    Logger.log('❌ EXCEPTION: ' + error.toString());
  }
}

function testDoGet() {
  Logger.log('=== TEST: doGet ===');
  try {
    const mockEvent = {
      parameter: {
        action: 'getConfig'
      }
    };
    
    const result = doGet(mockEvent);
    const content = result.getContent();
    Logger.log('Resultado:');
    Logger.log(content);
    
  } catch (error) {
    Logger.log('❌ EXCEPTION: ' + error.toString());
  }
}
```

### 4.2 Ejecutar Tests

1. **Test 1**: Ejecuta `testSpreadsheetAccess`
   - Esto verificará si puede acceder a tu Google Sheet
   - Mostrará todas las hojas que encuentra
   - Mostrará los encabezados y primera fila

2. **Test 2**: Ejecuta `testGetConfig`
   - Esto probará la función que lee la configuración
   - Mostrará cuántos campos encontró

3. **Test 3**: Ejecuta `testDoGet`
   - Esto simula una petición web
   - Mostrará el JSON que se retornaría

**¿Dónde ver los logs?**
- En el editor: **Ver → Logs** (o Ctrl+Enter)
- O al final de la pantalla después de ejecutar

---

## ✅ Paso 5: Verificar Permisos

### 5.1 Autorizar el Script

Cuando ejecutes por primera vez `testSpreadsheetAccess`:

1. Aparecerá: **"Se necesita autorización"**
2. Click en **"Revisar permisos"**
3. Selecciona tu cuenta de Google
4. Click en **"Avanzado"**
5. Click en **"Ir a [nombre del proyecto] (no seguro)"**
6. Click en **"Permitir"**

### 5.2 Permisos Requeridos

El script necesita:
- ✅ Ver y administrar hojas de cálculo de Google Drive
- ✅ Conectarse a servicios externos (para responder a la web app)

---

## ✅ Paso 6: Verificar Despliegue

### 6.1 ¿Está desplegado?

1. En el editor: **Implementar → Administrar implementaciones**
2. Deberías ver al menos 1 implementación activa
3. Tipo: **Aplicación web**
4. Estado: **Activo**

### 6.2 Configuración Correcta

La implementación debe tener:
- **Ejecutar como**: Yo (tu email)
- **Quién tiene acceso**: ⚠️ **Cualquier persona**

Si dice "Solo yo", el formulario web no podrá acceder.

### 6.3 Redesplegar si Hiciste Cambios

Si modificaste el código después de desplegar:

1. **Implementar → Administrar implementaciones**
2. Click en el ícono de **lápiz** ✏️ de tu implementación
3. En **Nueva descripción de versión**, pon algo como "v2"
4. Click en **Implementar**
5. ⚠️ **La URL cambiará** - copia la nueva URL que termina en `/exec`
6. Actualiza la URL en `DynamicQuoteForm.tsx`

---

## ✅ Paso 7: Verificar desde el Navegador

### 7.1 Test Directo

Pega en tu navegador:
```
https://script.google.com/macros/s/AKfycbzs5rhqUEwY0dk7ZNagtaF8meoUEk5NsYtC6KnTv68_Ac93oJ30v_2pn8XpTLCH-UsasA/exec?action=getConfig
```

**Resultados esperados:**

✅ **Si funciona**, verás algo como:
```json
{
  "success": true,
  "fields": [
    {
      "id": "metrosCuadrados",
      "type": "number",
      "label": "Metros Cuadrados a Construir",
      "required": true
    },
    ...
  ],
  "message": "Configuración cargada exitosamente"
}
```

❌ **Si NO funciona**, verás:
- **Página en blanco**: Problema de permisos o despliegue
- **Error 404**: URL incorrecta
- **Error de autorización**: No has dado permisos
- **JSON con error**: Problema en el código o estructura de Sheets

### 7.2 Verificar Headers

Si ves una página en blanco, abre las **Herramientas de Desarrollador** (F12):

1. Pestaña **Network**
2. Recarga la página
3. Click en la petición al script
4. Mira el **Response**

Esto te mostrará el error real.

---

## 🔧 Problemas Comunes y Soluciones

### Problema 1: "La hoja 'variables_formulario' no existe"

**Solución:**
1. Verifica el nombre EXACTO de la hoja (sin espacios extra)
2. Renombra la hoja si es necesario
3. Asegúrate de que no tenga caracteres especiales

### Problema 2: "La hoja 'variables_formulario' está vacía"

**Solución:**
1. Los encabezados deben estar en fila 1
2. Los datos deben empezar en fila 2
3. No debe haber filas vacías entre encabezados y datos

### Problema 3: "Error: No se pudo cargar la configuración"

**Causas posibles:**
- Estructura de columnas incorrecta
- Tipos de datos incorrectos
- Fórmulas en vez de valores en las celdas de configuración

**Solución:**
Copia esta estructura EXACTA en tu hoja `variables_formulario`:

```
A1: variable
B1: tipo
C1: label
D1: opciones
E1: requerido

A2: metrosCuadrados
B2: number
C2: Metros Cuadrados a Construir
D2: (vacío)
E2: SI

A3: ubicacion
B3: select
C3: Ubicación
D3: valparaiso|Valparaíso,vina|Viña del Mar,quilpue|Quilpué
E3: SI
```

### Problema 4: "CORS Error" en la consola

**Esto es normal y Google lo maneja automáticamente.**

Si aún así falla:
1. Verifica que el script esté desplegado como "Cualquier persona"
2. Usa `redirect: 'follow'` en el fetch (ya está en el código)

### Problema 5: URL cambia cada vez que redespliego

**Solución:**
En vez de crear una **Nueva implementación**, haz:
1. **Implementar → Administrar implementaciones**
2. Click en el **lápiz** ✏️ de la implementación existente
3. Actualiza la versión
4. La URL permanecerá igual

---

## 📋 Checklist Completo

Marca cada punto que hayas verificado:

### Google Sheet
- [ ] El Spreadsheet ID en el script coincide con tu Google Sheet
- [ ] Existe la hoja `variables_formulario` (nombre exacto, sin espacios)
- [ ] Existe la hoja `calculo`
- [ ] Los encabezados están en fila 1 de `variables_formulario`
- [ ] Hay al menos 1 fila de datos (fila 2) en `variables_formulario`
- [ ] Los nombres de columna son exactos: variable, tipo, label, opciones, requerido

### Apps Script
- [ ] El código está pegado en Apps Script
- [ ] El SPREADSHEET_ID está configurado (línea 9)
- [ ] Has ejecutado y autorizado los permisos
- [ ] `testSpreadsheetAccess` funciona sin errores
- [ ] `testGetConfig` retorna JSON exitoso

### Despliegue
- [ ] Has desplegado como **Aplicación web**
- [ ] Configuración: **Ejecutar como: Yo**
- [ ] Configuración: **Quién tiene acceso: Cualquier persona**
- [ ] Has copiado la URL que termina en `/exec`
- [ ] La URL manual en el navegador + `?action=getConfig` funciona

### Frontend
- [ ] La URL en `DynamicQuoteForm.tsx` coincide con la URL desplegada
- [ ] Has ejecutado `npm run build`
- [ ] Has desplegado a Netlify

---

## 🆘 Si Nada Funciona

Envíame esta información:

1. **Output de `testSpreadsheetAccess`** (copiar los logs)
2. **Output de `testGetConfig`** (copiar los logs)
3. **Screenshot de tu hoja `variables_formulario`**
4. **URL que probaste en el navegador** y qué mensaje viste
5. **Errores en la consola del navegador** (F12 → Console)

Con esta info podré identificar el problema exacto.

---

**¿Siguiente paso?**

Ejecuta los tests en el orden indicado y anota dónde falla primero. Ese es tu punto de problema.
