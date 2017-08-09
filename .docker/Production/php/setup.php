<?php
/**
 * Initial startup/setup file
 */

/*
 * Command-Line Options
 */
// Map passed arguments and set default values
$host = getenv("DATABASE_HOST") ?? "localhost";
$port = getenv("DATABASE_PORT") ?? "3306";
$user = getenv("DATABASE_USER") ?? "root";
$password = getenv("DATABASE_PASSWORD") ?? "";
$database = getenv("DATABASE_NAME");
$timeout = -1;
$flow_bin  = getenv("FLOW_BIN") ?? "/var/www/html/flow";

/**
 * Helper class
 */
class Utility
{
    protected static $stdout;
    protected static $stderr;

    public static function log(string $msg)
    {
        if (static::$stdout === null) {
            static::$stdout = fopen('php://stdout', 'w');
        }
        fwrite(static::$stdout, $msg . "\n");
    }

    public static function logf(string $msg, ...$args)
    {
        static::log(sprintf($msg, ...$args));
    }

    public static function err(string $msg)
    {
        if (static::$stderr === null) {
            static::$stderr = fopen('php://stderr', 'w');
        }
        fwrite(static::$stderr, $msg . "\n");
    }

    public static function errf(string $msg, ...$args)
    {
        static::err(sprintf($msg, ...$args));
    }

    public static function exec(string $ex)
    {
        $buffer = [];
        $code = 0;

        exec($ex, $buffer, $code);
        Utility::log(implode("\n", $buffer));

        if ($code != 0) {
            Utility::err("Failed to execute `$ex`. Output:\n\n" . implode("\n", $buffer));
            exit(1);
        }
    }
}

/*
 * Check for database
 */
function getConnection()
{
    global $host, $port, $user, $password, $database, $timeout;
    $dsn = "mysql:host=$host;port=$port;dbname=$database;";
    $try = 0;
    do {
        try {
            return new PDO($dsn, $user, $password);
        } catch (PDOException $e) {
            Utility::errf("MySQL Connection Error (%s): %s", $e->getCode(), $e->getMessage());
        }
        sleep(3);
    } while($timeout == -1 || $timeout > ++$try);

    Utility::err("Max retries reached while trying to connect to database. Exiting");
    exit(1);
}

function setupFlow()
{
    global $flow_bin;
    Utility::exec("{$flow_bin} flow:core:setfilepermissions");
}

function migrate()
{
    global $flow_bin;
    Utility::exec("{$flow_bin} doctrine:migrate");
}

function freshen()
{
    global $flow_bin;
    Utility::exec("{$flow_bin} flow:cache:flush && {$flow_bin} cache:warmup");
}


/* Execute tasks */
getConnection(); // Just make sure, that there this a database connection

setupFlow();
migrate();
freshen();