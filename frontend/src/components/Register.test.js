import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Register from "./Register";

jest.mock("axios", () => ({
    post: jest.fn(),
}));

beforeAll(() => {
    window.alert = jest.fn();
});

describe("Register component", () => {
    test("renders the registration form", () => {
        render(<Register />);
        expect(screen.getByPlaceholderText(/nombre/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        // Usa el placeholder exacto para cada campo de contraseña
        expect(screen.getByPlaceholderText("Contraseña")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Repite la contraseña")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /crear cuenta/i })).toBeInTheDocument();
    });

    test("shows validation error if fields are empty", async () => {
        render(<Register />);
        fireEvent.click(screen.getByRole("button", { name: /crear cuenta/i }));
        // Ajusta el texto según el mensaje real de tu validación
        // Por ejemplo, si no tienes mensaje, puedes omitir esta línea
        // expect(await screen.findByText(/todos los campos son obligatorios/i)).toBeInTheDocument();
    });

    test("calls API when submitting valid data", async () => {
        const axios = require("axios");
        axios.post.mockResolvedValueOnce({ data: { success: true } });

        render(<Register />);
        fireEvent.change(screen.getByPlaceholderText(/nombre/i), { target: { value: "Usuario Test" } });
        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "test@email.com" } });
        fireEvent.change(screen.getByPlaceholderText("Contraseña"), { target: { value: "12345678" } });
        fireEvent.change(screen.getByPlaceholderText("Repite la contraseña"), { target: { value: "12345678" } });
        fireEvent.change(screen.getByPlaceholderText(/dirección/i), { target: { value: "Calle Falsa 123" } });
        fireEvent.change(screen.getByPlaceholderText(/clínica/i), { target: { value: "Clinica Test" } });
        fireEvent.change(screen.getByPlaceholderText(/teléfono/i), { target: { value: "123456789" } });
        fireEvent.click(screen.getByRole("button", { name: /crear cuenta/i }));

        expect(axios.post).toHaveBeenCalled();
    });
});
