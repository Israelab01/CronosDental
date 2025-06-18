<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // Listado paginado y filtrado
    public function index(Request $request)
    {
        $status = $request->query('status');
        $perPage = 5;

        $query = Order::query();

        if ($status) {
            $query->where('status', $status);
        }

        // Permite búsqueda por ID (para el buscador del frontend)
        if ($request->has('search')) {
            return Order::where('id', $request->search)->get();
        }

        return $query->paginate($perPage);
    }

    // Crear pedido
    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'nullable|integer',
            'clinic_name' => 'required|string|max:255',
            'prosthesis_type' => 'required|string|max:255',
            'materials' => 'required|string|max:255',
            'status' => 'required|in:pending,completed,production',
            'delivery_date' => 'required|date',
            'attachments' => 'nullable|json',
            'digital_signature' => 'nullable|integer',
            '3d_model_path' => 'nullable|string'
        ]);
        $order = Order::create($validated);
        return response()->json($order, 201);
    }

    // Mostrar un pedido concreto
    public function show(Order $order)
    {
        return $order;
    }

    // Actualizar pedido
    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'client_id' => 'nullable|integer',
            'clinic_name' => 'required|string|max:255',
            'prosthesis_type' => 'required|string|max:255',
            'materials' => 'required|string|max:255',
            'status' => 'required|in:pending,completed,production',
            'delivery_date' => 'required|date',
            'attachments' => 'nullable|json',
            'digital_signature' => 'nullable|integer',
            '3d_model_path' => 'nullable|string'
        ]);
        $order->update($validated);
        return response()->json($order);
    }

    // Eliminar pedido
    public function destroy(Order $order)
    {
        $order->delete();
        return response()->json(null, 204);
    }
}
