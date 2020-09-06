<div class="campos">
    <div class="campo">
        <label for="nombre">Nombre:</label>
        <input type="text" 
               placeholder="Nombre Contacto" 
               id="nombre"
               value="<?php echo ($contacto["nombre"]) ? $contacto["nombre"]: '' ; ?>">
               <!--Se usa el operador ternario para que en caso de que haya algo en $contacto["nombre"] ponga su valor y 
               si no que no ponga nada-->
    </div>
    <div class="campo">
        <label for="empresa">Empresa:</label>
        <input type="text" 
               placeholder="Nombre Empresa" 
               id="empresa"
               value="<?php echo ($contacto["empresa"]) ? $contacto["empresa"]: '' ; ?>">
    </div>
    <div class="campo">
        <label for="telefono">Telefono:</label>
        <input type="tel" 
               placeholder="Telefono Contacto" 
               id="telefono"
               value="<?php echo ($contacto["telefono"]) ? $contacto["telefono"]: '' ; ?>">
    </div>
               
</div>
    <div class="campo enviar">
        <?php
            $textoBtn = ($contacto["telefono"]) ? 'Guardar': 'Añadir' ;
            $accion = ($contacto["telefono"]) ? 'editar': 'crear' ;
        ?>
        <input type="hidden" id="accion" value="<?php echo $accion; ?>">
        <?php if( isset( $contacto['id_contacto'] )) { ?>
            <!--Revisar que exista la variable para mandarlos por ajax-->
          <input type="hidden" id="id" value="<?php echo $contacto['id_contacto']; ?>">
     <?php } ?>
        <input type="submit" value= <?php echo $textoBtn; ?> >
    </div>