import { es as esLocale } from 'vuetify/locale'

export const es = {
  $vuetify: {
    ...esLocale,
  },
  common: {
    alt: {
      logo: 'Logo de MaisA',
    },
  },
  login: {
    title: 'Sistema de Gestión',
    subtitle: 'Inicia sesión con tu cuenta para continuar',
    button: 'Entrar',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    rules: {
      passwordMin: 'La contraseña debe tener al menos {min} caracteres',
    },
  },
  layout: {
    students: 'Alumnos',
    users: 'Usuarios',
    home: 'Inicio',
    languages: {
      pt: 'Portugués',
      en: 'Inglés',
      es: 'Español',
    },
  },
  homeView: {
    title: 'Módulo de Gestión de Alumnos',
    subtitle:
      'Bienvenido a la plataforma de gestión académica. Aquí puede consultar, registrar, editar y eliminar alumnos de forma eficiente.',
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
    searchPlaceholder: 'Escriba su búsqueda...',
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
      email: 'Email*',
      ra: 'RA (Registro Académico)*',
      cpf: 'CPF (Documento de Identidad)*',
    },
    rules: {
      required: 'Este campo es obligatorio.',
      email: 'El email debe ser válido.',
      cpfLength: 'El CPF debe contener 11 dígitos.',
      cpfValid: 'CPF inválido.',
    },
  },
  confirmDeleteDialog: {
    title: 'Confirmar Eliminación',
    confirmationMessage: '¿Está seguro de que desea eliminar a "{name}"?',
    confirmationMessageGeneric: '¿Está seguro de que desea eliminar este ítem?',
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
    searchPlaceholder: 'Escriba su búsqueda...',
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
      email: 'Email*',
      password: 'Contraseña*',
      role: 'Rol*',
      newPassword: 'Nueva Contraseña',
    },
    rules: {
      required: 'Este campo es obligatorio.',
      email: 'El email debe ser válido.',
    },
  },
  notifications: {
    resources: {
      student: 'Alumno',
      user: 'Usuario',
    },
    success: {
      created: '¡{resource} creado(a) con éxito!',
      updated: '¡{resource} actualizado(a) con éxito!',
      removed: '¡{resource} eliminado(a) con éxito!',
    },
    error: {
      badRequest: 'Solicitud inválida. Verifique los datos enviados.',
      unauthorized: 'No autorizado. Por favor, inicie sesión de nuevo.',
      forbidden: 'No tiene permiso para realizar esta acción.',
      notFound: '{resource} no encontrado(a).',
      conflict: 'Conflicto: Los datos ya existen o están duplicados.',
      serverError: 'Error interno del servidor. Intente nuevamente más tarde.',
      unknown: 'Ocurrió un error desconocido.',
    },
    auth: {
      sessionExpired: 'Su sesión ha expirado. Por favor, inicie sesión de nuevo.',
      invalidToken: 'Token JWT inválido:',
      logout: 'Cerrando sesión...',
      error: 'Error desconocido.',
    },
  },
}
