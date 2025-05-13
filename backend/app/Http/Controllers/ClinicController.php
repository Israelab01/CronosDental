<?php

namespace App\Http\Controllers;

use App\Models\Clinic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClinicController extends Controller
{
    // Listar todas las clínicas
    public function index()
    {
        return response()->json(Clinic::all());
    }

    // Crear nueva clínica
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|unique:clinics,email',
            'telefono' => 'required|string|max:20',
            'direccion' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $clinic = Clinic::create($request->all());
        return response()->json($clinic, 201);
    }

    // Actualizar clínica
    public function update(Request $request, $id)
    {
        $clinic = Clinic::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'nombre' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:clinics,email,'.$clinic->id,
            'telefono' => 'sometimes|string|max:20',
            'direccion' => 'sometimes|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $clinic->update($request->all());
        return response()->json($clinic);
    }

    // Eliminar clínica
    public function destroy($id)
    {
        $clinic = Clinic::findOrFail($id);
        $clinic->delete();
        return response()->json([
            'message' => 'Clínica eliminada correctamente'
        ]);
    }
}
