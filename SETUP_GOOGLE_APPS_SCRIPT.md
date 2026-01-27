# Guía de Configuración: Google Apps Script

Esta aplicación se conecta con Google Apps Script para realizar los cálculos de cotización de manera segura, manteniendo tus fórmulas y lógica de negocio privadas.

## Paso 1: Crear el Google Sheet

1. Ve a [Google Sheets](https://sheets.google.com) y crea una nueva hoja de cálculo
2. Nómbrala "Cotizador Construcción" (o el nombre que prefieras)
3. Configura tu hoja con las columnas y fórmulas que necesites para calcular las cotizaciones

### Ejemplo de Estructura Sugerida:

**Hoja 1: "Configuración"** - Precios base por calidad
```
A1: Tipo         | B1: Básica | C1: Media | D1: Alta
A2: Cimentación  | 180        | 220       | 280
A3: Obra Gruesa  | 300        | 400       | 520
A4: Terminaciones| 250        | 350       | 480
```

**Hoja 2: "Ubicaciones"** - Factores multiplicadores por ubicación
```
A1: Ubicación         | B1: Factor
A2: valparaiso        | 1.0
A3: vina              | 1.05
A4: quilpue           | 0.95
A5: villa-alemana     | 0.95
A6: con-con           | 1.1
```

**Hoja 3: "Registro"** - Para guardar las cotizaciones (opcional)

## Paso 2: Crear el Google Apps Script

1. En tu Google Sheet, ve a **Extensiones > Apps Script**
2. Borra el código predeterminado
3. Copia y pega el siguiente código:

```javascript
function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  try {
    // Obtener la hoja de cálculo activa
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const configSheet = ss.getSheetByName('Configuración');
    const ubicacionesSheet = ss.getSheetByName('Ubicaciones');
    const registroSheet = ss.getSheetByName('Registro');
    
    // Parsear los datos recibidos
    let datos;
    if (e.postData) {
      datos = JSON.parse(e.postData.contents);
    } else {
      datos = e.parameter;
    }
    
    // Extraer valores
    const metrosCuadrados = parseFloat(datos.metrosCuadrados);
    const cimentacion = datos.cimentacion; // 'basica', 'media', 'alta'
    const obraGruesa = datos.obraGruesa;
    const terminaciones = datos.terminaciones;
    const ubicacion = datos.ubicacion;
    
    // Obtener precios desde la hoja de configuración
    const preciosData = configSheet.getRange('A1:D4').getValues();
    
    // Mapear niveles a columnas (B=Básica, C=Media, D=Alta)
    const nivelAColumna = { 'basica': 1, 'media': 2, 'alta': 3 };
    
    const precioCimentacion = preciosData[1][nivelAColumna[cimentacion]];
    const precioObraGruesa = preciosData[2][nivelAColumna[obraGruesa]];
    const precioTerminaciones = preciosData[3][nivelAColumna[terminaciones]];
    
    // Obtener factor de ubicación
    const ubicacionesData = ubicacionesSheet.getRange('A2:B10').getValues();
    let factorUbicacion = 1.0;
    
    for (let i = 0; i < ubicacionesData.length; i++) {
      if (ubicacionesData[i][0] === ubicacion) {
        factorUbicacion = ubicacionesData[i][1];
        break;
      }
    }
    
    // Calcular costos
    const costoCimentacion = Math.round(metrosCuadrados * precioCimentacion * factorUbicacion);
    const costoObraGruesa = Math.round(metrosCuadrados * precioObraGruesa * factorUbicacion);
    const costoTerminaciones = Math.round(metrosCuadrados * precioTerminaciones * factorUbicacion);
    const total = costoCimentacion + costoObraGruesa + costoTerminaciones;
    
    // Registrar la cotización (opcional)
    if (registroSheet) {
      registroSheet.appendRow([
        new Date(),
        datos.nombreCliente || 'Sin nombre',
        datos.emailCliente || '',
        datos.telefonoCliente || '',
        metrosCuadrados,
        ubicacion,
        cimentacion,
        obraGruesa,
        terminaciones,
        total
      ]);
    }
    
    // Preparar respuesta
    const respuesta = {
      success: true,
      cotizacion: total,
      desglose: {
        cimentacion: costoCimentacion,
        obraGruesa: costoObraGruesa,
        terminaciones: costoTerminaciones,
        total: total
      },
      mensaje: 'Cotización generada exitosamente'
    };
    
    // Retornar como JSON
    return ContentService
      .createTextOutput(JSON.stringify(respuesta))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    const respuestaError = {
      success: false,
      error: error.toString()
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(respuestaError))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Paso 3: Desplegar el Apps Script como Web App

1. En el editor de Apps Script, haz clic en **Implementar > Nueva implementación**
2. Selecciona el tipo: **Aplicación web**
3. Configura:
   - **Descripción**: "API Cotizador v1"
   - **Ejecutar como**: "Yo (tu email)"
   - **Quién tiene acceso**: "Cualquier persona"
4. Haz clic en **Implementar**
5. **Importante**: Copia la **URL de la aplicación web** que se genera. Se verá algo como:
   ```
   https://script.google.com/macros/s/AKfycbz.../exec
   ```

## Paso 4: Configurar la URL en la Aplicación Web

1. Abre el archivo `/src/app/components/QuoteForm.tsx`
2. Busca la línea:
   ```typescript
   const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
   ```
3. Reemplaza `"YOUR_GOOGLE_APPS_SCRIPT_URL_HERE"` con la URL que copiaste
4. Comenta/elimina el código de simulación y descomenta la implementación real

### Código a modificar en QuoteForm.tsx:

```typescript
// ELIMINA o COMENTA este bloque de simulación:
/*
setTimeout(() => {
  const simulatedResponse: QuoteResponse = { ... };
  setResult(simulatedResponse);
  setLoading(false);
}, 1500);
*/

// DESCOMENTA este bloque de implementación real:
const urlWithParams = `${GOOGLE_SCRIPT_URL}?${new URLSearchParams(formData as any).toString()}`;
const response = await fetch(urlWithParams);
const data = await response.json();

if (data.success) {
  setResult(data);
} else {
  setError(data.error || "Error al generar la cotización");
}
setLoading(false);
```

## Paso 5: Actualizar Información de Contacto

Personaliza los datos de contacto en los siguientes archivos:

### En `/src/app/components/Footer.tsx`:
- Actualiza el teléfono, email y ubicación específica

### En `/src/app/components/QuoteResult.tsx`:
- Busca `https://wa.me/569XXXXXXXX` y reemplaza con tu número de WhatsApp
- Busca `mailto:contacto@ejemplo.cl` y reemplaza con tu email

## Ventajas de este Enfoque

✅ **Privacidad**: Tus fórmulas y precios están en Google Sheets, no en el código del navegador
✅ **Flexibilidad**: Puedes modificar precios y fórmulas directamente en el Excel sin tocar código
✅ **Escalabilidad**: Fácil agregar nuevos campos o lógica de cálculo
✅ **Gratuito**: Google Apps Script es gratis para uso normal
✅ **Registro automático**: Opcionalmente guarda todas las cotizaciones en una hoja

## Agregar Más Campos en el Futuro

Para agregar nuevos campos:

1. **En Google Sheets**: Agrega las nuevas columnas/fórmulas necesarias
2. **En el Apps Script**: Modifica la función `handleRequest` para procesar los nuevos campos
3. **En la aplicación web**: 
   - Agrega los nuevos campos en `QuoteForm.tsx`
   - Actualiza la interfaz `FormData` con los nuevos campos
   - Agrega los controles del formulario (Select, Input, etc.)

## Solución de Problemas

**Error de CORS**: Si recibes errores de CORS, asegúrate de que el Apps Script está desplegado con acceso "Cualquier persona"

**Error 403**: Verifica que el script se ejecuta "como tú" y que has autorizado los permisos necesarios

**No se reciben datos**: Verifica que los nombres de las hojas en el Apps Script coincidan con los de tu Google Sheet

## Seguridad

- Las API keys y credenciales están del lado del servidor (Google)
- Los usuarios no pueden ver tus fórmulas ni precios base
- Puedes agregar validaciones adicionales en el Apps Script
- Considera agregar rate limiting si recibes mucho tráfico

---

**¿Necesitas ayuda?** Contacta al desarrollador o consulta la documentación de Google Apps Script: https://developers.google.com/apps-script
