<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // Return all orders
    public function index(Request $request)
{
    $status = $request->query('status');
    $perPage = 5;

    $query = Order::query();
    
    if ($status) {
        $query->where('status', $status);
    }

    return $query->paginate($perPage);
}

}
