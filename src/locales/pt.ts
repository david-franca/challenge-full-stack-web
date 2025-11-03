import { pt as ptLocale } from 'vuetify/locale'

export const pt = {
  $vuetify: {
    ...ptLocale,
  },
  common: {
    alt: {
      logo: 'Logo da MaisA',
    },
  },
  login: {
    title: 'Sistema de Gerenciamento',
    subtitle: 'Entre com sua conta para continuar',
    button: 'Entrar',
    email: 'E-mail',
    password: 'Senha',
    rules: {
      passwordMin: 'Senha deve ter pelo menos {min} caracteres',
    },
  },
  layout: {
    students: 'Alunos',
    users: 'Usuários',
    home: 'Início',
    languages: {
      pt: 'Português',
      en: 'Inglês',
      es: 'Espanhol',
    },
  },
  homeView: {
    title: 'Módulo de Gestão de Alunos',
    subtitle:
      'Bem-vindo à plataforma de gerenciamento acadêmico. Aqui você pode consultar, cadastrar, editar e remover alunos de forma eficiente.',
  },
  studentList: {
    loading: 'Carregando dados... Por favor, aguarde.',
    noData: 'Nenhum aluno encontrado.',
    editStudent: 'Editar Aluno',
    deleteStudent: 'Excluir Aluno',
    headers: {
      ra: 'RA',
      name: 'Nome',
      email: 'Email',
      cpf: 'CPF',
      actions: 'Ações',
    },
  },
  studentHeader: {
    title: 'Consulta de Alunos',
    searchPlaceholder: 'Digite sua busca...',
    registerStudent: 'Cadastrar Aluno',
  },
  studentFormDialog: {
    createTitle: 'Cadastrar Aluno',
    editTitle: 'Editar Aluno',
    saveButton: 'Salvar',
    updateButton: 'Atualizar',
    cancelButton: 'Cancelar',
    requiredFields: '*indica campos obrigatórios',
    labels: {
      name: 'Nome Completo*',
      email: 'Email*',
      ra: 'RA (Registro Acadêmico)*',
      cpf: 'CPF (Cadastro de Pessoas Físicas)*',
    },
    rules: {
      required: 'Este campo é obrigatório.',
      email: 'O e-mail deve ser válido.',
      cpfLength: 'O CPF deve conter 11 dígitos.',
      cpfValid: 'CPF inválido.',
    },
  },
  confirmDeleteDialog: {
    title: 'Confirmar Exclusão',
    confirmationMessage: 'Você tem certeza que deseja excluir "{name}"?',
    confirmationMessageGeneric: 'Você tem certeza que deseja excluir este item?',
    irreversibleAction: 'Esta ação não pode ser desfeita.',
    cancelButton: 'Cancelar',
    deleteButton: 'Excluir',
  },
  userList: {
    loading: 'Carregando dados... Por favor, aguarde.',
    noData: 'Nenhum usuário encontrado.',
    editUser: 'Editar Usuário',
    deleteUser: 'Excluir Usuário',
    headers: {
      id: 'ID',
      name: 'Nome',
      email: 'Email',
      role: 'Cargo',
      actions: 'Ações',
    },
    roles: {
      admin: 'Administrador',
      user: 'Professor',
    },
  },
  userHeader: {
    title: 'Consulta de Usuários',
    searchPlaceholder: 'Digite sua busca...',
    registerUser: 'Cadastrar Usuário',
  },
  userFormDialog: {
    createTitle: 'Cadastrar Usuário',
    editTitle: 'Editar Usuário',
    saveButton: 'Salvar',
    updateButton: 'Atualizar',
    cancelButton: 'Cancelar',
    requiredFields: '*indica campos obrigatórios',
    labels: {
      name: 'Nome Completo*',
      email: 'Email*',
      password: 'Senha*',
      role: 'Cargo*',
      newPassword: 'Nova Senha',
    },
    rules: {
      required: 'Este campo é obrigatório.',
      email: 'O e-mail deve ser válido.',
    },
  },
  notifications: {
    resources: {
      student: 'Aluno',
      user: 'Usuário',
    },
    success: {
      created: '{resource} criado(a) com sucesso!',
      updated: '{resource} atualizado(a) com sucesso!',
      removed: '{resource} removido(a) com sucesso!',
    },
    error: {
      badRequest: 'Requisição inválida. Verifique os dados enviados.',
      unauthorized: 'Não autorizado. Por favor, faça login novamente.',
      forbidden: 'Você não tem permissão para executar esta ação.',
      notFound: '{resource} não encontrado(a).',
      conflict: 'Conflito: Os dados já existem ou estão duplicados.',
      serverError: 'Erro interno do servidor. Tente novamente mais tarde.',
      unknown: 'Ocorreu um erro desconhecido.',
    },
    auth: {
      sessionExpired: 'Sua sessão expirou. Por favor, faça login novamente.',
      invalidToken: 'Token JWT inválido:',
      logout: 'Saindo...',
      error: 'Erro desconhecido.',
    },
  },
}
