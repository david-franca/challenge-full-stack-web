import { es as esLocale } from 'vuetify/locale'

export const es = {
  $vuetify: {
    ...esLocale,
  },
  login: {
    title: 'Sistema de Gestión',
    subtitle: 'Inicia sesión con tu cuenta para continuar',
    button: 'Iniciar Sesión',
    email: 'Correo Electrónico',
    password: 'Contraseña',
  },
  layout: {
    students: 'Alumnos',
    users: 'Usuarios',
  },
  studentList: {
    loading: 'Cargando datos... Por favor, espere.',
    noData: 'No se encontraron alumnos.',
    editStudent: 'Editar Alumno',
    deleteStudent: 'Eliminar Alumno',
    headers: {
      ra: 'RA',
      name: 'Nombre',
      email: 'Email',
      cpf: 'CPF',
      actions: 'Acciones',
    },
  },
  studentHeader: {
    title: 'Consulta de Alumnos',
    searchPlaceholder: 'Escribe tu búsqueda...',
    registerStudent: 'Registrar Alumno',
  },
  studentFormDialog: {
    createTitle: 'Registrar Alumno',
    editTitle: 'Editar Alumno',
    saveButton: 'Guardar',
    updateButton: 'Actualizar',
    cancelButton: 'Cancelar',
    requiredFields: '*indica campos obligatorios',
    labels: {
      name: 'Nombre Completo*',
      email: 'Correo Electrónico*',
      ra: 'RA (Registro Académico)*',
      cpf: 'CPF (Registro de Personas Físicas)*',
    },
    rules: {
      required: 'Este campo es obligatorio.',
      email: 'El correo electrónico debe ser válido.',
      cpfLength: 'El CPF debe contener 11 dígitos.',
      cpfValid: 'CPF inválido.',
    },
  },
  confirmDeleteDialog: {
    title: 'Confirmar Eliminación',
    confirmationMessage: '¿Estás seguro de que deseas eliminar a "{name}"?',
    confirmationMessageGeneric: '¿Estás seguro de que deseas eliminar este elemento?',
    irreversibleAction: 'Esta acción no se puede deshacer.',
    cancelButton: 'Cancelar',
    deleteButton: 'Eliminar',
  },
  userList: {
    loading: 'Cargando datos... Por favor, espere.',
    noData: 'No se encontraron usuarios.',
    editUser: 'Editar Usuario',
    deleteUser: 'Eliminar Usuario',
    headers: {
      id: 'ID',
      name: 'Nombre',
      email: 'Email',
      role: 'Rol',
      actions: 'Acciones',
    },
    roles: {
      admin: 'Administrador',
      user: 'Profesor',
    },
  },
  userHeader: {
    title: 'Consulta de Usuarios',
    searchPlaceholder: 'Escribe tu búsqueda...',
    registerUser: 'Registrar Usuario',
  },
  userFormDialog: {
    createTitle: 'Registrar Usuario',
    editTitle: 'Editar Usuario',
    saveButton: 'Guardar',
    updateButton: 'Actualizar',
    cancelButton: 'Cancelar',
    requiredFields: '*indica campos obligatorios',
    labels: {
      name: 'Nombre Completo*',
      email: 'Correo Electrónico*',
      password: 'Contraseña*',
      newPassword: 'Nueva Contraseña',
    },
    rules: {
      required: 'Este campo es obligatorio.',
      email: 'El correo electrónico debe ser válido.',
    },
  },
  notifications: {
    student: {
      created: '¡Alumno añadido con éxito!',
      updated: '¡Alumno actualizado con éxito!',
      removed: '¡Alumno eliminado con éxito!',
    },
    session: {
      expired: 'Tu sesión ha expirado. Por favor, inicia sesión.',
    },
    user: {
      created: '¡Usuario añadido con éxito!',
      updated: '¡Usuario actualizado con éxito!',
      removed: '¡Usuario eliminado con éxito!',
    },
    auth: {
      sessionExpired: 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.',
      invalidToken: 'Token JWT inválido:',
      logout: 'Cerrando sesión...',
      error: 'Error desconocido.',
    },
  },
}
