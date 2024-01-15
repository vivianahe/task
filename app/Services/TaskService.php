<?php

namespace App\Services;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskService
{
    public function index()
    {
        $sql = Task::all();
        $today = date('Y-m-d');
        foreach ($sql as $task) {
            if ($task->due_date < $today && ($task->state === 'En progreso' || $task->state === 'Pendiente')) {
                $task->state = 'Vencida';
                $task->save();
            }
        }
        return response()->json($sql);
    }
    public function store(Request $request)
    {
        $ts = Task::create([
            'name' => $request->name,
            'description' => $request->description,
            'state' => $request->state,
            'due_date' => $request->date
        ]);
        return response()->json($ts);
    }
    public function edit($id)
    {
        $task = Task::where('id', $id)->first();
        return response()->json($task);
    }
    public function update(Request $request, $id)
    {
        Task::where('id', $id)->update([
            'name' => $request->name,
            'description' => $request->description,
            'state' => $request->state,
            'due_date' => $request->date
        ]);
    }
    public function destroy($id)
    {
        $task = Task::find($id);
        if ($task) {
            $task->delete();
        }
    }
    public function updateStateTask(Request $request)
    {
        $query = Task::where('id', $request->id)->update([
            "state" => 'Completada'
        ]);
        return response()->json($query);
    }
}
