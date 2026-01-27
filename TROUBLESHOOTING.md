# Solución de Problemas - Google Apps Script

## Error: "NetworkError when attempting to fetch resource"

Este error indica que el navegador no puede conectarse al Google Apps Script. Aquí están las soluciones paso a paso:

---

## ✅ SOLUCIÓN 1: Verificar el Despliegue del Apps Script

### Pasos:

1. **Abre tu Google Sheet**
2. Ve a **Extensiones > Apps Script**
3. Asegúrate de que el código esté pegado correctamente
4. Haz clic en **Implementar > Administrar implementaciones**
5. Deberías ver una implementación activa. Si no:
   - Haz clic en **Nueva implementación**
   - Tipo: **Aplicación web**
   - Configuración:
     - **Ejecutar como**: Yo (tu email)
     - **Quién tiene acceso**: **Cualquier persona** ← MUY IMPORTANTE
   - Haz clic en **Implementar**
6. **Copia la nueva URL** y actualízala en tu código

---

## ✅ SOLUCIÓN 2: Autorizar el Script (Primera Vez)

El script necesita permisos para acceder a Google Sheets. Para autorizarlo:

### Método A: Ejecutar manualmente
1. En el editor de Apps Script, selecciona la función `doGet` en el menú desplegable
2. Haz clic en el botón **Ejecutar** (▶️)
3. Aparecerá un mensaje pidiendo permisos
4. Haz clic en **Revisar permisos**
5. Selecciona tu cuenta de Google
6. Haz clic en **Avanzado** → **Ir a [nombre del proyecto] (no seguro)**
7. Haz clic en **Permitir**

### Método B: Abrir la URL directamente
1. Copia la URL de tu Apps Script
2. Pégala en una nueva pestaña del navegador
3. Si ves un error de permisos, sigue los pasos anteriores
4. Una vez autorizado, deberías ver una respuesta JSON (puede ser un error, pero es señal de que funciona)

---

## ✅ SOLUCIÓN 3: Verificar la Configuración de Permisos

Asegúrate de que tu implementación tenga estos ajustes:

```
Ejecutar como: YO (tu email)
Quién tiene acceso: CUALQUIER PERSONA
```

Si dice "Solo yo" o algo diferente, cambialo a "Cualquier persona"

---

## ✅ SOLUCIÓN 4: Probar la URL Manualmente

Para verificar que tu Apps Script funciona:

1. Abre una nueva pestaña
2. Pega esta URL (reemplaza con tu URL real):
   ```
   https://script.google.com/macros/s/TU_ID_AQUI/exec?metrosCuadrados=100&cimentacion=basica&obraGruesa=media&terminaciones=alta&ubicacion=valparaiso
   ```
3. Deberías ver una respuesta JSON como:
   ```json
   {
     "success": true,
     "cotizacion": 85000,
     "desglose": {...},
     "mensaje": "Cotización generada exitosamente"
   }
   ```

Si ves esto, ¡tu script funciona! El problema es de conexión desde la app.

Si ves un error o página en blanco, el script tiene un problema.

---

## ✅ SOLUCIÓN 5: Crear una Nueva Implementación

A veces las implementaciones se corrompen. Crea una nueva:

1. Ve a **Implementar > Administrar implementaciones**
2. Haz clic en el ícono de lápiz ✏️ en tu implementación activa
3. En la esquina superior derecha, haz clic en **Nueva versión**
4. Haz clic en **Implementar**
5. **IMPORTANTE**: Copia la **NUEVA URL** (será diferente)
6. Actualiza la URL en `/src/app/components/QuoteForm.tsx`

---

## ✅ SOLUCIÓN 6: Verificar el Código del Apps Script

Asegúrate de que tu código en Apps Script tenga estas funciones:

```javascript
function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}
```

Sin estas funciones, el script no puede recibir peticiones web.

---

## ✅ SOLUCIÓN 7: Verificar CORS (Avanzado)

Si nada más funciona, el problema puede ser CORS. Modifica tu función `handleRequest` para incluir headers CORS:

```javascript
function handleRequest(e) {
  try {
    // ... tu código aquí ...
    
    // Al retornar, asegúrate de usar:
    return ContentService
      .createTextOutput(JSON.stringify(respuesta))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

## 🔍 Cómo Diagnosticar

### Opción 1: Consola del Navegador
1. Presiona **F12** (o clic derecho → Inspeccionar)
2. Ve a la pestaña **Console**
3. Intenta generar una cotización
4. Busca errores en rojo. Deberías ver:
   - `Error completo:` seguido de detalles

### Opción 2: Pestaña Network
1. Presiona **F12**
2. Ve a la pestaña **Network**
3. Intenta generar una cotización
4. Busca una petición a `script.google.com`
5. Haz clic en ella para ver:
   - **Status**: Debería ser `200 OK`
   - **Response**: Debería mostrar JSON
   - Si está en rojo o falla, copia el error

---

## 📝 Checklist de Verificación

Marca cada uno cuando lo hayas verificado:

- [ ] El código de Apps Script está pegado correctamente
- [ ] El script está desplegado como "Aplicación web"
- [ ] La configuración dice "Quién tiene acceso: Cualquier persona"
- [ ] He ejecutado manualmente el script y autorizado permisos
- [ ] La URL en el código React coincide exactamente con la URL de implementación
- [ ] Probé la URL manualmente en el navegador y funciona
- [ ] Las hojas "Configuración" y "Ubicaciones" existen en mi Google Sheet
- [ ] Los datos de prueba están correctamente configurados en las hojas

---

## 🆘 Si Nada Funciona

Si has intentado todo lo anterior y sigue sin funcionar:

1. **Copia el error exacto** de la consola del navegador (F12 → Console)
2. **Copia la URL completa** de tu implementación de Apps Script
3. **Toma una captura** de la configuración de implementación
4. Comparte esta información para obtener ayuda específica

---

## 🔄 Modo de Prueba Local (Temporal)

Si necesitas que la app funcione mientras solucionas el problema de Google Apps Script, puedes activar temporalmente el modo de simulación:

En `/src/app/components/QuoteForm.tsx`, comenta las líneas 74-108 y descomenta las líneas de simulación que están comentadas arriba. Esto hará que la app funcione con datos simulados mientras arreglas la conexión real.

---

**Última actualización**: Enero 2026
