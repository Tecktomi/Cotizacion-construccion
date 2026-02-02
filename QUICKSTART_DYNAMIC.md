# 🚀 Inicio Rápido - Formulario Dinámico

Configura tu cotizador dinámico en **4 pasos simples** (~20 minutos).

---

## 📋 Antes de Empezar

Necesitas:
- ✅ Cuenta de Google (Gmail)
- ✅ Cuenta de Netlify (gratis)
- ✅ Este proyecto descargado

---

## Paso 1️⃣: Crear y Configurar Google Sheet (10 min)

### 1.1 Crear el Documento

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea un nuevo documento en blanco
3. Nómbralo: "Cotizador Construcción - Config"

### 1.2 Crear Hoja: variables_formulario

1. Renombra la primera hoja a `variables_formulario`
2. Copia y pega exactamente esta estructura:

**Fila 1 (Encabezados):**
```
variable            tipo      label                              opciones                                                              requerido
```

**Filas 2-9 (Datos):**
```
metrosCuadrados     number    Metros Cuadrados a Construir                                                                             SI
ubicacion           select    Ubicación                          valparaiso|Valparaíso,vina|Viña del Mar,quilpue|Quilpué             SI
cimentacion         select    Cimentación                        basica|Básica,media|Media,alta|Alta                                  SI
obraGruesa          select    Obra Gruesa                        basica|Básica,media|Media,alta|Alta                                  SI
terminaciones       select    Terminaciones                      basica|Básica,media|Media,alta|Alta                                  SI
nombreCliente       text      Nombre Completo                                                                                          NO
emailCliente        email     Email                                                                                                    NO
telefonoCliente     tel       Teléfono                                                                                                 NO
```

💡 **Tip**: Usa Tab para moverte entre celdas al pegar.

### 1.3 Crear Hoja: calculo

1. Clic en el **+** al final de las pestañas
2. Nómbrala `calculo`
3. Configura esta estructura:

**Columnas A-B (Resultados):**
```
A1: RESULTADO FINAL
A2: Cotización:
A4: Cimentación:
A5: Obra Gruesa:
A6: Terminaciones:
```

**Columnas C-D (Inputs):**
```
C1: INPUTS
C4: metrosCuadrados
C5: cimentacion
C6: obraGruesa
C7: terminaciones
C8: ubicacion
```

**Tabla de Costos (F:G):**
```
F10: Calidad     G10: Costo
F11: basica      G11: 800
F12: media       G12: 1000
F13: alta        G13: 1300
```

**Tabla de Ubicaciones (I:J):**
```
I10: Ubicacion       J10: Multiplicador
I11: valparaiso      J11: 1.0
I12: vina            J12: 1.1
I13: quilpue         J13: 0.95
```

**Fórmulas en B:**
```
B4: =D4*VLOOKUP(D5,$F$11:$G$13,2,FALSE)*VLOOKUP(D8,$I$11:$J$13,2,FALSE)
B5: =D4*VLOOKUP(D6,$F$11:$G$13,2,FALSE)*VLOOKUP(D8,$I$11:$J$13,2,FALSE)
B6: =D4*VLOOKUP(D7,$F$11:$G$13,2,FALSE)*VLOOKUP(D8,$I$11:$J$13,2,FALSE)
B2: =B4+B5+B6
```

✅ **Verifica**: Las fórmulas no deben mostrar error (pueden mostrar 0).

### 1.4 Obtener el ID del Sheet

1. Mira la URL de tu Google Sheet
2. Se ve así: `https://docs.google.com/spreadsheets/d/ESTE_ES_TU_ID/edit`
3. Copia el ID (la parte larga entre `/d/` y `/edit`)
4. **Guárdalo**, lo necesitarás en el siguiente paso

---

## Paso 2️⃣: Configurar Google Apps Script (5 min)

### 2.1 Abrir el Editor

1. En tu Google Sheet: **Extensiones → Apps Script**
2. Se abrirá una nueva pestaña con el editor

### 2.2 Pegar el Código

1. Borra todo el código que aparece por defecto
2. Abre el archivo `/GOOGLE_APPS_SCRIPT_DYNAMIC.gs` de este proyecto
3. Copia TODO el código
4. Pégalo en el editor de Apps Script

### 2.3 Configurar el ID

1. En la línea 10, busca:
   ```javascript
   const SPREADSHEET_ID = 'TU_SPREADSHEET_ID_AQUI';
   ```
2. Reemplaza `TU_SPREADSHEET_ID_AQUI` con el ID que copiaste en el Paso 1.4
3. **Guarda** (Ctrl+S o el ícono de disquete)

### 2.4 Desplegar

1. Clic en **Implementar** (esquina superior derecha)
2. **Nueva implementación**
3. Clic en el ícono de engranaje ⚙️ junto a "Seleccione tipo"
4. Selecciona **Aplicación web**
5. Configuración:
   - **Descripción**: "Cotizador API v1"
   - **Ejecutar como**: Yo (tu email)
   - **Quién tiene acceso**: ⚠️ **Cualquier persona** (¡MUY IMPORTANTE!)
6. Clic en **Implementar**
7. Aparecerá un diálogo con una URL que termina en `/exec`
8. **Copia esta URL completa** y guárdala

### 2.5 Autorizar Permisos

1. En el menú de funciones (arriba), selecciona `testGetConfig`
2. Clic en **Ejecutar** (▶️)
3. Aparecerá: "Se necesita autorización"
4. Clic en **Revisar permisos**
5. Selecciona tu cuenta de Google
6. Clic en **Avanzado**
7. Clic en **Ir a [nombre del proyecto] (no seguro)**
8. Clic en **Permitir**
9. Espera a que termine (unos segundos)

### 2.6 Probar

1. Pega tu URL en una nueva pestaña del navegador
2. Al final, agrega: `?action=getConfig`
3. URL completa: `https://script.google.com/.../exec?action=getConfig`
4. Presiona Enter
5. ✅ **Deberías ver**: Un JSON con tus campos configurados
6. ❌ **Si ves error**: Vuelve al paso 2.5 (Autorizar)

---

## Paso 3️⃣: Configurar el Frontend (2 min)

### 3.1 Actualizar la URL

1. Abre `/src/app/components/DynamicQuoteForm.tsx`
2. Busca la línea 36 (aproximadamente):
   ```typescript
   const GOOGLE_SCRIPT_URL = "https://script.google.com/...";
   ```
3. Reemplaza con tu URL del Paso 2.4
4. Guarda el archivo

### 3.2 Construir

Abre una terminal en la carpeta del proyecto:

```bash
npm install
npm run build
```

✅ **Deberías ver**: `dist built in X seconds` sin errores

---

## Paso 4️⃣: Desplegar a Netlify (5 min)

### Opción A: Drag & Drop (Más Rápido)

1. Ve a https://app.netlify.com/drop
2. Arrastra la carpeta `dist` a la zona indicada
3. Espera 30 segundos
4. ✅ Netlify te dará una URL: `https://random-123.netlify.app`

### Opción B: Con Git (Para Updates Automáticos)

```bash
# Crear repositorio
git init
git add .
git commit -m "Cotizador dinámico inicial"

# Subir a GitHub (crea el repo primero en github.com)
git remote add origin https://github.com/tu-usuario/tu-repo.git
git push -u origin main

# En Netlify:
# 1. "Add new site" → "Import from Git"
# 2. Selecciona tu repo
# 3. Build: npm run build | Publish: dist
# 4. Deploy
```

---

## ✅ Verificar que Funciona

### Test 1: Formulario se Carga

1. Abre tu URL de Netlify
2. ✅ Deberías ver el formulario con todos tus campos
3. ❌ Si ves "Cargando..." infinito: Problema con el Apps Script

### Test 2: Generar Cotización

1. Llena el formulario:
   - Metros: 100
   - Ubicación: Valparaíso
   - Cimentación: Media
   - Obra Gruesa: Alta
   - Terminaciones: Media
2. Clic en "Generar Cotización"
3. Espera 2-3 segundos
4. ✅ Deberías ver un resultado con el precio
5. ❌ Si hay error: Verifica la consola (F12)

### Test 3: Editar Campos (¡La Magia!)

1. Ve a tu Google Sheet
2. En `variables_formulario`, agrega una fila:
   ```
   observaciones    text    Observaciones Adicionales        NO
   ```
3. Recarga tu sitio web (F5)
4. ✅ El nuevo campo debería aparecer automáticamente
5. ✅ Sin redesplegar, sin tocar código

---

## 🎉 ¡Listo!

Tu cotizador dinámico está funcionando.

### Próximos Pasos:

1. **Personaliza campos** en `variables_formulario`
2. **Ajusta fórmulas** en la hoja `calculo`
3. **Actualiza precios** en las tablas
4. **Comparte el link** con tus primeros usuarios

---

## 🆘 Si Algo Falla

### "Cargando formulario..." infinito
→ El Apps Script no responde
→ Verifica: Paso 2.6 (Probar la URL manualmente)
→ Revisa: Permisos en Paso 2.5

### "Error al generar cotización"
→ Problema en las fórmulas de Excel
→ Revisa la hoja `calculo`
→ Verifica que las referencias de celdas sean correctas

### 404 en Netlify
→ Problema de build
→ Verifica que `netlify.toml` esté en la raíz
→ Reconstruye: `npm run build`

### Campos no aparecen
→ Revisa la estructura de `variables_formulario`
→ Encabezados deben estar en fila 1
→ Datos desde fila 2 en adelante

---

## 📚 Documentación Completa

Para más detalles:

- **Configuración avanzada**: [SETUP_GOOGLE_SHEETS_DYNAMIC.md](SETUP_GOOGLE_SHEETS_DYNAMIC.md)
- **Troubleshooting**: [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- **Info del proyecto**: [README_DYNAMIC.md](README_DYNAMIC.md)

---

**Tiempo total: ~20 minutos** ⏱️

**¡Felicitaciones por tu cotizador dinámico! 🎊**
