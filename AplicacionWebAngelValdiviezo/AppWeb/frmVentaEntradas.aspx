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
    
    <div>
        <header class="navbar navbar-expand headerTop px-4 fixed-top">
            
        </header>
        <div class="container-fluid mt-contenedorMain">
           <table>
                                <tr><td>
                                <%--<asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" DataKeyNames="Id, Type" OnRowCancelingEdit="grdEventos_RowCancelingEdit" OnRowDataBound="grdEventos_RowDataBound" OnRowEditing="grdEventos_RowEditing" OnRowUpdating="grdEventos_RowUpdating" OnRowCommand="grdEventos_RowCommand" ShowFooter="True" OnRowDeleting="grdEventos_RowDeleting"> --%>
                                <asp:GridView ID="grdEventos" runat="server" AutoGenerateColumns="False" OnRowCancelingEdit="grdEventos_RowCancelingEdit" OnRowDataBound="grdEventos_RowDataBound" OnRowEditing="grdEventos_RowEditing" OnRowUpdating="grdEventos_RowUpdating" OnRowCommand="grdEventos_RowCommand" ShowFooter="True" OnRowDeleting="grdEventos_RowDeleting"> 
                                <Columns> 
                                    <asp:TemplateField HeaderText="ID"  HeaderStyle-HorizontalAlign="Left"> 
                                        <EditItemTemplate> 
                                            <asp:Label ID="lblId" runat="server" Text='<%# Bind("Id") %>'></asp:Label>
                                        </EditItemTemplate> 
                                        <%--<ItemTemplate> 
                                            <asp:Label ID="lblId" runat="server" Text='<%# Bind("Id") %>'></asp:Label> 
                                        </ItemTemplate> --%>
                                    </asp:TemplateField> 
                                
                                    <asp:TemplateField HeaderText="Fecha de evento" HeaderStyle-HorizontalAlign="Left"> 
                                        <EditItemTemplate> 
                                            <asp:TextBox ID="txtName" runat="server" Text='<%# Bind("Name") %>'></asp:TextBox> 
                                        </EditItemTemplate> 
                                        <FooterTemplate> 
                                            <%--<asp:Calendar ID="dtFehcaEvento" runat="server"></asp:Calendar>
                                            <DatePicker SelectedDate="2000-12-31"></DatePicker>--%>
                                            <input type="date" style="width: 100px;" readonly="readonly" name="Date" id="Date" class="hasDatepicker"/>
                                        </FooterTemplate> 
                                        <%--<ItemTemplate> 
                                            <asp:Label ID="lblName" runat="server" Text='<%# Bind("Name") %>'></asp:Label> 
                                        </ItemTemplate> --%>
                                    </asp:TemplateField> 
                                    
                                    <asp:TemplateField HeaderText="Lugar de evento" HeaderStyle-HorizontalAlign="Left"> 
                                        <EditItemTemplate> 
                                            <asp:TextBox ID="txtLugarEvento" runat="server" Text='<%# Bind("Name") %>'></asp:TextBox> 
                                        </EditItemTemplate> 
                                       <%-- <ItemTemplate> 
                                            <asp:Label ID="lblSex" runat="server" Text='<%# Eval("Sex") %>'></asp:Label> 
                                        </ItemTemplate> --%>
                                        <FooterTemplate> 
                                            <asp:TextBox ID="txtLugarEvento" runat="server" Text='<%# Bind("Name") %>'></asp:TextBox> 
                                        </FooterTemplate> 
                                    </asp:TemplateField>

                                    <asp:TemplateField HeaderText="# de entrada" HeaderStyle-HorizontalAlign="Left"> 
                                        <EditItemTemplate> 
                                            <asp:TextBox ID="txtNumeroEntrada" runat="server" Text='<%# Bind("Name") %>'></asp:TextBox> 
                                        </EditItemTemplate> 
                                        <%--<ItemTemplate> 
                                            <asp:Label ID="lblType" runat="server" Text='<%# Eval("Type") %>'></asp:Label> 
                                        </ItemTemplate> --%>
                                        <FooterTemplate> 
                                            <asp:TextBox ID="txtNumeroEntrada" runat="server" Text='<%# Bind("Name") %>'></asp:TextBox> 
                                        </FooterTemplate> 
                                    </asp:TemplateField> 

                                    <asp:TemplateField HeaderText="Descripción de evento" HeaderStyle-HorizontalAlign="Left"> 
                                        <EditItemTemplate> 
                                            <asp:TextBox ID="txtNameEvento" runat="server" Text='<%# Bind("Name") %>'></asp:TextBox> 
                                        </EditItemTemplate> 
                                        <FooterTemplate> 
                                            <asp:TextBox ID="txtNewName" runat="server" ></asp:TextBox> 
                                        </FooterTemplate> 
                                        <%--<ItemTemplate> 
                                            <asp:Label ID="lblName" runat="server" Text='<%# Bind("Name") %>'></asp:Label> 
                                        </ItemTemplate> --%>
                                    </asp:TemplateField> 

                                    <asp:TemplateField HeaderText="Precio" HeaderStyle-HorizontalAlign="Left"> 
                                        <EditItemTemplate> 
                                            <asp:TextBox ID="txtPrecio" runat="server" Text='<%# Bind("Name") %>'></asp:TextBox> 
                                        </EditItemTemplate> 
                                        <FooterTemplate> 
                                            <asp:TextBox ID="txtPrecio" runat="server" ></asp:TextBox> 
                                        </FooterTemplate> 
                                        <%--<ItemTemplate> 
                                            <asp:Label ID="lblName" runat="server" Text='<%# Bind("Name") %>'></asp:Label> 
                                        </ItemTemplate> --%>
                                    </asp:TemplateField> 
                                    
            
                                    <asp:TemplateField HeaderText="Edit" ShowHeader="False" HeaderStyle-HorizontalAlign="Left"> 
                                        <EditItemTemplate> 
                                            <asp:LinkButton ID="lbkUpdate" runat="server" CausesValidation="True" CommandName="Update" Text="Update"></asp:LinkButton> 
                                            <asp:LinkButton ID="lnkCancel" runat="server" CausesValidation="False" CommandName="Cancel" Text="Cancel"></asp:LinkButton> 
                                        </EditItemTemplate> 
                                        <FooterTemplate> 
                                            <asp:LinkButton ID="lnkAdd" runat="server" CausesValidation="False" CommandName="Insert" Text="Insert"></asp:LinkButton> 
                                        </FooterTemplate> 
                                        <%--<ItemTemplate> 
                                            <asp:LinkButton ID="lnkEdit" runat="server" CausesValidation="False" CommandName="Edit" Text="Edit"></asp:LinkButton> 
                                        </ItemTemplate> --%>
                                    </asp:TemplateField> 

                                    <asp:CommandField HeaderText="Delete" ShowDeleteButton="True" ShowHeader="True" /> 
                                </Columns> 
                                </asp:GridView> 
                                </td></tr>
                              </table> 
                  
        
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
