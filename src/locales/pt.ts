export const pt = {
  login: {
    title: 'Sistema de Gerenciamento',
    subtitle: 'Entre com sua conta para continuar',
    button: 'Entrar',
    email: 'E-mail',
    password: 'Senha',
  },
  layout: {
    students: 'Alunos',
    users: 'Usuários',
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
}
