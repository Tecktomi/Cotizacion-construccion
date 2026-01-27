# 🚀 Inicio Rápido - Despliegue a Netlify

## ⚡ Pasos Mínimos para Desplegar

### 1️⃣ Verificar Google Apps Script (5 minutos)

Tu URL actual: `https://script.google.com/macros/s/AKfycbwACHdhkY-ZT9KS9Fkys1IrWlBlOdrOHYhTOXPhZJ_o6naJzzwyDBiSCZWVbDrhISjsEQ/exec`

**Pruébala ahora:**
1. Pega esta URL en tu navegador:
```
https://script.google.com/macros/s/AKfycbwACHdhkY-ZT9KS9Fkys1IrWlBlOdrOHYhTOXPhZJ_o6naJzzwyDBiSCZWVbDrhISjsEQ/exec?metrosCuadrados=100&cimentacion=basica&obraGruesa=media&terminaciones=alta&ubicacion=valparaiso
```

2. ✅ **Deberías ver**: Un JSON con `"success": true` y datos de cotización
3. ❌ **Si ves error**: Ve a [TROUBLESHOOTING.md](TROUBLESHOOTING.md) sección "Autorizar el Script"

---

### 2️⃣ Construir el Proyecto (2 minutos)

```bash
# En tu terminal, dentro de la carpeta del proyecto:

npm install
npm run build
```

✅ **Deberías ver**: `dist built in X seconds` sin errores
❌ **Si hay errores**: Revisa que Node.js 20 esté instalado

---

### 3️⃣ Desplegar a Netlify (5 minutos)

**Opción A - Método Rápido (Drag & Drop):**

1. Abre https://app.netlify.com/drop
2. Arrastra la carpeta `dist` a la zona indicada
3. Espera 30 segundos
4. ✅ ¡Listo! Netlify te dará una URL como: `https://abc123.netlify.app`

**Opción B - Con Git (Para updates automáticos):**

1. Crea un repo en GitHub/GitLab
2. Sube tu código:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin TU_URL_REPO
   git push -u origin main
   ```
3. En Netlify: "Add new site" → "Import from Git"
4. Selecciona tu repositorio
5. Configura:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy"

---

### 4️⃣ Probar en Producción (2 minutos)

1. Abre la URL de Netlify
2. Llena el formulario con datos de prueba
3. Click "Generar Cotización"
4. ✅ **Debería**: Mostrar resultado en 2-3 segundos
5. ❌ **Si no funciona**: Abre F12 → Console y busca errores

---

## 📋 Checklist Rápido

Antes de compartir con clientes:

- [ ] Google Apps Script funciona (probado manualmente)
- [ ] Build local exitoso (`npm run build`)
- [ ] Desplegado en Netlify
- [ ] Genera al menos 1 cotización de prueba en producción
- [ ] Botón WhatsApp funciona
- [ ] Botón Email funciona
- [ ] Se ve bien en móvil

---

## 🆘 Si Algo Falla

### Error: "NetworkError" al cotizar
→ **Solución**: Verifica que Google Apps Script tenga acceso "Cualquier persona"
→ **Guía completa**: [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

### Error: Build falla
→ **Solución**: Verifica Node.js 20: `node --version`
→ **Instala dependencias**: `rm -rf node_modules && npm install`

### Error: 404 en Netlify
→ **Solución**: Ya está configurado en `netlify.toml`, debería funcionar automáticamente
→ **Si persiste**: Verifica que `netlify.toml` esté en la raíz

---

## 📚 Documentación Completa

Para más detalles, consulta:

| Documento | Cuándo Usarlo |
|-----------|---------------|
| [README.md](README.md) | Descripción general del proyecto |
| [DEPLOY_NETLIFY.md](DEPLOY_NETLIFY.md) | Guía detallada de despliegue |
| [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) | Checklist completo paso a paso |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | Cuando algo no funciona |
| [SETUP_GOOGLE_APPS_SCRIPT.md](SETUP_GOOGLE_APPS_SCRIPT.md) | Configurar el backend desde cero |
| [UPDATES.md](UPDATES.md) | Cómo actualizar después |
| [PROJECT_STATUS.md](PROJECT_STATUS.md) | Estado técnico completo |

---

## 💡 Tip Pro

**Cambia el nombre del sitio en Netlify:**

1. En Netlify: Site settings → Site details → Change site name
2. Usa algo como: `cotizador-construccion-vregion`
3. Tu URL será: `https://cotizador-construccion-vregion.netlify.app`

Mucho más profesional que `abc123.netlify.app` 😉

---

## ✅ Listo para Producción

Tu proyecto está 100% funcional y listo para ser usado por clientes reales.

**Próximos pasos opcionales:**
- Agregar dominio propio (`.cl`)
- Configurar Google Analytics
- Agregar favicon personalizado

---

**Tiempo total estimado: 15-20 minutos** ⏱️

¡Éxito con tu despliegue! 🎉
