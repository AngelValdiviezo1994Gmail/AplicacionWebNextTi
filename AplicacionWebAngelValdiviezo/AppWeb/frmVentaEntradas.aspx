<%@ Page Language="C#" MasterPageFile="~/Principal.Master" AutoEventWireup="true" CodeBehind="frmVentaEntradas.aspx.cs" Inherits="AppWeb.frmVentaEntradas" %>

<asp:Content runat="server" ContentPlaceHolderID="head">
    <script src="<%=ResolveClientUrl("~/App_Themes/Template/bower_components/jquery/dist/jquery.min.js")%>"></script>
    <script type="text/javascript">
        var _Tipo;
        function ContactarPersona() {
            btnEnviarPeticion.DoClick();
        }
        function fcEnviarCorreo(s, e) {
            lpCargando.Show();
            cbEnviaCorreo.PerformCallback();
        }
        //Solo permite introducir números.
        function soloNumeros(s, e) {
            var theEvent = e.htmlEvent || window.event;
            var key = theEvent.keyCode || theEvent.which;

            var txt = s.GetText();

            if (key != 8 || key != 13) txt += String.fromCharCode(key);

            var regex = /^[0-9]*\.?[0-9]*$/;
            if (!regex.test(txt)) {
                theEvent.returnValue = false;
                if (theEvent.preventDefault) theEvent.preventDefault();
            }

            if (key == 13) $("#btnBuscar").click();

        }

        function HabilitaFechas() {
            PanelFechas.PerformCallback();
        }

        function HabilitaCombo() {
            if (cmbTipo.clientEnabled == false) cmbTipo.clientEnabled = true;
            else cmbTipo.clientEnabled = false;
        }

        function EnviarForms() {
            if (dtFecDesde.clientEnabled == true && dtFecHasta.clientEnabled == true) {
                var FDesde = dtFecDesde.GetValue();
                var FHasta = dtFecHasta.GetValue();
                if (FDesde > FHasta) {
                    /*$('#dvmessage').text("La fecha de inicio debe ser menor a la fecha de fin, de click para continuar...");
                    PopAlert.Show();*/
                    PopMensajes.SetContentHtml('Cargando...');
                    PanelMensajes.PerformCallback("La fecha de inicio debe ser menor a la fecha de fin, de click para continuar...");
                } else {
                    btnConsultar.DoClick();
                }
            } else {
                btnConsultar.DoClick();
            }
        }
        function ValueChanged(s, e) {
            _Tipo = chkLstOrigenData.GetValue();
        }

        function EnviarArchivos() {

            if (_Tipo != null) cpListarHistoriasClinicas.PerformCallback();
            else {
                /*$('#dvmessage').text("Por favor seleccione un tipo de Origen de Datos, de click para continuar...");
                PopAlert.Show();*/
                PopMensajes.SetContentHtml('Cargando...');
                PanelMensajes.PerformCallback("Por favor seleccione un tipo de Origen de Datos, de click para continuar...");
            }
        }

        function GeneraPDFMasivo() {
            $("#ContentRuta").removeClass("ocultar");
            /*if (txtRuta.GetValue() != null) cpGeneraPDFMasivo.PerformCallback();
            else {
                $('#dvmessage').text("Por favor Ingrese su IP o Nombre de Equipo, de click para continuar...");
                PopAlert.Show();
            }*/
            cpGeneraPDFMasivo.PerformCallback();
        }

        function fcEnviar(s, e) {

            var EsValido = ValidarCamposForm(s, e);

            if (EsValido) {
                cpListarHistoriasClinicas.PerformCallback();
            }
            else {
                /*$('#dvmessage').text("Por favor ingrese un número de historia clínica, de click para continuar...");
                PopAlert.Show();*/
                PopMensajes.SetContentHtml('Cargando...');
                PanelMensajes.PerformCallback("Por favor ingrese un número de historia clínica, de click para continuar...");
            }
        }

        function ValidarCamposForm(s, e) {
            var var_HistClin = txtHistClinica.GetValue();

            if (var_HistClin != null) {
                e.isValid = true;
            }
            else {
                e.isValid = false;
            }
            return e.isValid;
        }

        function OnTipoChanged(cmbTipo) {

            if (cmbTipo.GetValue() != null) {
                lpCargando.Show();
                if (txtHistClinica.GetValue() != null) {
                    cpListarHistoriasClinicas.PerformCallback();
                    lpCargando.Hide();
                } else {
                    lpCargando.Hide();
                    /*$('#dvmessage').text("Por favor ingrese un número de historia clínica, de click para continuar...");
                    PopAlert.Show();*/
                    PopMensajes.SetContentHtml('Cargando...');
                    PanelMensajes.PerformCallback("Por favor ingrese un número de historia clínica, de click para continuar...");
                }
            }
        }

        function fcEnviar(s, e) {

            var EsValido = ValidarCamposForm(s, e);

            if (EsValido) {
                cpListarHistoriasClinicas.PerformCallback();
            } else {
                /*$('#dvmessage').text("Por favor ingrese un número de historia clínica, de click para continuar...");
                PopAlert.Show();*/
                PopMensajes.SetContentHtml('Cargando...');
                PanelMensajes.PerformCallback("Por favor ingrese un número de historia clínica, de click para continuar...");
            }
        }

        function MostrarOrden(s, e) {
            s.GetRowValues(e.visibleIndex, 'Episodio', OnGetRowValues);
        }

        function OnGetRowValues(values) {
            var mVal = values
            alert('The Value is : ' + mVal);
        }

        function CargarErrores(s, e, HistCli, Epi) {
            PopErrores.SetContentHtml('Cargando...');
            PanelMostrarErrores.PerformCallback(HistCli + '|' + Epi);
        }

        function MuestraAlerta() {
            /*$('#dvmessage').text("Por favor ingrese un número de historia clínica, de click para continuar...");
            PopAlert.Show();*/
            PopMensajes.SetContentHtml('Cargando...');
            PanelMensajes.PerformCallback("Por favor ingrese un número de historia clínica, de click para continuar...");
            //alert("Por favor ingrese un número de historia clínica");
        }

        function DescagarDoc(s, e) {
            var items = ListarArchivos.GetSelectedItems();
            $('#<%=hf_RutaDocumento.ClientID %>').val(items[0].text);
            btnDescargar.DoClick();
        }

        function BackGenerarDocAdjCallBackComplete(s, e) {
            LoadDx.Hide();
        }

        function BackDocAdj() {
            UploadedFilesTokenBox.ClearItems();
            $("#TokenBox").addClass("ocultar");
            $("#ContentBtnGenerar").removeClass("ocultar");
            //$("#ListasValidaciones").removeClass("ocultar");
        }

        function backCorreo(s, e) {
            //0 Exitoso - 1 Error -2 Advertencia -3 Informativo
            lpCargando.Hide();
            if (e.result == '' && e.result == null) return;
            var param = e.result.split('|');

            if (param[1] == "Error") {                
                sessionStorage.setItem('MsmFinal', param[1] + "|" + param[2]);
                PopMensajes.SetContentHtml('Cargando...');
                PanelMensajes.PerformCallback("Surgió un inconveniente al enviar un Correo, " + param[2] + " de click para continuar...");
                return;
            }
            if (param[1] == "Exitoso") {                
                sessionStorage.setItem('MsmFinal', param[1]);
                PopMensajes.SetContentHtml('Cargando...');
                PanelMensajes.PerformCallback('Correo enviado exitosamente, de click para continuar.');
                window.parent.PopOrden.Hide();
                return;
            }
            if (param[1] == "CierraSesion") {
                sessionStorage.setItem('MsmFinal', param[1]);
                PopMensajes.SetContentHtml('Cargando...');
                PanelMensajes.PerformCallback('La sesión ha caducado, en unos momentos debe volver a iniciar sesión.');
                setTimeout('EnviarALogin()', 9000);
                return;
            }
        }
        function EnviarALogin() {
            window.locationf = "~/Login.aspx";
        }
        function MuestraCamposDatosHistorial() {
            $('#FlechaEnviaCorreo').removeClass('ocultar');
            $('#FlechaIzquierdaUno').removeClass('ocultar');
            $('#ContentDatosHistorial').removeClass('ocultar');
            lpMuestra.Hide();
        }

        function MuestraCamposEnviaCorreo() {
            $('#FlechaEnviaCorreo').addClass('ocultar');
            $('#ContentDatosHistorial').addClass('ocultar');
            $('#ContentDatosEnviaCorreo').removeClass('ocultar');
            lpMuestra.Hide();
        }

        function MuestraRegresaDatosPerfil() {
            $('#ContentDatosLider').removeClass('ocultar');
            $('#ContentDatosHistorial').addClass('ocultar');
            lpMuestra.Hide();
        }

        function MuestraRegresaHistorial() {
            $('#ContentDatosEnviaCorreo').addClass('ocultar');
            //$('#ContentDatosHistorial').addClass('ocultar');
            $('#ContentDatosHistorial').removeClass('ocultar');
            lpMuestra.Hide();
        }
        function cpSeleccionaEvento(s, e) {
            var EventoSeleccionado;
            var items = lbEventos.GetSelectedItems();
            for (var i = items.length - 1; i >= 0; i = i - 1) {
                if (EventoSeleccionado == null) EventoSeleccionado = items[i].value;
                else EventoSeleccionado = EventoSeleccionado + "," + items[i].value;
                txtSeleccionados.SetValue(EventoSeleccionado);
            }
        }

    </script>
    <style type="text/css">
        .ocultar {
            display: none;
        }

        .subrayar {
            text-decoration: underline;
        }

        .labelColor {
            color: #005EB8 !important;
        }

        .linea {
            margin-bottom: 3px !important;
            border-left: 1px dashed #DCDCDC;
            margin: 0 7.5px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderMain" runat="server">
    <asp:HiddenField runat="server" ID="hf_RutaDocumento" Value="0"></asp:HiddenField>
    <%--<dx:ASPxHiddenField runat="server" ID="HiddenField" ClientInstanceName="HiddenField"></dx:ASPxHiddenField>--%>
    <div class="box box-info ocultar">

        <div class="box-header with-border">
            <h4 class="box-title" style="font-weight: 500;"><i class="fa fa-archive fa"></i>
                <label>Perfil</label>
            </h4>

            <div class="box-tools pull-right">
                <!-- Collapse Button -->
                <button type="button" class="btn btn-box-tool" data-widget="collapse">
                    <i class="fa fa-minus"></i>
                </button>
            </div>
        </div>
    
    </div>

    <div>
        <header class="navbar navbar-expand headerTop px-4 fixed-top">
            <img src="../../../Imagenes/Iconos/flechita_izquier_Gris.svg" class="btn btn-previous ocultar" id="FlechaIzquierdaUno" style="height: 55px; width: 80px; padding: 0px; margin: 0px 0px 0px -26px;" />
            <img src="../../../Imagenes/Iconos/flechita_izquier_Gris.svg" class="btn btn-previous ocultar" id="FlechaIzquierdaDos" style="height: 55px; width: 80px; padding: 0px; margin: 0px 0px 0px -26px;" />
            <img src="../../Imagenes/Iconos/flechita_dere_Gris.svg" class="btn btnPointer" id="FlechaHistorial" style="height: 55px; width: 80px; padding: 0px; margin-left: 840px; margin-top: -1px;" />
            <img src="../../Imagenes/Iconos/flechita_dere_Gris.svg" class="btn btnPointer ocultar" id="FlechaEnviaCorreo" style="height: 55px; width: 80px; padding: 0px; margin-left: 865px; margin-top: -80px;" />
        </header>
        <div class="container-fluid mt-contenedorMain">
            <div class="row" id="ContentDatosLider">
                <div class="col-md-12" style="margin-left: -28px;">
                    <div class="col-md-6">
                        <div class="px-3 infoDatosCliente">
                            <div class="row" style="margin-top: -38.10px;">
                                <div id="clienteInfoPartial" class="col">
                                    <div class="row mt-3" style="margin-top: 25px;">
                                        <div class="col"></div>
                                        <div class="col col-segmentacionCliente px-0" style="margin-left: 55px; margin-bottom: 15px;">
                                            
                                        </div>
                                        <div class="col"></div>
                                    </div>
                                    <div id="seccionEditablePanelInfoBasicaCliente">
                                        <div id="seccionPanelNombresCliente">
                                            <div class="row">
                                                <div class="col text-center" style="line-height: 16px;">
                                                    
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col text-center" style="line-height: 16px;">
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row" style="margin-bottom: 20px;">
                                            <div class="col text-center">
                                                
                                            </div>
                                        </div>
                                        <div id="seccionPanelEmailTelefonosLider">
                                            <div class="row" style="margin-left: 35px;">
                                                <img src="../../Imagenes/Iconos/emailPanelCliente.svg" class="imgLeftSmall-cel" />
                                                <div class="tooltipMail lightDIN17">

                                                </div>
                                            </div>
                                            <div class="row" style="margin-left: 35px;">
                                                <img src="../../Imagenes/Iconos/celularPanelCliente.svg" class="imgLeftSmall-cel" />
                                                <div class="tooltipMail lightDIN17">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="col">
                            <div class="row">
                                <%--Poner menu--%>
                            </div>
                            <div class="row">
                                <div class="col pt-1" style="margin-left: 330px; margin-top: -950px;">
                                    <div id="mainly" class="loadmaincontent">
                                        <div class="row my-4" style="margin-bottom: 50px;">
                                            <div class="col infoGeneral">
                                                <div class="bd-callout px-2 position-relative" style="padding-top: 6px; padding-bottom: 6px; display: flex; align-items: center; margin-bottom: 15px;">
                                                    <h6 class="mb-0 colorBasic regularDIN20 d-inline-block" style="margin-left: 15px;">Información general</h6>
                                                </div>
                                                <div id="seccionInformacionGeneralCliente" style="margin-left: 15px;">
                                                    <div class="row flex-wrap">
                                                        <div class="col-4 mt-3" style="min-width: 501px;">
                                                            <div class="card cardVertical-card">
                                                                <div class="card-header colorBasic regularDIN21 cardVertical-card-header" style="padding-top: 10px; padding-bottom: 10px;">
                                                                    Personal
                                                                </div>
                                                                <div class="card-body cardVertical-card-body px-5" style="margin-left: 35px;">
                                                                    <div class="row">
                                                                        <div class="col-md-12">
                                                                            <div class="col-md-6">
                                                                                <div class="row EspacioRow ocultar">
                                                                                    <div class="col-md-4">
                                                                                        <label class="control-label labelColor regularDIN15">Ciudad de nacimiento</label>
                                                                                    </div>
                                                                                    <div class="col-md-4">
                                                                                        
                                                                                    </div>
                                                                                </div>
                                                                                <div class="row EspacioRow">
                                                                                    <div class="col-md-4">
                                                                                        <label class="control-label labelColor regularDIN15">Fecha de nacimiento</label>
                                                                                    </div>
                                                                                    <div class="col-md-4">
                                                                                        
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-md-6">
                                                                                <div class="row EspacioRow">
                                                                                    <div class="col-md-4">
                                                                                        <label class="control-label labelColor regularDIN15">Edad</label>
                                                                                    </div>
                                                                                    <div class="col-md-4">
                                                                                        
                                                                                    </div>
                                                                                </div>
                                                                                <div class="row EspacioRow">
                                                                                    <div class="col-md-4">
                                                                                        <label class="control-label labelColor regularDIN15">Estado civil</label>
                                                                                    </div>
                                                                                    <div class="col-md-4">
                                                                                        
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row my-4" style="margin-bottom: 50px;">
                                            <div class="col infoDirecciones">
                                                <div class="bd-callout px-2 position-relative" style="padding-top: 6px; padding-bottom: 6px; display: flex; align-items: center; margin-bottom: 15px;">
                                                    <h6 class="mb-0 colorBasic regularDIN20 d-inline-block" style="margin-left: 15px;">Direcciones</h6>
                                                </div>
                                                <div id="seccionDireccionesCliente" style="margin-left: 15px;">
                                                    <div class="row flex-wrap">
                                                        <div class="col-4 mt-3" style="min-width: 501px;">
                                                            <div class="card cardVertical-card">
                                                                <div class="card-header colorBasic regularDIN21 cardVertical-card-header" style="padding-top: 10px; padding-bottom: 10px;">
                                                                    Domicilio
                                                                </div>
                                                                <div class="card-body cardVertical-card-body px-5" style="margin-left: 35px;">
                                                                    <div class="row">
                                                                        <div class="row EspacioRow">
                                                                            <div class="col-md-4">
                                                                                <label class="control-label labelColor regularDIN15">Dirección</label>
                                                                            </div>
                                                                            <div class="col-md-4">
                                                                                
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row my-4" style="margin-bottom: 50px;">
                                            <div class="col infoDirecciones">
                                                <div class="bd-callout px-2 position-relative" style="padding-top: 6px; padding-bottom: 6px; display: flex; align-items: center; margin-bottom: 15px;">
                                                    <h6 class="mb-0 colorBasic regularDIN20 d-inline-block" style="margin-left: 15px;">Iglesia a la que pertenece</h6>
                                                </div>
                                                <div id="seccionDatosIglesia" style="margin-left: 15px;">
                                                    <div class="row flex-wrap">
                                                        <div class="col-4 mt-3" style="min-width: 501px;">
                                                            <div class="card cardVertical-card">
                                                                <div class="card-header colorBasic regularDIN21 cardVertical-card-header" style="padding-top: 10px; padding-bottom: 10px;">
                                                                    Iglesia
                                                                </div>
                                                                <div class="card-body cardVertical-card-body px-5" style="margin-left: 35px;">
                                                                    <div class="row">
                                                                        <div class="col-md-12">
                                                                            <div class="col-md-6">
                                                                                <div class="row EspacioRow">
                                                                                    <div class="col-md-4">
                                                                                        <label class="control-label labelColor regularDIN15">Nombre</label>
                                                                                    </div>
                                                                                    <div class="col-md-4">
                                                                                        
                                                                                    </div>
                                                                                </div>
                                                                                <div class="row EspacioRow">
                                                                                    <div class="col-md-4">
                                                                                        <label class="control-label labelColor regularDIN15">Teléfono</label>
                                                                                    </div>
                                                                                    <div class="col-md-4">
                                                                                        
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-md-6">
                                                                                <div class="row EspacioRow">
                                                                                    <div class="col-md-4">
                                                                                        <label class="control-label labelColor regularDIN15">Dirección</label>
                                                                                    </div>
                                                                                    <div class="col-md-4">
                                                                                        
                                                                                    </div>
                                                                                </div>
                                                                                <div class="row EspacioRow">
                                                                                    <div class="col-md-4">
                                                                                        <label class="control-label labelColor regularDIN15">Cantón</label>
                                                                                    </div>
                                                                                    <div class="col-md-4">
                                                                                        
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row ocultar" id="ContentDatosHistorial">
                <div class="col-md-12">
                </div>

            </div>
            <div class="row ocultar" id="ContentDatosEnviaCorreo">
               
                <div class="col-xs-12" style="margin-top: 10px;">
                    <div class="col-xs-6">
                        <div class="row EspacioRow" style="margin-top: 10px;">
                            <div class="col-xs-4">
                                <label class="mediumDIN17 mb-0 labelColor">De:</label>
                            </div>
                            <div class="col-xs-3 linea">
                                
                            </div>
                        </div>
                        <div class="row EspacioRow" style="margin-top: 10px;">
                            <div class="col-xs-4">
                                <label class="mediumDIN17 mb-0 labelColor">Clave del correo:</label>
                            </div>
                            <div class="col-xs-3 linea">
                               
                            </div>
                        </div>
                        <div class="row EspacioRow" style="margin-top: 10px;">
                            <div class="col-xs-4">
                                <label class="mediumDIN17 mb-0 labelColor">Asunto:</label>
                            </div>
                            <div class="col-xs-3 linea">
                               
                            </div>
                        </div>
                        <div class="row EspacioRow" style="margin-top: 10px;">
                            <div class="col-xs-4">
                                <label class="mediumDIN17 mb-0 labelColor">Motivo:</label>
                            </div>
                            <div class="col-xs-3 linea">
                               
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-6">
                        <div class="row EspacioRow" style="margin-top: 10px;">
                            <div class="col-xs-2">
                                <label class="mediumDIN17 mb-0 labelColor">Para:</label>
                            </div>
                            <div class="col-xs-3 linea">
                                
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row" style="margin-top: 300px;">
                    <div class="box-footer" style="margin-left: 20px; margin-bottom: 10px;">
                        <div style="margin-top: 0px; width: 90px; float: left; margin-left: 5px; margin-right: 20px;">
                            <button class="btn btn-block btn-primary btn-sm" onclick="ContactarPersona();" style="margin-left: 10px;" type="button">
                                <i aria-hidden="true" class="fa fa-paper-plane-o">&nbsp</i>Contactar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script type="text/javascript">
        $(document).ready(function () {
            $("#FlechaHistorial").on('click', function () {
                lpMuestra.Show();
                $('#FlechaHistorial').addClass('ocultar');
                $('#ContentDatosLider').addClass('ocultar');
                setTimeout('MuestraCamposDatosHistorial()', 5000);
            });
            $("#FlechaEnviaCorreo").on('click', function () {
                lpMuestra.Show();
                $('#FlechaIzquierdaUno').addClass('ocultar');
                $('#FlechaEnviaCorreo').addClass('ocultar');
                $('#FlechaIzquierdaDos').removeClass('ocultar');
                setTimeout('MuestraCamposEnviaCorreo()', 5000);
            });
            $("#FlechaIzquierdaUno").on('click', function () {
                lpMuestra.Show();
                $('#FlechaHistorial').removeClass('ocultar');
                $('#FlechaIzquierdaUno').addClass('ocultar');
                $('#FlechaIzquierdaDos').addClass('ocultar');
                $('#FlechaEnviaCorreo').addClass('ocultar');
                setTimeout('MuestraRegresaDatosPerfil()', 5000);
            });
            $("#FlechaIzquierdaDos").on('click', function () {
                lpMuestra.Show();
                $('#FlechaIzquierdaUno').removeClass('ocultar');
                $('#FlechaIzquierdaDos').addClass('ocultar');
                $('#FlechaEnviaCorreo').removeClass('ocultar');
                setTimeout('MuestraRegresaHistorial()', 5000);
            });
        });

    </script>


<%--    <dx:ASPxLoadingPanel runat="server" Theme="Office2010Blue" Text="Enviando correo..." ID="lpCargando" ClientInstanceName="lpCargando">
    </dx:ASPxLoadingPanel>
    <dx:ASPxLoadingPanel runat="server" Theme="Office2010Blue" Text="Siguiente..." ID="lpMuestra" ClientInstanceName="lpMuestra">
    </dx:ASPxLoadingPanel>--%>
</asp:Content>
