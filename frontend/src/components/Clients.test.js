import React from "react";
import { render, screen } from "@testing-library/react";
import Clients from "./Clients";

jest.mock("axios", () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
}));

beforeAll(() => {
    window.alert = jest.fn();
});

describe("Clients component basic rendering", () => {
    test("renders the sidebar logo", () => {
        render(<Clients />);
        const logo = screen.getByAltText(/logo/i);
        expect(logo).toBeInTheDocument();
    });

    test("renders the sidebar menu items", () => {
        render(<Clients />);
        expect(screen.getAllByText(/Dashboard/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/Clientes/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/Pedidos/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/Cerrar sesión/i).length).toBeGreaterThan(0);
    });

    test("renders the panel titles", () => {
        render(<Clients />);
        expect(
            screen.getByText(/Buscar cliente por nombre de la clínica/i)
        ).toBeInTheDocument();
        expect(screen.getByText(/Añadir nueva clínica/i)).toBeInTheDocument();
    });
});
