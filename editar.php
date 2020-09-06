<?php  include 'inc/layout/header.php';    
include 'inc/funciones/funciones.php';   

$id = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);

if(!$id){
    die("NO valido");
}

$resultado = obtenerContactosE($id);
$contacto = $resultado->fetch_assoc();

?>

<div class="contenedor-barra">
    <div class="contenedor barra">
        <a href="index.php" class="btn volver" style="font-size:1.3em;">Volver</a>
        <h1>Editar contacto</h1>
    </div>
</div>

<div class="bg-amarillo contenedor sombra">
     <form id="contacto" action="#">
          <legend>Edite el contacto <span></legend>

          <?php include 'inc/layout/formulario.php'; ?>

     </form>
</div>

<?php include 'inc/layout/footer.php'; ?>