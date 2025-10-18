# Features

Aquí van las **funcionalidades completas** organizadas por módulo.

## ¿Por qué "features"?

En lugar de separar TODO por tipo (components, hooks, etc.), 
agrupamos por FUNCIONALIDAD. Todo lo relacionado con "pedidos" 
está junto.

## Estructura de una feature:
```
features/
  orders/
    components/     # Componentes específicos de pedidos
    hooks/         # Hooks personalizados para pedidos
    api.ts         # Llamadas API específicas de pedidos
    types.ts       # Tipos TypeScript de pedidos
    index.ts       # Exporta todo lo público
```

## Ventajas:
- Todo relacionado está junto (alta cohesión)
- Fácil encontrar código relacionado
- Puedes copiar/eliminar una feature completa
