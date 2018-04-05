<?php
require 'dbConexion.php';

if($_POST){
    if(!empty($_POST['id']) && $_POST['update'] == "false"){

        echo deletePaciente($_POST['id']);

    }else{

        echo save($_POST);
    }

}elseif(empty($_GET)){

    echo getAll();

}else{
    
    echo getByDni($_GET['dni']);
}

function getAll(){

    $db = new DbConexion;

    $query = $db->query("SELECT * FROM Paciente");

    $rows = [];

    while($row = $query->fetchArray()){
        $rows[] = $row;
    }

    $db->close();

    return json_encode($rows);

}


function getByDni($dni){

    $db = new DbConexion;

    $query = $db->prepare("SELECT * FROM Paciente WHERE dni=:dni");
    
    $query->bindValue(":dni", $dni, SQLITE3_TEXT);

    $result = $query->execute();

    $json = [];

    while($row = $result->fetchArray()){

        $json[] = $row;

    }
    
    $db->close();

    return json_encode($json);

} 


function save($paciente){

    $db = new DbConexion;

    if(empty($paciente['id'])){

        $query = json_decode(getByDni($paciente['dni']));

        if(count($query)>0){

            return json_encode(array("save"=>false,"data"=>$query));

        }else{

            $executed = $db->exec("INSERT INTO Paciente(dni, name, telf) VALUES('". $paciente['dni'] ."','". $paciente['name'] ."','". $paciente['telf'] ."')");

            $db->close();

            return json_encode(array("save"=>$executed,"data"=>$query));
        }

    }else{

        $executed = $db->exec("UPDATE Paciente SET dni='". $paciente['dni'] ."', name='". $paciente['name'] ."', telf='". $paciente['telf'] ."' WHERE dni='". $paciente['id'] ."'");      

        $db->close();

        return json_encode(array("save"=>$executed));

    }

}

function deletePaciente($id){

    $db = new DbConexion;

    $result = $db->exec("DELETE FROM Paciente WHERE dni='". $id ."'");

    $db->close();

    return json_encode($result);
}

?>
