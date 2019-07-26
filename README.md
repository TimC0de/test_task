# test_task
This is the test task for my interview

## Installation

#### Clone repository
1. Open Command Line
2. Go to the directory where you want the repository to be unpacked
3. Run `git clone https://github.com/TimC0de/test_task.git`
4. Go to the repository folder to start configuring project (From the directory where you want the repository to be unpacked type: `cd test_task`)

#### Back-end:
1. Run the `composer install` command in Command Line
(If you don't have `composer` installed, download it from [here](https://getcomposer.org/download/))
2. Run the `php artisan migrate:fresh --seed` command in Command Line to migrate all database table and fill them with data
2. Run the `php artisan serve` command in Command Line to start the server

#### Front-end:
1. Go to the `front` directory (From repository root folder, type: `cd front`)
2. Run the `npm i` command in Command Line
(`npm` is installed with Node.js. If you don't have Node.js installed, download it from [here](https://nodejs.org/en/download/))
3. Run the `npm start` command in Command Line to launch Angular application

#### Notes
You might need to specify different database name it's not like the default one (Default database name is `dentist_schedule`)
To do that you need to:

1. Go to the repository root folder
2. Find `.env` file
3. Open it
4. Find `DB_DATABASE` key and replace the value with the name of your database
5. Repeat every step from 3 with the `.env.example` file.
