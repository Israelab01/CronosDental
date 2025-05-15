<?php

namespace App\Http\Controllers;

use App\Models\Clinic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClinicController extends Controller
{
    public function index(Request $request)
    {
        $query = Clinic::query();
        if ($request->has('search')) {
            $query->where('nombre', 'like', '%' . $request->search . '%');
        }
        return $query->get();
    }

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

 public function update(Request $request, $id)
{
    $clinic = Clinic::findOrFail($id);

    $request->validate([
        'nombre' => 'required|string|max:255',
        'email' => 'required|email|unique:clinics,email,' . $clinic->id,
        'telefono' => 'required|string|max:20',
        'direccion' => 'required|string',
    ]);

    $clinic->nombre = $request->nombre;
    $clinic->email = $request->email;
    $clinic->telefono = $request->telefono;
    $clinic->direccion = $request->direccion;

    $clinic->save();

    return response()->json($clinic);
}





    public function destroy(Clinic $clinic)
    {
        $clinic->delete();
        return response()->json(['message' => 'Clínica eliminada']);
    }
}
