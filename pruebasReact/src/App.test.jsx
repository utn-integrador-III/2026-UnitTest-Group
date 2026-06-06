import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';
import { userService } from './services/userService';

// ─── MOCK ───────────────────────────────────────────────────────────
// Simulamos el módulo del servicio para no hacer llamadas reales a internet
vi.mock('./services/userService', () => ({
  userService: { getUsers: vi.fn() }
}));

// Datos de prueba (usuarios ficticios)
const mockUsers = [
  { id: 1, name: 'Alice Johnson', username: 'alice', email: 'alice@test.com', company: { name: 'Tech Corp' } },
  { id: 2, name: 'Bob Smith', username: 'bob', email: 'bob@test.com', company: { name: 'Dev Inc' } }
];

// ─── PRUEBAS ─────────────────────────────────────────────────────────
describe('App Component', () => {

  beforeEach(() => vi.clearAllMocks());

  // ── TEST 1 ──────────────────────────────────────────────────────────
  it('muestra el estado de carga y luego la lista de usuarios', async () => {
    userService.getUsers.mockResolvedValueOnce(mockUsers);
    render(<App />);

    // Al inicio debe aparecer el spinner de carga
    expect(screen.getByTestId('loading-state')).toBeInTheDocument();

    // Esperamos a que carguen los usuarios
    await waitFor(() =>
      expect(screen.queryByTestId('loading-state')).not.toBeInTheDocument()
    );

    // Los usuarios deben estar en pantalla
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
  });


  // TEST 2 
  it('filtra usuarios al escribir en la barra de búsqueda', async () => {
    userService.getUsers.mockResolvedValueOnce(mockUsers);
    render(<App />);

    await screen.findByText('Alice Johnson');

    // Escribir "Bob" en el buscador
    fireEvent.change(screen.getByLabelText('Search users'), {
      target: { value: 'Bob' }
    });

    // Bob debe seguir visible, Alice debe desaparecer
    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
    expect(screen.queryByText('Alice Johnson')).not.toBeInTheDocument();
  });


  // TEST 3 
  it('muestra y oculta los detalles al hacer clic en una tarjeta', async () => {
    userService.getUsers.mockResolvedValueOnce(mockUsers);
    render(<App />);

    await screen.findByText('Alice Johnson');

    // Los detalles NO deben estar visibles al inicio
    expect(screen.queryByTestId('user-details')).not.toBeInTheDocument();

    // Clic en "Show details" de Alice
    fireEvent.click(screen.getByLabelText('Show details for Alice Johnson'));

    // Ahora los detalles SÍ deben estar visibles
    expect(screen.getByTestId('user-details')).toBeInTheDocument();
    expect(screen.getByText('alice@test.com')).toBeInTheDocument();

    // Clic en "Hide details" para cerrar
    fireEvent.click(screen.getByLabelText('Hide details for Alice Johnson'));
    expect(screen.queryByTestId('user-details')).not.toBeInTheDocument();
  });


  // TEST 4 
  it('muestra un error y permite reintentar cuando la API falla', async () => {
    // Primera llamada: falla
    userService.getUsers.mockRejectedValueOnce(new Error('Sin conexión'));
    render(<App />);

    await waitFor(() =>
      expect(screen.queryByTestId('loading-state')).not.toBeInTheDocument()
    );

    // Debe aparecer el banner de error
    expect(screen.getByTestId('error-state')).toBeInTheDocument();
    expect(screen.getByText('Sin conexión')).toBeInTheDocument();

    // Segunda llamada: éxito al reintentar
    userService.getUsers.mockResolvedValueOnce(mockUsers);
    fireEvent.click(screen.getByRole('button', { name: /retry loading users/i }));

    await screen.findByText('Alice Johnson');
    expect(userService.getUsers).toHaveBeenCalledTimes(2);
  });
});
