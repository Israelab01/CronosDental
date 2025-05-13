<?php

namespace App\Http\Controllers;

use App\Models\Clinic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClinicController extends Controller
{
    // Obtener todas las clínicas (con búsqueda opcional)
    public function index(Request $request)
    {
        $query = Clinic::query();
        
        if ($request->has('search')) {
            $query->where('nombre', 'like', '%' . $request->search . '%');
        }

        return $query->get();
    }

    // Crear clínica
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|unique:clinics,email',
            'telefono' => 'required|string|max:20',
            'direccion' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        return Clinic::create($request->all());
    }

    // Actualizar clínica
    public function update(Request $request, Clinic $clinic)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:clinics,email,' . $clinic->id,
            'telefono' => 'sometimes|string|max:20',
            'direccion' => 'sometimes|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $clinic->update($request->all());
        return $clinic;
    }

    // Eliminar clínica
    public function destroy(Clinic $clinic)
    {
        $clinic->delete();
        return response()->json(['message' => 'Clínica eliminada']);
    }
}
