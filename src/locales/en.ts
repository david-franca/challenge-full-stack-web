import { en as enLocale } from 'vuetify/locale'

export const en = {
  $vuetify: {
    ...enLocale,
  },
  login: {
    title: 'Management System',
    subtitle: 'Sign in with your account to continue',
    button: 'Sign In',
    email: 'Email',
    password: 'Password',
  },
  layout: {
    students: 'Students',
    users: 'Users',
    home: 'Home',
  },
  homeView: {
    title: 'Student Management Module',
    subtitle:
      'Welcome to the academic management platform. Here you can query, register, edit, and remove students efficiently.',
  },
  studentList: {
    loading: 'Loading data... Please wait.',
    noData: 'No students found.',
    editStudent: 'Edit Student',
    deleteStudent: 'Delete Student',
    headers: {
      ra: 'RA',
      name: 'Name',
      email: 'Email',
      cpf: 'CPF',
      actions: 'Actions',
    },
  },
  studentHeader: {
    title: 'Manage Students',
    searchPlaceholder: 'Type your search...',
    registerStudent: 'Add Student',
  },
  studentFormDialog: {
    createTitle: 'Add Student',
    editTitle: 'Edit Student',
    saveButton: 'Save',
    updateButton: 'Update',
    cancelButton: 'Cancel',
    requiredFields: '*indicates required fields',
    labels: {
      name: 'Full Name*',
      email: 'Email*',
      ra: 'Student ID (RA)*',
      cpf: 'CPF (Individual Tax ID)*',
    },
    rules: {
      required: 'This field is required.',
      email: 'The email must be valid.',
      cpfLength: 'The CPF must contain 11 digits.',
      cpfValid: 'Invalid CPF.',
    },
  },
  confirmDeleteDialog: {
    title: 'Confirm Deletion',
    confirmationMessage: 'Are you sure you want to delete "{name}"?',
    confirmationMessageGeneric: 'Are you sure you want to delete this item?',
    irreversibleAction: 'This action cannot be undone.',
    cancelButton: 'Cancel',
    deleteButton: 'Delete',
  },
  userList: {
    loading: 'Loading data... Please wait.',
    noData: 'No users found.',
    editUser: 'Edit User',
    deleteUser: 'Delete User',
    headers: {
      id: 'ID',
      name: 'Name',
      email: 'Email',
      role: 'Role',
      actions: 'Actions',
    },
    roles: {
      admin: 'Administrator',
      user: 'Professor',
    },
  },
  userHeader: {
    title: 'Manage Users',
    searchPlaceholder: 'Type your search...',
    registerUser: 'Add User',
  },
  userFormDialog: {
    createTitle: 'Add User',
    editTitle: 'Edit User',
    saveButton: 'Save',
    updateButton: 'Update',
    cancelButton: 'Cancel',
    requiredFields: '*indicates required fields',
    labels: {
      name: 'Full Name*',
      email: 'Email*',
      password: 'Password*',
      role: 'Role*',
      newPassword: 'New Password',
    },
    rules: {
      required: 'This field is required.',
      email: 'The email must be valid.',
    },
  },
  notifications: {
    resources: {
      student: 'Student',
      user: 'User',
    },
    success: {
      created: '{resource} created successfully!',
      updated: '{resource} updated successfully!',
      removed: '{resource} removed successfully!',
    },
    error: {
      badRequest: 'Invalid request. Please check the data sent.',
      unauthorized: 'Unauthorized. Please log in again.',
      forbidden: 'You do not have permission to perform this action.',
      notFound: '{resource} not found.',
      conflict: 'Conflict: The data already exists or is duplicated.',
      serverError: 'Internal server error. Please try again later.',
      unknown: 'An unknown error occurred.',
    },
    auth: {
      sessionExpired: 'Your session has expired. Please log in again.',
      invalidToken: 'Invalid JWT token:',
      logout: 'Logging out...',
      error: 'Unknown error.',
    },
  },
}
