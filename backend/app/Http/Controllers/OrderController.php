<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // Return all orders
    public function index()
    {
        return Order::all();
    }
}
