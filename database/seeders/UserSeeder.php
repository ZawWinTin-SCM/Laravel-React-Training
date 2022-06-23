<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => config('super-admin.auth.name'),
            'email' => config('super-admin.auth.email'),
            'email_verified_at' => now(),
            'password' => bcrypt(config('super-admin.auth.password')),
        ]);
    }
}
