<?php

    class DbConexion extends Sqlite3
    {
        function __construct()
        {
            $this->open("database.db");
            $this->exec("CREATE TABLE IF NOT EXISTS Paciente(
                            dni INT,
                            name TEXT,
                            telf INT)");
        }
                            
    }

?>
