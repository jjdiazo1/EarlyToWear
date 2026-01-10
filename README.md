# EarlyToWear - Integración Wompi (API directa)

## Variables de entorno necesarias

### Backend
- `WOMPI_PUBLIC_KEY=pub_test_example`
- `WOMPI_PRIVATE_KEY=prv_test_example`
- `WOMPI_ENV=sandbox` # o 'production'
- `WOMPI_WEBHOOK_SECRET=webhook_secret_example`

### Frontend
- `NEXT_PUBLIC_WOMPI_PUBLIC_KEY=pub_test_example`
- `NEXT_PUBLIC_WOMPI_ENV=sandbox`

## Pasos para la integración

### Backend
1. Crear el módulo `payment-wompi` en `backend/apps/backend/src/modules/payment-wompi/`.
2. Implementar endpoints para:
   - Crear transacción Wompi (POST a la API de Wompi).
   - Recibir webhooks de Wompi y actualizar el estado del pago.
3. Configurar el proveedor en `medusa-config.ts`.
4. Usar las variables de entorno anteriores.

### Frontend
1. Crear componentes `WompiWrapper` y `WompiPaymentButton`.
2. Adaptar el flujo de pago para usar la API de Wompi.
3. Usar las variables de entorno anteriores.

### Documentación oficial
- [Wompi Colombia - Inicio rápido](https://docs.wompi.co/docs/colombia/inicio-rapido/)
- [API Reference Wompi](https://docs.wompi.co/docs/colombia/api/)
- [Widget de pago Wompi](https://docs.wompi.co/docs/colombia/widget/)

---

## Cómo correr el proyecto

### 1. Clona el repositorio
```bash
git clone <url-del-repo>
cd EarlyToWear
```

### 2. Instala dependencias (en cada paquete)
```bash
cd backend
npm install
cd ../storefront
npm install
```

### 3. Configura las variables de entorno
- Copia los archivos `.env.example` o `.env.template` a `.env` en cada paquete (backend y frontend) y agrega las variables necesarias (ver arriba).

### 4. Corre el backend
```bash
cd backend
npm run dev
```

### 5. Corre el frontend
```bash
cd storefront
npm run dev
```

### 6. Prueba la integración Wompi
- Realiza un pedido en el frontend y selecciona "Pagar con Wompi".
- Ingresa los datos de la tarjeta de prueba y confirma el pago.
- Verifica que el backend reciba la transacción y que el webhook de Wompi actualice el estado del pedido.

---

> Para más detalles sobre la integración Wompi, revisa el archivo `WOMPI.md` en la raíz del proyecto.
