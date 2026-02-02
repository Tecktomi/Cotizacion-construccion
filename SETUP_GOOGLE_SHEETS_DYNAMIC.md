# 📊 Configuración de Google Sheets - Formulario Dinámico

Esta guía te explica cómo configurar tu Google Sheet para que el formulario sea completamente dinámico y configurable sin tocar código.

---

## 📋 Estructura del Google Sheet

Tu Google Sheet debe tener 3 hojas:

1. **variables_formulario** - Define los campos del formulario
2. **calculo** - Contiene las fórmulas de cálculo
3. **registros** (opcional) - Guarda el historial de cotizaciones

---

## 🔧 Hoja 1: variables_formulario

Esta hoja define qué campos aparecen en el formulario.

### Estructura:

| A | B | C | D | E |
|---|---|---|---|---|
| **variable** | **tipo** | **label** | **opciones** | **requerido** |
| metrosCuadrados | number | Metros Cuadrados a Construir | | SI |
| ubicacion | select | Ubicación | valparaiso\|Valparaíso,vina\|Viña del Mar,quilpue\|Quilpué | SI |
| cimentacion | select | Cimentación | basica\|Básica,media\|Media,alta\|Alta | SI |
| obraGruesa | select | Obra Gruesa | basica\|Básica,media\|Media,alta\|Alta | SI |
| terminaciones | select | Terminaciones | basica\|Básica,media\|Media,alta\|Alta | SI |
| nombreCliente | text | Nombre Completo | | NO |
| emailCliente | email | Email | | NO |
| telefonoCliente | tel | Teléfono | | NO |

### Explicación de Columnas:

#### A - variable (ID interno)
- Identificador único del campo
- Se usa en las fórmulas de cálculo
- No debe contener espacios ni caracteres especiales
- Ejemplos: `metrosCuadrados`, `ubicacion`, `cimentacion`

#### B - tipo
Tipos de campo soportados:
- `text` - Texto libre
- `number` - Número
- `email` - Email (con validación)
- `tel` o `phone` - Teléfono
- `select` - Lista desplegable (requiere columna D)

#### C - label
- Texto visible en el formulario
- Puede contener espacios y tildes
- Ejemplo: "Metros Cuadrados a Construir"

#### D - opciones (solo para tipo `select`)
Formato: `valor1|Etiqueta 1,valor2|Etiqueta 2,valor3|Etiqueta 3`

**Ejemplos:**
```
basica|Básica - Económico,media|Media - Estándar,alta|Alta - Premium
valparaiso|Valparaíso,vina|Viña del Mar,quilpue|Quilpué
1|Un piso,2|Dos pisos,3|Tres o más pisos
```

Si no usas el `|`, el valor y la etiqueta serán iguales:
```
valparaiso,vina,quilpue
```

#### E - requerido
- `SI` o `1` = Campo obligatorio (marcado con *)
- `NO` o vacío = Campo opcional

---

## 🧮 Hoja 2: calculo

Esta hoja contiene toda la lógica de cálculo. **Es tu "caja negra"** - aquí van tus fórmulas privadas.

### Estructura Sugerida:

```
     A                    B              C                D
1  | RESULTADO FINAL  |              | INPUTS        |
2  | Cotización:      | 85000000     |               |
3  |                  |              |               |
4  | Cimentación:     | 25000000     | metrosCuadrados | 100
5  | Obra Gruesa:     | 35000000     | cimentacion     | media
6  | Terminaciones:   | 25000000     | obraGruesa      | alta
7  |                  |              | terminaciones   | media
8  |                  |              | ubicacion       | valparaiso
```

### Cómo Funciona:

1. **Columna C-D**: El script escribe automáticamente los valores del formulario aquí
   - Columna C: nombre de la variable (debe coincidir con la hoja "variables_formulario")
   - Columna D: valor ingresado por el usuario

2. **Celda B2**: Contiene el **resultado final** que se muestra al usuario
   - Puede ser una fórmula que referencia otras celdas
   - Ejemplo: `=B4+B5+B6`

3. **Celdas B4, B5, B6**: Desglose opcional (cimentación, obra gruesa, terminaciones)
   - Puedes usar fórmulas complejas aquí
   - Ejemplo: `=D4*BUSCARV(D5;TablaPrecios;2;FALSO)*BUSCARV(D8;TablaUbicacion;2;FALSO)`

### Ejemplo de Fórmulas:

#### Tabla de Costos por Calidad:
Puedes crear una tabla auxiliar en otra parte de la hoja:

```
     F          G
10 | Calidad  | Costo/m²
11 | basica   | 800
12 | media    | 1000
13 | alta     | 1300
```

#### Tabla de Multiplicadores por Ubicación:
```
     I          J
10 | Ubicacion    | Multiplicador
11 | valparaiso   | 1.0
12 | vina         | 1.1
13 | quilpue      | 0.95
14 | villa-alemana| 0.95
```

#### Fórmula en B4 (Cimentación):
```excel
=D4*BUSCARV(D5;F11:G13;2;FALSO)*BUSCARV(D8;I11:J14;2;FALSO)
```

Donde:
- `D4` = metros cuadrados
- `D5` = cimentación seleccionada
- `D8` = ubicación seleccionada

#### Fórmula en B2 (Total):
```excel
=B4+B5+B6
```

O una fórmula más compleja si lo necesitas.

---

## 📝 Hoja 3: registros (Opcional)

Esta hoja se crea automáticamente cuando se genera la primera cotización.

### Estructura Automática:

| A | B | C | D | E |
|---|---|---|---|---|
| **Fecha** | **Cotización** | **Datos** | **IP** | **User Agent** |
| 2026-01-27 14:30 | 85000000 | {"metrosCuadrados":"100",...} | 123.45.67.89 | Mozilla/5.0... |

Útil para:
- Análisis de uso
- Seguimiento de clientes potenciales
- Auditoría de cotizaciones

---

## 🎯 Ejemplo Completo Paso a Paso

### Paso 1: Crear las Hojas

1. Crea un nuevo Google Sheet
2. Renombra la primera hoja a `variables_formulario`
3. Crea una segunda hoja llamada `calculo`

### Paso 2: Configurar variables_formulario

Copia esta estructura exacta:

```
variable            tipo      label                              opciones                                                              requerido
metrosCuadrados     number    Metros Cuadrados a Construir                                                                             SI
ubicacion           select    Ubicación                          valparaiso|Valparaíso,vina|Viña del Mar,quilpue|Quilpué             SI
cimentacion         select    Cimentación                        basica|Básica,media|Media,alta|Alta                                  SI
obraGruesa          select    Obra Gruesa                        basica|Básica,media|Media,alta|Alta                                  SI
terminaciones       select    Terminaciones                      basica|Básica,media|Media,alta|Alta                                  SI
nombreCliente       text      Nombre Completo                                                                                          NO
emailCliente        email     Email                                                                                                    NO
telefonoCliente     tel       Teléfono                                                                                                 NO
```

### Paso 3: Configurar calculo

En la hoja `calculo`, escribe:

**Sección de Inputs (C:D):**
```
C4: metrosCuadrados
C5: cimentacion
C6: obraGruesa
C7: terminaciones
C8: ubicacion
```

Las celdas D4-D8 quedarán vacías inicialmente (el script las llenará).

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

**Fórmulas de Cálculo:**
```
B4: =D4*BUSCARV(D5;$F$11:$G$13;2;FALSO)*BUSCARV(D8;$I$11:$J$13;2;FALSO)
B5: =D4*BUSCARV(D6;$F$11:$G$13;2;FALSO)*BUSCARV(D8;$I$11:$J$13;2;FALSO)
B6: =D4*BUSCARV(D7;$F$11:$G$13;2;FALSO)*BUSCARV(D8;$I$11:$J$13;2;FALSO)
B2: =B4+B5+B6
```

### Paso 4: Configurar Apps Script

1. En tu Google Sheet: **Extensiones → Apps Script**
2. Borra el código existente
3. Copia el código de `/GOOGLE_APPS_SCRIPT_DYNAMIC.gs`
4. **IMPORTANTE**: En la línea 10, reemplaza `TU_SPREADSHEET_ID_AQUI` con el ID de tu sheet
   - El ID está en la URL: `https://docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit`
5. Guarda (Ctrl+S)

### Paso 5: Desplegar

1. Clic en **Implementar → Nueva implementación**
2. Tipo: **Aplicación web**
3. Configuración:
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier persona** ⚠️
4. Clic en **Implementar**
5. Copia la URL que termina en `/exec`

### Paso 6: Autorizar Permisos

1. En el editor de Apps Script, selecciona la función `testGetConfig`
2. Haz clic en **Ejecutar** (▶️)
3. Acepta todos los permisos

### Paso 7: Probar

Pega esta URL en tu navegador (reemplaza con tu URL):
```
https://script.google.com/.../exec?action=getConfig
```

Deberías ver un JSON con tus campos configurados.

---

## 🔄 Cómo Agregar o Modificar Campos

### Agregar un Nuevo Campo:

1. Ve a la hoja `variables_formulario`
2. Agrega una nueva fila:
   ```
   pisos    select    Número de Pisos    1|Un piso,2|Dos pisos,3|Tres pisos    SI
   ```
3. Ve a la hoja `calculo`
4. Agrega en la columna C:
   ```
   C9: pisos
   ```
5. Actualiza tus fórmulas para incluir este nuevo factor
6. **¡Listo!** El campo aparecerá automáticamente en el formulario

### Modificar Opciones de un Select:

1. Ve a `variables_formulario`
2. Edita la columna D (opciones)
3. Ejemplo para agregar "Con Con":
   ```
   ANTES: valparaiso|Valparaíso,vina|Viña del Mar,quilpue|Quilpué
   DESPUÉS: valparaiso|Valparaíso,vina|Viña del Mar,quilpue|Quilpué,concon|Con Con
   ```
4. Actualiza la tabla de ubicaciones en la hoja `calculo` si es necesario
5. **¡Listo!** Los cambios son instantáneos

### Cambiar el Cálculo:

1. Ve a la hoja `calculo`
2. Modifica las fórmulas en B2, B4, B5, B6
3. Actualiza tablas auxiliares si las tienes
4. **¡Listo!** Los cambios se aplican inmediatamente

---

## ❓ Preguntas Frecuentes

### ¿Puedo agregar más de 3 niveles de calidad?
Sí, solo edita la columna D en `variables_formulario`:
```
basica|Básica,media-baja|Media Baja,media|Media,media-alta|Media Alta,alta|Alta,premium|Premium
```

### ¿Puedo cambiar el orden de los campos?
Sí, reordena las filas en `variables_formulario` y el formulario se actualizará automáticamente.

### ¿Puedo ocultar campos temporalmente?
Sí, simplemente borra la fila correspondiente en `variables_formulario` (o muévela fuera del rango).

### ¿Cómo agrego validaciones personalizadas?
Las validaciones básicas (requerido/opcional) se manejan automáticamente. Para validaciones complejas, puedes agregarlas en el Apps Script.

### ¿Los cambios requieren redesplegar?
**NO**. Los cambios en Google Sheets son instantáneos. Solo necesitas redesplegar el Apps Script si cambias el código JavaScript.

---

## 🔐 Seguridad

- ✅ **Fórmulas protegidas**: Tus fórmulas están en Google Sheets, nunca se exponen al usuario
- ✅ **Solo lectura**: El formulario web solo puede leer la configuración y escribir en inputs específicos
- ✅ **Sin acceso directo**: Los usuarios no ven tu Google Sheet
- ✅ **Logs opcionales**: Puedes desactivar el registro en la hoja "registros" si lo deseas

---

## 📊 Ejemplo Avanzado: Descuentos por Volumen

Puedes crear lógica compleja en tus fórmulas:

```excel
=SI(D4>=200; 0.9; SI(D4>=100; 0.95; 1)) * (fórmula base)
```

Esto aplica:
- 10% descuento si ≥ 200 m²
- 5% descuento si ≥ 100 m²
- Sin descuento si < 100 m²

---

## 🎨 Personalización del Desglose

Si quieres más líneas de desglose:

1. Agrega más filas en `calculo` (ej: B7, B8, B9)
2. El Apps Script solo lee B4, B5, B6 por defecto
3. Para personalizar, edita la función `calculateQuote` en el script:

```javascript
const desglose = {
  cimentacion: parseFloat(calculoSheet.getRange('B4').getValue()) || 0,
  obraGruesa: parseFloat(calculoSheet.getRange('B5').getValue()) || 0,
  terminaciones: parseFloat(calculoSheet.getRange('B6').getValue()) || 0,
  extras: parseFloat(calculoSheet.getRange('B7').getValue()) || 0,  // NUEVO
  total: cotizacionTotal
};
```

---

**¿Necesitas ayuda?** Consulta [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

**Última actualización**: Enero 2026
