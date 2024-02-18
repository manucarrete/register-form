# Formulario Multi-paso con Validación


### Paso 1: Información Personal

- **Validación de Campos**: Asegura que todos los campos (Nombre, Email, Teléfono) sean llenados correctamente. Utiliza expresiones regulares para validar el formato del email y el teléfono
- **Tipo de Cliente**: El usuario debe seleccionar si es una empresa o particular. Dependiendo cual sea, se aplica IVA.

### Paso 2: Selección de Servicio y Complementos

- **Selección de Servicio**: Obliga al usuario a seleccionar un servicio de la lista desplegable
- **Complementos**: El usuario puede seleccionar complementos opcionales 

### Paso 3: Tecnologías

- **Fecha de Inicio**: Campo opcional para especificar una fecha deseada
- **Tecnologías Preferentes**: Permite seleccionar múltiples tecnologías deseadas 

### Paso 4: Observaciones y Finalización

- **Observaciones**: Campo opcional para que el usuario añada cualquier comentario o especificación adicional 

## Navegación entre Pasos

El formulario permite al usuario navegar hacia adelante y hacia atrás entre los pasos sin perder la información

## Validación

La validación con bootsrtap no se puede utilizar porque tiene diferentes pasos y hasta el final no se hace el sumbit que es lo que hace la validación.

