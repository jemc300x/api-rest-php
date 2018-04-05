<!DOCTYPE html>
<html lang="es">
<head>
    <title>CRUD PHP y SQLite</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="css/bootstrap.min.css">
</head>
<body>

    <section class="container"> 
        <div class="row">
            <div class="col-md jumbotron mt-2">
                <form id="formPaciente"> 
                    <div class="form-group">
                        <input type="hidden" name="id" value=""> 
                        <input type="hidden" name="update" value="false">
                        <label for="name">Nombre</label>
                        <input type="text" name="name" id="name" class="form-control"> 
                    </div>

                    <div class="form-group">
                        <label for="dni">DNI</label>
                        <div class="input-group">
                            <input type="text" name="dni" id="dni" class="form-control">
                            <div class="input-group-append">
                                <button type="button" id="btnBuscar" class="btn btn-secondary">Buscar</button>
                            </div>
                        </div>                            
                    </div>

                    <div class="form-group">
                        <label for="telf">Telf</label>
                        <input type="telf" name="telf" id="telf" class="form-control">
                    </div>
                    <button type="button" class="btn btn-primary" id="btnGuardar">Guardar</button>
                    <button type="button" class="btn btn-danger" id="btnBorrar">Eliminar</button>
                    <button type="button" class="btn btn-secundary" id="btnVerTodos" >Ver todos</button>
                </form>
                <!--div class="row justify-content-md-center"-->
                     <div id="msg" class="text-center"></div>
                <!--/div-->
            </div>
        </div>
    </section>
    <section class="container">
        <div class="row">
            <div class="col">
                <div class="pacientes-table mt-4">
                    <table id="table" class="table"></table>
                </div>
            </div>
        </div>
    </section>

<script src="js/jquery-3.3.1.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/script.js"></script>
</body>
</html> 
