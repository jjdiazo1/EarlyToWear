# Backend - Integración Wompi (API directa)

## Variables de entorno necesarias

- `WOMPI_PUBLIC_KEY=pub_test_example`
- `WOMPI_PRIVATE_KEY=prv_test_example`
- `WOMPI_ENV=sandbox` # o 'production'
- `WOMPI_WEBHOOK_SECRET=webhook_secret_example`

## Pasos para la integración

1. Crear el módulo `payment-wompi` en `src/modules/payment-wompi/`.
2. Implementar:
   - Servicio para crear transacciones en Wompi (POST a la API de Wompi).
   - Endpoint para recibir webhooks de Wompi y actualizar el estado del pago.
3. Configurar el proveedor en `medusa-config.ts`.
4. Usar las variables de entorno anteriores.

## Documentación oficial
- [Wompi Colombia - Inicio rápido](https://docs.wompi.co/docs/colombia/inicio-rapido/)
- [API Reference Wompi](https://docs.wompi.co/docs/colombia/api/)

---

> **Nota:** Reemplaza los valores de ejemplo por tus llaves reales de Wompi en producción.
