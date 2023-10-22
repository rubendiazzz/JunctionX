# Privacidad y Seguridad de Imágenes: Propuesta al Reto Educativo

En el mundo digital actual, la **privacidad y la seguridad** de las imágenes son esenciales, especialmente en contextos educativos con menores. Desarrollamos una solución basada en técnicas avanzadas para proteger y administrar estas imágenes.

## IA Image Tracking

Originalmente consideramos usar códigos QR escondidos en imágenes para el rastreo. Sin embargo, optamos por una solución más avanzada.

- **Rastreo de Enlaces One-Device**: Utilizamos la técnica de _fingerprinting_ para asociar cada enlace con un dispositivo específico. Si un enlace se propaga fuera del sistema, podemos rastrear su origen. Esto se complementa con términos y condiciones claros sobre el tratamiento de datos.

- **DNN-Watermarking**: Implementamos marcas de agua usando Redes Neuronales Profundas (DNN), basado en el trabajo de Chuan Qin et al. Esto permite detectar y reconocer marcas de agua específicas que son invisibles al ojo humano. Esta tecnología garantiza que, incluso en caso de una difusión no autorizada, el origen de la imagen pueda ser verificado.

## Censura de Niños No Autorizados

Para proteger aún más la identidad de los menores, proponemos un método que desenfoca automáticamente las caras de aquellos niños no autorizados en las imágenes.

Además, las imágenes que se comparten con el consentimiento adecuado tienen un "tracker" invisible, garantizando su rastreo constante. Cualquier persona que descargue la imagen tendrá que comprometerse a no redistribuirla.

## Conclusión

Con el desafío educativo en nuestro foco, nuestra solución busca equilibrar la innovación tecnológica con la seguridad y privacidad esenciales en entornos educativos.

---
**Nota**: Para más detalles técnicos y configuración, revisa los archivos de código y documentación adjunta.
