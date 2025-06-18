import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Dashboard from './Dashboard';

jest.mock('axios');

afterEach(() => {
  jest.clearAllMocks();
});

test('Muestra pedidos completados y en producción', async () => {
  axios.get.mockImplementation((url, { params }) => {
    if (params.status === 'completed') {
      return Promise.resolve({
        data: {
          data: [
            { id: 1, prosthesis_type: 'Crown', status: 'completed' },
            { id: 2, prosthesis_type: 'Bridge', status: 'completed' }
          ],
          last_page: 1
        }
      });
    }
    if (params.status === 'production') {
      return Promise.resolve({
        data: {
          data: [
            { id: 3, prosthesis_type: 'Implant', status: 'production' }
          ],
          last_page: 1
        }
      });
    }
    return Promise.resolve({ data: { data: [], last_page: 1 } });
  });

  render(<Dashboard />);

  // Espera a que se muestren los pedidos
  await waitFor(() => {
    expect(screen.getByText(/Crown/i)).toBeInTheDocument();
    expect(screen.getByText(/Bridge/i)).toBeInTheDocument();
    expect(screen.getByText(/Implant/i)).toBeInTheDocument();
  });
});

test('Muestra "No hay pedidos" cuando no hay datos', async () => {
  axios.get.mockResolvedValue({ data: { data: [], last_page: 1 } });

  render(<Dashboard />);

  await waitFor(() => {
    expect(screen.getByText(/No hay pedidos completados/i)).toBeInTheDocument();
    expect(screen.getByText(/No hay pedidos en producción/i)).toBeInTheDocument();
  });
});

test('Muestra "Cargando pedidos..." al inicio', async () => {
  axios.get.mockResolvedValue({ data: { data: [], last_page: 1 } });

  render(<Dashboard />);
  expect(screen.getAllByText(/Cargando pedidos.../i).length).toBeGreaterThan(0);

  // Espera a que termine la carga para evitar warnings de act
  await waitFor(() => {
    expect(screen.queryByText(/Cargando pedidos.../i)).not.toBeInTheDocument();
  });
});
