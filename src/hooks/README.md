# Hooks

Custom hooks **compartidos** entre diferentes features.

## ¿Qué es un custom hook?

Una función que usa hooks de React y encapsula lógica reutilizable.

## ¿Qué va aquí?

Hooks que se usan en MÚLTIPLES features:
- `useAuth.ts` - Manejo de autenticación
- `useLocalStorage.ts` - Persistencia local
- `useDebounce.ts` - Debouncing de inputs
- `useWindowSize.ts` - Tamaño de ventana

## ¿Qué NO va aquí?

Hooks específicos de una feature (esos van en `features/[nombre]/hooks/`)
