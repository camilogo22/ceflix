# 🤖 Bitácora de Auditoría de IA (AI-LOG) - Semana 1
**Estudiante:** Camilo Gomez  
**Fecha:** 2 de septiembre de 2026  

---

## 1. Prompt de Configuración Utilizado
> Expo HAS CHANGED
>
> Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

---

## 2. Peticiones Realizadas (Prompts)
* **Prompt 1 (Interfaz):** Quiero que la página se ajuste a la página web y que en el perfil aparezcan estos datos: Nombre: Camilo, Apellido: Gomez, Correo: gomezcamilo347@gmail.com y Teléfono: +57 3235911772.

* **Prompt 2 (TypeScript):** Quiero que la pantalla de inicio de Ceflix cambie la película de recomendación cada 5 segundos exactamente y muestre otras películas diferentes.

---

## 3. Análisis Crítico y Correcciones (Auditoría)
* **¿La IA cometió algún error o usó código en desuso?**

Sí. La plantilla inicial utilizaba `StyleSheet.create()`, pero el requisito pedía NativeWind, así que se reemplazó por clases `className`. También fue necesario corregir los tipos de NativeWind para que TypeScript reconociera `className`, instalar las dependencias web de Expo y solucionar problemas de ancho y desbordamiento horizontal.

Durante el desarrollo se detectaron películas e imágenes duplicadas entre categorías. Se reorganizaron las filas por género y se cambiaron las imágenes repetidas. Además, se corrigió un botón de Descargas que estaba anidado dentro de otra tarjeta y se mejoraron los controles de los carruseles para que los botones `‹` y `›` funcionaran correctamente.

* **¿Qué aprendiste de la sugerencia que te dio la IA?**

Aprendí que una interfaz responsive debe probarse en distintos tamaños y que no basta con utilizar `w-full`; también hay que controlar los carruseles y el desbordamiento horizontal. Además, aprendí a revisar las dependencias, los tipos de NativeWind y el funcionamiento real de los botones después de cada cambio.
