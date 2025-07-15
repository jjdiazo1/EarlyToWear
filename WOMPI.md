# Integración Wompi (API directa) - EarlyToWear

## Variables de entorno necesarias

### Backend
- `WOMPI_PUBLIC_KEY=pub_test_example`
- `WOMPI_PRIVATE_KEY=prv_test_example`
- `WOMPI_ENV=sandbox` # o 'production'
- `WOMPI_WEBHOOK_SECRET=webhook_secret_example` (opcional)

### Frontend
- `NEXT_PUBLIC_WOMPI_PUBLIC_KEY=pub_test_example`
- `NEXT_PUBLIC_WOMPI_ENV=sandbox`

---

## Pasos de configuración

### 1. Backend
- El módulo `payment-wompi` implementa:
  - **POST `/api/payments/wompi`**: Crea una transacción en Wompi usando los datos enviados desde el frontend.
  - **POST `/webhooks/wompi`**: Recibe eventos de Wompi y actualiza el estado del pedido según el evento recibido.
- Configura las variables de entorno en tu `.env`.
- Asegúrate de registrar las rutas de este módulo en tu app principal.

### 2. Frontend
- Usa el componente `WompiPaymentButton` para enviar los datos del pago al backend.
- El botón de pago debe recopilar los datos de la tarjeta y del pedido, y enviarlos a `/api/payments/wompi`.
- Muestra el resultado del pago (aprobado, error, etc) al usuario.

---

## Ejemplo de payload para crear transacción
```json
{
  "amount_in_cents": 10000,
  "currency": "COP",
  "customer_email": "cliente@ejemplo.com",
  "payment_method": {
    "type": "CARD",
    "number": "4242424242424242",
    "cvc": "123",
    "exp_month": "12",
    "exp_year": "29",
    "card_holder": "Nombre Apellido"
  },
  "reference": "order-12345"
}
```

---

## Flujo de pago
1. El usuario llena el formulario de pago y hace clic en "Pagar con Wompi".
2. El frontend envía los datos a `/api/payments/wompi`.
3. El backend crea la transacción en Wompi y responde con el resultado.
4. Si el pago es exitoso (`status: APPROVED`), se muestra confirmación al usuario.
5. Wompi enviará un webhook a `/webhooks/wompi` para notificar cambios de estado (aprobado, rechazado, etc). El backend debe actualizar el pedido según el evento recibido.

---

## Documentación oficial
- [Wompi Colombia - Inicio rápido](https://docs.wompi.co/docs/colombia/inicio-rapido/)
- [API Reference Wompi](https://docs.wompi.co/docs/colombia/api/)
- [Widget de pago Wompi](https://docs.wompi.co/docs/colombia/widget/)

---

> **Nota:** Reemplaza los valores de ejemplo por tus llaves reales de Wompi en producción. Asegúrate de cumplir con los requisitos de PCI DSS si procesas tarjetas directamente.
