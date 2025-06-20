<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClientController extends Controller
{
    // Listar clientes (GET /api/clients)
    public function index()
    {
        return Client::paginate(10);
    }

    // Crear cliente (POST /api/clients)
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:clients,email',
            'password' => 'required|string|min:8|confirmed',
            'address' => 'required|string',
            'phone' => 'required|string|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $client = Client::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'address' => $request->address,
            'phone' => $request->phone,
            'medical_history' => $request->medical_history ?? null,
            'allergies' => $request->allergies ?? null,
        ]);

        return response()->json([
            'message' => 'Registro exitoso',
            'client' => $client
        ], 201);
    }

    // Mostrar cliente específico (GET /api/clients/{id})
    public function show(Client $client)
    {
        return $client;
    }

    // Actualizar cliente (PUT/PATCH /api/clients/{id})
    public function update(Request $request, Client $client)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:clients,email,' . $client->id,
            'password' => 'sometimes|string|min:8|confirmed',
            'address' => 'sometimes|string',
            'phone' => 'sometimes|string|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $client->update($request->all());
        return response()->json($client);
    }

    // Eliminar cliente (DELETE /api/clients/{id})
    public function destroy(Client $client)
    {
        $client->delete();
        return response()->json(null, 204);
    }
}
