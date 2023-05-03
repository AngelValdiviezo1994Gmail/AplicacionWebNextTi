/**
 * Mensajes de alertas en notificaciones del sistema
 * -----------------------------------------------
 * Hacer referencia de este archivo en formularios para su uso
 */

 
/**
* Metodo que muestra la alerta de mensajeria
*
* @param String codmsn - codigo del mensaje
* @param String msn - mensaje a mostrar
* @returns void
*/
function ShowNotify(codmsn, msn)
{
		if (codmsn == 0)//exitoso
		{

			AlertNotify('Exito!', msn, 'success');
		}

		if (codmsn == 1)//Error
		{

			AlertNotify('Error!', msn, 'danger');
		}

		if (codmsn == 2)//Advertencia
		{

			AlertNotify('Advertencia!', msn, 'warning');
		}
		if (codmsn == 3)//Info
		{

		    AlertNotify('Informativo!', msn, 'info');
		}
}

/**
   * Get a prestored setting
   *
   * @param String title - titulo del mensaje
   * @param String msn - Mensaje a mostrar
   * @param String notifytype - tipo de alerta
   * @returns void
   */
function AlertNotify(title,msn,notifytype)
{
	$.notify({
		title: '<strong>' + title + '</strong>',
		message: msn
	}, {
		type: notifytype
					  
	});
	
}

/*
function FcCancelar() {
    window.parent.PopRequerimientos.Hide();
}*/

function disableEnterKey(e) {
    var key;
    if (window.event) {
        key = window.event.keyCode; //funciona en Internet Explorar
    } else {
        key = e.which; //funciona en firefox 
    }
    if (key == 13) {
        return false;
    } else {
        return true;
    }
}


  