# XRApp


chrome://inspect/#devices

Offline #6A4466E
Pending authentication: please accept debugging session on the device.

1. Aceptar la sesión de depuración en el dispositivo
En el dispositivo móvil, debería aparecer un diálogo pidiendo permitir la depuración USB.
Acepta el diálogo y marca "Always allow from this computer" si aparece la opción.
2. Verificar que la depuración USB esté habilitada
Para Android:
Ve a Configuración → Opciones de desarrollador → Activa Depuración USB
Si no ves "Opciones de desarrollador", ve a Acerca del teléfono y toca 7 veces en "Número de compilación"
Para iOS:
Requiere Safari en macOS para depuración remota
En Windows, usa herramientas como Safari Web Inspector o herramientas de terceros
3. Reconectar el dispositivo
Desconecta y vuelve a conectar el cable USB
Asegúrate de que el cable permita transferencia de datos (no solo carga)
4. Reiniciar el servidor de depuración (Android)
Si usas Android, puedes reiniciar el servidor ADB:
adb kill-serveradb start-serveradb devices
5. Verificar en Chrome DevTools
Abre chrome://inspect/#devices
Verifica que el dispositivo aparezca en la lista
Si aparece como "Offline", intenta hacer clic en "Port forwarding" y configura el puerto si es necesario
6. Para desarrollo AR local
Si estás probando en el navegador del escritorio, no necesitas depuración remota. Asegúrate de que tu servidor Vite esté corriendo con:
npm run dev


PS C:\platform-tools> ./adb devices
List of devices attached
6a4466e device


El dispositivo está conectado y reconocido por ADB. El ID 6a4466e coincide con el que aparece en chrome://inspect/#devices.
Pasos para resolver "Pending authentication":
1. Habilitar depuración remota en Chrome del dispositivo
En tu dispositivo Android:
Abre Chrome
Ve a chrome://flags y busca "Remote debugging" (o "Depuración remota")
O ve a chrome://inspect en Chrome del dispositivo
2. Aceptar la sesión de depuración
Debería aparecer un diálogo en el dispositivo pidiendo permitir la depuración
Acepta y marca "Always allow from this computer" si aparece
3. Configurar Port Forwarding en Chrome (PC)
En chrome://inspect/#devices:
Haz clic en "Port forwarding..." o "Configure..."
Agrega un puerto (por ejemplo, 8080 o 5173 si usas Vite)
Marca "Enable port forwarding"
4. Verificar en chrome://inspect
Después de aceptar la sesión, el dispositivo debería aparecer como "Online" en lugar de "Offline" y podrás ver las pestañas abiertas en Chrome del dispositivo.
5. Alternativa: usar ADB para port forwarding
Si Chrome DevTools sigue sin funcionar, puedes hacer port forwarding manualmente:
.\adb forward tcp:9222 localabstract:chrome_devtools_remote
Luego abre en Chrome de tu PC: chrome://inspect y debería aparecer el dispositivo.
¿Ya apareció el diálogo de depuración en tu dispositivo Android? Si no, revisa la configuración de Chrome en el dispositivo.