$(function(){

    $(".pacientes-table").hide();
    $("#btnBorrar").hide();

    $("#btnGuardar").click(function(){
       
        // Metodo ajax largo
        
/*
        $.ajax({
            method: "POST",
            url: "save.php",
            data: {name: name.val(), telf:telf.val()}
        }).done(function(msg){
            alert(msg);
            name.val('');
            telf.val('');
        }).fail(function(){
            alert('error');
        }); 
*/

        // Metodo corto
        if(validar()){

        $.post("pacientes.php",$("form").serialize(),function(data){

            if(data.save){

                $("#msg").html("<div class='alert alert-success mt-5'><spam><strong>Los datos se guardaron exitosamente</strong></spam></div>");
                limpiar();

            }else{

                if(data.save == false && data.data.length > 0){
                    
                $("#msg").html("<div class='alert alert-warning mt-5'><span>Error el DNI pertenece al paciente <strong> "+ data.data[0].name +"</strong></span></div>");

                }else{

                    $("#msg").html("<div class='alert alert-warning mt-5'><spam><strong>Error los datos no se guardaron</strong></spam></div>");

                }

            }

        },'json').fail(function(error){ $("#msg").html(JSON.stringify(error)); });
        }else{
            $("#msg").html("<div class='alert alert-warning mt-4'><span>Todos los datos deben estar llenos</span></div>");
        }
    });

    $("#btnBuscar").click(function(){
        
       let dni = $("#dni").val();

        // Metodo ajax largo
/*

       $.ajax({
            dataType: "json",
            url: "getPaciente.php",
            data: {dni: dni}
        }).done(function(data){

            $("#msg").html(data[0]);
            $("#dni").val(data[0].dni);
            $("#name").val(data[0].name);
            $("#telf").val(data[0].telf);


        }).fail(function(error){

            alert(error);

        });
*/

        // Metodo ajax corto

        $.get("pacientes.php",{dni: dni},function(data){

            limpiar();

            if(data.length===0){  

                $("#msg").html("<div class='alert alert-warning mt-5'><spam>El DNI<strong> "+ dni + "</strong> no esta en la base de datos</spam></div>");

            }else{
                
                $("input[name=update]").val("true");
                $("input[name=id]").val(data[0].dni);
                $("#name").val(data[0].name);
                $("#dni").val(data[0].dni);
                $("#telf").val(data[0].telf);
                $("#msg").html("");
                $("#btnBorrar").show();          

            }

        },'json');


    });

    $("#btnBorrar").click(function(){
        
        let result =  confirm("Esta seguro que desea eliminar los datos del paciente "+ $("#name").val());

        $("input[name=update]").val("false");

        if(result){

            $.post("pacientes.php", $("form").serialize(), function(data){
                
                if(data){
                    
                    limpiar();
                    $("#msg").html("<div class='alert alert-success mt-5'><span>Los datos se eliminaron correctamente</span></div>");

                }else{
                                
                    $("#msg").html("<div class='alert alert-danger mt-5'><span>Error los datos no se pudieron eliminar</span></div>");

                }

            },'json').fail(function(error){ $("#msg").html("<div class='alert alert-danger mt-5'><span>"+ JSON.stringify(error) +"</span></div>"); });
            }

    });

    $("#btnVerTodos").click(function(){
    
        $.get("pacientes.php", function(data){
            
            let html="<tr><th>DNI</th><th>NOMBRE</th><th>TELF</th></tr>";
            $.each(data, function(index, value){
                
                html += "<tr><td>"+ value.dni +"</td><td>"+ value.name +"</td><td>"+ value.telf +"</td></tr>";
            
            });

            $("#table").html(html);
            $(".pacientes-table").toggle("slow", function(){
            
                $("#btnVerTodos").text($("#btnVerTodos").text() == "Ocultar" ? "Ver todos":"Ocultar");
            
            });


        },'json').fail(function(error){ alert(error)}); 
    
    });


    function limpiar(){

        $("input[name=update]").val("false");
        $("input[name=id]").val("");
        $("#name").val("");
        $("#dni").val("");
        $("#telf").val("");
        $("#btnBorrar").hide();
    }

    function validar(){

        if($("#dni").val().length == 0 || $("#name").val().length == 0 || $("#telf").val().length == 0){
            return false;
        }
        return true;

    }
});
