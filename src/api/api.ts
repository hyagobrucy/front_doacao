import axios from "axios";

// Configuração do Axios com baseURL e cabeçalhos padrão
const api = axios.create({
  baseURL: "http://localhost:8000/api", // Base URL da sua API
  headers: {
    "Content-Type": "application/json",
  },
});

// Variável para armazenar o token globalmente
let token: string | null = null;

/**
 * Configura o token no cabeçalho para uso nas requisições.
 * @param newToken - O novo token JWT ou token de autenticação
 */
export const setToken = (newToken: string) => {
  token = newToken;
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Configura o token globalmente para todas as requisições
};

/**
 * Limpa o token da configuração do Axios.
 */
export const clearToken = () => {
  token = null;
  delete api.defaults.headers.common['Authorization']; // Remove o cabeçalho de autorização
};

/**
 * Lida com erros globais da API de forma padronizada.
 * @param error - Objeto de erro da requisição Axios.
 */
api.interceptors.response.use(
  (response) => response, // Retorna a resposta no caso de sucesso
  (error) => {
    if (error.response) {
      // Lógica para tratamento de erros da resposta da API
      switch (error.response.status) {
        case 401:
          // Caso o token seja inválido ou expirado
          clearToken();
          alert("Sessão expirada. Faça login novamente.");
          break;
        case 404:
          alert("Recurso não encontrado.");
          break;
        default:
          alert("Ocorreu um erro ao processar a solicitação.");
      }
    } else {
      alert("Erro desconhecido. Verifique sua conexão.");
    }

    return Promise.reject(error);
  }
);

export { api };
