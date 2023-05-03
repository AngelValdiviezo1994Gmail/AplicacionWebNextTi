
var optionsVisorPdfRegistroPN = {
    width: "695px",
    height: "412px",
    pdfOpenParams: {
        pagemode: 'thumbs',
        navpanes: '0',
        toolbar: '0',
        statusbar: '0',
        view: 'FitH',
        zoom: '50'
    }
};

var optionsVisorPdfConsultaIntegralPN = {
    width: "695px",
    height: "412px",
    pdfOpenParams: {
        pagemode: 'thumbs',
        navpanes: '0',
        toolbar: '0',
        statusbar: '0',
        view: 'FitH',
        zoom: '50'
    }
};


var CtxWizard = {
    MostrarMsjValidacionCliente: function () {
        _Url = "ConsultarMensaPartialWizard";
        $.ajax(
            {
                type: "POST",
                url: _Url,
                contentType: "application/json; charset=UTF-8",
                dataType: "html",
                success: function (data) {
                    $("div#SeccionMensajes").html(data);
                }
            }
        );
    },

    init: function () {
        this.MostrarMsjValidacionCliente();
    }
};

var CtxDocRegPN = {


    onUploadControlFileUploadCompleteCI: function (s, e) {

        if (e.isValid) {
            var callbackData = e.callbackData;
            if (callbackData != "") {
                var pathFilePdfJs = "../.." + callbackData.split('|')[0];
                var pathFisicaFilePdf = callbackData.split('|')[1];
                var filename = callbackData.split('|')[2];
                var siglas = filename.substr(0, 3).toUpperCase();
                if (siglas == "CED" || siglas == "PAS") {
                    $('.CircleDoc').removeClass("CirclePlomo");
                    $('.CircleDoc').addClass("CircleBlue");
                    _pathfile_DI.SetText(pathFisicaFilePdf);
                    _pathfileJs_DI.SetText(pathFilePdfJs);
                    _filename_DI.SetText(filename);

                    PDFObject.embed(pathFilePdfJs, "#uploadedFilePdfCI", optionsVisorPdfRegistroPN);
                } else {
                    CtxGen.MensajesTemporalesDelSistema("", "En esta sección sólo se permite cargar cédula o pasaporte.");
                }

            }

        } else {

            CtxGen.MensajesTemporalesDelSistema("", e.errorText);
        }

        CtxDocRegPN.setElementVisible("uploadedFilePdfCI", e.isValid);
    },
    onFileLoadCI: function () {
        var externalDropZone = $("#externalDropZoneCI");
        var _uploadedFilePdf = $("#uploadedFilePdfCI");
        _uploadedFilePdf.css({
            left: (externalDropZone.width() - _uploadedFilePdf.width()) / 2,
            top: (externalDropZone.height() - _uploadedFilePdf.height()) / 2
        });
        CtxDocRegPN.setElementVisible("dragZoneCI", false);
    },
    onUploadControlFileUploadCompletePla: function (s, e) {

        if (e.isValid) {
            var callbackData = e.callbackData;
            if (callbackData != "") {
                var pathFilePdfJs = "../.." + callbackData.split('|')[0];
                var pathFisicaFilePdf = callbackData.split('|')[1];
                var filename = callbackData.split('|')[2];
                var siglas = filename.substr(0, 3).toUpperCase();
                if (siglas == "PLA") {
                    $('.CircleDocPla').removeClass("CirclePlomo");
                    $('.CircleDocPla').addClass("CircleBlue");
                    _pathfile_Planilla.SetText(pathFisicaFilePdf);
                    _pathfileJs_Planilla.SetText(pathFilePdfJs);
                    _filename_Planilla.SetText(filename);
                    PDFObject.embed(pathFilePdfJs, "#uploadedFilePdfPla", optionsVisorPdfRegistroPN);
                } else {
                    CtxGen.MensajesTemporalesDelSistema("", "En esta sección sólo se permite cargar la planilla de servicios.");
                }

            }



        } else {
            CtxGen.MensajesTemporalesDelSistema("", e.errorText);
        }

        CtxDocRegPN.setElementVisible("uploadedFilePdfPla", e.isValid);
    },
    onFileLoadPla: function () {
        var externalDropZone = $("#externalDropZonePla");
        var _uploadedFilePdfPla = $("#uploadedFilePdfPla");
        _uploadedFilePdfPla.css({
            left: (externalDropZone.width() - _uploadedFilePdfPla.width()) / 2,
            top: (externalDropZone.height() - _uploadedFilePdfPla.height()) / 2
        });
        CtxDocRegPN.setElementVisible("dragZonePla", false);
    },
    setElementVisible: function (elementId, visible) {
        var el = $("#" + elementId);
        if (visible)
            el.show();
        else
            el.hide();
    },

    ConfirmarsubidaDeDocumentos: function (TIPODOC) {
        switch (TIPODOC) {
            case "CED":
                $("#ContentCedula").removeClass("MarzoAzul");
                $("#ContentCedula").addClass("MarzoAzul2px");
                $("#Hidden_IngresoCedula").val('Si');
                _confirma_DI.SetText('Si');
                break;
            case "PLA":
                $("#Planilla").removeClass("MarzoAzul");
                $("#Planilla").addClass("MarzoAzul2px");
                $("#Hidden_IngresoPlanilla").val('Si');
                _confirma_Planilla.SetText('Si');
                break;
        };

        if ($("#Hidden_IngresoCedula").val() != "") {
            $('#TieneCamposVacios').val("OK");
        }
    },

    RecuperarDocumentosRegPN: function (_confirma_DI, _pathfileJs_DI, _confirmaPla, _pathfileJs_Pla) {

        if (_confirma_DI == "Si") {

            //Cedula
            $("#ContentCedula").removeClass("MarzoAzul");
            $("#ContentCedula").addClass("MarzoAzul2px");
            $('.CircleDoc').removeClass("CirclePlomo");
            $('.CircleDoc').addClass("CircleBlue");
            $("#Hidden_IngresoCedula").val('Si');
            PDFObject.embed(_pathfileJs_DI, "#uploadedFilePdfCI", optionsVisorPdfRegistroPN);
            CtxDocRegPN.setElementVisible("uploadedFilePdfCI", true);

            //Planilla
            if (_pathfileJs_Pla != "") {
                $("#Planilla").removeClass("MarzoAzul");
                $("#Planilla").addClass("MarzoAzul2px");
                $('.CircleDocPla').removeClass("CirclePlomo");
                $('.CircleDocPla').addClass("CircleBlue");
                $("#Hidden_IngresoPlanilla").val('Si');

                PDFObject.embed(_pathfileJs_Pla, "#uploadedFilePdfPla", optionsVisorPdfRegistroPN);
            }
            CtxDocRegPN.setElementVisible("uploadedFilePdfPla", true);
        }
    },


};

var CtxDocConsultaPN = {

    MostrarPopupDIDocsConsultaPN: function (nombreCliente, tipoIdentificacion, identificacion) {
        loadingContentMainly.Show();
        $.ajax({
            cache: false,
            type: "POST",
            async: true,
            url: '../../Clientes/Clientes/CargarDocsDiPartial',
            contentType: 'application/json; charset=utf-8',
            datatype: 'html',
            data: JSON.stringify({ Nombres: nombreCliente, TipoIdentificacion: tipoIdentificacion, Identificacion: identificacion }),
            success: function (response) {
                loadingContentMainly.Hide();
                $("div#popupContainerDI").empty().html(response);
                DIpopupControl.Show();
                $("#nombres_DI").val(nombreCliente);
                MVCxClientUtils.FinalizeCallback();
            },
           
        });
    },
    MostrarPopupPLADocsConsultaPN: function (nombreCliente, tipoIdentificacion, identificacion) {
        loadingContentMainly.Show();
        $.ajax({
            cache: false,
            type: "POST",
            async: true,
            url: '../../Clientes/Clientes/CargarDocsPlaPartial',
            contentType: 'application/json; charset=utf-8',
            datatype: 'html',
            data: JSON.stringify({ Nombres: nombreCliente, TipoIdentificacion: tipoIdentificacion, Identificacion: identificacion }),
            success: function (response) {
                loadingContentMainly.Hide();
                $("div#popupContainerPLA").empty().html(response);
                popupPlanillaServBasicos.Show();
                $("#nombres_PLA").val(nombreCliente);
                MVCxClientUtils.FinalizeCallback();
            },
            
        });
    },

    onUploadControlFileUploadCompleteCI: function (s, e) {

        if (e.isValid) {
            var callbackData = e.callbackData;
            if (callbackData != "") {
                var pathFilePdfJs = "../.." + callbackData.split('|')[0];
                var pathFisicaFilePdf = callbackData.split('|')[1];
                var filename = callbackData.split('|')[2];
                var siglas = filename.substr(0, 3).toUpperCase();
                if (siglas == "CED" || siglas == "PAS") {
                    //$('.CircleDoc').removeClass("CirclePlomo");
                    //$('.CircleDoc').addClass("CircleBlue");
                    $('.CircleDoc').attr('style', 'display:block;cursor:pointer;padding-top: 15px;');

                    $("#UpdateDocIdentidad").css("display", "none");
                    $("#pathfile_DI").val(pathFisicaFilePdf);
                    $("#pathfileJs_DI").val(pathFilePdfJs);
                    $("#filename_DI").val(filename);
                    $("#filename_PLA").val("");

                    PDFObject.embed(pathFilePdfJs, "#uploadedFilePdfCI", optionsVisorPdfConsultaIntegralPN);
                } else {
                    CtxDocConsultaPN.MsnTempSistemaVisorDocs("", "En esta sección sólo se permite cargar cédula o pasaporte.");
                }
            }

        } else {

            CtxDocConsultaPN.MsnTempSistemaVisorDocs("", e.errorText);
        }

        CtxDocRegPN.setElementVisible("uploadedFilePdfCI", e.isValid);
    },
    onUploadControlFileUploadCompletePla: function (s, e) {

        if (e.isValid) {
            var callbackData = e.callbackData;
            if (callbackData != "") {
                var pathFilePdfJs = "../.." + callbackData.split('|')[0];
                var pathFisicaFilePdf = callbackData.split('|')[1];
                var filename = callbackData.split('|')[2];
                var siglas = filename.substr(0, 3).toUpperCase();
                if (siglas == "PLA") {
                    //$('.CircleDocPla').removeClass("CirclePlomo");
                    //$('.CircleDocPla').addClass("CircleBlue");
                    $('.CircleDocPla').attr('style', 'display:block;cursor:pointer;padding-top: 15px;');
                    $("#UpdateDocPlanilla").css("display", "none");
                    $("#pathfile_PLA").val(pathFisicaFilePdf);
                    $("#pathfileJs_PLA").val(pathFilePdfJs);
                    $("#filename_PLA").val(filename);
                    $("#filename_DI").val("");
                    PDFObject.embed(pathFilePdfJs, "#uploadedFilePdfPla", optionsVisorPdfConsultaIntegralPN);
                } else {
                    CtxDocConsultaPN.MsnTempSistemaVisorDocs("", "En esta sección sólo se permite cargar la planilla de servicios.");
                }
            }
        } else {
            CtxDocConsultaPN.MsnTempSistemaVisorDocs("", e.errorText);
        }
        CtxDocRegPN.setElementVisible("uploadedFilePdfPla", e.isValid);
    },
    MsnTempSistemaVisorDocs: function (codigo, msn) {
        var _Url = "../../Base/MensajesTemporalesDelSistema";
        var Codigo = codigo = codigo != null && codigo != "" ? codigo : "";

        $.ajax(
            {
                type: "POST",
                url: _Url,
                async: true,
                contentType: "application/json; charset=UTF-8",
                dataType: "html",
                data: JSON.stringify({ Codigo: Codigo, Mns: msn }),
                success: function (data) {
                    $("div#SeccionMsnTempSistemaVisorDocs").empty().html(data);
                    setTimeout(function () {
                        $("div#SeccionMsnTempSistemaVisorDocs div").remove();
                    }, 10000);
                },
                

            }
        );
    },
    fnValidaActualizacionDocs: function (tipoDoc) {
        switch (tipoDoc) {
            case "CED":
                var filename_DI = $("#filename_DI").val();
                if (filename_DI != "" && filename_DI != undefined) {

                    $('#confirConsultaDocsPersDI').modal('show');

                } else {
                    CtxDocConsultaPN.MsnTempSistemaVisorDocs("", "Por favor actualice el documento identidad.");

                }
                break;
            case "PLA":
                var filename_PLA = $("#filename_PLA").val();
                if (filename_PLA != "" && filename_PLA != undefined) {

                    $('#confirConsultaDocsPersPla').modal('show');
                } else {
                    CtxDocConsultaPN.MsnTempSistemaVisorDocs("", "Por favor actualice la planilla de servicios.");

                }
                break;
        };
    },
    fnActualizarDocumentosPersonales: function () {

        var filename_DI = $("#filename_DI").val();
        var filename_PLA = $("#filename_PLA").val();

        //Documento Identidad
        if (filename_DI != "" && filename_DI != undefined) {

            var nombres = $("#nombres_DI").val();
            var pathfile_DI = $("#pathfile_DI").val();
            CtxDocConsultaPN.fnActualizarDocumentoIdentidad(nombres, filename_DI, pathfile_DI);
        }

        //Planilla Servicios 
        if (filename_PLA != "" && filename_PLA != undefined) {
            var nombres = $("#nombres_PLA").val();
            var pathfile_PLA = $("#pathfile_PLA").val();
            CtxDocConsultaPN.fnActualizarPlanillaServBasicos(nombres, filename_PLA, pathfile_PLA);
        }

    },
    fnActualizarDocumentoIdentidad: function (nombres, fileName, pathfile) {

        $.ajax({
            type: "POST",
            url: '../../Clientes/Clientes/ActualizarDocIdentidadOnBase',
            async: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ nombres: nombres, fileName: fileName, pathfile: pathfile }),
            success: function (response) {

                $('#confirConsultaDocsPersDI').modal('hide');
                DIpopupControl.Hide();
                if (response.OK) {
                    //El documento de identidad se ha actualizado satisfactoriamente.
                    CtxGen.MensajesTemporalesDelSistema("GEN_MENS", "");
                    //presenta mensaje actualizacion exitosa documento
                } else {
                    //Presenta msj de EXCEPCIONES
                    CtxGen.ErroresExcepcionesShow(response);
                }
            }
            
        });
    },
    fnActualizarPlanillaServBasicos: function (nombres, fileName, pathfile, _popupConfirma) {
        $.ajax({
            type: "POST",
            url: '../../Clientes/Clientes/ActualizarPlaServBasicosOnBase',
            async: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ nombres: nombres, fileName: fileName, pathfile: pathfile }),
            success: function (response) {

                $('#confirConsultaDocsPersPla').modal('hide');
                popupPlanillaServBasicos.Hide();
                if (response.OK) {
                    //El documento de identidad se ha actualizado satisfactoriamente.
                    CtxGen.MensajesTemporalesDelSistema("GEN_MENS", "");
                    //presenta mensaje actualizacion exitosa documento
                } else {
                    //Presenta msj de EXCEPCIONES
                    CtxGen.ErroresExcepcionesShow(response);
                }
            }
           
        });
    },

    fnCerrarModalVisorDocsPersonales: function (tipoDoc) {
        var filename = "";
        var flag = "";
        switch (tipoDoc) {
            case "CED":
                {
                    var filenameDI = $("#filenameJs_DI").val();

                    if (filenameDI != "" && filenameDI != undefined) {
                        filename = filenameDI;
                        flag = "true";
                    }
                    if (flag == "") {
                        filename = $("#filename_DI").val();
                    }

                    break;
                }
            case "PLA":
                {
                    var filenamePLA = $("#filenameJs_PLA").val();

                    if (filenamePLA != "" && filenamePLA != undefined) {
                        filename = filenamePLA;
                        flag = "true";
                    }
                    if (flag == "") {
                        filename = $("#filename_PLA").val();
                    }


                    break;
                }
        };

        if (filename != "" && filename != undefined) {
            $.ajax({
                type: "POST",
                url: '../../Clientes/Clientes/EliminarDocsPersonalesTempServidor',
                async: true,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({ fileName: filename }),
                success: function (response) {
                    if (response.OK) {

                    } else {
                        //Presenta msj de EXCEPCIONES
                        CtxGen.ErroresExcepcionesShow(response);
                    }
                }

            });

        }
    },

    RecuperarDocsPersonalesConsultaPN: function (_pathfileJs, uploadedFilePdf, hddfilenameJs) {
        if (_pathfileJs != "") {

            var pathFilePdfJs = "../.." + _pathfileJs.split('|')[0];
            var filename = _pathfileJs.split('|')[1];
            $("#" + hddfilenameJs).val(filename);

            PDFObject.embed(pathFilePdfJs, "#" + uploadedFilePdf, optionsVisorPdfConsultaIntegralPN);
        }
        CtxDocRegPN.setElementVisible(uploadedFilePdf, true);
    }

};


var CtxFuncionesPrincipales = {

    CamposOtrosIngresos: function () {
        var valor = _RtbnOtrosIngresos.GetValue();
        if (valor == "si") {
            $(".camposOtrosIngresos").show();
            $("#_txtAreaOrigenOtrosIngresos").addClass('ValidaTexAreaWizard');
            $('#_TxtMontoAnualOtrosIngresos').attr('aplicahidden', 'false');
        } else {
            $(".camposOtrosIngresos").hide();
            _TxtMontoAnualOtrosIngresos.SetValue("");
            $("#_txtAreaOrigenOtrosIngresos").val('');
            $("#_txtAreaOrigenOtrosIngresos").removeClass('ValidaTexAreaWizard');
            $('#_TxtMontoAnualOtrosIngresos').attr('aplicahidden', 'true');
        }
    },

    OcultarBtnFormulario: function () {
        if (checkBoxDigitaliza.GetValue()) {
            $("#BtnguardarRojo").removeClass("Invisible").addClass("Visible");
            $("#BtnguardarAzul").removeClass("Visible").addClass("Invisible");

        } else {
            $("#BtnguardarRojo").removeClass("Visible").addClass("Invisible");
            $("#BtnguardarAzul").removeClass("Invisible").addClass("Visible");
        }
    },

    LevantarModalConfirmacionDeGuardado: function () {
        PopupConfirmacion.Show();
    },

    OnChangedCmbFatca: function (motivoFatca, Valor) {

        var EsPasaporte = $("#EsPasaporte").val();
        var RecuperacionDatos = $("#RecuperacionDatos").val();
        
        switch (motivoFatca) {
            case "Nac": //Change de Nacionalidad
                CtxSeccionNacFatca.CargarNacionalidadFatca(_TxtNacionalidad.GetValue(), 'no');
                break;
            case "LugNaci": //Change de Lugar de nacimiento
                CtxSeccionLugarNacFatca.CargarLugarNacFatca(CtxFuncionesPrincipales.ObtenerCodigoPaisLugarNac(), 'no');
                break;
            case "OtraNac"://Change de otra nacionalidad
                {
                    if (EsPasaporte == "Si") {
                        $('#crsTipoIdentificacion').attr('style', 'display:block !important;');
                        $('#crsIdentificacion').attr('style', 'display:block !important;');
                        $('#_CmbTipoIdentificacionCrs').attr('aplicahidden', 'false');
                        $('#_TxtIdentificacionCrs').attr('aplicahidden', 'false');
                    } else {
                        CtxCargarSeccionesFatca.CargarFatca(_CmbOtraNacionalidad.GetValue(), 'no');
                    }

                    break;
                }
            case "PaisReffiscal": //Change de pais de referencia fiscal o legal
                {
                    if (EsPasaporte == "Si") {
                        if (RecuperacionDatos == "True" || Valor == "True") {
                            $('#crsIdentificacionTrib').attr('style', 'display:block !important;');
                            $('#_TxtIdentificacionTribCrs').attr('aplicahidden', 'false');
                            CargarSeccionWizarNavegacion.SeccionWizardNavegacion('PaisReffiscal', DigitalizaDocumentos);
                        }
                        else {

                            $('#crsIdentificacionTrib').attr('style', 'display:none !important;');
                            $('#_TxtIdentificacionTribCrs').attr('aplicahidden', 'true');
                        }
                        var DigitalizaDocumentos = ($('#DigitalizoDoc').val() == "True");

                    } else {
                        var recuperadatos = "no";
                        var valueCmbResFiscal = "";//_TxtNumIdentificacionUSA.GetValue();

                        let inputTxtDetectarCambiosUSA = document.querySelector('table#_CmbPaisReffiscal input');
                        if (inputTxtDetectarCambiosUSA != null) {
                            var elementInput = document.getElementById(inputTxtDetectarCambiosUSA.id);
                            valueCmbResFiscal = elementInput.value;
                        }

                        if (valueCmbResFiscal != null && valueCmbResFiscal !="") {
                            recuperadatos = "si";
                        }

                        //_CmbPaisReffiscal.GetValue()

                        CtxCargarSeccionesFatca.CargarFatca(valueCmbResFiscal, recuperadatos);
                    }
                    break;
                }

        }
    },

    OnChangedCmbInstPublica: function () {

        var EsPep = false;
        var codigoFormaIngreso = _TxtFormaDeIngreso.GetValue();
        var cadenaMontoMensual = $("#MontoMensualPep").val().replace('.', '');
        var MontoMensualPep = parseFloat(cadenaMontoMensual);
        var cadena = _TxtMontoMensualIngresos.GetValue().replace('$', '');

        if (cadena != "0.00" && (codigoFormaIngreso == 1 || codigoFormaIngreso == 2)) {
            var Monto = parseFloat(cadena);
            EsPep = Monto >= MontoMensualPep ? true : false;
            var InfoLaboral = "InfoLaboral-" + EsPep;
            var DigitalizaDocumentos = ($('#DigitalizoDoc').val() == "True");
            CargarSeccionWizarNavegacion.SeccionWizardNavegacion(InfoLaboral, DigitalizaDocumentos);
            CtxWizard.MostrarMsjValidacionCliente();
        } else {
            if (cadena != "0.00" && (codigoFormaIngreso == 3 || codigoFormaIngreso == 4)) {
                var InfoLaboral = "InfoLaboral-false";
                var DigitalizaDocumentos = ($('#DigitalizoDoc').val() == "True");
                CargarSeccionWizarNavegacion.SeccionWizardNavegacion(InfoLaboral, DigitalizaDocumentos);
                CtxWizard.MostrarMsjValidacionCliente();
            }
        }
    },

    ObtenerCodigoPaisLugarNac: function () {
        var _lugarNac = ""; //_TxtLugarNacimiento.GetValue();
        let inputTxtDetectarCambios = document.querySelector('table#_TxtLugarNacimiento input');
        if (inputTxtDetectarCambios != null) {
            elementInput = document.getElementById(inputTxtDetectarCambios.id);
            _lugarNac = elementInput.value;
        }



        var codLugarNac = 9999;
        if (_lugarNac != null) {
            codLugarNac = _lugarNac.split('-')[2];
        }
        return codLugarNac;

    },
    OnChangedCmbEstadoCivil: function () {
        var _estadoCivil = _TxtEstadoCivil.GetValue();
        _CmbEstadoCivil.SetText(_estadoCivil);
        var EsMenorEdad = _EsMenorDeEdad.GetValue();
        //casado ->2 o union libre ->5
        if (_estadoCivil == "2" || _estadoCivil == "5") {
            //se muestra datos del conyuge
            $('#contenConyugeMenorEdad').addClass('col');

            $('#contentInfoBasica').removeClass("styleInfoBasicaNoTieneConyuge");
            $('#contentInfoBasica').addClass('styleInfoBasicaTieneConyuge');
            $('#contentDatosConyuge').attr('style', 'display:block !important;margin-bottom: 6px !important;');
            //campos obligatorios requiere ingreso de datos con atributo false
            $('#_CmbTipoIdentificacionConyuge').attr('aplicahidden', 'false');
            $('#_TxtNumeroIdentificacionConyuge').attr('aplicahidden', 'false');
            $('#_TxtApellidoPaternoConyuge').attr('aplicahidden', 'false');
            $('#_TxtPrimerNombreConyuge').attr('aplicahidden', 'false');
        } else {

            if (EsMenorEdad == "False") {
                //si no es menor edad
                $('#contenConyugeMenorEdad').removeClass("col");
                $('#contentInfoBasica').removeClass("styleInfoBasicaTieneConyuge");
                $('#contentInfoBasica').addClass('styleInfoBasicaNoTieneConyuge');
            }
            $('#contenConyugeMenorEdad').removeClass('col');
            $('#contentInfoBasica').removeClass("styleInfoBasicaTieneConyuge");
            $('#contentInfoBasica').addClass('styleInfoBasicaNoTieneConyuge');
            $('#contentDatosConyuge').attr('style', 'display:none !important;');
           
            _CmbTipoIdentificacionConyuge.SetValue(null);
            _TxtNumeroIdentificacionConyuge.SetValue(null);
            _TxtApellidoPaternoConyuge.SetValue(null);
            _TxtApellidoMaternoConyuge.SetValue(null);
            _TxtPrimerNombreConyuge.SetValue(null);
            _TxtSegundoNombreConyuge.SetValue(null);

            $('#_CmbTipoIdentificacionConyuge').attr('aplicahidden', 'true');
            $('#_TxtNumeroIdentificacionConyuge').attr('aplicahidden', 'true');
            $('#_TxtApellidoPaternoConyuge').attr('aplicahidden', 'true');
            $('#_TxtPrimerNombreConyuge').attr('aplicahidden', 'true');

        }
    },

    IrSiguente: function () { //Verifica con una variable de hidden que los campos del formulario esten llenos para ir al siguiente paso del wizard
        var TieneCamposVacios = $("#TieneCamposVacios").val();
        if (TieneCamposVacios == "No") {
            CtxWizard.MostrarMsjValidacionCliente();
            CtxFuncionesPrincipales.ClickNext('.f1 .btn-next', true);
        }
        else {
            loadingMainRegistroNoCliente.Hide();
            var Principal = $('.DocumentosDvi').attr("EstaActivo") || "";
            if (Principal == "active") {
                $('.CircleDoc').removeClass("CircleBlue");
                $('.CircleDoc').addClass("CirclePlomo");
                $('.CircleDocPla').removeClass("CircleBlue");
                $('.CircleDocPla').addClass("CirclePlomo");
            }
        }

    },
    ClickNext: function (Nex, Ejecutar) {
        var current_active_step = CxtWizard.ClickFlechaProgreso('.f1 .btn-next', 'right'); //$(Nex).parents('.f1').find('.f1-step.active');
        //var progress_line = $(Nex).parents('.f1').find('.f1-progress-line');
        var Uri = CxtWizard.ObtenerUbicacion();//current_active_step.next().attr("uri") || "";
        var NameContoller = CxtWizard.ObtenerControlador('right', current_active_step);//current_active_step.next().attr("Controller") || "";
        //var _UriActual = current_active_step.attr("uri") || "";
        //if (Uri != "") {
        //    CtxFuncionesPrincipales.AjustarTamanioImg(_UriActual, 'next', 'right', 'Ant');
        //}
        CtxFuncionesPrincipales.Distribuir(NameContoller, Uri, current_active_step, 'right', 'next', Ejecutar);
    },

    ClickPrevius: function (Previus) {
        var current_active_step = CxtWizard.ClickFlechaProgreso(Previus, 'left');//$(Previus).parents('.f1').find('.f1-step.active');
        //var progress_line = $(Previus).parents('.f1').find('.f1-progress-line');
        var Uri = CxtWizard.ObtenerUbicacionAnt();//current_active_step.prev().attr("uri") || "";
        var NameContoller = CxtWizard.ObtenerControlador('left', current_active_step); //current_active_step.prev().attr("Controller") || "";
        //CtxFuncionesPrincipales.AjustarTamanioImg(Uri, 'previus', 'left', 'Ant');
        //var UriAnt = current_active_step.attr("uri") || "";
        //CtxFuncionesPrincipales.AjustarTamanioImg(UriAnt, 'previus', 'left', 'Sig');
        CtxFuncionesPrincipales.Distribuir(NameContoller, Uri, current_active_step, 'left', 'previus', true);
    },


    bar_progress: function (/*progress_line_object,*/ direction, current_active_step) {
        var PosicionActual = current_active_step.attr("ID") || "";
        var SiguientePosicion = "";
        if (direction == "right") {
            SiguientePosicion = current_active_step.next().attr("ID") || "";
        }
        if (direction == "left") {
            SiguientePosicion = current_active_step.prev().attr("ID") || "";
        }
        var _PrimerPasoWizard = $("#PrimerPasoWizard").val();
        CxtWizard.showInactiveProgress("ProgresoAzul", "Padre", _PrimerPasoWizard, SiguientePosicion);
    },
    /*progress_line*/
    PintarCirculoYProgress: function (current_active_step, DireccionBtnNexprevious) {
        CtxFuncionesPrincipales.bar_progress(/*progress_line,*/ DireccionBtnNexprevious, current_active_step); //pinta de azul la rallita del progreso
        if (DireccionBtnNexprevious == 'right') {
            current_active_step.removeClass('active').addClass('activated').next().addClass('active'); //pinta de azul el circulo
        } else {
            current_active_step.removeClass('active').prev().removeClass('activated').addClass('active'); // Le quita el color al circulo
        }
    },

    //VisibleButton: function (Uri, DireccionBtnNexprevious) {
    //    var EsDataCliente = $('.DataClie').attr("Principal"); // identifico si el circulo de documentos esta como principal
    //    var EsActive = $('.DataClie').attr("EstaActivo") || ""; // identifico si el circulo de Datos del cliente esta como principal
    //    var _NoTieneDocNiConyuge = $('#NoTieneDocNiConyuge').val();

    //    if (Uri != "Doc") {
    //        if (DireccionBtnNexprevious == 'left' && EsDataCliente == "1" && Uri == "Doc") { // lo Oculto cuando llegue al circulo de Doc
    //            $(".btn-previous").removeClass("Visible");
    //            $(".btn-previous").addClass("Invisible");
    //        } else {
    //            if (DireccionBtnNexprevious == 'left' && EsActive != "" && Uri == "Client") {
    //                $(".btn-previous").removeClass("Visible");
    //                $(".btn-previous").addClass("Invisible");
    //            } else {
    //                if (DireccionBtnNexprevious == 'right' && EsDataCliente == "1" && Uri == "Form") {
    //                    $(".btn-next").removeClass("Visible");
    //                    $(".btn-next").addClass("Invisible");
    //                }
    //                else {
    //                    if (DireccionBtnNexprevious == 'left' && EsActive != "1" && Uri == "Direc") {
    //                        $(".btn-next").removeClass("Invisible");
    //                        $(".btn-next").addClass("Visible");

    //                    } else {

    //                        if (DireccionBtnNexprevious == 'left' && EsActive != "1" && Uri == "OtraDirec") {
    //                            $(".btn-next").removeClass("Invisible");
    //                            $(".btn-next").addClass("Visible");

    //                        } else {

    //                            $(".btn-previous").removeClass("Invisible");
    //                            $(".btn-previous").addClass("Visible");
    //                        }

    //                    }
    //                }
    //            }

    //        }
    //    } else {
    //        $(".btn-previous").removeClass("Visible");
    //        $(".btn-previous").addClass("Invisible");
    //    }

    //},

    //AjustarTamanioImg: function (_UriActual, NextPrevius, Direccion, SiguienteAnterior) {

    //    //if (NextPrevius == 'next') {
    //    //    if (Direccion == 'right' && SiguienteAnterior == 'sig') { //imagen siguiente
    //    //        $('.' + _UriActual).removeClass("img-wizard");
    //    //        $('.' + _UriActual).addClass("img-Wizar-Default");
    //    //    }
    //    //    else {
    //    //        if (Direccion == 'right' && SiguienteAnterior == 'Ant') { // imgane anterior
    //    //            $('.' + _UriActual).removeClass('img-Wizar-Default');
    //    //            $('.' + _UriActual).addClass('img-wizard');
    //    //        }
    //    //    }
    //    //}
    //    //else {
    //    //    if (Direccion == 'left' && NextPrevius == 'previus' && SiguienteAnterior == 'Ant') {
    //    //        $('.' + _UriActual).removeClass("img-wizard");
    //    //        $('.' + _UriActual).addClass("img-Wizar-Default");
    //    //    }
    //    //    else {
    //    //        if (Direccion == 'left' && NextPrevius == 'previus' && SiguienteAnterior == 'Sig') {
    //    //            $('.' + _UriActual).removeClass('img-Wizar-Default');
    //    //            $('.' + _UriActual).addClass('img-wizard');
    //    //        }
    //    //    }
    //    //}
    //},


    Distribuir: function (NameContoller, Uri, current_active_step, DireccionBtnNexprevious, NextPrevius, Ejecutar) {
        switch (Uri) {
            case "Doc":
                {
                    /*progress_line*/
                    //CtxFuncionesPrincipales.PintarCirculoYProgress(current_active_step, DireccionBtnNexprevious); //Funcion que dispara las funciones para pintar el progreso y el circulo
                    //CxtWizard.EvaluarBtnNexBtnprevious(CxtWizard.ObtenerIdUbicacionActual());
                    //CtxFuncionesPrincipales.VisibleButton(Uri, DireccionBtnNexprevious);
                    CxtWizard.PintarCirculoYProgress(current_active_step, DireccionBtnNexprevious);
                    var SiguientePosicion = CxtWizard.bar_progress(DireccionBtnNexprevious, current_active_step); //pinta de azul la rallita del progreso
                    var PrimerPasoWizard = CxtWizard.ObtenerPrimerPasoWizard();
                    CxtWizard.showInactiveProgress("ProgresoAzul", "Padre", PrimerPasoWizard, SiguientePosicion);
                    CxtWizard.EvaluarBtnNexBtnprevious(SiguientePosicion);
                    if (Ejecutar) { //se lo usa para validar cuando se hace el change (Fecha MEnor de edad) de fecha en datos del cliente
                        CtxCargarPaginasForms.LoadPage(NameContoller);
                    }
                }
                break;
            case "Client":
                {
                    CxtWizard.PintarCirculoYProgress(current_active_step, DireccionBtnNexprevious);
                    var SiguientePosicion = CxtWizard.bar_progress(DireccionBtnNexprevious, current_active_step); //pinta de azul la rallita del progreso
                    var PrimerPasoWizard = CxtWizard.ObtenerPrimerPasoWizard();
                    CxtWizard.showInactiveProgress("ProgresoAzul", "Padre", PrimerPasoWizard, SiguientePosicion);
                    CxtWizard.EvaluarBtnNexBtnprevious(SiguientePosicion);
                    //CtxFuncionesPrincipales.PintarCirculoYProgress(current_active_step, DireccionBtnNexprevious);
                    //CxtWizard.EvaluarBtnNexBtnprevious(CxtWizard.ObtenerIdUbicacionActual());
                    //CtxFuncionesPrincipales.VisibleButton(Uri, DireccionBtnNexprevious);
                    if (Ejecutar) { //se lo usa para validar cuando se hace el change (Fecha MEnor de edad) de fecha en datos del cliente
                        CtxCargarPaginasForms.LoadPage(NameContoller);
                    }

                    //if (DireccionBtnNexprevious == 'right') {
                    //    CtxFuncionesPrincipales.AjustarTamanioImg(Uri, NextPrevius, DireccionBtnNexprevious, 'sig');
                    //}
                }
                break;
            case "Conyu":
                {
                    CxtWizard.PintarCirculoYProgress(current_active_step, DireccionBtnNexprevious);
                    var SiguientePosicion = CxtWizard.bar_progress(DireccionBtnNexprevious, current_active_step); //pinta de azul la rallita del progreso
                    var PrimerPasoWizard = CxtWizard.ObtenerPrimerPasoWizard();
                    CxtWizard.showInactiveProgress("ProgresoAzul", "Padre", PrimerPasoWizard, SiguientePosicion);
                    CxtWizard.EvaluarBtnNexBtnprevious(SiguientePosicion);

                    //CtxFuncionesPrincipales.PintarCirculoYProgress(current_active_step, DireccionBtnNexprevious);
                    //CxtWizard.EvaluarBtnNexBtnprevious(CxtWizard.ObtenerIdUbicacionActual());
                    //CtxFuncionesPrincipales.VisibleButton(Uri, DireccionBtnNexprevious);
                    CtxCargarPaginasForms.LoadPage(NameContoller);
                    //if (DireccionBtnNexprevious == 'right') {
                    //
                    //    CtxFuncionesPrincipales.AjustarTamanioImg(Uri, NextPrevius, DireccionBtnNexprevious, 'sig');
                    //}
                }
                break;
            case "Eco":
                {
                    CxtWizard.PintarCirculoYProgress(current_active_step, DireccionBtnNexprevious);
                    var SiguientePosicion = CxtWizard.bar_progress(DireccionBtnNexprevious, current_active_step); //pinta de azul la rallita del progreso
                    var PrimerPasoWizard = CxtWizard.ObtenerPrimerPasoWizard();
                    CxtWizard.showInactiveProgress("ProgresoAzul", "Padre", PrimerPasoWizard, SiguientePosicion);
                    CxtWizard.EvaluarBtnNexBtnprevious(SiguientePosicion);

                    //CtxFuncionesPrincipales.PintarCirculoYProgress(current_active_step, DireccionBtnNexprevious);
                    //CxtWizard.EvaluarBtnNexBtnprevious(CxtWizard.ObtenerIdUbicacionActual());
                    //CtxFuncionesPrincipales.VisibleButton(Uri, DireccionBtnNexprevious);
                    CtxCargarPaginasForms.LoadPage(NameContoller);
                    //if (DireccionBtnNexprevious == 'right') {
                    //
                    //    CtxFuncionesPrincipales.AjustarTamanioImg(Uri, NextPrevius, DireccionBtnNexprevious, 'sig');
                    //}
                }
                break;
            case "Direc":
                {
                    CxtWizard.PintarCirculoYProgress(current_active_step, DireccionBtnNexprevious);
                    var SiguientePosicion = CxtWizard.bar_progress(DireccionBtnNexprevious, current_active_step); //pinta de azul la rallita del progreso
                    var PrimerPasoWizard = CxtWizard.ObtenerPrimerPasoWizard();
                    CxtWizard.showInactiveProgress("ProgresoAzul", "Padre", PrimerPasoWizard, SiguientePosicion);
                    CxtWizard.EvaluarBtnNexBtnprevious(SiguientePosicion);
                    //CtxFuncionesPrincipales.PintarCirculoYProgress(current_active_step, DireccionBtnNexprevious);
                    //CxtWizard.EvaluarBtnNexBtnprevious(CxtWizard.ObtenerIdUbicacionActual());
                    //CtxFuncionesPrincipales.VisibleButton(Uri, DireccionBtnNexprevious);
                    CtxCargarPaginasForms.LoadPage(NameContoller);
                    //if (DireccionBtnNexprevious == 'right') {
                    //
                    //    CtxFuncionesPrincipales.AjustarTamanioImg(Uri, NextPrevius, DireccionBtnNexprevious, 'sig');
                    //}
                }
                break;

            case "OtraDirec":
                {
                    CxtWizard.PintarCirculoYProgress(current_active_step, DireccionBtnNexprevious);
                    var SiguientePosicion = CxtWizard.bar_progress(DireccionBtnNexprevious, current_active_step); //pinta de azul la rallita del progreso
                    var PrimerPasoWizard = CxtWizard.ObtenerPrimerPasoWizard();
                    CxtWizard.showInactiveProgress("ProgresoAzul", "Padre", PrimerPasoWizard, SiguientePosicion);
                    CxtWizard.EvaluarBtnNexBtnprevious(SiguientePosicion);
                    //CtxFuncionesPrincipales.PintarCirculoYProgress(current_active_step, DireccionBtnNexprevious);
                    //CxtWizard.EvaluarBtnNexBtnprevious(CxtWizard.ObtenerIdUbicacionActual());
                    //CtxFuncionesPrincipales.VisibleButton(Uri, DireccionBtnNexprevious);
                    CtxCargarPaginasForms.LoadPage(NameContoller);
                    //if (DireccionBtnNexprevious == 'right') {
                    //
                    //    CtxFuncionesPrincipales.AjustarTamanioImg(Uri, NextPrevius, DireccionBtnNexprevious, 'sig');
                    //}
                }
                break;

            case "Form":
                {
                    CxtWizard.PintarCirculoYProgress(current_active_step, DireccionBtnNexprevious);
                    var SiguientePosicion = CxtWizard.bar_progress(DireccionBtnNexprevious, current_active_step); //pinta de azul la rallita del progreso
                    var PrimerPasoWizard = CxtWizard.ObtenerPrimerPasoWizard();
                    CxtWizard.showInactiveProgress("ProgresoAzul", "Padre", PrimerPasoWizard, SiguientePosicion);
                    CxtWizard.EvaluarBtnNexBtnprevious(SiguientePosicion);
                    //CtxFuncionesPrincipales.PintarCirculoYProgress(current_active_step, DireccionBtnNexprevious);
                    //CxtWizard.EvaluarBtnNexBtnprevious(CxtWizard.ObtenerIdUbicacionActual());
                    //CtxFuncionesPrincipales.VisibleButton(Uri, DireccionBtnNexprevious);
                    CtxCargarPaginasForms.LoadPage(NameContoller);
                    //if (DireccionBtnNexprevious == 'right') {
                    //
                    //    CtxFuncionesPrincipales.AjustarTamanioImg(Uri, NextPrevius, DireccionBtnNexprevious, 'sig');
                    //}
                }
                break;

            case "PEP":
                {
                    CxtWizard.PintarCirculoYProgress(current_active_step, DireccionBtnNexprevious);
                    var SiguientePosicion = CxtWizard.bar_progress(DireccionBtnNexprevious, current_active_step); //pinta de azul la rallita del progreso
                    var PrimerPasoWizard = CxtWizard.ObtenerPrimerPasoWizard();
                    CxtWizard.showInactiveProgress("ProgresoAzul", "Padre", PrimerPasoWizard, SiguientePosicion);
                    CxtWizard.EvaluarBtnNexBtnprevious(SiguientePosicion);
                    //CtxFuncionesPrincipales.PintarCirculoYProgress(current_active_step, DireccionBtnNexprevious);
                    //CxtWizard.EvaluarBtnNexBtnprevious(CxtWizard.ObtenerIdUbicacionActual());
                    //CtxFuncionesPrincipales.VisibleButton(Uri, DireccionBtnNexprevious);
                    CtxCargarPaginasForms.LoadPage(NameContoller);
                    //if (DireccionBtnNexprevious == 'right') {
                    //
                    //    CtxFuncionesPrincipales.AjustarTamanioImg(Uri, NextPrevius, DireccionBtnNexprevious, 'sig');
                    //}
                }
                break;
            default:
                break;
        }
    },

};


var CtxCargarPaginasForms = {

    LoadPageByLink: function (LugarDeLLamada) {

        if (LugarDeLLamada == "ready") {
            var idElemento = $("div[class*=Wizard-Registro-PN ]");

            if (idElemento.length > 0) {

                $.each(idElemento, function () {

                    var Uri = $(this).attr("Controller") || "";
                    var Principal = $(this).attr("EstaActivo") || "";

                    if (Principal.length > 0) {
                        CtxCargarPaginasForms.LoadPage(Uri);
                    }
                });

            }
        }
        else {
            loadingMainRegistroNoCliente.Hide();
        }

    },

    LoadPage: function (uri) {

        $.ajax({
            cache: false,
            type: "POST",
            url: uri,
            datatype: 'html',
            success: function (data) {
                $("div#mainly").empty().html(data);
                var Principal = $('.DocumentosDvi').attr("EstaActivo") || "";
                if (uri != "CargarPagDocumentos") {
                    $('.dxic').attr('style', 'width: ' + 450 + 'px !important;');
                    $('#TxtApellidoPaterno_I').addClass('TexboxPaterno');
                }
                if (uri == "CargarPageFormulario") {
                    $('#BtnguardarOff').removeClass('Invisible');
                    $('#BtnguardarOff').addClass('Visible');
                }

                $("#validationForm").addClass("frmMaxWidthHeight");

                if (Principal == "active") {
                    $('.CircleDoc').removeClass("CircleBlue");
                    $('.CircleDoc').addClass("CirclePlomo");
                    $('.CircleDocPla').removeClass("CircleBlue");
                    $('.CircleDocPla').addClass("CirclePlomo");
                }
                loadingMainRegistroNoCliente.Hide();

            }

        });
    },

    CargarReporte: function (TipoFormulario) {
        loadingMainRegistroNoCliente.Show();
        var _Url = "CargarFormularioRegistroPersona";
        $.ajax(
            {
                url: _Url,
                data: { tipoFormulario: TipoFormulario },
                datatype: 'html',
                success: function (data) {
                    $("div#contentReport").empty().html(data);
                    if (TipoFormulario == "CL_PEP_P" /*|| TipoFormulario == "CL_PEP_R"*/) {
                        $("#DivCargaRptPEP").removeClass("OcultarCajaDeTexto");
                        $("#DivCargaRptPEP").css("display", "flex");
                    } else {
                        $("#DivCargaRptPEP").addClass("OcultarCajaDeTexto");
                    }
                    loadingMainRegistroNoCliente.Hide();
                }

            });
    },

};

var MostrarOcultarCamposDirecciones = {

    ValidaCorreoCliente: function (s, e, tipoDeCorreo) {
        var correoD = MostrarOcultarCamposDirecciones.ExisteCorreoDeDomicilio();
        var correoT = MostrarOcultarCamposDirecciones.ExisteCorreoDeTrabajo();

        var regex = Validaciones.ReturnExpresionRegular("Correo");

        if (tipoDeCorreo == "D") {
            MostrarOcultarCamposDirecciones.HabilitarEstadoCuentaCorreo(tipoDeCorreo, correoD);
            var isValidoD = Validaciones.ValidarExpresionRegular(regex, correoD);
            if (!isValidoD) {
                $('#TooltipCorreo').css("display", "none");
            } else {
                if (correoD != "" && correoD != null) {
                    $('#TooltipCorreo').css("display", "block");
                    $(".arrow").removeClass("arrow");
                } else {
                    $('#TooltipCorreo').css("display", "none");
                }
            }
        } else {
            MostrarOcultarCamposDirecciones.HabilitarEstadoCuentaCorreo(tipoDeCorreo, correoT);
            var isValidoT = Validaciones.ValidarExpresionRegular(regex, correoT);
            if (!isValidoT) {
                $('#TooltipCorreoT').css("display", "none");
                $(".arrow").removeClass("arrow");
            } else {
                if (correoT != "" && correoT != null) {
                    $('#TooltipCorreoT').css("display", "block");
                    $(".arrow").removeClass("arrow");
                } else {
                    $('#TooltipCorreoT').css("display", "none");
                }
            }
        }

    },


    CrearTootilpDirecciones: function () {
        $("#TooltipDirecciones").tooltip({
            title: 'Al número de celular ingresado se le enviará las notificaciones del banco al cliente',
            placement: 'bottom',
            html: true,
            delay: { show: 0, hide: 0 },
            container: 'body'
        });
    },

    DetectarHoverDirecciones: function () {
        $("#TooltipDirecciones").hover(function () {
            $('.tooltip-inner').attr('style', 'max-width: ' + 334 + 'px !important;' + 'background-color: ' + '#E5E5E5 ' + '!important;');
            $(".arrow").removeClass("arrow");
        });
    },

   /* EvaludarConvencional2: function () {
        var ImgenPorDefecto = $("img[class*=ImgTelefonoWizard]");
        $.each(ImgenPorDefecto, function () {
            var Class = $(this).attr("class") || "";
            var _ImagenPorDefecto = $(this).attr("ImagenPorDefecto") || "";
            var _TieneValorElCampo = $(this).attr("TieneValorElCampo") || "";
            if (_ImagenPorDefecto == "AgregarTelefono") {
                if (_TieneValorElCampo == "no") {
                    $('#ContenedorOtroTelefono').attr('style', 'display:block !important; padding-left: 0px !important; padding-right: 0px !important;');
                    $('#_TxtTefConven2').attr('aplicahidden', 'false'); //
                    $('#_TxtAreaConven2').attr('aplicahidden', 'false');
                    $('.' + Class).attr('src', '../../Content/images/QuitarTelefono.svg');
                    $('.' + Class).attr('ImagenPorDefecto', 'QuitarTelefono')
                }
                else {
                    //$('#ContenedorOtroTelefono').attr('style', 'display:none !important;');//Quitado_AEVG
                    //$('#_TxtTefConven2').attr('aplicahidden', 'true'); //Quitado_AEVG
                    //$('#_TxtAreaConven2').attr('aplicahidden', 'true');//Quitado_AEVG
                    $('.' + Class).attr('src', '../../Content/images/AgregarTelefono.svg');
                    $('.' + Class).attr('ImagenPorDefecto', 'AgregarTelefono');
                    //MostrarOcultarCamposDirecciones.LimpiaTelefonoConvencional2Domicilio();//Quitado_AEVG
                }
            }
            else {
                $('#ContenedorOtroTelefono').attr('style', 'display:none !important;');//Quitado_AEVG
                $('#_TxtTefConven2').attr('aplicahidden', 'true'); //Quitado_AEVG
                $('#_TxtAreaConven2').attr('aplicahidden', 'true');// Quitado_AEVG
                $('.' + Class).attr('src', '../../Content/images/AgregarTelefono.svg');
                $('.' + Class).attr('ImagenPorDefecto', 'AgregarTelefono');
                MostrarOcultarCamposDirecciones.LimpiaTelefonoConvencional2Domicilio();//Quitado_AEVG
            }
        });
    },*/

    EvaludarConvencional2: function (Tiene_Valor_El_Campo) {
        var ImgenPorDefecto = $("img[class*=ImgTelefonoWizard]");
        $.each(ImgenPorDefecto, function () {
            var Class = $(this).attr("class") || "";
            var _ImagenPorDefecto = $(this).attr("ImagenPorDefecto") || "";
            var _TieneValorElCampo = $(this).attr("TieneValorElCampo") || "";            
            if (_ImagenPorDefecto == "AgregarTelefono") {
                if (Tiene_Valor_El_Campo == "no") {
                    $('#ContenedorOtroTelefono').attr('style', 'display:none !important;');//Quitado_AEVG
                    $('#_TxtTefConven2').attr('aplicahidden', 'true'); //Quitado_AEVG
                    $('#_TxtAreaConven2').attr('aplicahidden', 'true');//Quitado_AEVG
                    $('.' + Class).attr('src', '../../Content/images/AgregarTelefono.svg');
                    $('.' + Class).attr('ImagenPorDefecto', 'AgregarTelefono');
                    MostrarOcultarCamposDirecciones.LimpiaTelefonoConvencional2Domicilio();//Quitado_AEVG
                }
                else {
                    $('#ContenedorOtroTelefono').attr('style', 'display:block !important; padding-left: 0px !important; padding-right: 0px !important;');
                    $('#_TxtTefConven2').attr('aplicahidden', 'false'); //
                    $('#_TxtAreaConven2').attr('aplicahidden', 'false');
                    $('.' + Class).attr('src', '../../Content/images/QuitarTelefono.svg');
                    $('.' + Class).attr('ImagenPorDefecto', '../../Content/images/QuitarTelefono.svg');
                }
            }
            else {
                $('#ContenedorOtroTelefono').attr('style', 'display:none !important;');//Quitado_AEVG
                $('#_TxtTefConven2').attr('aplicahidden', 'true'); //Quitado_AEVG
                $('#_TxtAreaConven2').attr('aplicahidden', 'true');// Quitado_AEVG
                $('.' + Class).attr('src', '../../Content/images/AgregarTelefono.svg');
                $('.' + Class).attr('ImagenPorDefecto', 'AgregarTelefono');
                MostrarOcultarCamposDirecciones.LimpiaTelefonoConvencional2Domicilio();//Quitado_AEVG
            }
        });
    },

    /*LimpiaTelefonoConvencional2Domicilio: function () {
        let elementInput = "";
        let inputTxtAreaConven2 = document.querySelector('table#_TxtAreaConven2 input');
        if (inputTxtAreaConven2 != null) {
            elementInput = document.getElementById(inputTxtAreaConven2.id);
            elementInput.value = "";
        }
        let inputTxtTefConven2 = document.querySelector('table#_TxtTefConven2 input');
        if (inputTxtTefConven2 != null) {
            elementInput = document.getElementById(inputTxtTefConven2.id);
            elementInput.value = "";
        }
    },*/

    LimpiaTelefonoConvencional2Domicilio: function () {
        let elementInput = "";
        let inputTxtAreaConven2 = document.querySelector('table#_TxtAreaConven2 input');
        if (inputTxtAreaConven2 != null) {
            elementInput = document.getElementById(inputTxtAreaConven2.id);
            elementInput.value = "";
        }
        let inputTxtTefConven2 = document.querySelector('table#_TxtTefConven2 input');
        if (inputTxtTefConven2 != null) {
            elementInput = document.getElementById(inputTxtTefConven2.id);
            elementInput.value = "";
        }
    },

    OcultarCampo: function () {
        var ImgenPorDefecto = $("img[class*=ImgTelefonoWizard]");
        $.each(ImgenPorDefecto, function () {
            var Class = $(this).attr("class") || "";
            var _ImagenPorDefecto = $(this).attr("ImagenPorDefecto") || "";
            if (_ImagenPorDefecto == "AgregarTelefono") {
                $('#ContenedorOtroTelefono').attr('style', 'display:block !important; padding-left: 0px !important; padding-right: 0px !important;');
                if (_TxtTefConven.GetValue() != null) {
                    $('#_TxtTefConven2').attr('aplicahidden', 'true'); //Quitado_AEVG
                    $('#_TxtAreaConven2').attr('aplicahidden', 'true');//Quitado_AEVG
                } else {
                    $('#_TxtTefConven2').attr('aplicahidden', 'false'); //
                    $('#_TxtAreaConven2').attr('aplicahidden', 'false');
                }
                $('.' + Class).attr('src', '../../Content/images/QuitarTelefono.svg');
                $('.' + Class).attr('ImagenPorDefecto', '../../Content/images/QuitarTelefono.svg');
                MostrarOcultarCamposDirecciones.AsiganarCodigoAreaCantonOpcionalTelef(true);
            }
            else {
                $('#ContenedorOtroTelefono').attr('style', 'display:none !important;');// Quitado_AEVG
                $('#_TxtTefConven2').attr('aplicahidden', 'true'); //Quitado_AEVG
                $('#_TxtAreaConven2').attr('aplicahidden', 'true');//Quitado_AEVG
                $('.' + Class).attr('src', '../../Content/images/AgregarTelefono.svg');
                $('.' + Class).attr('ImagenPorDefecto', 'AgregarTelefono')
                MostrarOcultarCamposDirecciones.LimpiaTelefonoConvencional2Domicilio();
                MostrarOcultarCamposDirecciones.AsiganarCodigoAreaCantonOpcionalTelef(false);
            }
        });
    },

    SetearValorValidorEnTxtTefConven2: function () {
        $('#_TxtTefConven2').attr('aplicahidden', 'true');
    },

    ExisteCorrespondenciaDomicilio: function () {
        var correspondenciaD = "";
        try {
            correspondenciaD = $.trim($("#_TxtDireccion").val());
        } catch (ex) {
            correspondenciaD = null;
        }
        return correspondenciaD;
    },

    ExisteCorrespondenciaTrabajo: function () {
        var correspondenciaT = "";
        try {
            correspondenciaT = $.trim($("#_TxtDireccionTrabajo").val());
        } catch (ex) {
            correspondenciaT = null;
        }
        return correspondenciaT;
    },

    PintarCorrespondenciaRecibidaDelModelo: function (Donde) {
        var SituacionLaboral = $("#hdd_SituacionLaboral").val();
        var valueDireccionDomicilio = MostrarOcultarCamposDirecciones.ExisteCorrespondenciaDomicilio();
        var valueDireccionTrabajo = MostrarOcultarCamposDirecciones.ExisteCorrespondenciaTrabajo();
        switch (Donde) {
            case "D": {
                MostrarOcultarCamposDirecciones.HabilitarCorrespondenciaDomicilio(valueDireccionDomicilio);
                if (SituacionLaboral != "4" && valueDireccionTrabajo != null) {
                    MostrarOcultarCamposDirecciones.HabilitarCorrespondenciaTrabajo(valueDireccionTrabajo);
                }
                MostrarOcultarCamposDirecciones.CambiarDeColorBtnDomicilio();
            } break;
            case "T": {
                MostrarOcultarCamposDirecciones.HabilitarCorrespondenciaTrabajo(valueDireccionTrabajo);
                if (SituacionLaboral != "4" && valueDireccionDomicilio != null) {
                    MostrarOcultarCamposDirecciones.HabilitarCorrespondenciaDomicilio(valueDireccionDomicilio);
                }
                MostrarOcultarCamposDirecciones.CambiarDeColorBtnTrabajo();
            } break;
            default: {
                MostrarOcultarCamposDirecciones.HabilitarCorrespondenciaDomicilio(valueDireccionDomicilio);
                MostrarOcultarCamposDirecciones.HabilitarCorrespondenciaTrabajo(valueDireccionTrabajo);
            } break;
        }
    },

    ExisteCorreoDeDomicilio: function () {
        let inputCorreoElectronico = document.querySelector('table#_TxtCorreoElectronico input');
        if (inputCorreoElectronico != null) {
            let elementInput = document.getElementById(inputCorreoElectronico.id);
            return elementInput.value;
        } else {
            return null;
        }
    },

    ExisteCorreoDeTrabajo: function () {
        let inputCorreoElectronicoTrabajo = document.querySelector('table#_TxtCorreoElectronicoTrabajo input');
        if (inputCorreoElectronicoTrabajo != null) {
            let elementInput = document.getElementById(inputCorreoElectronicoTrabajo.id);
            return elementInput.value;
        } else {
            return null;
        }
    },

    PintarEstadoCuentaRecibidaDelModelo: function (Donde) {
        
        var correoT = MostrarOcultarCamposDirecciones.ExisteCorreoDeTrabajo();
        var correoD = MostrarOcultarCamposDirecciones.ExisteCorreoDeDomicilio();
        switch (Donde) {
            case "D": {
                MostrarOcultarCamposDirecciones.HabilitarEstadoCuentaDomicilio(correoD);
                if (/*SituacionLaboral != "4" &&*/ correoT != null) {
                    MostrarOcultarCamposDirecciones.HabilitarEstadoCuentaTrabajo(correoT);
                }
                MostrarOcultarCamposDirecciones.HabilitarEstadoCuenta();
                MostrarOcultarCamposDirecciones.CambiarDeColorEstadoCuentaDomicilio();
            } break;
            case "T": {
                MostrarOcultarCamposDirecciones.HabilitarEstadoCuentaTrabajo(correoT);
                if (/*SituacionLaboral != "4" &&*/ correoD != null) {
                    MostrarOcultarCamposDirecciones.HabilitarEstadoCuentaDomicilio(correoD);
                }
                MostrarOcultarCamposDirecciones.HabilitarEstadoCuenta();
                MostrarOcultarCamposDirecciones.CambiarDeColorEstadoCuentaTrabajo();
            } break;
            case "F": {
                if (/*SituacionLaboral != "4" && */correoT != null) {
                    MostrarOcultarCamposDirecciones.HabilitarEstadoCuentaTrabajo(correoT);
                }
                if (/*SituacionLaboral != "4" &&*/ correoD != null) {
                    MostrarOcultarCamposDirecciones.HabilitarEstadoCuentaDomicilio(correoD);
                }
                MostrarOcultarCamposDirecciones.HabilitarEstadoCuenta();
                MostrarOcultarCamposDirecciones.CambiarDeColorEstadoCuentaFisico();
            } break;
            default: {
                MostrarOcultarCamposDirecciones.HabilitarEstadoCuentaDomicilio(correoD);
                MostrarOcultarCamposDirecciones.HabilitarEstadoCuentaTrabajo(correoT);
                MostrarOcultarCamposDirecciones.HabilitarEstadoCuenta();
            } break;
        }
    },

    ExisteCelularDeDomicilio: function () {
        let inputCelular = document.querySelector('table#_TxtCelular input');
        if (inputCelular != null) {
            let elementInput = document.getElementById(inputCelular.id);
            return elementInput.value;
        } else {
            return null;
        }
    },

    ExisteCelularDeTrabajo: function () {
        let inputCelularTrabajo = document.querySelector('table#_TxtCelularTrabajo input');
        if (inputCelularTrabajo != null) {
            let elementInput = document.getElementById(inputCelularTrabajo.id);
            return elementInput.value;
        } else {
            return null;
        }
    },

    PintarCelularNotificacionesRecibidaDelModelo: function (Donde) {
        var SituacionLaboral = $("#hdd_SituacionLaboral").val();
        var celularT = MostrarOcultarCamposDirecciones.ExisteCelularDeTrabajo();
        var celularD = MostrarOcultarCamposDirecciones.ExisteCelularDeDomicilio();
        switch (Donde) {
            case "D": {
                MostrarOcultarCamposDirecciones.HabilitarCelularNotificacionesDomicilio(celularD);
                if (SituacionLaboral != "4" && celularT != null) {
                    MostrarOcultarCamposDirecciones.HabilitarCelularNotificacionesTrabajo(celularT);
                }
                MostrarOcultarCamposDirecciones.CambiarDeColorCelularNotificacionesDomicilio();
            } break;
            case "T": {
                MostrarOcultarCamposDirecciones.HabilitarCelularNotificacionesTrabajo(celularT);
                if (SituacionLaboral != "4" && celularD != null) {
                    MostrarOcultarCamposDirecciones.HabilitarCelularNotificacionesDomicilio(celularD);
                }
                MostrarOcultarCamposDirecciones.CambiarDeColorCelularNotificacionesTrabajo();
            } break;
            default: {
                MostrarOcultarCamposDirecciones.HabilitarCelularNotificacionesDomicilio(celularD);
                MostrarOcultarCamposDirecciones.HabilitarCelularNotificacionesTrabajo(celularT);
            } break;
        }
    },

    CambiarDeColorBtnDomicilio: function () {
        $('#correspondenciaDomicilio').removeClass('btn-habilitado').removeClass('btn-deshabilitado').removeClass('btn-no-seleccionado').addClass('btn-seleccionado');
        var habilitadoTra = $('#correspondenciaTrabajo').prop('disabled');
        if (!habilitadoTra) {
            $('#correspondenciaTrabajo').removeClass('btn-seleccionado').removeClass('btn-deshabilitado').removeClass('btn-no-seleccionado').addClass('btn-habilitado');
        }
    },

    CambiarDeColorBtnTrabajo: function () {
        $('#correspondenciaTrabajo').removeClass('btn-habilitado').removeClass('btn-deshabilitado').removeClass('btn-no-seleccionado').addClass('btn-seleccionado');
        var habilitadoDom = $('#correspondenciaDomicilio').prop('disabled');
        if (!habilitadoDom) {
            $('#correspondenciaDomicilio').removeClass('btn-seleccionado').removeClass('btn-deshabilitado').removeClass('btn-no-seleccionado').addClass('btn-habilitado');
        }
    },

    CambiarDeColorEstadoCuentaDomicilio: function () {
        $('#estadoCuentaPersonal').removeClass('btn-correo-habilitado').removeClass('btn-correo-deshabilitado').removeClass('btn-correono-seleccionado').addClass('btn-correo-seleccionado');
        var habilitadoTra = $('#estadoCuentaTrabajo').prop('disabled');
        if (!habilitadoTra) {
            $('#estadoCuentaTrabajo').removeClass('btn-correo-seleccionado').removeClass('btn-correo-deshabilitado').removeClass('btn-correono-seleccionado').addClass('btn-correo-habilitado');
        }
        var habilitaFis = $('#estadoCuentaFisico').prop('disabled');
        if (!habilitaFis) {
            $('#estadoCuentaFisico').removeClass('btn-seleccionado').removeClass('btn-deshabilitado').removeClass('btn-no-seleccionado').addClass('btn-habilitado');
        }
    },

    CambiarDeColorEstadoCuentaTrabajo: function () {
        $('#estadoCuentaTrabajo').removeClass('btn-correo-habilitado').removeClass('btn-correo-deshabilitado').removeClass('btn-correono-seleccionado').addClass('btn-correo-seleccionado');
        var habilitadoPer = $('#estadoCuentaPersonal').prop('disabled');
        if (!habilitadoPer) {
            $('#estadoCuentaPersonal').removeClass('btn-correo-seleccionado').removeClass('btn-correo-deshabilitado').removeClass('btn-correono-seleccionado').addClass('btn-correo-habilitado');
        }
        var habilitaFis = $('#estadoCuentaFisico').prop('disabled');
        if (!habilitaFis) {
            $('#estadoCuentaFisico').removeClass('btn-seleccionado').removeClass('btn-deshabilitado').removeClass('btn-no-seleccionado').addClass('btn-habilitado');
        }
    },

    CambiarDeColorEstadoCuentaFisico: function () {
        $('#estadoCuentaFisico').removeClass('btn-habilitado').removeClass('btn-deshabilitado').removeClass('btn-no-seleccionado').addClass('btn-seleccionado');
        var habilitadoTra = $('#estadoCuentaTrabajo').prop('disabled');
        if (!habilitadoTra) {
            $('#estadoCuentaTrabajo').removeClass('btn-correo-seleccionado').removeClass('btn-correo-deshabilitado').removeClass('btn-correono-seleccionado').addClass('btn-correo-habilitado');
        }
        var habilitadoPer = $('#estadoCuentaPersonal').prop('disabled');
        if (!habilitadoPer) {
            $('#estadoCuentaPersonal').removeClass('btn-correo-seleccionado').removeClass('btn-correo-deshabilitado').removeClass('btn-correono-seleccionado').addClass('btn-correo-habilitado');
        }
    },

    CambiarDeColorCelularNotificacionesDomicilio: function () {
        $('#smsNotificacionesPersonal').removeClass('btn-habilitado').removeClass('btn-deshabilitado').removeClass('btn-no-seleccionado').addClass('btn-seleccionado');
        var habilitadoTra = $('#smsNotificacionesTrabajo').prop('disabled');
        if (!habilitadoTra) {
            $('#smsNotificacionesTrabajo').removeClass('btn-seleccionado').removeClass('btn-deshabilitado').removeClass('btn-no-seleccionado').addClass('btn-habilitado');
        }
    },

    CambiarDeColorCelularNotificacionesTrabajo: function () {
        $('#smsNotificacionesTrabajo').removeClass('btn-habilitado').removeClass('btn-deshabilitado').removeClass('btn-no-seleccionado').addClass('btn-seleccionado');
        var habilitadoDom = $('#smsNotificacionesPersonal').prop('disabled');
        if (!habilitadoDom) {
            $('#smsNotificacionesPersonal').removeClass('btn-seleccionado').removeClass('btn-deshabilitado').removeClass('btn-no-seleccionado').addClass('btn-habilitado');
        }
    },

    CargarCodAreaPaisSpanInfoDeContacto: function (Ubicacion, SituacionLaboral) {
        var CodCantonProvPais = "";
        let elementInput = "";

        if (Ubicacion == "D") {
            let inputTxtPaisProviCantoParro = document.querySelector('table#_TxtPaisProviCantoParro input');
            elementInput = document.getElementById(inputTxtPaisProviCantoParro.id);
            CodCantonProvPais = elementInput.value;
        } else {
            //if (SituacionLaboral != "4") {
                let inputTxtPaisProviCantoParroTrabajo = document.querySelector('table#_TxtPaisProviCantoParroTrabajo input');
                elementInput = document.getElementById(inputTxtPaisProviCantoParroTrabajo.id);
                CodCantonProvPais = elementInput.value;
            //}
        }


        var CodaAreaPais = {
            _Ubicacion: Ubicacion,
            CmbCuidadCanton: CodCantonProvPais,
            CodAreaPais: "",
            CodAreaCantonPais: "",
        };

        var url = "CargarCodAreaPais";

        $.post(url, CodaAreaPais).done(function (response) {
            var _CodAreaPais = response.CodAreaPais;
            var _CodAreaCantonPais = response.CodAreaCantonPais;
            var _Ubicacion = response._Ubicacion;
            switch (_Ubicacion) {
                case "D": {
                    var ArgumentosAsignar = $("span[class*=SpanDirecciones]");
                    MostrarOcultarCamposDirecciones.AsiganarSpanDinamicamente(ArgumentosAsignar, _CodAreaPais);
                    MostrarOcultarCamposDirecciones.AsiganarCodigoAreaCanton("D", _CodAreaCantonPais);
                } break;
                case "T": {
                    var ArgumentosAsignar = $("span[class*=SpanTrabajo]");
                    MostrarOcultarCamposDirecciones.AsiganarSpanDinamicamente(ArgumentosAsignar, _CodAreaPais);
                    MostrarOcultarCamposDirecciones.AsiganarCodigoAreaCanton("T", _CodAreaCantonPais);
                } break;
            }
        }).fail(function (error) {
            alert("Error al cargar el Teléfono de " + (Ubicacion == "D" ? "Domicilio" : "Trabajo"));
        });

    },

    AsiganarSpanDinamicamente: function (ArgumentosAsignar, _CodAreaPais) {

        $.each(ArgumentosAsignar, function () {
            var IdDelElemeto = $(this).attr("id") || "";
            $('#' + IdDelElemeto).text("+" + (_CodAreaPais == "0" ? "" : _CodAreaPais));
        });
    },

    AsiganarCodigoAreaCanton: function (ubicacioArea, _CodAreaCantonPais) {
        let elementInput = "";
        var codAreaCiudad = (_CodAreaCantonPais == "0" ? null : _CodAreaCantonPais);
        if (ubicacioArea == "D") {
            let inputTxtAreaConven = document.querySelector('table#_TxtAreaConven input');
            if (inputTxtAreaConven != null) {
                elementInput = document.getElementById(inputTxtAreaConven.id);
                elementInput.value = codAreaCiudad;
            }
            $('#_TxtAreaConven').removeClass('styleControlrequired');
            $('#_TxtAreaConven_I').removeClass('styleControlrequired-input');
            let inputTxtAreaConven2 = document.querySelector('table#_TxtAreaConven2 input');
            if (inputTxtAreaConven2 != null) {
                elementInput = document.getElementById(inputTxtAreaConven2.id);
                elementInput.value = codAreaCiudad;
            }
            $('#_TxtAreaConven2').removeClass('styleControlrequired');
            $('#_TxtAreaConven2_I').removeClass('styleControlrequired-input');
        } else {
            let inputTxtAreaConvenTrabajo = document.querySelector('table#_TxtAreaConvenTrabajo input');
            if (inputTxtAreaConvenTrabajo != null) {
                elementInput = document.getElementById(inputTxtAreaConvenTrabajo.id);
                elementInput.value = codAreaCiudad;
            }
            $('#_TxtAreaConvenTrabajo').removeClass('styleControlrequired');
            $('#_TxtAreaConvenTrabajo_I').removeClass('styleControlrequired-input');
        }
    },

    AsiganarCodigoAreaCantonOpcionalTelef: function (clickeado) {

        if (clickeado) {
            var codAreaCiudad = _TxtAreaConven.GetValue();
            _TxtAreaConven2.SetValue(codAreaCiudad);
            var codAreaPais = document.getElementById('SpanTefConven').innerText;
            document.getElementById("SpanTefConven2").innerHTML = codAreaPais;
        } else {
            _TxtAreaConven2.SetValue("");
            document.getElementById("SpanTefConven2").innerHTML = "";
        }
    },

    ValidacionesNotificaciones: function () {        
        var correspondencia;
        let inputCorrespondencia = document.querySelector('table#DondeDeseasRecibirCorrespondencia input');
        if (inputCorrespondencia != null) {
            let elementInput = document.getElementById(inputCorrespondencia.id);
            correspondencia = elementInput.value;
        } else {
            correspondencia = null;
        }
        //var correspondencia = DondeDeseasRecibirCorrespondencia.GetText();
        var estadoCuenta;
        let inputEstadoCuenta = document.querySelector('table#RecibirEstadoCuenta input');
        if (inputEstadoCuenta != null) {
            let elementInput = document.getElementById(inputEstadoCuenta.id);
            estadoCuenta = elementInput.value;
        } else {
            estadoCuenta = null;
        }
        //var estadoCuenta = RecibirEstadoCuenta.GetText();
        var smsNotificaciones;
        let inputNotificaciones = document.querySelector('table#CelularRecibiraNotificaciones input');
        if (inputNotificaciones != null) {
            let elementInput = document.getElementById(inputNotificaciones.id);
            smsNotificaciones = elementInput.value;
        } else {
            smsNotificaciones = null;
        }
        //var smsNotificaciones = CelularRecibiraNotificaciones.GetText();

        if (!(correspondencia != null && correspondencia != "")) {
            MostrarOcultarCamposDirecciones.OcultarMostrarIconoCorrespondencia("visible");
            var noHabilitadoDomC = $('#correspondenciaDomicilio').prop('disabled');
            if (!noHabilitadoDomC) {
                $("#correspondenciaDomicilio").removeClass("btn-habilitado").removeClass('btn-deshabilitado').removeClass('btn-seleccionado').addClass("btn-no-seleccionado");
            }
            var noHabilitadoTraC = $('#correspondenciaTrabajo').prop('disabled');
            if (!noHabilitadoTraC) {
                $("#correspondenciaTrabajo").removeClass("btn-habilitado").removeClass('btn-deshabilitado').removeClass('btn-seleccionado').addClass("btn-no-seleccionado");
            }
        }
        if (!(estadoCuenta != null && estadoCuenta != "")) {
            MostrarOcultarCamposDirecciones.OcultarMostrarIconoEstadoCuenta("visible");
            var noHabilitadoPer = $('#estadoCuentaPersonal').prop('disabled');
            if (!noHabilitadoPer) {
                $("#estadoCuentaPersonal").removeClass("btn-correo-habilitado").removeClass('btn-correo-deshabilitado').removeClass('btn-correo-seleccionado').addClass("btn-correono-seleccionado");
            }
            var noHabilitadoTra = $('#estadoCuentaTrabajo').prop('disabled');
            if (!noHabilitadoTra) {
                $("#estadoCuentaTrabajo").removeClass("btn-correo-habilitado").removeClass('btn-correo-deshabilitado').removeClass('btn-correo-seleccionado').addClass("btn-correono-seleccionado");
            }
            var noHabilitaFis = $('#estadoCuentaFisico').prop('disabled');
            if (!noHabilitaFis) {
                $("#estadoCuentaFisico").removeClass("btn-habilitado").removeClass('btn-deshabilitado').removeClass('btn-seleccionado').addClass("btn-no-seleccionado");
            }
        }
        if (!(smsNotificaciones != null && smsNotificaciones != "")) {
            MostrarOcultarCamposDirecciones.OcultarMostrarIconoCelularNotificaciones("visible");
            var habilitadoDom = $('#smsNotificacionesPersonal').prop('disabled');
            if (!habilitadoDom) {
                $("#smsNotificacionesPersonal").removeClass("btn-habilitado").removeClass('btn-deshabilitado').removeClass('btn-seleccionado').addClass("btn-no-seleccionado");
            }
            var habilitadoTra = $('#smsNotificacionesTrabajo').prop('disabled');
            if (!habilitadoTra) {
                $("#smsNotificacionesTrabajo").removeClass("btn-habilitado").removeClass('btn-deshabilitado').removeClass('btn-seleccionado').addClass("btn-no-seleccionado");
            }
        }
    },

    ValidacionesNotificaciones_EstadoCuenta: function (Valida) {
        var Pasable = true;
        var correspondencia;
        let inputCorrespondencia = document.querySelector('table#DondeDeseasRecibirCorrespondencia input');
        if (inputCorrespondencia != undefined && inputCorrespondencia != null) {
            let elementInput = document.getElementById(inputCorrespondencia.id);
            correspondencia = elementInput.value;
        } else {
            correspondencia = null;
        }
        //var correspondencia = DondeDeseasRecibirCorrespondencia.GetText();
        var estadoCuenta;
        let inputEstadoCuenta = document.querySelector('table#RecibirEstadoCuenta input');
        if (inputEstadoCuenta != undefined && inputEstadoCuenta != null) {
            let elementInput = document.getElementById(inputEstadoCuenta.id);
            estadoCuenta = elementInput.value;
        } else {
            estadoCuenta = null;
        }
        //var estadoCuenta = RecibirEstadoCuenta.GetText();
        var smsNotificaciones;
        let inputNotificaciones = document.querySelector('table#CelularRecibiraNotificaciones input');
        if (inputNotificaciones != undefined && inputNotificaciones != null) {
            let elementInput = document.getElementById(inputNotificaciones.id);
            smsNotificaciones = elementInput.value;
        } else {
            smsNotificaciones = null;
        }
        //var smsNotificaciones = CelularRecibiraNotificaciones.GetText();

        if (!(correspondencia != null && correspondencia != "")) {
            MostrarOcultarCamposDirecciones.OcultarMostrarIconoCorrespondencia("visible");
            var noHabilitadoDomC = $('#correspondenciaDomicilio').prop('disabled');
            if (noHabilitadoDomC != undefined && !noHabilitadoDomC) {
                $("#correspondenciaDomicilio").removeClass("btn-habilitado").removeClass('btn-deshabilitado').removeClass('btn-seleccionado').addClass("btn-no-seleccionado");
            }
            var noHabilitadoTraC = $('#correspondenciaTrabajo').prop('disabled');
            if (noHabilitadoTraC != undefined && !noHabilitadoTraC) {
                $("#correspondenciaTrabajo").removeClass("btn-habilitado").removeClass('btn-deshabilitado').removeClass('btn-seleccionado').addClass("btn-no-seleccionado");
            }
        }
        if (!(estadoCuenta != null && estadoCuenta != "")) {
            MostrarOcultarCamposDirecciones.OcultarMostrarIconoEstadoCuenta("visible");
            var noHabilitadoPer = $('#estadoCuentaPersonal').prop('disabled');
            if (noHabilitadoPer != undefined && !noHabilitadoPer) {
                $("#estadoCuentaPersonal").removeClass("btn-correo-habilitado").removeClass('btn-correo-deshabilitado').removeClass('btn-correo-seleccionado').addClass("btn-correono-seleccionado");
            }
            var noHabilitadoTra = $('#estadoCuentaTrabajo').prop('disabled');
            if (noHabilitadoTra != undefined && !noHabilitadoTra) {
                $("#estadoCuentaTrabajo").removeClass("btn-correo-habilitado").removeClass('btn-correo-deshabilitado').removeClass('btn-correo-seleccionado').addClass("btn-correono-seleccionado");
            }
            var noHabilitaFis = $('#estadoCuentaFisico').prop('disabled');
            if (noHabilitaFis != undefined && !noHabilitaFis) {
                $("#estadoCuentaFisico").removeClass("btn-habilitado").removeClass('btn-deshabilitado').removeClass('btn-seleccionado').addClass("btn-no-seleccionado");
                Pasable = false;
            }
        }
        
        return Valida = Pasable;
    },
    
    ValidacionesNotificaciones_Personal: function (Valida) {
        var Pasable = true;
        var correspondencia;
        let inputCorrespondencia = document.querySelector('table#DondeDeseasRecibirCorrespondencia input');
        if (inputCorrespondencia != undefined && inputCorrespondencia != null) {
            let elementInput = document.getElementById(inputCorrespondencia.id);
            correspondencia = elementInput.value;
        } else {
            correspondencia = null;
        }
        //var correspondencia = DondeDeseasRecibirCorrespondencia.GetText();
        var estadoCuenta;
        let inputEstadoCuenta = document.querySelector('table#RecibirEstadoCuenta input');
        if (inputEstadoCuenta != undefined && inputEstadoCuenta != null) {
            let elementInput = document.getElementById(inputEstadoCuenta.id);
            estadoCuenta = elementInput.value;
        } else {
            estadoCuenta = null;
        }
        //var estadoCuenta = RecibirEstadoCuenta.GetText();
        var smsNotificaciones;
        let inputNotificaciones = document.querySelector('table#CelularRecibiraNotificaciones input');
        if (inputNotificaciones != undefined && inputNotificaciones != null) {
            let elementInput = document.getElementById(inputNotificaciones.id);
            smsNotificaciones = elementInput.value;
        } else {
            smsNotificaciones = null;
        }
        //var smsNotificaciones = CelularRecibiraNotificaciones.GetText();

        if (!(correspondencia != null && correspondencia != "")) {
            MostrarOcultarCamposDirecciones.OcultarMostrarIconoCorrespondencia("visible");
            var noHabilitadoDomC = $('#correspondenciaDomicilio').prop('disabled');
            if (noHabilitadoDomC != undefined && !noHabilitadoDomC) {
                $("#correspondenciaDomicilio").removeClass("btn-habilitado").removeClass('btn-deshabilitado').removeClass('btn-seleccionado').addClass("btn-no-seleccionado");
            }
            var noHabilitadoTraC = $('#correspondenciaTrabajo').prop('disabled');
            if (noHabilitadoTraC != undefined && !noHabilitadoTraC) {
                $("#correspondenciaTrabajo").removeClass("btn-habilitado").removeClass('btn-deshabilitado').removeClass('btn-seleccionado').addClass("btn-no-seleccionado");
            }
        }
        if (!(estadoCuenta != null && estadoCuenta != "")) {
            MostrarOcultarCamposDirecciones.OcultarMostrarIconoEstadoCuenta("visible");
            var noHabilitadoPer = $('#estadoCuentaPersonal').prop('disabled');
            if (noHabilitadoPer != undefined && !noHabilitadoPer) {
                $("#estadoCuentaPersonal").removeClass("btn-correo-habilitado").removeClass('btn-correo-deshabilitado').removeClass('btn-correo-seleccionado').addClass("btn-correono-seleccionado");
            }
            var noHabilitadoTra = $('#estadoCuentaTrabajo').prop('disabled');
            if (noHabilitadoTra != undefined && !noHabilitadoTra) {
                $("#estadoCuentaTrabajo").removeClass("btn-correo-habilitado").removeClass('btn-correo-deshabilitado').removeClass('btn-correo-seleccionado').addClass("btn-correono-seleccionado");
            }
        }
        if (!(smsNotificaciones != null && smsNotificaciones != "")) {
            MostrarOcultarCamposDirecciones.OcultarMostrarIconoCelularNotificaciones("visible");
            var habilitadoDom = $('#smsNotificacionesPersonal').prop('disabled');
            if (habilitadoDom != undefined && !habilitadoDom) {
                $("#smsNotificacionesPersonal").removeClass("btn-habilitado").removeClass('btn-deshabilitado').removeClass('btn-seleccionado').addClass("btn-no-seleccionado");
                Pasable = false;
            }
        }
        return Valida = Pasable;
    },
    
    ValidacionesNotificaciones_Trabajo: function (Valida) {
        var Pasable = true;
        var correspondencia;
        let inputCorrespondencia = document.querySelector('table#DondeDeseasRecibirCorrespondencia input');
        if (inputCorrespondencia != undefined && inputCorrespondencia != null) {
            let elementInput = document.getElementById(inputCorrespondencia.id);
            correspondencia = elementInput.value;
        } else {
            correspondencia = null;
        }
        //var correspondencia = DondeDeseasRecibirCorrespondencia.GetText();
        var estadoCuenta;
        let inputEstadoCuenta = document.querySelector('table#RecibirEstadoCuenta input');
        if (inputEstadoCuenta != undefined && inputEstadoCuenta != null) {
            let elementInput = document.getElementById(inputEstadoCuenta.id);
            estadoCuenta = elementInput.value;
        } else {
            estadoCuenta = null;
        }
        //var estadoCuenta = RecibirEstadoCuenta.GetText();
        var smsNotificaciones;
        let inputNotificaciones = document.querySelector('table#CelularRecibiraNotificaciones input');
        if (inputNotificaciones != undefined && inputNotificaciones != null) {
            let elementInput = document.getElementById(inputNotificaciones.id);
            smsNotificaciones = elementInput.value;
        } else {
            smsNotificaciones = null;
        }
        //var smsNotificaciones = CelularRecibiraNotificaciones.GetText();

        if (!(correspondencia != null && correspondencia != "")) {
            MostrarOcultarCamposDirecciones.OcultarMostrarIconoCorrespondencia("visible");
            var noHabilitadoDomC = $('#correspondenciaDomicilio').prop('disabled');
            if (noHabilitadoDomC != undefined && !noHabilitadoDomC) {
                $("#correspondenciaDomicilio").removeClass("btn-habilitado").removeClass('btn-deshabilitado').removeClass('btn-seleccionado').addClass("btn-no-seleccionado");
            }
            var noHabilitadoTraC = $('#correspondenciaTrabajo').prop('disabled');
            if (noHabilitadoTraC != undefined && !noHabilitadoTraC) {
                $("#correspondenciaTrabajo").removeClass("btn-habilitado").removeClass('btn-deshabilitado').removeClass('btn-seleccionado').addClass("btn-no-seleccionado");
            }
        }
        if (!(estadoCuenta != null && estadoCuenta != "")) {
            MostrarOcultarCamposDirecciones.OcultarMostrarIconoEstadoCuenta("visible");
            var noHabilitadoPer = $('#estadoCuentaPersonal').prop('disabled');
            if (noHabilitadoPer != undefined && !noHabilitadoPer) {
                $("#estadoCuentaPersonal").removeClass("btn-correo-habilitado").removeClass('btn-correo-deshabilitado').removeClass('btn-correo-seleccionado').addClass("btn-correono-seleccionado");
            }
            var noHabilitadoTra = $('#estadoCuentaTrabajo').prop('disabled');
            if (noHabilitadoTra != undefined && !noHabilitadoTra) {
                $("#estadoCuentaTrabajo").removeClass("btn-correo-habilitado").removeClass('btn-correo-deshabilitado').removeClass('btn-correo-seleccionado').addClass("btn-correono-seleccionado");
            }
            
        }
        if (!(smsNotificaciones != null && smsNotificaciones != "")) {
            MostrarOcultarCamposDirecciones.OcultarMostrarIconoCelularNotificaciones("visible");
            
            var habilitadoTra = $('#smsNotificacionesTrabajo').prop('disabled');
            if (habilitadoTra != undefined && !habilitadoTra) {
                $("#smsNotificacionesTrabajo").removeClass("btn-habilitado").removeClass('btn-deshabilitado').removeClass('btn-seleccionado').addClass("btn-no-seleccionado");
                Pasable = false;
            }
        }
        return Valida = Pasable;
    },

    OcultarMostrarIconoCorrespondencia: function (activo) {
        $("#correspondencia span[data-toggle=tooltip]").css("visibility", activo);
    },

    OcultarMostrarIconoEstadoCuenta: function (activo) {
        $("#estadoCuenta span[data-toggle=tooltip]").css("visibility", activo);
    },

    OcultarMostrarIconoCelularNotificaciones: function (activo) {
        $("#smsNotificaciones span[data-toggle=tooltip]").css("visibility", activo);
    },

    HabilitarRecibirEstadoCuenta: function () {
        var correoT = MostrarOcultarCamposDirecciones.ExisteCorreoDeTrabajo();
        var correoD = MostrarOcultarCamposDirecciones.ExisteCorreoDeDomicilio();

        if (!(correoD != "" && correoD != null) || !(correoT != "" && correoT != null)) {
            let inputRecibirEstadoCuenta = document.querySelector('table#RecibirEstadoCuenta input');
            if (inputRecibirEstadoCuenta != null) {
                let elementInput = document.getElementById(inputRecibirEstadoCuenta.id);
                elementInput.value = "";
            }
        }
    },

    HabilitarCorrespondencia: function (argumento) {
        switch (argumento) {
            case "D": {
                var valueDomicilio = MostrarOcultarCamposDirecciones.ExisteCorrespondenciaDomicilio();
                MostrarOcultarCamposDirecciones.HabilitarEstadoCuenta(argumento, valueDomicilio);
            } break;
            case "T": {
                var valueTrabajo = MostrarOcultarCamposDirecciones.ExisteCorrespondenciaTrabajo();
                MostrarOcultarCamposDirecciones.HabilitarEstadoCuenta(argumento, valueTrabajo);
            } break;
        }
    },

    HabilitarCorrespondenciaDomicilio: function (valueDireccion) {
        if (valueDireccion != "" && valueDireccion != null) {
            $('#correspondenciaDomicilio').removeClass('btn-deshabilitado').removeClass('btn-seleccionado').removeClass('btn-no-seleccionado').addClass('btn-habilitado');
            $('#correspondenciaDomicilio').prop('disabled', false);            
        } else {
            $('#correspondenciaDomicilio').removeClass('btn-habilitado').removeClass('btn-seleccionado').removeClass('btn-no-seleccionado').addClass('btn-deshabilitado');
            $('#correspondenciaDomicilio').prop('disabled', true);
            //agregado
            let inputCorrespondencia = document.querySelector('table#DondeDeseasRecibirCorrespondencia input');
            if (inputCorrespondencia != null) {
                let elementInput = document.getElementById(inputCorrespondencia.id);
                elementInput.value = null;
            }//agregado
        }
    },

    HabilitarCorrespondenciaTrabajo: function (valueDireccion) {
        if (valueDireccion != "" && valueDireccion != null) {
            $('#correspondenciaTrabajo').removeClass('btn-deshabilitado').removeClass('btn-seleccionado').removeClass('btn-no-seleccionado').addClass('btn-habilitado');
            $('#correspondenciaTrabajo').prop('disabled', false);
        } else {
            $('#correspondenciaTrabajo').removeClass('btn-habilitado').removeClass('btn-seleccionado').removeClass('btn-no-seleccionado').addClass('btn-deshabilitado');
            $('#correspondenciaTrabajo').prop('disabled', true);
        }
    },

    HabilitarCorrespondenciaFisico: function () {
        var valueDireccionDomicilio = MostrarOcultarCamposDirecciones.ExisteCorrespondenciaDomicilio();
        var valueDireccionTrabajo = MostrarOcultarCamposDirecciones.ExisteCorrespondenciaTrabajo();

        if ((valueDireccionDomicilio != "" && valueDireccionDomicilio != null) || (valueDireccionTrabajo != "" && valueDireccionTrabajo != null)) {
            $('#estadoCuentaFisico').removeClass('btn-deshabilitado').removeClass('btn-seleccionado').removeClass('btn-no-seleccionado').addClass('btn-habilitado');
            $('#estadoCuentaFisico').prop('disabled', false);
        } else {
            $('#estadoCuentaFisico').removeClass('btn-habilitado').removeClass('btn-seleccionado').removeClass('btn-no-seleccionado').addClass('btn-deshabilitado');
            $('#estadoCuentaFisico').prop('disabled', true);
            let inputDondeDeseasRecibirCorrespondencia = document.querySelector('table#DondeDeseasRecibirCorrespondencia input');
            if (inputDondeDeseasRecibirCorrespondencia != null) {
                let elementInput = document.getElementById(inputDondeDeseasRecibirCorrespondencia.id);
                elementInput.value = "";
            }
            MostrarOcultarCamposDirecciones.HabilitarRecibirEstadoCuenta();
        }
    },

    HabilitarEstadoCuenta: function (argumento, valueDireccion) {
        switch (argumento) {
            case "D": {
                MostrarOcultarCamposDirecciones.HabilitarCorrespondenciaDomicilio(valueDireccion);
            } break;
            case "T": {
                MostrarOcultarCamposDirecciones.HabilitarCorrespondenciaTrabajo(valueDireccion);
            } break;
        }
        MostrarOcultarCamposDirecciones.HabilitarCorrespondenciaFisico();
    },

    HabilitarEstadoCuentaDomicilio: function (valueCorreo) {
        if (valueCorreo != "" && valueCorreo != null) {
            $('#estadoCuentaPersonal').removeClass('btn-correo-deshabilitado').removeClass('btn-correo-seleccionado').removeClass('btn-correono-seleccionado').addClass('btn-correo-habilitado');
            $('#estadoCuentaPersonal').prop('disabled', false);
        } else {
            $('#estadoCuentaPersonal').removeClass('btn-correo-habilitado').removeClass('btn-correo-seleccionado').removeClass('btn-correono-seleccionado').addClass('btn-correo-deshabilitado');
            $('#estadoCuentaPersonal').prop('disabled', true);
        }
    },

    HabilitarEstadoCuentaTrabajo: function (valueCorreo) {
        if (valueCorreo != "" && valueCorreo != null) {
            $('#estadoCuentaTrabajo').removeClass('btn-correo-deshabilitado').removeClass('btn-correo-seleccionado').removeClass('btn-correono-seleccionado').addClass('btn-correo-habilitado');
            $('#estadoCuentaTrabajo').prop('disabled', false);
        } else {
            $('#estadoCuentaTrabajo').removeClass('btn-correo-habilitado').removeClass('btn-correo-seleccionado').removeClass('btn-correono-seleccionado').addClass('btn-correo-deshabilitado');
            $('#estadoCuentaTrabajo').prop('disabled', true);
        }
    },

    HabilitarEstadoCuentaCorreo: function (argumento, valueCorreo) {
        if (argumento == "D") {
            MostrarOcultarCamposDirecciones.HabilitarEstadoCuentaDomicilio(valueCorreo);
        } else {
            MostrarOcultarCamposDirecciones.HabilitarEstadoCuentaTrabajo(valueCorreo);
        }
        MostrarOcultarCamposDirecciones.HabilitarRecibirEstadoCuenta();
    },

    HabilitarCelularNotificaciones: function (argumento, valueCelular) {
        if (argumento == "D") {
            MostrarOcultarCamposDirecciones.HabilitarCelularNotificacionesDomicilio(valueCelular);
        } else {
            MostrarOcultarCamposDirecciones.HabilitarCelularNotificacionesTrabajo(valueCelular);
        }
        MostrarOcultarCamposDirecciones.HabilitarCamposCelularSMS();
    },

    HabilitarCamposCelularSMS: function () {
        var TxtCelularDomicilio = MostrarOcultarCamposDirecciones.ExisteCelularDeDomicilio();
        var TxtCelularTrabajo = MostrarOcultarCamposDirecciones.ExisteCelularDeTrabajo();

        if ((TxtCelularDomicilio != "" && TxtCelularDomicilio != null) || (TxtCelularTrabajo != "" && TxtCelularTrabajo != null)) {
            $('#CelularRecibiraNotificaciones').attr('aplicahidden', 'false');
            $('#smsNotificaciones').css('display', 'block');
        } else {
            $('#CelularRecibiraNotificaciones').attr('aplicahidden', 'true');
            $('#smsNotificaciones').css('display', 'none');
            let inputCelularRecibiraNotificacion = document.querySelector('table#CelularRecibiraNotificaciones input');
            if (inputCelularRecibiraNotificacion != null) {
                let elementInput = document.getElementById(inputCelularRecibiraNotificacion.id);
                elementInput.value = "";
            }
            MostrarOcultarCamposDirecciones.HabilitarCelularNotificacionesDomicilio(TxtCelularDomicilio);
            MostrarOcultarCamposDirecciones.HabilitarCelularNotificacionesTrabajo(TxtCelularTrabajo);
        }
    },

    HabilitarCelularNotificacionesDomicilio: function (valueCelular) {
        if (valueCelular != "" && valueCelular != null) {
            $('#smsNotificacionesPersonal').removeClass('btn-deshabilitado').removeClass('btn-seleccionado').removeClass('btn-no-seleccionado').addClass('btn-habilitado');
            $('#smsNotificacionesPersonal').prop('disabled', false);
        } else {
            $('#smsNotificacionesPersonal').removeClass('btn-habilitado').removeClass('btn-seleccionado').removeClass('btn-no-seleccionado').addClass('btn-deshabilitado');
            $('#smsNotificacionesPersonal').prop('disabled', true);
            let inputCelularNotificacionesDomicilio = document.querySelector('table#CelularRecibiraNotificaciones input');
            if (inputCelularNotificacionesDomicilio != null) {
                let elementInput = document.getElementById(inputCelularNotificacionesDomicilio.id);
                if (elementInput.value == "SI-D") {
                    elementInput.value = "";
                }
            }
        }
    },

    HabilitarCelularNotificacionesTrabajo: function (valueCelular) {
        if (valueCelular != "" && valueCelular != null) {
            $('#smsNotificacionesTrabajo').removeClass('btn-deshabilitado').removeClass('btn-seleccionado').removeClass('btn-no-seleccionado').addClass('btn-habilitado');
            $('#smsNotificacionesTrabajo').prop('disabled', false);
        } else {
            $('#smsNotificacionesTrabajo').removeClass('btn-habilitado').removeClass('btn-seleccionado').removeClass('btn-no-seleccionado').addClass('btn-deshabilitado');
            $('#smsNotificacionesTrabajo').prop('disabled', true);
            let inputCelularNotificacionesTrabajo = document.querySelector('table#CelularRecibiraNotificaciones input');
            if (inputCelularNotificacionesTrabajo != null) {
                let elementInput = document.getElementById(inputCelularNotificacionesTrabajo.id);
                if (elementInput.value == "SI-T") {
                    elementInput.value = "";
                }
            }
        }
    },

    SeleccionarCorrespondencia: function (argumento) {
        if (argumento == "D") {
            MostrarOcultarCamposDirecciones.CambiarDeColorBtnDomicilio();
            DondeDeseasRecibirCorrespondencia.SetValue('SI-D');
        } else {
            MostrarOcultarCamposDirecciones.CambiarDeColorBtnTrabajo();
            DondeDeseasRecibirCorrespondencia.SetValue('SI-T');
        }
        MostrarOcultarCamposDirecciones.OcultarMostrarIconoCorrespondencia("hidden");
    },

    SeleccionarEstadoCuenta: function (argumento) {
        switch (argumento) {
            case "D": {
                MostrarOcultarCamposDirecciones.CambiarDeColorEstadoCuentaDomicilio();
                RecibirEstadoCuenta.SetValue('SI-D');
            } break;
            case "T": {
                MostrarOcultarCamposDirecciones.CambiarDeColorEstadoCuentaTrabajo();
                RecibirEstadoCuenta.SetValue('SI-T');
            } break;
            case "F": {
                MostrarOcultarCamposDirecciones.CambiarDeColorEstadoCuentaFisico();
                RecibirEstadoCuenta.SetValue('SI-F');
            } break;
        }
        MostrarOcultarCamposDirecciones.OcultarMostrarIconoEstadoCuenta("hidden");
    },

    SeleccionarCelularNotificaciones: function (argumento) {
        if (argumento == "D") {
            MostrarOcultarCamposDirecciones.CambiarDeColorCelularNotificacionesDomicilio();
            CelularRecibiraNotificaciones.SetValue('SI-D');
        } else {
            MostrarOcultarCamposDirecciones.CambiarDeColorCelularNotificacionesTrabajo();
            CelularRecibiraNotificaciones.SetValue('SI-T');
        }
        MostrarOcultarCamposDirecciones.OcultarMostrarIconoCelularNotificaciones("hidden");
    },

    EvaluarReglasTelefono: function (SituacionLaboral) {
        let elementInput = "";
        let inputTelfConven = document.querySelector('table#_TxtTefConven input');
        elementInput = document.getElementById(inputTelfConven.id);
        var TxtTefConven = elementInput.value;
        let inputTelfCelular = document.querySelector('table#_TxtCelular input');
        elementInput = document.getElementById(inputTelfCelular.id);
        var TxtCelular = elementInput.value;

        var valorTelfConvenTrabajo = "";
        var valorCelularTrabajo = "";
        if (SituacionLaboral != "4") {
            try {
                let inputTelfConvenTrabajo = document.querySelector('table#_TxtTefConvenTrabajo input');
                elementInput = document.getElementById(inputTelfConvenTrabajo.id);
                valorTelfConvenTrabajo = elementInput.value;
                let inputCelularTrabajo = document.querySelector('table#_TxtCelularTrabajo input');
                elementInput = document.getElementById(inputCelularTrabajo.id);
                valorCelularTrabajo = elementInput.value;
           } catch (ex) { 
               valorTelfConvenTrabajo = "";
               valorCelularTrabajo = "";
            }


        }

        var TxtTefConvenTrabajo = SituacionLaboral == "4" ? null : valorTelfConvenTrabajo;
        var TxtCelularTrabajo = SituacionLaboral == "4" ? null : valorCelularTrabajo;

        if (SituacionLaboral == "4") {
            $('#_TxtCelularTrabajo').attr('aplicahidden', 'true'); //true:::No es obligatorio
            $('#_TxtAreaConvenTrabajo').attr('aplicahidden', 'true'); //false:::Es obligatorio
            $('#_TxtTefConvenTrabajo').attr('aplicahidden', 'true');
            $('#_ExtencionTrabajo').attr('aplicahidden', 'true');
        } else {
            if ((TxtTefConven != null && TxtTefConven != "") || (TxtCelular != null && TxtCelular != "") ||
                (TxtTefConvenTrabajo != null && TxtTefConvenTrabajo != "") || (TxtCelularTrabajo != null && TxtCelularTrabajo != "")) {

                if (TxtTefConven != null && TxtTefConven != "") {
                    MostrarOcultarCamposDirecciones.ReglasTelefonoConvencional();
                }

                if (TxtCelular != null && TxtCelular != "") {
                    MostrarOcultarCamposDirecciones.ReglasTelefonoCelular();
                    //Se verifica si la caja de texto del telefono convencional 2 esta visible (Se lo verfica mediante la propiedad de la imagen), para que no sea obligatorio
                    MostrarOcultarCamposDirecciones.EvalularTelefConv2();
                }

                if (TxtTefConvenTrabajo != null && TxtTefConvenTrabajo != "") {
                    MostrarOcultarCamposDirecciones.ReglasTelefonoConvencionalTrabajo();
                }

                if (TxtCelularTrabajo != null && TxtCelularTrabajo != "") {
                    MostrarOcultarCamposDirecciones.ReglasTelefonoCelularTrabajo();
                }

                if ((TxtTefConven == null || TxtTefConven == "") &&
                    (TxtCelular == null || TxtCelular == "")) {
                    MostrarOcultarCamposDirecciones.ReglaTodoTelefonoDomicilioObligatorio();
                }

                if ((TxtTefConvenTrabajo == null || TxtTefConvenTrabajo == "") &&
                    (TxtCelularTrabajo == null || TxtCelularTrabajo == "")) {
                    MostrarOcultarCamposDirecciones.ReglaTodoTelefonoTrabajoObligatorio();
                }

            } else {
                MostrarOcultarCamposDirecciones.ReglaTodoObligatorio();
            }
        }
    },

    EvalularTelefConv2: function () {
        var ImgenPorDefecto = $("img[class*=ImgTelefonoWizard]");
        $.each(ImgenPorDefecto, function () {
            var _ImagenPorDefecto = $(this).attr("ImagenPorDefecto") || "";
            if (_ImagenPorDefecto == "QuitarTelefono") {
                $('#_TxtTefConven2').attr('aplicahidden', 'true'); //Quitado_AEVG
                $('#_TxtAreaConven2').attr('aplicahidden', 'true');
            }
        });
    },

    ReglasTelefonoConvencional: function () {
        $('#_TxtCelular').attr('aplicahidden', 'true'); //true:::No es obligatorio
        $('#_TxtAreaConven').attr('aplicahidden', 'false'); //false:::Es obligatorio
        $('#_TxtTefConven').attr('aplicahidden', 'false');
    },

    ReglasTelefonoCelular: function () {
        $('#_TxtAreaConven').attr('aplicahidden', 'true'); //true:::No es obligatorio
        $('#_TxtTefConven').attr('aplicahidden', 'true');
        $('#_TxtAreaConven2').attr('aplicahidden', 'true');
        $('#_TxtTefConven2').attr('aplicahidden', 'true');//Quitado_AEVG
        $('#_TxtCelular').attr('aplicahidden', 'false'); //false:::Es obligatorio
    },

    ReglasTelefonoConvencionalTrabajo: function () {
        $('#_TxtCelularTrabajo').attr('aplicahidden', 'true'); //true:::No es obligatorio
        $('#_TxtAreaConvenTrabajo').attr('aplicahidden', 'false'); //false:::Es obligatorio
        $('#_TxtTefConvenTrabajo').attr('aplicahidden', 'false');
        $('#_ExtencionTrabajo').attr('aplicahidden', 'true');
    },

    ReglasTelefonoCelularTrabajo: function () {
        $('#_TxtAreaConvenTrabajo').attr('aplicahidden', 'true'); //true:::No es obligatorio
        $('#_TxtTefConvenTrabajo').attr('aplicahidden', 'true');
        $('#_ExtencionTrabajo').attr('aplicahidden', 'true');
        $('#_TxtCelularTrabajo').attr('aplicahidden', 'false'); //false:::Es obligatorio
    },

    ReglaTodoObligatorio: function () {
        $('#_TxtAreaConven').attr('aplicahidden', 'false'); //false:::Es obligatorio
        $('#_TxtTefConven').attr('aplicahidden', 'false');
        $('#_TxtCelular').attr('aplicahidden', 'false');
        $('#_TxtAreaConvenTrabajo').attr('aplicahidden', 'false');
        $('#_TxtTefConvenTrabajo').attr('aplicahidden', 'false');
        $('#_ExtencionTrabajo').attr('aplicahidden', 'false');
        $('#_TxtCelularTrabajo').attr('aplicahidden', 'false');
    },

    ReglaTodoTelefonoDomicilioObligatorio: function () {
        $('#_TxtAreaConven').attr('aplicahidden', 'false'); //false:::Es obligatorio
        $('#_TxtTefConven').attr('aplicahidden', 'false');
        $('#_TxtCelular').attr('aplicahidden', 'false');
    },

    ReglaTodoTelefonoTrabajoObligatorio: function () {
        $('#_TxtAreaConvenTrabajo').attr('aplicahidden', 'false');
        $('#_TxtTefConvenTrabajo').attr('aplicahidden', 'false');
        $('#_ExtencionTrabajo').attr('aplicahidden', 'false');
        $('#_TxtCelularTrabajo').attr('aplicahidden', 'false');
    },

    OnKeyPress: function (s, e, TipoDeCaracter, QuienHizoLaAccion) {
        var theEvent = e.htmlEvent || window.event;
        var key = theEvent.keyCode || theEvent.which;
        var keyString = Validaciones.ObtenerEventKeyCode(s, e, theEvent);
        var ObtenerExpresionRegular = Validaciones.ReturnExpresionRegular(TipoDeCaracter);
        var ValidarExpresion = Validaciones.ValidarExpresionRegular(ObtenerExpresionRegular, keyString);
        var SituacionLaboral = $("#hdd_SituacionLaboral").val();
        var TxtTefConvenTrabajo;
        switch (QuienHizoLaAccion) {
            case "Conve": { //Se evalua cuando se escribe en el campo telefono convencional (Domicilio)
                if (!ValidarExpresion || key == "8") {
                    var Convencional = _TxtTefConven.GetValue();
                    if (Convencional != "" && Convencional != " " && Convencional != null) {
                        MostrarOcultarCamposDirecciones.ReglasTelefonoConvencional();
                    }
                    else { // si no hay datos en  la caja de celular de texto todo vuelve a ser obligatorio
                        MostrarOcultarCamposDirecciones.EvaluarReglasTelefono(SituacionLaboral);
                    }
                }
            } break;
            case "Cell": { //Se evalua cuando se escribe en el campo Celular (Domicilio)
                if (!ValidarExpresion || key == "8") {
                    var NumCell = _TxtCelular.GetValue();
                    MostrarOcultarCamposDirecciones.AplicarValidacionesNumeroCelular('D', NumCell);
                }
            } break;
            case "ConveTrab": { //Se evalua cuando se escribe en el campo telefono convencional (Trabajo)
                if (!ValidarExpresion || key == "8") {
                    var ConvenTrabajo = "";
                    try {
                        ConvenTrabajo = _TxtTefConvenTrabajo.GetValue();
                    } catch (ex) {
                        ConvenTrabajo = null;
                    }

                    if (ConvenTrabajo != "" && ConvenTrabajo != " " && ConvenTrabajo != null) {

                        MostrarOcultarCamposDirecciones.ReglasTelefonoConvencionalTrabajo();
                        MostrarOcultarCamposDirecciones.EvalularTelefConv2();
                    }
                    else { // si no hay datos en  la caja de celular de texto todo vuelve a ser obligatorio
                        MostrarOcultarCamposDirecciones.EvaluarReglasTelefono(SituacionLaboral);
                        MostrarOcultarCamposDirecciones.EvalularTelefConv2();
                    }
                }
            } break;

            case "CellTrab": { //Se evalua cuando se escribe en el campo Ceuluar (Trabajo)
                if (!ValidarExpresion || key == "8") {

                    var TxtCelularTrabajo = "";
                    try {
                        TxtCelularTrabajo = _TxtCelularTrabajo.GetValue();
                    } catch (ex) {
                        TxtCelularTrabajo = null;
                    }
                    MostrarOcultarCamposDirecciones.AplicarValidacionesNumeroCelular('T', TxtCelularTrabajo);
                }
            } break;
        }



    },

    AplicarValidacionesNumeroCelular: function (Lugar, NumCell, SituacionLaboral) {

        switch (Lugar) {
            case "D": {
                if (NumCell != "" && NumCell != " " && NumCell != null) {

                    MostrarOcultarCamposDirecciones.ReglasTelefonoCelular();

                    //Se verifica si la caja de texto del telefono convencional 2 esta visible (Se lo verfica mediante la propiedad de la imagen), para que no sea obligatorio
                    MostrarOcultarCamposDirecciones.EvalularTelefConv2();

                    if (_TxtTefConven.GetValue() == null) {
                        _TxtAreaConven.SetValue(null);
                    }
                    if (SituacionLaboral != "4") {

                        var TxtTefConvenTrabajo = null;

                        try {
                            TxtTefConvenTrabajo = _TxtTefConvenTrabajo.GetValue();
                        } catch (ex) {
                            TxtTefConvenTrabajo = null;
                        }

                        if (TxtTefConvenTrabajo == null) {
                            try {
                                _TxtAreaConvenTrabajo.SetValue(null);
                                _ExtencionTrabajo.SetValue(null);
                            } catch (ex) {

                            }
                        }
                    }

                    MostrarOcultarCamposDirecciones.HabilitarCelularNotificaciones("D", NumCell);
                }
                else {
                    MostrarOcultarCamposDirecciones.EvaluarReglasTelefono(SituacionLaboral);
                    MostrarOcultarCamposDirecciones.EvalularTelefConv2();
                    MostrarOcultarCamposDirecciones.HabilitarCelularNotificaciones("D", NumCell);
                }
            } break;

            case "T": {
                if (NumCell != "" && NumCell != " " && NumCell != null) {
                    MostrarOcultarCamposDirecciones.ReglasTelefonoCelularTrabajo();
                    MostrarOcultarCamposDirecciones.EvalularTelefConv2();

                    if (_TxtTefConven.GetValue() == null) {
                        _TxtAreaConven.SetValue(null);
                    }

                    var TxtTefConvenTrabajo = null;

                    try {
                        TxtTefConvenTrabajo = _TxtTefConvenTrabajo.GetValue()
                    } catch (ex) {
                        TxtTefConvenTrabajo = null;
                    }

                    if (TxtTefConvenTrabajo == null) {

                        try {
                            _TxtAreaConvenTrabajo.SetValue(null);
                            _ExtencionTrabajo.SetValue(null);
                        }
                        catch (ex) {

                        }

                    }

                    MostrarOcultarCamposDirecciones.HabilitarCelularNotificaciones("T", NumCell);
                }
                else { // si no hay datos en  la caja de celular de texto todo vuelve a ser obligatorio
                    MostrarOcultarCamposDirecciones.EvaluarReglasTelefono(SituacionLaboral);
                    MostrarOcultarCamposDirecciones.EvalularTelefConv2();
                    MostrarOcultarCamposDirecciones.HabilitarCelularNotificaciones("T", NumCell);
                }
            } break;
        }
    },

    EvaluarNotificacionesCelular: function (Lugar) {
        var Numero = "";
        var SituacionLaboral = $("#hdd_SituacionLaboral").val();
        if (Lugar == "D") {
            try {
                Numero = _TxtCelular.GetValue();
            } catch (ex) {

            }
        }
        else {
            try {
                Numero = _TxtCelularTrabajo.GetValue();
            } catch (ex) {

            }
        }
        MostrarOcultarCamposDirecciones.AplicarValidacionesNumeroCelular(Lugar, Numero, SituacionLaboral);
    }
};

var CtxInfoOtroPais = {

    OnChangedRbtnDiscapacidad: function () {
        var seleccion = _RbtnDiscapacidad.GetValue();
        CtxInfoOtroPais.EventoSeleccionRbtnDiscapacidad(seleccion, 'no');
    },
    OnChangedRbtnOtraNacionalidad: function () {
        var seleccion = _RbtnOtraNacionalidad.GetValue();
        CtxInfoOtroPais.EventoSeleccionRbtnOtraNacionalidad(seleccion, 'no');
    },

    OnChangedRbtnPaisReffiscal: function () {
        var seleccion = _RbtnRefFiscal.GetValue();
        CtxInfoOtroPais.QuitarBolitaOtrasDireccionesWizard(seleccion, "ValueChangedRbtnPaisReffiscal");
        CtxInfoOtroPais.EventoSeleccionRbtnResidFiscal(seleccion, 'no');
    },
    OnChangedCmbTipoIdentificacionUSA: function () {
        var _tipoIdentifUSA = _CmbTipoIdentificacionUSA.GetValue();
        CtxInfoOtroPais.EventoSeleccionTipoIdentificacionUSA(_tipoIdentifUSA, 'no');
    },
    OnChangedCmbTipoIdentifNacUSA: function () {
        var _tipoIdentifUSA = _CmbTipoIdentNacUSA.GetValue();
        CtxInfoOtroPais.EventoSeleccionTipoIdentifNacUSA(_tipoIdentifUSA, 'no');
    },
    OnChangedCmbTipoIdentifLugarNacUSA: function () {
        var _tipoIdentifUSA = _CmbTipoIdentLugarNacUSA.GetValue();
        CtxInfoOtroPais.EventoSeleccionTipoIdentifLugarNacUSA(_tipoIdentifUSA, 'no');
    },

    QuitarBolitaOtrasDireccionesWizard: function (seleccion, LugarLLamada) {
        var EsPasaporte = $("#EsPasaporte").val();
        if (seleccion == "no" && EsPasaporte == "Si") {
            var DigitalizaDocumentos = ($('#DigitalizoDoc').val() == "True");
            CargarSeccionWizarNavegacion.SeccionWizardNavegacion(LugarLLamada, DigitalizaDocumentos);
        }
    },

    EventoSeleccionRbtnDiscapacidad: function (seleccion, recuperaDatos) {
        if (seleccion == "si") {
            $('#ContenDiscapacidad').attr('style', 'display:block !important;');
            $('#_CmbTipoDiscap').attr('aplicahidden', 'false');
            $('#_TxtPorcentajeDiscap').attr('aplicahidden', 'false');
            //$('#_TxtNumCarnetDiscap').attr('aplicahidden', 'false');
        } else {

            $('#ContenDiscapacidad').attr('style', 'display:none !important;');
            $('#_CmbTipoDiscap').attr('aplicahidden', 'true');
            $('#_TxtPorcentajeDiscap').attr('aplicahidden', 'true');
            //$('#_TxtNumCarnetDiscap').attr('aplicahidden', 'true');

            //en caso que retroceda wizard
            if (recuperaDatos == "no") {
                _CmbTipoDiscap.SetValue(null);
                _TxtNumCarnetDiscap.SetValue('');
                _TxtPorcentajeDiscap.SetValue('');
            }
        }
    },
    EventoSeleccionRbtnOtraNacionalidad: function (seleccion, recuperaDatos) {
        if (seleccion == "si") {
            $('#ContenOtraNacionalidad').attr('style', 'display:block !important;');
            $('#_CmbOtraNacionalidad').attr('aplicahidden', 'false');
        } else {
            try {
                _CmbOtraNacionalidad.SetValue(null);
            } catch (e) {
            }
            $('#ContenOtraNacionalidad').attr('style', 'display:none !important;');
            $('#_CmbOtraNacionalidad').attr('aplicahidden', 'true');

            //crs
            $('#crsTipoIdentificacion').attr('style', 'display:none !important;');
            $('#crsIdentificacion').attr('style', 'display:none !important;');
            $('#_TxtIdentificacionCrs').attr('aplicahidden', 'true');
            $('#_CmbTipoIdentificacionCrs').attr('aplicahidden', 'true');
            //_CmbTipoIdentificacionCrs.SetValue(null);
            //_TxtIdentificacionCrs.SetValue('');

            let elementInput = "";
            let inputTxtDetectarCambios = document.querySelector('table#_CmbTipoIdentificacionCrs input');
            if (inputTxtDetectarCambios != null) {
                elementInput = document.getElementById(inputTxtDetectarCambios.id);
                elementInput.value = "";
            }
            //_TxtIdentificacionCrs.SetValue('');

            let inputTxtDetectarCambiosCrs = document.querySelector('table#_TxtIdentificacionCrs input');
            if (inputTxtDetectarCambiosCrs != null) {
                elementInput = document.getElementById(inputTxtDetectarCambiosCrs.id);
                elementInput.value = "";
            }

            if (recuperaDatos == "no")//en caso que retroceda wizard
                CtxCargarSeccionesFatca.LimpiarCamposFatca();
            CtxCargarSeccionesFatca.OcultarMostrarPreguntasFatca('display:block !important;', recuperaDatos);
            CtxCargarSeccionesFatca.MostrarSeccionFatca('true', 'display:none !important;', recuperaDatos);

        }
    },
    EventoSeleccionRbtnResidFiscal: function (seleccion, recuperaDatos) {
        if (seleccion == "si") {
            $('#ContentCmbPaisReffiscal').attr('style', 'display:block !important;');
            $('#_CmbPaisReffiscal').attr('aplicahidden', 'false');
        } else {

            // _CmbPaisReffiscal.SetValue(null);
            let elementInput = "";
            let inputTxtDetectarCambios = document.querySelector('table#_CmbTipoIdentificacionCrs input');
            if (inputTxtDetectarCambios != null) {
                elementInput = document.getElementById(inputTxtDetectarCambios.id);
                elementInput.value = "";
            }

            try {
                _CmbPaisReffiscal.SetValue(null);
            } catch (e) {
            }
            $('#ContentCmbPaisReffiscal').attr('style', 'display:none !important;');
            $('#_CmbPaisReffiscal').attr('aplicahidden', 'true');

            //crs
            $('#crsIdentificacionTrib').attr('style', 'display:none !important;');
            $('#_TxtIdentificacionTribCrs').attr('aplicahidden', 'true');
            //_TxtIdentificacionTribCrs.SetValue('');

            let inputTxtDetectarCambiosCrs = document.querySelector('table#_TxtIdentificacionCrs input');
            if (inputTxtDetectarCambiosCrs != null) {
                elementInput = document.getElementById(inputTxtDetectarCambiosCrs.id);
                elementInput.value = "";
            }

            if (recuperaDatos == "no")//en caso que retroceda wizard
                CtxCargarSeccionesFatca.LimpiarCamposFatca();
            CtxCargarSeccionesFatca.OcultarMostrarPreguntasFatca('display:block !important;', recuperaDatos);
            CtxCargarSeccionesFatca.MostrarSeccionFatca('true', 'display:none !important;', recuperaDatos);

        }
    },
    EventoSeleccionTipoIdentificacionUSA: function (_tipoIdentifUSA, recuperaDatos) {
        if (_tipoIdentifUSA == "SSO") {//Social Security
            if (recuperaDatos == "no")//en caso que retroceda wizard
                _TxtNumSocialSecurityUSA.SetValue('');

            $('#fatcaNumSocialSecurityfUSA').attr('style', 'display:none !important;');
            $('#_TxtNumSocialSecurityUSA').attr('aplicahidden', 'true');
        } else {
            $('#fatcaNumSocialSecurityfUSA').attr('style', 'display:block !important;');
            $('#_TxtNumSocialSecurityUSA').attr('aplicahidden', 'false');
        }
    },
    EventoSeleccionTipoIdentifNacUSA: function (_tipoIdentifUSA, recuperaDatos) {
        if (_tipoIdentifUSA == "SSO") {//Social Security
            if (recuperaDatos == "no")//en caso que retroceda wizard
                _TxtNumSocialSecurityNacUSA.SetValue('');

            $('#fatcaNumSocialSecurityNacUSA').attr('style', 'display:none !important;');
            $('#_TxtNumSocialSecurityNacUSA').attr('aplicahidden', 'true');
        } else {
            $('#fatcaNumSocialSecurityNacUSA').attr('style', 'display:block !important;');
            $('#_TxtNumSocialSecurityNacUSA').attr('aplicahidden', 'false');
        }
    },
    EventoSeleccionTipoIdentifLugarNacUSA: function (_tipoIdentifUSA, recuperaDatos) {
        if (_tipoIdentifUSA == "SSO") {//Social Security
            if (recuperaDatos == "no")//en caso que retroceda wizard
                _TxtNumSocialSecurityLugarNacUSA.SetValue('');

            $('#fatcaNumSocialSecurityLugarNacUSA').attr('style', 'display:none !important;');
            $('#_TxtNumSocialSecurityLugarNacUSA').attr('aplicahidden', 'true');
        } else {
            $('#fatcaNumSocialSecurityLugarNacUSA').attr('style', 'display:block !important;');
            $('#_TxtNumSocialSecurityLugarNacUSA').attr('aplicahidden', 'false');
        }
    },
    RecuperarDatosPersonales: function (_codPaisOtraNac, _codPaisResFiscal, _rbtnOtraNac, _rbtnResFiscal, _numIdentificacion, _codEstadoCivil, _esMenorEdad, _tieneDiscap, _identificacionCrs, _identificacionTribCrs) {

        if (_codEstadoCivil == "2" || _codEstadoCivil == "5") {

            $('#contenConyugeMenorEdad').addClass('col');

            $('#contentInfoBasica').removeClass("styleInfoBasicaNoTieneConyuge");
            $('#contentInfoBasica').addClass('styleInfoBasicaTieneConyuge');

            try {
                _CmbEstadoCivil.SetValue(_codEstadoCivil);
                _TxtEstadoCivil.SetEnabled(false);
            } catch (ex) {

            }
            $('#contentDatosConyuge').attr('style', 'display:block !important;margin-bottom: 6px !important;');

        } else {

            $('#contentDatosConyuge').attr('style', 'display:none !important;');

            $('#contentInfoBasica').removeClass("styleInfoBasicaTieneConyuge");
            $('#contentInfoBasica').addClass('styleInfoBasicaNoTieneConyuge');
            //campos no obligatorios
            $('#_CmbTipoIdentificacionConyuge').attr('aplicahidden', 'true');
            $('#_TxtNumeroIdentificacionConyuge').attr('aplicahidden', 'true');
            $('#_TxtApellidoPaternoConyuge').attr('aplicahidden', 'true');
            $('#_TxtPrimerNombreConyuge').attr('aplicahidden', 'true');

            try {
                _CmbEstadoCivil.SetValue(_codEstadoCivil);
                _TxtEstadoCivil.SetEnabled(true);
            } catch (ex) {

            }
        }

        if (_esMenorEdad == "True") {
            $('#contenConyugeMenorEdad').addClass('col');
            $('#contentInfoBasica').removeClass("styleInfoBasicaNoTieneConyuge");
            $('#contentInfoBasica').addClass('styleInfoBasicaTieneConyuge');
            $('#_CmbTipoIdentifRepLegalMEdad').attr('aplicahidden', 'false');
            $('#_TxtNumeroIdentifRepLegalMEdad').attr('aplicahidden', 'false');
            $('#_CmbParentescoRepLegalMEdad').attr('aplicahidden', 'false');
            CargarSeccionWizarNavegacion.ChangeCedulaIdentidad('MenorEdad');
            //muestra datos de representante legal
            $('#contentDatosMenorEdad').attr('style', 'display:block !important;');
        } else {

            //oculta contenedor
            $('#contentDatosMenorEdad').attr('style', 'display:none !important;');

            try {
                var _estadoCivil = _codEstadoCivil;

            } catch (ex) {
                var _estadoCivil = 0;
            }


            //casado ->2 o union libre ->5
            if (_estadoCivil != "2" && _estadoCivil != "5") {

                $('#contentInfoBasica').removeClass("styleInfoBasicaTieneConyuge");
                $('#contentInfoBasica').addClass('styleInfoBasicaNoTieneConyuge');
            }

            //campos no obligatorios
            $('#_CmbTipoIdentifRepLegalMEdad').attr('aplicahidden', 'true');
            $('#_TxtNumeroIdentifRepLegalMEdad').attr('aplicahidden', 'true');
            $('#_CmbParentescoRepLegalMEdad').attr('aplicahidden', 'true');

            try {
                _TxtNumeroIdentifRepLegalMEdad.SetText("");
                lblNombresApellidosRepLegalMEdad.SetText("");

                _CmbParentescoRepLegalMEdad.SetValue(null);
                _CmbTipoIdentifRepLegalMEdad.SetValue(null);
            } catch (ex) {

            }

        }

        if (_tieneDiscap != "")
            CtxInfoOtroPais.EventoSeleccionRbtnDiscapacidad(_tieneDiscap, 'si');

        if (_rbtnOtraNac != "")
            CtxInfoOtroPais.EventoSeleccionRbtnOtraNacionalidad(_rbtnOtraNac, 'si');

        if (_rbtnResFiscal != "")
            CtxInfoOtroPais.EventoSeleccionRbtnResidFiscal(_rbtnResFiscal, 'si');

        if (_numIdentificacion != "" && _rbtnOtraNac == "si") {
            CtxCargarSeccionesFatca.CargarFatca(_codPaisOtraNac, 'si');
        } else if (_numIdentificacion != "" && _rbtnResFiscal == "si") {
            CtxCargarSeccionesFatca.CargarFatca(_codPaisResFiscal, 'si');
        }

        //Crs
        if (_identificacionCrs != "") {
            $('#crsTipoIdentificacion').attr('style', 'display:block !important;');
            $('#crsIdentificacion').attr('style', 'display:block !important;');
            $('#_CmbTipoIdentificacionCrs').attr('aplicahidden', 'false');
            $('#_TxtIdentificacionCrs').attr('aplicahidden', 'false');

            var elementInput = ""; //_TxtLugarNacimiento.GetValue();
            let inputTxtDetectarCambios = document.querySelector('table#_TxtIdentificacionCrs input');
            if (inputTxtDetectarCambios != null) {
                elementInput = document.getElementById(inputTxtDetectarCambios.id);
                elementInput.value = _identificacionCrs;
            }

        }

        if (_identificacionTribCrs != "") {
            $('#crsIdentificacionTrib').attr('style', 'display:block !important;');
            $('#_TxtIdentificacionTribCrs').attr('aplicahidden', 'false');

        }


    },

    RecuperarDatosFatcaNacLugarNacimiento: function (codPaisNac, codPaisLugarNac, numIdentifNac, numIdentifLugarNac) {

        if ((numIdentifNac != "" && codPaisNac == "21")) {
            CtxSeccionNacFatca.CargarNacionalidadFatca(codPaisNac, 'si');
        } else if (numIdentifLugarNac != "" && codPaisLugarNac == "21") {
            CtxSeccionLugarNacFatca.CargarLugarNacFatca(codPaisLugarNac, 'si');
        }
    }

};

var CtxSeccionNacFatca = {

    CargarNacionalidadFatca: function (codPais, recuperaDatos) {

        if (codPais == "21") {
            CtxCargarSeccionesFatca.LimpiarClaseRadioPreguntasFatca();//limpia clase radio preguntas fatca
            CtxSeccionNacFatca.MostrarSeccionNacFatca('false', 'display:block !important;', recuperaDatos);
            CtxSeccionNacFatca.OcultarMostrarPreguntasNacFatca('display:none !important;', recuperaDatos);

            //Oculta seccion fatca Otra Nacionalidad o Residencia Fiscal
            CtxCargarSeccionesFatca.MostrarSeccionFatca('true', 'display:none !important;', recuperaDatos);
            //oculta seccion fatca Lugar Nacimiento
            CtxSeccionLugarNacFatca.MostrarSeccionLugarNacFatca('true', 'display:none !important;', recuperaDatos);

        } else {

            if (recuperaDatos == "no")
                CtxSeccionNacFatca.LimpiarCamposNacFatca();

            CtxSeccionNacFatca.OcultarMostrarPreguntasNacFatca('display:block !important;', recuperaDatos);
            CtxSeccionNacFatca.MostrarSeccionNacFatca('true', 'display:none !important;', recuperaDatos);

        }
    },
    MostrarSeccionNacFatca: function (aplicahidden, stylePropiedadVisible, recuperaDatos) {
        var _tipoIdentifUSA = "";//_CmbTipoIdentNacUSA.GetValue();
        
        let inputTxtDetectarCambios1 = document.querySelector('table#_CmbTipoIdentNacUSA input');
        if (inputTxtDetectarCambios1 != null) {
            elementInput = document.getElementById(inputTxtDetectarCambios1.id);
            _tipoIdentifUSA = elementInput.value;
        }

        var _numIdentifUSA = "";//_TxtNumIdentNacUSA.GetValue();
        let inputTxtDetectar__numIdentifUSA = document.querySelector('table#_TxtNumIdentNacUSA input');
        if (inputTxtDetectar__numIdentifUSA != null) {
            elementInput = document.getElementById(inputTxtDetectar__numIdentifUSA.id);
            _numIdentifUSA = elementInput.value;
        }

        if (recuperaDatos == "si" && _numIdentifUSA != null && _numIdentifUSA != "") {
            $('#fatcaTipoIdentNacUSA').attr('style', 'display:block !important;');
            $('#_CmbTipoIdentNacUSA').attr('aplicahidden', 'false');
            $('#fatcaNumIdentifNacUSA').attr('style', 'display: block!important;');
            $('#_TxtNumIdentNacUSA').attr('aplicahidden', 'false');
        } else {
            $('#fatcaTipoIdentNacUSA').attr('style', stylePropiedadVisible);
            $('#_CmbTipoIdentNacUSA').attr('aplicahidden', aplicahidden);
            $('#fatcaNumIdentifNacUSA').attr('style', stylePropiedadVisible);
            $('#_TxtNumIdentNacUSA').attr('aplicahidden', aplicahidden);
        }

        $('#fatcaNumSocialSecurityNacUSA').attr('style', stylePropiedadVisible);
        $('#_TxtNumSocialSecurityNacUSA').attr('aplicahidden', aplicahidden);

        if (recuperaDatos == "si" && _numIdentifUSA != null && _numIdentifUSA != "")
            CtxInfoOtroPais.EventoSeleccionTipoIdentifNacUSA(_tipoIdentifUSA, recuperaDatos);
    },
    OcultarMostrarPreguntasNacFatca: function (stylePropiedadVisible, recuperaDatos) {
        var codPaisNac = "";//_TxtNacionalidad.GetValue();
       
        let inputTxtDetectarCambios2 = document.querySelector('table#_TxtNacionalidad input');
        if (inputTxtDetectarCambios2 != null) {
            elementInput = document.getElementById(inputTxtDetectarCambios2.id);
            codPaisNac = elementInput.value;
        }

        var _numIdentifUSA = "";//_TxtNumIdentNacUSA.GetValue();
        let inputTxtDetectar__numIdentifUSA = document.querySelector('table#_TxtNumIdentNacUSA input');
        if (inputTxtDetectar__numIdentifUSA != null) {
            elementInput = document.getElementById(inputTxtDetectar__numIdentifUSA.id);
            _numIdentifUSA = elementInput.value;
        }


        var EsPasaporte = $("#EsPasaporte").val();

        if (codPaisNac == "21") {
            CtxCargarSeccionesFatca.LimpiarClaseRadioPreguntasFatca();
            //cuando no sea pasaporte se ejecuta csq
            //if (EsPasaporte == "No") {
            //    $('#contenreffiscalotroPais').attr('style', 'display:none !important;');
            //    $('#ContentCmbPaisReffiscal').attr('style', 'display:none !important;');
            //}

            $('#contenEEUU183dias').attr('style', 'display:none !important;');
            $('#contenEEUU122dias').attr('style', 'display:none !important;');
        } else {
            //$('#contenreffiscalotroPais').attr('style', stylePropiedadVisible);//csq
            $('#contenEEUU183dias').attr('style', stylePropiedadVisible);
            $('#contenEEUU122dias').attr('style', stylePropiedadVisible);
        }


        if (recuperaDatos == "si" && _numIdentifUSA != null && _numIdentifUSA != "") {
            $('#contenEEUU183dias').attr('style', 'display:none !important;');
            $('#contenEEUU122dias').attr('style', 'display:none !important;');
        }
    },
    LimpiarCamposNacFatca: function () {
        _CmbTipoIdentNacUSA.SetValue(null);
        _TxtNumIdentNacUSA.SetValue('');
        _TxtNumSocialSecurityNacUSA.SetValue('');
    },
};

var CtxSeccionLugarNacFatca = {

    CargarLugarNacFatca: function (codPais, recuperaDatos) {
        var codPaisNac = "";//_TxtNacionalidad.GetValue();
        
        let inputTxtDetectarCambios3 = document.querySelector('table#_TxtNacionalidad input');
        if (inputTxtDetectarCambios3 != null) {
            elementInput = document.getElementById(inputTxtDetectarCambios3.id);
            codPaisNac = elementInput.value;
        }


        if (codPais == "21") {
            CtxCargarSeccionesFatca.LimpiarClaseRadioPreguntasFatca();//limpia clase radio preguntas fatca
            if (codPaisNac == "21") {
                CtxSeccionLugarNacFatca.MostrarSeccionLugarNacFatca('false', 'display:none !important;', recuperaDatos);
            } else {
                CtxSeccionLugarNacFatca.MostrarSeccionLugarNacFatca('false', 'display:block !important;', recuperaDatos);
            }

            CtxSeccionLugarNacFatca.OcultarMostrarPreguntasLugarNacFatca('display:none !important;', recuperaDatos);

            //Oculta seccion fatca Otra Nacionalidad o Residencia Fiscal
            CtxCargarSeccionesFatca.MostrarSeccionFatca('true', 'display:none !important;', recuperaDatos);
               
        } else {
            if (recuperaDatos == "no")
                CtxSeccionLugarNacFatca.LimpiarCamposLugarNacFatca();

            CtxSeccionLugarNacFatca.OcultarMostrarPreguntasLugarNacFatca('display:block !important;', recuperaDatos);
            CtxSeccionLugarNacFatca.MostrarSeccionLugarNacFatca('true', 'display:none !important;', recuperaDatos);

        }
    },
    MostrarSeccionLugarNacFatca: function (aplicahidden, stylePropiedadVisible, recuperaDatos) {
        var _tipoIdentifUSA = "";//_CmbTipoIdentLugarNacUSA.GetValue();
       
        let inputTxtDetectarCambios4 = document.querySelector('table#_CmbTipoIdentLugarNacUSA input');
        if (inputTxtDetectarCambios4 != null) {
            elementInput = document.getElementById(inputTxtDetectarCambios4.id);
            _tipoIdentifUSA = elementInput.value;
        }

        var _numIdentifUSA = "";//_TxtNumIdentLugarNacUSA.GetValue();
        let inputTxtDetectar__numIdentifUSA = document.querySelector('table#_TxtNumIdentLugarNacUSA input');
        if (inputTxtDetectar__numIdentifUSA != null) {
            elementInput = document.getElementById(inputTxtDetectar__numIdentifUSA.id);
            _numIdentifUSA = elementInput.value;
        }


        if (recuperaDatos == "si" && _numIdentifUSA != null && _numIdentifUSA != "") {
            $('#fatcaTipoIdentLugarNacUSA').attr('style', 'display:block !important;');
            $('#_CmbTipoIdentLugarNacUSA').attr('aplicahidden', 'false');
            $('#fatcaNumIdentifLugarNacUSA').attr('style', 'display: block!important;');
            $('#_TxtNumIdentLugarNacUSA').attr('aplicahidden', 'false');
        } else {
            $('#fatcaTipoIdentLugarNacUSA').attr('style', stylePropiedadVisible);
            $('#_CmbTipoIdentLugarNacUSA').attr('aplicahidden', aplicahidden);
            $('#fatcaNumIdentifLugarNacUSA').attr('style', stylePropiedadVisible);
            $('#_TxtNumIdentLugarNacUSA').attr('aplicahidden', aplicahidden);
        }

        $('#fatcaNumSocialSecurityLugarNacUSA').attr('style', stylePropiedadVisible);
        $('#_TxtNumSocialSecurityLugarNacUSA').attr('aplicahidden', aplicahidden);

        var codPaisNac = ""; //_TxtNacionalidad.GetValue();
        let inputTxtDetectarCambios5 = document.querySelector('table#_TxtNacionalidad input');
        if (inputTxtDetectarCambios5 != null) {
            elementInput = document.getElementById(inputTxtDetectarCambios5.id);
            codPaisNac = elementInput.value;
        }

        if (codPaisNac == "21") {
            $('#_CmbTipoIdentLugarNacUSA').attr('aplicahidden', 'true');
            $('#_TxtNumIdentLugarNacUSA').attr('aplicahidden', 'true');
            $('#_TxtNumSocialSecurityLugarNacUSA').attr('aplicahidden', 'true');
        }



        if (recuperaDatos == "si" && _numIdentifUSA != null && _numIdentifUSA != "")
            CtxInfoOtroPais.EventoSeleccionTipoIdentifLugarNacUSA(_tipoIdentifUSA, recuperaDatos);
    },
    OcultarMostrarPreguntasLugarNacFatca: function (stylePropiedadVisible, recuperaDatos) {
        var codPaisNac = "";//_TxtNacionalidad.GetValue();
       
        let inputTxtDetectarCambios6 = document.querySelector('table#_TxtNacionalidad input');
        if (inputTxtDetectarCambios6 != null) {
            elementInput = document.getElementById(inputTxtDetectarCambios6.id);
            codPaisNac = elementInput.value;
        }

        var codLugarNac = CtxFuncionesPrincipales.ObtenerCodigoPaisLugarNac();


        var _numIdentifUSA = "";//_TxtNumIdentLugarNacUSA.GetValue();

        let inputTxtDetectarCambiosUSA = document.querySelector('table#_TxtNumIdentLugarNacUSA input');
        if (inputTxtDetectarCambiosUSA != null) {
            elementInput = document.getElementById(inputTxtDetectarCambiosUSA.id);
            _numIdentifUSA = elementInput.value;
        }


        var EsPasaporte = $("#EsPasaporte").val();

        if (codLugarNac == "21" || codPaisNac == "21") {
            CtxCargarSeccionesFatca.LimpiarClaseRadioPreguntasFatca();
            //cuando no sea pasaporte se ejecuta csq
            //if (EsPasaporte == "No") {
            //    $('#contenreffiscalotroPais').attr('style', 'display:none !important;');
            //    $('#ContentCmbPaisReffiscal').attr('style', 'display:none !important;');
            //}

            $('#contenEEUU183dias').attr('style', 'display:none !important;');
            $('#contenEEUU122dias').attr('style', 'display:none !important;');
        } else {
            //$('#contenreffiscalotroPais').attr('style', stylePropiedadVisible);//csq
            $('#contenEEUU183dias').attr('style', stylePropiedadVisible);
            $('#contenEEUU122dias').attr('style', stylePropiedadVisible);
        }

        if (recuperaDatos == "si" && _numIdentifUSA != null && _numIdentifUSA != "") {
            $('#contenEEUU183dias').attr('style', 'display:none !important;');
            $('#contenEEUU122dias').attr('style', 'display:none !important;');
        }
    },
    LimpiarCamposLugarNacFatca: function () {
        _CmbTipoIdentLugarNacUSA.SetValue(null);
        _TxtNumIdentLugarNacUSA.SetValue('');
        _TxtNumSocialSecurityLugarNacUSA.SetValue('');
    },
};

var CtxCargarSeccionesFatca = {

    CargarFatca: function (codPais, recuperaDatos) {

        var codPaisNac = "";//_TxtNacionalidad.GetValue();
       
        let inputTxtDetectarCambios7 = document.querySelector('table#_TxtNacionalidad input');
        if (inputTxtDetectarCambios7 != null) {
            elementInput = document.getElementById(inputTxtDetectarCambios7.id);
            codPaisNac = elementInput.value;
        }
        var codLugarNac = CtxFuncionesPrincipales.ObtenerCodigoPaisLugarNac();

        if (codPais == "21")
        {
            CtxCargarSeccionesFatca.LimpiarClaseRadioPreguntasFatca();//limpia clase radio preguntas fatca
            CtxCargarSeccionesFatca.MostrarSeccionFatca('false', 'display:block !important;', recuperaDatos);
            CtxCargarSeccionesFatca.OcultarMostrarPreguntasFatca('display:none !important;', recuperaDatos);
        } else {
            if (codPaisNac == "21" || codLugarNac == "21") {// change en otra nacionalidad o ref fiscal de otro pais, prevalece campo validador nacionalidad o lugar nacimiento
                CtxCargarSeccionesFatca.LimpiarClaseRadioPreguntasFatca();
                CtxCargarSeccionesFatca.OcultarMostrarPreguntasFatca('display:none !important;', recuperaDatos);
            } else
            {
                if (recuperaDatos == "no")
                    CtxCargarSeccionesFatca.LimpiarCamposFatca();

                CtxCargarSeccionesFatca.OcultarMostrarPreguntasFatca('display:block !important;', recuperaDatos);
                CtxCargarSeccionesFatca.MostrarSeccionFatca('true', 'display:none !important;', recuperaDatos);
            }
        }

        
    },

    MostrarSeccionFatca: function (aplicahidden, stylePropiedadVisible, recuperaDatos) {

        var codPaisNac = "";//_TxtNacionalidad.GetValue();
       
        let inputTxtDetectarCambios8 = document.querySelector('table#_TxtNacionalidad input');
        if (inputTxtDetectarCambios8 != null) {
            elementInput = document.getElementById(inputTxtDetectarCambios8.id);
            codPaisNac = elementInput.value;
        }


        var codLugarNac = CtxFuncionesPrincipales.ObtenerCodigoPaisLugarNac();

        var _tipoIdentifUSA = "";// _CmbTipoIdentificacionUSA.GetValue();

        let inputTxtDetectar_tipoIdentifUSA = document.querySelector('table#_CmbTipoIdentificacionUSA input');
        if (inputTxtDetectar_tipoIdentifUSA != null) {
            elementInput = document.getElementById(inputTxtDetectar_tipoIdentifUSA.id);
            _tipoIdentifUSA = elementInput.value;
        }

        var _numIdentifUSA = "";//_TxtNumIdentificacionUSA.GetValue();

        let inputTxtDetectar__numIdentifUSA = document.querySelector('table#_TxtNumIdentificacionUSA input');
        if (inputTxtDetectar__numIdentifUSA != null) {
            elementInput = document.getElementById(inputTxtDetectar__numIdentifUSA.id);
            _numIdentifUSA = elementInput.value;
        }

        if (recuperaDatos == "si" && _numIdentifUSA != null && _numIdentifUSA != "") {
            $('#fatcaTipoIdentUSA').attr('style', 'display:block !important;');
            $('#_CmbTipoIdentificacionUSA').attr('aplicahidden', 'false');
            $('#fatcaNumIdentificacionfUSA').attr('style', 'display: block!important;');
            $('#_TxtNumIdentificacionUSA').attr('aplicahidden', 'false');
        } else {
            if (codPaisNac == "21" || codLugarNac == "21") {
                $('#fatcaTipoIdentUSA').attr('style', 'display: none!important;');
                $('#_CmbTipoIdentificacionUSA').attr('aplicahidden', 'true');
                $('#fatcaNumIdentificacionfUSA').attr('style', 'display: none!important;');
                $('#_TxtNumIdentificacionUSA').attr('aplicahidden', 'true');
            } else {
                $('#fatcaTipoIdentUSA').attr('style', stylePropiedadVisible);
                $('#_CmbTipoIdentificacionUSA').attr('aplicahidden', aplicahidden);
                $('#fatcaNumIdentificacionfUSA').attr('style', stylePropiedadVisible);
                $('#_TxtNumIdentificacionUSA').attr('aplicahidden', aplicahidden);
            }
        }

        if (codPaisNac == "21" || codLugarNac == "21") {
            $('#fatcaNumSocialSecurityfUSA').attr('style', 'display: none!important;');
            $('#_TxtNumSocialSecurityUSA').attr('aplicahidden', 'true');
        } else {
            $('#fatcaNumSocialSecurityfUSA').attr('style', stylePropiedadVisible);
            $('#_TxtNumSocialSecurityUSA').attr('aplicahidden', aplicahidden);
        }


        if (recuperaDatos == "si" && _numIdentifUSA != null && _numIdentifUSA != "")
            CtxInfoOtroPais.EventoSeleccionTipoIdentificacionUSA(_tipoIdentifUSA, recuperaDatos);

    },
    OcultarMostrarPreguntasFatca: function (stylePropiedadVisible, recuperaDatos) {
        var codPaisNac = "";//_TxtNacionalidad.GetValue();
        
        let inputTxtDetectarCambios9 = document.querySelector('table#_TxtNacionalidad input');
        if (inputTxtDetectarCambios9 != null) {
            elementInput = document.getElementById(inputTxtDetectarCambios9.id);
            codPaisNac = elementInput.value;
        }

        var codLugarNac = CtxFuncionesPrincipales.ObtenerCodigoPaisLugarNac();


        var _numIdentifUSA = "";//_TxtNumIdentificacionUSA.GetValue();

        let inputTxtDetectarCambiosUSA = document.querySelector('table#_TxtNumIdentificacionUSA input');
        if (inputTxtDetectarCambiosUSA != null) {
            elementInput = document.getElementById(inputTxtDetectarCambiosUSA.id);
            _numIdentifUSA = elementInput.value;
        }


        var EsPasaporte = $("#EsPasaporte").val();

        var seleccion = "";///_RbtnOtraNacionalidad.GetValue(); // no o si

        let inputTxtDetectarseleccion = document.querySelector('table#_RbtnOtraNacionalidad input');
        if (inputTxtDetectarseleccion != null) {
            elementInput = document.getElementById(inputTxtDetectarseleccion.id);
            seleccion = elementInput.value;
        }

        var codPaisOtraNac = "";//;_CmbOtraNacionalidad.GetValue();

        let inputTxtDetectarcodPaisOtraNac = document.querySelector('table#_CmbOtraNacionalidad input');
        if (inputTxtDetectarcodPaisOtraNac != null) {
            elementInput = document.getElementById(inputTxtDetectarcodPaisOtraNac.id);
            codPaisOtraNac = elementInput.value;
        }


        //if (seleccion == "si" && codPaisOtraNac == "21") {
        //    //$("#_RbtnRefFiscal").removeClass("radio");

        //    //if (EsPasaporte == "No")//cuando no sea pasaporte se ejecuta
        //    //    $('#contenreffiscalotroPais').attr('style', stylePropiedadVisible);

        //} else {
        //    $('#contenreffiscalotroPais').attr('style', 'display:block !important;');
        //}

        //aplica filtro cuando lugar nacimiento o nacionalidad es Estadounidense
        //se oculta referencia fiscal o legal otro pais
        if (codPaisNac == "21" || codLugarNac == "21") {
            //$("#_RbtnRefFiscal").removeClass("radio");
            CtxCargarSeccionesFatca.LimpiarClaseRadioPreguntasFatca();

            //cuando no sea pasaporte se ejecuta
            //if (EsPasaporte == "No") {
            //    $('#contenreffiscalotroPais').attr('style', 'display:none !important;');
            //    $('#ContentCmbPaisReffiscal').attr('style', 'display:none !important;');
            //}

            $('#contenEEUU183dias').attr('style', 'display:none !important;');
            $('#contenEEUU122dias').attr('style', 'display:none !important;');
        } else {
            $('#contenEEUU183dias').attr('style', stylePropiedadVisible);
            $('#contenEEUU122dias').attr('style', stylePropiedadVisible);
        }


        if (recuperaDatos == "si" && _numIdentifUSA != null && _numIdentifUSA != "") {
            $('#contenEEUU183dias').attr('style', 'display:none !important;');
            $('#contenEEUU122dias').attr('style', 'display:none !important;');
        }
    },
    LimpiarCamposFatca: function () {
        _CmbTipoIdentificacionUSA.SetValue(null);
        _TxtNumIdentificacionUSA.SetValue('');
        _TxtNumSocialSecurityUSA.SetValue('');
    },
    LimpiarClaseRadioPreguntasFatca: function () {

        $("#_RbtnDiasCientoOchentaTres").removeClass("radio");
        $("#_RbtnDiasCientoVeintiDos").removeClass("radio");
    }
};

var CtxCargarSeccionPEP = {

    EjecuatarChangedRbtnDesempenaFunciones: function (s, e) {
        CtxCargarSeccionPEP.ChangedDesempenaFuncionasPublicas('ValueChanged');
        Validaciones.RemoveStyleRequiredToRadioButton(s.mainElement);
    },


    EjecutarChangedRbtnAccionistaOtraEmpresa: function (s, e) {
        CtxCargarSeccionPEP.ChangedAccionistaEnAlgunaEmpresa('ValueChanged');
        Validaciones.RemoveStyleRequiredToRadioButton(s.mainElement);
    },


    EjecuatarValueChangedNumRuc: function (s, e) {
        CtxCargarSeccionPEP.ConsultarNombrePersoRelaYempresaPEPAccionista('2');
        Validaciones.RemoveStyleRequiredToInput(s.inputElement);
    },
    //CrearTootilp: function () {
    //    $("#TooltipPEP").tooltip({
    //        title: 'Estas preguntas deberá realizarlas al cliente, para completar los campos requeridos del formulario.',
    //        placement: 'right',
    //        html: true,
    //        delay: { show: 0, hide: 0 },
    //        container: 'body'
    //    });
    //},

    //DetectarHover: function () {
    //    $("#TooltipPEP").hover(function () {
    //        $('.tooltip-inner').attr('style', 'max-width: ' + 334 + 'px !important;' + 'background-color: ' + '#E5E5E5 ' + '!important;');
    //        $(".arrow").removeClass("arrow");
    //    });
    //},
    ChangedMesAnioEjercicioFunciones: function (s, e) {

        var _Url = "VerificarSiEsPepActivo";
        var Datos = { AnioEjercicioFunciones: "" };

        try {
            Datos.AnioEjercicioFunciones = HastaQAnioEjercioFunciones.GetText();
        } catch (ex) {
            Datos.AnioEjercicioFunciones = "";
        }

        if (Datos.AnioEjercicioFunciones != "") {
            $.post(_Url, Datos).done(function (responese) {
                if (responese) {

                    $('#PersonasRelacionadaConPEP').removeClass('OcultarCajaDeTexto');
                    $('#PersonasRelacionadaConPEP').addClass('MostrarContenido');


                    $('#EmpresaDondePepEsAccionista').removeClass('OcultarCajaDeTexto');
                    $('#EmpresaDondePepEsAccionista').addClass('MostrarContenido');

                    var CheckAccionistaEmpresa = AccionistaEmpresa.GetValue();
                    if (CheckAccionistaEmpresa == "" || CheckAccionistaEmpresa == null) {
                        CtxCargarSeccionPEP.ChangedAccionistaEnAlgunaEmpresa("lala");
                    }
                    CtxCargarSeccionPEP.MostrarGridPersonasRelacionadas();
                } else {

                    $('#PersonasRelacionadaConPEP').addClass('OcultarCajaDeTexto');
                    $('#PersonasRelacionadaConPEP').removeClass('MostrarContenido');


                    $('#EmpresaDondePepEsAccionista').addClass('OcultarCajaDeTexto');
                    $('#EmpresaDondePepEsAccionista').removeClass('MostrarContenido');

                    CtxCargarSeccionPEP.EvaluarGridDePersonasRelacionadasYdeEmpresas();
                    TipoIdentificacion.SetValue(null);
                    CtxCargarSeccionPEP.FormatearCamposYSeccionAccionistaEmpresa();
                    CtxCargarSeccionPEP.ChangedAccionistaEnAlgunaEmpresa("lala");
                }

            });
        }


    },


    OnGridPepAccionistaFocusedRowChanged: function (s, e) {

        if (e.buttonID = "deleteButtonPEPAccionista") {
            s.GetRowValues(s.GetFocusedRowIndex(), 'Identificacion', CtxCargarSeccionPEP.OnGetRowValuesPepAccionista);
        }

    },

    OnGetRowValuesPepAccionista: function (values) {
        var NumRuc = values;
        if (Identificacion != null) {
            var _NumRuc = { __NumRuc: NumRuc };
            var Url = "EliminarDatosPEPEsAccionista";
            $.post(Url, _NumRuc).done(function (response) {
                if (response.CountGrid > 0) {
                    GridViewDondePepEsAccionista.Refresh();
                    GridViewDondePepEsAccionista.PerformCallback();
                }
                else {
                    GridViewDondePepEsAccionista.Refresh();
                    $("#DivGridViewDondePepEsAccionista").addClass('OcultarCajaDeTexto');
                    $("#DivGridViewDondePepEsAccionista").removeClass('MostrarContenido');
                }

            });
        }

    },


    OnGridFocusedRowChanged: function (s, e) {

        if (e.buttonID = "deleteButton") {
            s.GetRowValues(s.GetFocusedRowIndex(), 'Identificacion', CtxCargarSeccionPEP.OnGetRowValues);
        }

    },

    OnGetRowValues: function (values) {
        var Identificacion = values;
        if (Identificacion != null) {
            var _Identificacion = { __Identificacion: Identificacion };
            var Url = "EliminarDatosPersonaRelacionadas";
            $.post(Url, _Identificacion).done(function (response) {
                if (response.CountGrid > 0) {
                    GridPersonasRelacionadas.Refresh();
                    GridPersonasRelacionadas.PerformCallback();
                }
                else {
                    GridPersonasRelacionadas.Refresh();
                    $("#GridPersonaRelacionadaConPEP").addClass('OcultarCajaDeTexto');
                    $("#GridPersonaRelacionadaConPEP").removeClass('MostrarContenido');
                }

            });
        }

    },

    EvaluarSiEsPep: function (__AniosFunciones, _AnioMaximoFunciones) {
        var EsPep = true;
        if (__AniosFunciones >= _AnioMaximoFunciones) {
            EsPep = false;
        }
        return EsPep;
    },

    EvaluarRadioButton: function (Argumento) {/*EsPorInfoLaboral*/
        var _DesempenaFuncionesPublicas = "";
        try {
            _DesempenaFuncionesPublicas = DesempenaFuncionesPublicas.GetValue();
        }
        catch (ex) { }
        var __AniosFunciones = $("#AniosFunciones").val();
        var _AnioMaximoFunciones = $("#AnioMaximoFunciones").val();
        //var lala = CtxCargarSeccionPEP.EvaluarSiEsPep(__AniosFunciones, _AnioMaximoFunciones);

        if (_DesempenaFuncionesPublicas == "no" && CtxCargarSeccionPEP.EvaluarSiEsPep(__AniosFunciones, _AnioMaximoFunciones)) {
            CtxCargarSeccionPEP.MostarFuncionesPublicasNormal_NO();
            CtxCargarSeccionPEP.MostrarSeccionPersonasRelacionadas();
            CtxCargarSeccionPEP.MostrarGridPersonasRelacionadas();
            CtxCargarSeccionPEP.MostrarSeccionDondePepEsAccionista();
            CtxCargarSeccionPEP.CargarDivNumeroYNombreEmpresas();
            CtxCargarSeccionPEP.CargarGridDondePepEsAccionista();

        } else {
            //if (EsPorInfoLaboral == "si") {
            //    $('#PersonasRelacionadaConPEP').removeClass('OcultarCajaDeTexto');
            //    $('#PersonasRelacionadaConPEP').addClass('MostrarContenido');
            //    CtxCargarSeccionPEP.MostrarSeccionDondePepEsAccionista();
            //    CtxCargarSeccionPEP.MostrarGridPersonasRelacionadas();
            //    CtxCargarSeccionPEP.CargarGridDondePepEsAccionista();
            //} else {
                CtxCargarSeccionPEP.ChangedDesempenaFuncionasPublicas(Argumento);
                CtxCargarSeccionPEP.ChangedAccionistaEnAlgunaEmpresa(Argumento);
            //}

        }

        //CtxCargarSeccionPEP.ChangedVinculoFamiliar();


    },

    ChangedDesempenaFuncionasPublicas: function (Argumento) {

        var DesempeñaFuncionesPublicas = DesempenaFuncionesPublicas.GetValue();

        CtxCargarSeccionPEP.EvaluarCargosPublicos(DesempeñaFuncionesPublicas, Argumento);
        if (DesempeñaFuncionesPublicas == "si") {
            CtxCargarSeccionPEP.ChangedAccionistaEnAlgunaEmpresa(Argumento);
        }

    },

    ChangedAccionistaEnAlgunaEmpresa: function (Argumento) {
        var CheckAccionistaEmpresa = "";
        try {
            CheckAccionistaEmpresa = AccionistaEmpresa.GetValue();
        }
        catch (ex) { }

        CtxCargarSeccionPEP.EvaluarAccionistaEnAlgunaEmpresa(CheckAccionistaEmpresa, Argumento);
    },

    EvaluarAccionistaEnAlgunaEmpresa: function (CheckAccionistaEmpresa, Argumento) {
        if (CheckAccionistaEmpresa == "" || CheckAccionistaEmpresa == "no" || CheckAccionistaEmpresa == null) {
            //Se oculta el Contenedor del Numero de Ruc y Nombre empresa
            $('#DivNumeroYNombreEmpresa').removeClass('MostrarContenido');
            $('#DivNumeroYNombreEmpresa').addClass('OcultarCajaDeTexto');
            $('#DivNumeroYNombreEmpresa').attr('style', '');

            //Se oculta el Contenedor del Grid
            $('#DivGridViewDondePepEsAccionista').removeClass('MostrarContenido');
            $('#DivGridViewDondePepEsAccionista').addClass('OcultarCajaDeTexto');

            NombreEmpresa.SetValue(null);
            NumRuc.SetValue(null);

            if (Argumento == 'ValueChanged' && CheckAccionistaEmpresa == "no") {
                CtxCargarSeccionPEP.EliminarGriDondePepEsAccionista();
            }
        }
        else {
            if (CheckAccionistaEmpresa == "si") {
                //Se Muestra el Contenedor del Numero de Ruc y Nombre empresa
                CtxCargarSeccionPEP.CargarDivNumeroYNombreEmpresas();

                //Se muestra el grid de las empresas

                if (Argumento == 'ready') {
                    CtxCargarSeccionPEP.CargarGridDondePepEsAccionista();


                }

            }

        }
    },

    CargarDivNumeroYNombreEmpresas: function () {
        var _AccionistaEmpresa = AccionistaEmpresa.GetValue();
        if (_AccionistaEmpresa == "si") {
            $('#DivNumeroYNombreEmpresa').removeClass('OcultarCajaDeTexto');
            $('#DivNumeroYNombreEmpresa').addClass('MostrarContenido');
            $('#DivNumeroYNombreEmpresa').attr('style', 'display:flex !important');
        }
        else {
            $('#DivNumeroYNombreEmpresa').addClass('OcultarCajaDeTexto');
            $('#DivNumeroYNombreEmpresa').removeClass('MostrarContenido');
        }

    },

    CargarGridDondePepEsAccionista: function () {
        var Url = "CountGridPEpAccionista";
        $.post(Url).done(function (response) {
            if (response) {
                $("#DivGridViewDondePepEsAccionista").removeClass('OcultarCajaDeTexto');
                $("#DivGridViewDondePepEsAccionista").addClass('MostrarContenido');
            }

        });

    },

    EvaluarCargosPublicos: function (DesempeñaFuncionesPublicas, Argumento) {
        if (DesempeñaFuncionesPublicas == "" || DesempeñaFuncionesPublicas == "no") {

            CtxCargarSeccionPEP.MostarFuncionesPublicasNormal_NO();


            if (Argumento == "ValueChanged") {
                ActividadPublica.SetValue(null);
                InstitucionPublica.SetValue(null);
                HastaQAnioEjercioFunciones.SetValue(null);

                $('#InstitucionPublica').removeClass('styleControlrequired');
                $('#InstitucionPublica_I').removeClass('styleControlrequired-input');

                $('#ActividadPublica').removeClass('styleControlrequired');
                $('#ActividadPublica_I').removeClass('styleControlrequired-input');
            }


            //Se ocultan  las secciones de 
            // Personas relacionadas con la Persona Expuesta Políticamente
            CtxCargarSeccionPEP.OcultarSeccionPersonasRelacionadas();

            // Personas relacionadas con la Persona Expuesta Políticamente
            $('#EmpresaDondePepEsAccionista').removeClass('MostrarContenido');
            $('#EmpresaDondePepEsAccionista').addClass('OcultarCajaDeTexto');


            $('#Aniofunciones').addClass('MostrarContenido');
            $('#Aniofunciones').removeClass('OcultarCajaDeTexto');


            CtxCargarSeccionPEP.CambiarPreguntasDePresente_Pasado("1");
            //$('#CualEsElCargoPasado').removeClass('OcultarCajaDeTexto');


            if (DesempeñaFuncionesPublicas == "no" && Argumento == "ValueChanged") {


                CtxCargarSeccionPEP.EvaluarGridDePersonasRelacionadasYdeEmpresas();
                TipoIdentificacion.SetValue(null);
                CtxCargarSeccionPEP.FormatearCamposYSeccionAccionistaEmpresa();
                // var Url = "FormatearVariableSessionGrid";
                // $.post(Url)
            }

        } else {
            if (DesempeñaFuncionesPublicas == "si") {

                if (Argumento == "ValueChanged") {
                    ActividadPublica.SetValue(null);
                    InstitucionPublica.SetValue(null);
                    HastaQAnioEjercioFunciones.SetValue(null);
                    CtxCargarSeccionPEP.EvaluarGridDePersonasRelacionadasYdeEmpresas();
                    TipoIdentificacion.SetValue(null);
                    CtxCargarSeccionPEP.FormatearCamposYSeccionAccionistaEmpresa();
                    CtxCargarSeccionPEP.EvaluarSiPEPTienUnRelacionado();
                }

                //AquiPasado
                CtxCargarSeccionPEP.CambiarPreguntasDePresente_Pasado("2");

                $('#ContenFuncionesPublicasNormal').attr('style', 'display:block !important; display: flex !important;  padding-left: 0px !important;');
                $('#ActividadPublica').attr('aplicahidden', 'false'); //
                $('#InstitucionPublica').attr('aplicahidden', 'false'); //

                //Se mustran las secciones de 
                // Personas relacionadas con la Persona Expuesta Políticamente
                $('#PersonasRelacionadaConPEP').removeClass('OcultarCajaDeTexto');
                $('#PersonasRelacionadaConPEP').addClass('MostrarContenido');

                //Se muestra el grid de personas relacionadas
                if (Argumento == 'ready') {
                    CtxCargarSeccionPEP.MostrarGridPersonasRelacionadas();
                }

                // Personas relacionadas con la Persona Expuesta Políticamente
                CtxCargarSeccionPEP.MostrarSeccionDondePepEsAccionista();


            }
            else {
                if (DesempeñaFuncionesPublicas == null) {
                    $('#ContenFuncionesPublicasNormal').attr('style', 'display:none !important;');
                }
            }

        }
    },

    EvaluarSiPEPTienUnRelacionado: function () {
        var _TieneRelacionados = $("#TienePEPRelacionados").val();
        if (_TieneRelacionados) {
            CtxCargarSeccionPEP.MostrarGridPersonasRelacionadas();
        }

    },

    MostrarGridPersonasRelacionadas: function () {
        var Url = "CountGridPersonaRelacionadas";
        $.post(Url).done(function (response) {
            if (response) {
                $("#GridPersonaRelacionadaConPEP").removeClass('OcultarCajaDeTexto');
                $("#GridPersonaRelacionadaConPEP").addClass('MostrarContenido');
                GridPersonasRelacionadas.PerformCallback();
            }

        });
    },

    MostrarSeccionDondePepEsAccionista: function () {
        $('#EmpresaDondePepEsAccionista').removeClass('OcultarCajaDeTexto');
        $('#EmpresaDondePepEsAccionista').addClass('MostrarContenido');
    },

    OcultarSeccionPersonasRelacionadas: function () {
        $('#PersonasRelacionadaConPEP').addClass('OcultarCajaDeTexto');
        $('#PersonasRelacionadaConPEP').removeClass('MostrarContenido');
    },

    MostrarSeccionPersonasRelacionadas: function () {
        $('#PersonasRelacionadaConPEP').removeClass('OcultarCajaDeTexto');
        $('#PersonasRelacionadaConPEP').addClass('MostrarContenido');
    },

    MostarFuncionesPublicasNormal_NO: function () {
        $('#ContenFuncionesPublicasNormal').attr('style', 'display:block !important; display: flex !important;  padding-left: 0px !important;');
        $('#ActividadPublica').attr('aplicahidden', 'true'); //
        $('#InstitucionPublica').attr('aplicahidden', 'true'); //
    },


    CambiarPreguntasDePresente_Pasado: function (EsPasado_Presente) {

        switch (EsPasado_Presente) {
            case "1":
                { //Presente
                    $('#EnQueInstitucionPublicaPasado').addClass('MostrarContenido');
                    $('#EnQueInstitucionPublicaPasado').removeClass('OcultarCajaDeTexto');

                    $('#EnQueInstitucionPublicaPresente').removeClass('MostrarContenido');
                    $('#EnQueInstitucionPublicaPresente').addClass('OcultarCajaDeTexto');

                    $('#CualEsElCargoPresente').removeClass('MostrarContenido');
                    $('#CualEsElCargoPresente').addClass('OcultarCajaDeTexto');

                    $('#CualEsElCargoPasado').removeClass('OcultarCajaDeTexto');
                    $('#CualEsElCargoPasado').addClass('MostrarContenido');
                } break;

            case "2": { //Pasado
                $('#EnQueInstitucionPublicaPresente').removeClass('OcultarCajaDeTexto');
                $('#EnQueInstitucionPublicaPresente').addClass('MostrarContenido');

                $('#EnQueInstitucionPublicaPasado').removeClass('MostrarContenido');
                $('#EnQueInstitucionPublicaPasado').addClass('OcultarCajaDeTexto');

                $('#CualEsElCargoPasado').removeClass('MostrarContenido');
                $('#CualEsElCargoPasado').addClass('OcultarCajaDeTexto');

                $('#CualEsElCargoPresente').removeClass('OcultarCajaDeTexto');
                $('#CualEsElCargoPresente').addClass('MostrarContenido');

                $('#Aniofunciones').removeClass('MostrarContenido');
                $('#Aniofunciones').addClass('OcultarCajaDeTexto');
            } break;
        }

    },

    ObtenerParametroExpresionRegular: function (s, e) {
        var Parametro = TipoIdentificacion.GetValue() == 'CED' ? 'Num' : 'Alfanumerico';
        Validaciones.ValidarDigitosIngresador(s, e, Parametro);

    },

    ValidarCamposPEP: function (ArgumentoCajaDeTexto, ArgumentValidaRadio, NombreAplicaHidden) {
        var Validador = false;
        //recorre todos los input
        //var ArgumentosAValidar = $("input[class*=Office2010Blue]");
        $.each(ArgumentoCajaDeTexto, function () {

            var IdDelElemeto = $(this).attr("id") || "";
            var NameDelElemento = $(this).attr("name") || "";

            //aplicahidden ->true [campo oculto]/false [campo visible]
            var aplicahidden = $("#" + NameDelElemento).attr(NombreAplicaHidden) || " "; //"aplicahiddenPersonaRelacionada"
            var WidthIdElemento = $("#" + NameDelElemento).attr('style') || "";
            if (aplicahidden == "false") {
                var ValorQueContieneElElemento = $("#" + IdDelElemeto).val();
                if (ValorQueContieneElElemento == "- Seleccione -") {
                    document.getElementById(NameDelElemento).classList.add('styleControlrequired');
                    document.getElementById(IdDelElemeto).classList.add('styleControlrequired-input');
                    Validador = true;
                }

                if (ValorQueContieneElElemento == "") {
                    document.getElementById(NameDelElemento).classList.add('styleControlrequired');
                    document.getElementById(IdDelElemeto).classList.add('styleControlrequired-input');
                    Validador = true;
                }

            }

        });

        Validador = CtxCargarSeccionPEP.ValidaRadioButtonPersonaRelacionadaAccionista(ArgumentValidaRadio, NombreAplicaHidden, Validador);
        //var ArgumentValidaRadio = $("table[class*=dxeRadioButtonList_Office2010Blue]");

        return Validador;
    },

    ValidaRadioButtonPersonaRelacionadaAccionista: function (ArgumentValidaRadio, NombreAplicaHidden, Validador) {
        //var Validador = false;
        $.each(ArgumentValidaRadio, function () {

            var idElementoPadre = $(this).attr("id") || "";
            var idElementoCustom = idElementoPadre + "_ValueInput";
            var aplicahidden = $(this).attr(NombreAplicaHidden) || " "; // "aplicahiddenPersonaRelacionada"
            if (aplicahidden == "false") {
                $("input[type=hidden][id =" + idElementoCustom + "]").each(function () {

                    var _IdElement = $(this).attr("id") || "";
                    var _valueElement = $("#" + _IdElement).val();

                    if (_valueElement == " ") {
                        document.getElementById(idElementoPadre).classList.add('styleControlrequired-input');
                        Validador = true;
                    }

                });
            }
            /*seleccionar elementos con atributo id que sea igual la palabra '_RbtnOtraNacionalidad_ValueInput'*/


        });

        return Validador;
    },

    AgregarDatosAlGrid: function (Argumento) {
        //Argumento que recibe
        //1. Personas relacionadas con la Persona Expuesta Políticamente
        //2. Empresas donde la Persona Expuesta Políticamente es accionista

        var ArgumentosAValidar = $("input[class*=Office2010Blue]"); //Cajas de texto
        var ArgumentValidaRadio = $("table[class*=dxeRadioButtonList_Office2010Blue]"); // Radio Button
        var _NombreAplicaHidden = "";
        var Url = "";
        var Datos = {
            _TipoIdentificacion: "",
            _Identificacion: "",
            _ApellidosNombres: "",
            _RelacionFamiliar: "",
            CodRelacionFamiliar: "",
        };

        var _Datos = {
            NombreEmpresa: "",
            NumRuc: "",
            TipoIdentificacionRuc: "",

        };
        var ArgumentosEnviados = "";


        switch (Argumento) {
            case '1': {
                _NombreAplicaHidden = "aplicahiddenPersonaRelacionada"; //Valida la seccion del .1
                Url = "CargarListaPersonasRelacionadas";
                Datos._TipoIdentificacion = TipoIdentificacion.GetValue();
                Datos._Identificacion = Identificacion.GetValue();
                Datos._ApellidosNombres = ApellidosNombres.GetValue();
                Datos._RelacionFamiliar = RelacionFamiliar.GetText();
                Datos.CodRelacionFamiliar = RelacionFamiliar.GetValue();
                ArgumentosEnviados = Datos;
            } break;
            case '2': {
                _NombreAplicaHidden = "aplicahiddenPEPEsAccionista"; //Valida la seccion del .2
                Url = "CargarListaDondePepEsAccionista";
                _Datos.NombreEmpresa = NombreEmpresa.GetValue();
                _Datos.NumRuc = NumRuc.GetValue();
                _Datos.TipoIdentificacionRuc = "RUC";
                ArgumentosEnviados = _Datos;
            } break;

        }

        var Validador = CtxCargarSeccionPEP.ValidarCamposPEP(ArgumentosAValidar, ArgumentValidaRadio, _NombreAplicaHidden);

        if (!Validador) {

            CtxCargarSeccionPEP.EjecutarPostDeLosGrid(Url, ArgumentosEnviados, Argumento);
        }
    },

    EjecutarPostDeLosGrid: function (Url, ArgumentosEnviados, Argumento) {
        $.post(Url, ArgumentosEnviados).done(function (response) {

            switch (Argumento) {
                case "1": {
                    if (response.CountRegistro > 0) {
                        if (!response.ExiteCliente) {
                            $("#GridPersonaRelacionadaConPEP").removeClass('OcultarCajaDeTexto');
                            $("#GridPersonaRelacionadaConPEP").addClass('MostrarContenido');
                            GridPersonasRelacionadas.PerformCallback();
                            TipoIdentificacion.SetValue(null);
                            Identificacion.SetValue(null);
                            ApellidosNombres.SetValue(null);
                            RelacionFamiliar.SetValue(null);
                        }
                        else {
                            $("#GridPersonaRelacionadaConPEP").removeClass('OcultarCajaDeTexto');
                            $("#GridPersonaRelacionadaConPEP").addClass('MostrarContenido');
                            GridPersonasRelacionadas.PerformCallback();
                            TipoIdentificacion.SetValue(null);
                            Identificacion.SetValue(null);
                            ApellidosNombres.SetValue(null);
                            RelacionFamiliar.SetValue(null);
                        }
                    } else {
                        $("#GridPersonaRelacionadaConPEP").removeClass('MostrarContenido');
                        $("#GridPersonaRelacionadaConPEP").addClass('OcultarCajaDeTexto');
                        TipoIdentificacion.SetValue(null);
                        Identificacion.SetValue(null);
                        ApellidosNombres.SetValue(null);
                        RelacionFamiliar.SetValue(null);
                    }
                } break;

                case "2": {
                    if (response.CountRegistro > 0) {
                        if (!response.ExiteCliente) {
                            $("#DivGridViewDondePepEsAccionista").removeClass('OcultarCajaDeTexto');
                            $("#DivGridViewDondePepEsAccionista").addClass('MostrarContenido');
                            GridViewDondePepEsAccionista.PerformCallback();
                            NombreEmpresa.SetValue(null);
                            NumRuc.SetValue(null);
                        }
                        else {
                            $("#DivGridViewDondePepEsAccionista").removeClass('OcultarCajaDeTexto');
                            $("#DivGridViewDondePepEsAccionista").addClass('MostrarContenido');
                            GridViewDondePepEsAccionista.PerformCallback();
                            NombreEmpresa.SetValue(null);
                            NumRuc.SetValue(null);
                        }
                    } else {
                        $("#DivGridViewDondePepEsAccionista").removeClass('MostrarContenido');
                        $("#DivGridViewDondePepEsAccionista").addClass('OcultarCajaDeTexto');
                        NombreEmpresa.SetValue(null);
                        NumRuc.SetValue(null);
                    }
                } break;

            }




        });
    },

    EvaluarGridDePersonasRelacionadasYdeEmpresas: function () {
        var Url = "EvaluarGridDePersonasRelacionadasYdeEmpresas";
        $.post(Url).done(function (response) {

            $("#GridPersonaRelacionadaConPEP").removeClass('MostrarContenido');
            $("#GridPersonaRelacionadaConPEP").addClass('OcultarCajaDeTexto');

            $("#DivGridViewDondePepEsAccionista").removeClass('MostrarContenido');
            $("#DivGridViewDondePepEsAccionista").addClass('OcultarCajaDeTexto');

        });



    },

    FormatearCamposYSeccionAccionistaEmpresa: function () {
        AccionistaEmpresa.SetValue(null);
        $('#DivNumeroYNombreEmpresa').removeClass('MostrarContenido');
        $('#DivNumeroYNombreEmpresa').addClass('OcultarCajaDeTexto');
    },

    EliminarGriDondePepEsAccionista: function () {
        var Url = "EliminarGriDondePepEsAccionista";
        $.post(Url).done(function (response) {

            $("#DivGridViewDondePepEsAccionista").removeClass('MostrarContenido');
            $("#DivGridViewDondePepEsAccionista").addClass('OcultarCajaDeTexto');

        });
    },

    EvaluarRbtnPersonaRelacionadas: function () {//Personas Relacionadas
        var _NumeroIdentificacion = Identificacion.GetValue();

        if (_NumeroIdentificacion != null) {
            CtxCargarSeccionPEP.ConsultarNombrePersoRelaYempresaPEPAccionista("1");
        }
    },

    ConsultarNombrePersoRelaYempresaPEPAccionista: function (ArgumentoValidador) {
        var Url = "ConsultarClientePorTipoIdentificacionPEP"; //"CargarDatosClientePorTipoNumeroIdentificacion";
        var _TipoIdentificacion = TipoIdentificacion.GetValue();
        if (_TipoIdentificacion != null || ArgumentoValidador == "2") {
            var Datos = {
                NumeroIdentificacion: ArgumentoValidador == "1" ? Identificacion.GetValue() : NumRuc.GetValue(),
                TipoIdentificacion: ArgumentoValidador == "1" ? _TipoIdentificacion : "RUC",
            };
            $.post(Url, Datos).done(function (response) {
                switch (ArgumentoValidador) {
                    case "1": {

                        if (response.Ok) {
                            Validaciones.ValidacionPorCampos(response.LstMensajeAplicativo);
                        } else {

                            if (response.PersonaNat != null) {
                                if (response.PersonaNat.PrimerNombre != null) {
                                    var _ApellidosNombres = response.PersonaNat.ApellidoPaterno + " " + response.PersonaNat.ApellidoMaterno + " " + response.PersonaNat.PrimerNombre + " " + response.PersonaNat.SegundoNombre;
                                    ApellidosNombres.SetValue(_ApellidosNombres);
                                    CtxCargarSeccionPEP.DespintarCajaDeTextoNombreONombreEmpresa(".validarXCampos input[class*=Office2010Blue]", "ApellidosNombres_I");
                                    ApellidosNombres.SetEnabled(true);
                                } else {
                                    ApellidosNombres.SetValue("");
                                    ApellidosNombres.SetEnabled(true);
                                }
                            } else {
                                ApellidosNombres.SetValue("");
                                ApellidosNombres.SetEnabled(true);
                            }

                            $.each($("span[aplicavalidacion*=Identificacion]"), function () {

                                $(this).attr('style', 'visibility: hidden; margin: 0px 6px 0px -15px')

                            });



                        }


                    } break;

                    case "2": {

                        if (response.Ok) {
                            Validaciones.ValidacionPorCampos(response.LstMensajeAplicativo);
                        } else {

                            if (response.PersonaJuri != null) {
                                if (response.PersonaJuri.RazonSocial != null && response.PersonaJuri.RazonSocial != "") {
                                    NombreEmpresa.SetValue(response.PersonaJuri.RazonSocial);
                                    NombreEmpresa.SetEnabled(true);
                                    CtxCargarSeccionPEP.DespintarCajaDeTextoNombreONombreEmpresa(".validarXCampos input[class*=Office2010Blue]", "NombreEmpresa_I");
                                }
                                else {
                                    NombreEmpresa.SetValue("");
                                    NombreEmpresa.SetEnabled(true);
                                }
                            }

                            $.each($("span[aplicavalidacion*=NumRuc]"), function () {

                                $(this).attr('style', 'visibility: hidden; margin: 5px -10px 0px -15px')

                            });
                        }

                    } break;
                }
            });
        }
        else {
            var ArgumentValidaRadio = $("table[class*=dxeRadioButtonList_Office2010Blue]");
            var _NombreAplicaHidden = "aplicahiddenPersonaRelacionada";
            CtxCargarSeccionPEP.ValidaRadioButtonPersonaRelacionadaAccionista(ArgumentValidaRadio, _NombreAplicaHidden);
        }
    },


    DespintarCajaDeTextoNombreONombreEmpresa: function (Argumento, IdElemento) {
        $.each($(Argumento), function () {

            var IdDelElemeto = $(this).attr("id") || "";
            var NameDelElemento = $(this).attr("name") || "";
            if (IdDelElemeto == IdElemento) {
                var ValorElemento = $("#" + IdDelElemeto).val();
                if (ValorElemento != "") {
                    document.getElementById(IdDelElemeto).classList.remove('styleControlrequired-input');
                    document.getElementById(NameDelElemento).classList.remove('styleControlrequired');
                    //break;
                }
            }
        });
    },
};

var ValidacionesFormularios = {

    //ObtenerUbicacion: function () {
    //    var Nex = '.f1 .btn-next';
    //    var current_active_step = $(Nex).parents('.f1').find('.f1-step.active');
    //    var _UriActual = current_active_step.attr("uri") || "";
    //    return _UriActual;
    //},

    //ObtenerIdUbicacionActual: function () {
    //    var Nex = '.f1 .btn-next';
    //    var current_active_step = $(Nex).parents('.f1').find('.f1-step.active');
    //    var _UriActual = current_active_step.attr("id") || "";
    //    return _UriActual;
    //},

    ValidarFormularios: function () {
        var Ubicacion = CxtWizard.ObtenerUbicacion();
        switch (Ubicacion) {
            case 'Doc': {

                //var InresoPlanilla = $("#Hidden_IngresoPlanilla").val();
                var IngresoCedula = $("#Hidden_IngresoCedula").val();
                var _file_DI = _filename_DI.GetText();

                if (IngresoCedula != "" && _file_DI != "") {
                    $('#btnUpdate').submit();
                } else {
                    loadingMainRegistroNoCliente.Hide();
                    CtxGen.MensajesTemporalesDelSistema("", "Por favor cargar y confirmar la aceptación de los documentos.");
                }

            } break;

            case 'Client': {
                ValidacionesFormularios.ValidarFormularioDatosCliente();
            } break;

            case 'Conyu': {
                ValidacionesFormularios.ValidarFormularioConyugue();
            } break;

            case 'Eco': {
                ValidacionesFormularios.ValidarFormularioFinanciero();
            } break;

            case 'Direc': { //OtraDirec
                ValidacionesFormularios.ValidarFormularioDireccion(Ubicacion);
            } break;

            case 'OtraDirec': {
                ValidacionesFormularios.ValidarFormularioOtrasDirecciones();
            } break;

            case 'PEP': {
                ValidacionesFormularios.ValidarFormularioPEP();
            } break;

            default: {
                loadingMainRegistroNoCliente.Hide();
            } break;
        }
    },

    EjecutarValidadorDinamicoFormularios: function (Ubicacion) {
        var Validaor = Validaciones.ValidadorDinamico();
        if (!Validaor) {
            $('#btnUpdate').submit();
        }
        else {
            if (Ubicacion == "Direc") {
                MostrarOcultarCamposDirecciones.ValidacionesNotificaciones();
            }
            loadingMainRegistroNoCliente.Hide();
        }
    },

    ValidarFormularioDatosCliente: function () {
        ValidacionesFormularios.EjecutarValidadorDinamicoFormularios("");
    },

    ValidarFormularioConyugue: function () {
        ValidacionesFormularios.EjecutarValidadorDinamicoFormularios("");

    },

    ValidarFormularioFinanciero: function () {

        var Validaor = Validaciones.ValidadorDinamico();
        var OrigenOtrosIngresos = $('#TxtAreaOrigenOtrosIngresos').val();
        var WidthIdElemento = $('#TxtAreaOrigenOtrosIngresos').attr('style');
        if (OrigenOtrosIngresos == " ") {
            $("#TxtAreaOrigenOtrosIngresos").attr('style', 'border: 1px solid #ff0202 !important; background: #f7e3e3;' + WidthIdElemento + '');
        }
        if ((!(Validaor)) && OrigenOtrosIngresos != " ") {
            $('#btnUpdate').submit();
        } else {
            loadingMainRegistroNoCliente.Hide();
        }
    },

    ValidarFormularioDireccion: function (Ubicacion) {

        ValidacionesFormularios.EjecutarValidadorDinamicoFormularios(Ubicacion);
    },

    ValidarFormularioPEP: function () {

        ValidacionesFormularios.EjecutarValidadorDinamicoFormularios("");
    },

    ValidarFormularioOtrasDirecciones: function () {

        ValidacionesFormularios.EjecutarValidadorDinamicoFormularios("");
    },



    ValidarCamposFormulario: function (objListDeValidaciones) {    //Muestra validación de los campos del cliente - Primera pantalla del registro
        var _listDeValidaciones = JSON.parse(objListDeValidaciones.replace(/&quot;/g, '"').replace(/&#225;/g, "á").replace(/&#233;/g, "é").replace(/&#237;/g, "í").replace(/&#243;/g, "ó").replace(/&#250;/g, "ú"));
        try {
            _TxtEstadoCivil.SetValue(_CmbEstadoCivil.GetValue()); //Esto solo sirve para registro info básica por eso está en un (try - catch).
        }
        catch (ex) { }

        if (_listDeValidaciones.resultadoDeProceso != null) {
            if (_listDeValidaciones.resultadoDeProceso.OK) {
                Validaciones.CamposEstiloNormal();      //Regresa el color de los campos al estado inicial y oculta el icono de error.
            } else {
                if (_listDeValidaciones.resultadoDeProceso.NumeroDeAfectaciones == 1) {
                    CtxGen.ErroresExcepcionesShow(_listDeValidaciones.resultadoDeProceso);    //Presenta msj de EXCEPCIONES del registro
                } else {
                    Validaciones.ValidacionPorCampos(_listDeValidaciones.LstMensajeApp);    //Envía la lista para que presente los mensajes
                }
            }
        } else {
            //var contenidoModal = "En este momento la base única de clientes no se encuentra habilitada.";
            //$("#cambiarContenidoDinamicoModal1").html(contenidoModal);
            //$('#modalErrorCedulaOCodDactilar').modal('show');       //Cuándo se va por la exception y resultadoDeProceso.OK es null
            //alert("En este momento la base única de clientes no se encuentra habilitada.");
        }

    },

    DetectarCambiosRegistro: function (detectarValidacion) {
        let elementInput = "";
        let inputTxtDetectarCambios = document.querySelector('table#TxtDetectarValidacion input');
        if (inputTxtDetectarCambios != null) {
            elementInput = document.getElementById(inputTxtDetectarCambios.id);
            elementInput.value = "" + detectarValidacion;
        }
        //TxtDetectarValidacion.SetValue(detectarValidacion);
    },
};

var GuardarDatosDelFormulario = {

    GuardarDatos: function () {
        loadingMainRegistroNoCliente.Show();
        var UrlConsultaIntegral = "ClienteHome";
        var Url = "RegistrarFlujoCreacionCliente";
        $.ajax({
            type: "POST",
            url: Url,
            async: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //data: JSON.stringify(Novedades),
            success: function (data) {
                if (data.OK) {
                    window.location.assign(UrlConsultaIntegral); //accion directa a la consulta integral
                }
                else {
                    //if (data.Exception != null) {   // Muestra msj de error por EXCEPTION al intentar registrar un cliente.
                    PopupConfirmacion.Hide();
                    loadingMainRegistroNoCliente.Hide();
                    CtxGen.ErroresExcepcionesShow(data);    //Presenta msj de EXCEPCIONES del registro
                    //GuardarDatosDelFormulario.ShowMessageException(data);


                    //} else {    // Muestra msj de error por EXCEPTION al intentar registrar un cliente.
                    //    PopupConfirmacion.Hide();
                    //    GuardarDatosDelFormulario.ShowMessageException(data);
                    //    loadingMainRegistroNoCliente.Hide();

                    //}
                }
            }
            
        });
    },

};

var ReporteriaDevexpressOcultarBotones = {

    OcultarBotones: function () {

        $('.dxrd-right-tabs').attr('style', 'display: none;');
        $('.dxrd-preview-export-options-wrapper').attr('data-bind', '');
        $('.dxrd-right-panel-collapse').attr('style', 'display: none');

    },

    ModalCargarDocumentoPEP: function () {
        //$('#CargarDocumentoPEP').modal({ backdrop: 'static', keyboard: false }) 
        //$('#CargarDocumentoPEP').modal('show');
        //$('#CargarDocumentoPEP').attr('style', 'padding-right: 17px; display: block; position: absolute; left: 68%; bottom: -57%;'); 
        $('#CargarDocumentoPEP').attr('style', 'margin: 535px 0px 0px !important; left: 68% !important; bottom: -57% !important; padding-right: 17px !important; display: block !important; position: absolute !important;');
        var _URL = "ObtenerDatosDocumentoAdjuntoPEP";
        //AdjArch --> muestra la vista principal para adjuntar un archivo
        var Url = "VerificarSiExisteArchivoPEP";
        var IDDiv = "#externalDropZone";
        //$(IDDiv).empty();
        $.post(Url).done(function (response) {
            if (response != "" && response != null) {
                //FileName --> muestra la vista del archivo cargado con el nombre y el tamaño
                ReporteriaDevexpressOcultarBotones.AdjuntarArchivoPEP(_URL, response, IDDiv);
            }
            else {
                ReporteriaDevexpressOcultarBotones.AdjuntarArchivoPEP(_URL, "AdjArch", IDDiv);
            }
        });
    },

    AdjuntarArchivoPEP: function (_URL, _Argumento, IDDiv) {
        $.ajax({
            cache: false,
            type: "POST",
            url: _URL,
            data: { Argumento: _Argumento },
            datatype: 'html',
            success: function (data) {
                if (_Argumento != "AdjArch") {
                    $(IDDiv).removeClass('dropZoneExternal');
                    $(IDDiv).addClass('row');
                    $(IDDiv).attr('style', 'padding: 10px !important; width: 98% !important; height: 35% !important; background-color: #BCE1F0 !important; margin: 20px 0px 0px 5px !important;');
                } else {
                    $(IDDiv).removeClass('row');
                    $(IDDiv).addClass('dropZoneExternal');
                    $(IDDiv).attr('style', '');
                }

                $(IDDiv).empty().html(data);

            }
        });
    },

    EliminarArchivoTempPEP: function (FileName) {
        var Url = "EliminarRptTempClientePEP";
        var _Datos = { Datos: FileName, }
        $.post(Url, _Datos).done(function (response) {
            if (response) {
                var _URL = "ObtenerDatosDocumentoAdjuntoPEP";
                //AdjArch --> muestra la vista principal para adjuntar un archivo
                ReporteriaDevexpressOcultarBotones.AdjuntarArchivoPEP(_URL, "AdjArch", "#externalDropZone");
            }

        });
    },

    CerrarModalCargarDocumentoPEP: function () {
        $("#CargarDocumentoPEP").attr('style', '');
        $('#CargarDocumentoPEP').modal('hide');
    },

    onImageLoadReport: function () {
        var externalDropZone = $("#externalDropZone");
        var uploadedImage = $("#uploadedImage");
        uploadedImage.css({
            left: (externalDropZone.width() - uploadedImage.width()) / 2,
            top: (externalDropZone.height() - uploadedImage.height()) / 2
        });
        ReporteriaDevexpressOcultarBotones.setElementVisibleRpt("dragZone", false);
    },

    setElementVisibleRpt: function (elementId, visible, FileName) {
        var IDDiv = "#" + elementId;
        if (visible) {
            var _URL = "ObtenerDatosDocumentoAdjuntoPEP";
            //FileName --> muestra la vista del archivo cargado con el nombre y el tamaño
            ReporteriaDevexpressOcultarBotones.AdjuntarArchivoPEP(_URL, FileName, IDDiv);

            //garbage.svg
            //salir_Blanco.svg
        }
    },

    onUploadControlFileUploadComplete: function (s, e) {
        if (e.isValid) {
            if (e.callbackData != "") {
                var pathFilePdfJs = "../.." + e.callbackData.split('|')[0];
                var pathFisicaFilePdf = e.callbackData.split('|')[1];
                var filename = e.callbackData.split('|')[2];
                ReporteriaDevexpressOcultarBotones.setElementVisibleRpt("externalDropZone", e.isValid, filename);
            }



        }
        //$("#uploadedImage").attr("src", e.callbackData);

        //ReporteriaDevexpressOcultarBotones.setElementVisibleRpt("uploadedImage", e.isValid);
    },
};

var CargarSeccionWizarNavegacion = {

    ChangeCedulaIdentidad: function (opcion) {
        //loadingCargarInfoConyugue.Show();
        var Datos = { TipoIdentificacion: "", NumeroIdentificacion: "" };
        var Url = "CargarDatosClientePorTipoNumeroIdentificacion";

        try {
            if (opcion == "DatosConyuge") {
                Datos.NumeroIdentificacion = _TxtNumeroIdentificacionConyuge.GetValue();
                Datos.TipoIdentificacion = _CmbTipoIdentificacionConyuge.GetValue();
                var HayRegistroCivil = $('#HdHayRegistroCivil').val();
                var TxtApellidoPaternoConyuge = _TxtApellidoPaternoConyuge.GetValue();
                var TxtPrimerNombreConyuge = _TxtPrimerNombreConyuge.GetValue();
                if (HayRegistroCivil == "N" || ((TxtApellidoPaternoConyuge == "" || TxtApellidoPaternoConyuge == null) && (TxtPrimerNombreConyuge == "" || TxtPrimerNombreConyuge == null))) {
                    CargarSeccionWizarNavegacion.EjecutarPostChangeCedulaIdentidad(Url, Datos, opcion);
                }
            } else {//Menor Edad
                Datos.NumeroIdentificacion = "";//_TxtNumeroIdentifRepLegalMEdad.GetValue();

                //var _lugarNac = ""; // _TxtNumeroIdentifRepLegalMEdad.GetValue();
                let inputTxtNumeroIdentidadRepLegal = document.querySelector('table#_TxtNumeroIdentifRepLegalMEdad input');
                if (inputTxtNumeroIdentidadRepLegal != null) {
                    elementInput = document.getElementById(inputTxtNumeroIdentidadRepLegal.id);
                    Datos.NumeroIdentificacion = elementInput.value;
                }
                Datos.TipoIdentificacion = "";//_CmbTipoIdentifRepLegalMEdad.GetValue();

                let inputTxtTipoIdentifRepLegalMEdad = document.querySelector('table#_CmbTipoIdentifRepLegalMEdad input');
                if (inputTxtTipoIdentifRepLegalMEdad != null) {
                    elementInput = document.getElementById(inputTxtTipoIdentifRepLegalMEdad.id);
                    Datos.TipoIdentificacion = elementInput.value;
                }

                CargarSeccionWizarNavegacion.EjecutarPostChangeCedulaIdentidad(Url, Datos);
            }

        } catch (ex) { }



        //loadingCargarInfoConyugue.Hide();
    },

    EjecutarPostChangeCedulaIdentidad: function (Url, Datos, opcion) {
        $.post(Url, Datos).done(function (response) {

            try {
                if (opcion == "DatosConyuge") {
                    if (response.PrimerNombre != null) {
                        _TxtApellidoPaternoConyuge.SetValue(response.ApellidoPaterno);
                        _TxtApellidoMaternoConyuge.SetValue(response.ApellidoMaterno);
                        _TxtPrimerNombreConyuge.SetValue(response.PrimerNombre);
                        _TxtSegundoNombreConyuge.SetValue(response.SegundoNombre);
                    } else {
                        _TxtApellidoPaternoConyuge.SetValue("");
                        _TxtApellidoMaternoConyuge.SetValue("");
                        _TxtPrimerNombreConyuge.SetValue("");
                        _TxtSegundoNombreConyuge.SetValue("");
                    }
                } else {
                    if (response.PrimerNombre != null) {
                        var ApellidosNombres = response.ApellidoPaterno + " " + response.ApellidoMaterno + " " + response.PrimerNombre + " " + response.SegundoNombre;
                        lblNombresApellidosRepLegalMEdad.SetText(ApellidosNombres);
                    } else {
                        lblNombresApellidosRepLegalMEdad.SetText("");
                    }
                }

            } catch (ex) {
                if (opcion == "DatosConyuge") {
                    _TxtApellidoPaternoConyuge.SetValue("");
                    _TxtApellidoMaternoConyuge.SetValue("");
                    _TxtPrimerNombreConyuge.SetValue("");
                    _TxtSegundoNombreConyuge.SetValue("");
                } else {
                    lblNombresApellidosRepLegalMEdad.SetText("");
                }
            }
            //loadingCargarInfoConyugue.Hide();
        });
    },

    ChangeFechaDeNacimiento: function () {
        loadingMainRegistroNoCliente.Show();
        var Url = "CalcularFechaNacimientoChange";
        var Datos = { FechaNacimiento: "" };


        try {
            Datos.FechaNacimiento = _FechaNacimiento.GetText();
        } catch (ex) {

        }

        if (Datos.FechaNacimiento != "") {
            $.post(Url, Datos).done(function (response) {

                var _Digitalizo = response.Digitalizo;
                CargarSeccionWizarNavegacion.SeccionWizardNavegacion('ChangeFecha', _Digitalizo);
                if (response.EsMenorDeEdad) {
                    $('#contenConyugeMenorEdad').addClass('col');
                    _EsMenorDeEdad.SetText("True");
                    $('#contentInfoBasica').removeClass("styleInfoBasicaNoTieneConyuge");
                    $('#contentInfoBasica').addClass('styleInfoBasicaTieneConyuge');
                    $('#_CmbTipoIdentifRepLegalMEdad').attr('aplicahidden', 'false');
                    $('#_TxtNumeroIdentifRepLegalMEdad').attr('aplicahidden', 'false');
                    $('#_CmbParentescoRepLegalMEdad').attr('aplicahidden', 'false');
                    //muestra datos de representante legal
                    $('#contentDatosMenorEdad').attr('style', 'display:block !important;');

                } else {

                    var _estadoCivil = _CmbEstadoCivil.GetValue();

                    //casado ->2 o union libre ->5
                    if (_estadoCivil != "2" && _estadoCivil != "5") {
                        $('#contenConyugeMenorEdad').removeClass('col');
                        $('#contentInfoBasica').removeClass("styleInfoBasicaTieneConyuge");
                        $('#contentInfoBasica').addClass('styleInfoBasicaNoTieneConyuge');
                    }


                    _CmbTipoIdentifRepLegalMEdad.SetValue(null);
                    _TxtNumeroIdentifRepLegalMEdad.SetText("");
                    lblNombresApellidosRepLegalMEdad.SetText("");
                    _CmbParentescoRepLegalMEdad.SetValue(null);
                    _EsMenorDeEdad.SetText("False");
                    //campos no obligatorios
                    $('#_CmbTipoIdentifRepLegalMEdad').attr('aplicahidden', 'true');
                    $('#_TxtNumeroIdentifRepLegalMEdad').attr('aplicahidden', 'true');
                    $('#_CmbParentescoRepLegalMEdad').attr('aplicahidden', 'true');

                    //oculta contenedor
                    $('#contentDatosMenorEdad').attr('style', 'display:none !important;');

                }
            });
        } else {
            loadingMainRegistroNoCliente.Hide();
        }
    },

    SeccionNavWizard: function () {
        var uri = "CargarSeccionWizardNavedacion";
        $.ajax({
            cache: false,
            type: "POST",
            url: uri,
            datatype: 'html',
            success: function (data) {
                $("div#SeccionWizardNavegacion").empty().html(data);
            }

        });
    },

    SeccionWizardNavegacion: function (LugarDeLLamada, _Digitalizo) {

        var esPep = LugarDeLLamada.split('-')[1];
        if (LugarDeLLamada == "InfoLaboral-" + esPep) {
            loadinCargaEconomico.Show();
        }
        var uri = "RenderizarWizardNavegacion";
        var UrlBase = '../../Home/FormarWizardNavegacion';
        $.ajax({
            url: uri,
            type: "POST",
            async: true,
            dataType: "json",
            data: { Parametro: LugarDeLLamada },
            success: function (response) {
                var _Wizard = response;
                $.ajax(
                    {
                        type: "POST",
                        url: UrlBase,
                        async: true,
                        contentType: "application/json; charset=UTF-8",
                        dataType: "html",
                        data: JSON.stringify({ Wizard: _Wizard }),
                        success: function (response) {
                            $("div#WizarRender").empty().html(response);
                            var esPep = LugarDeLLamada.split('-')[1];
                            CargarSeccionWizarNavegacion.AplicarEstilosWizardNavegacion(LugarDeLLamada);
                            if (LugarDeLLamada == "InfoLaboral-" + esPep) {
                                loadinCargaEconomico.Hide();
                            }
                            //Evaluo si desde donde se llama a la funcion para formar el wizard es del change de fecha, entonces ingresa a la condicion
                            //Para pintar de azul el circulo de datos de cliente siempre y cuando este haya digitalizado
                            //var esPep = LugarDeLLamada.split('-')[1];
                            if (LugarDeLLamada == 'ChangeFecha' || LugarDeLLamada == 'PaisReffiscal' || LugarDeLLamada == "ValueChangedRbtnPaisReffiscal" || LugarDeLLamada == "InfoLaboral-" + esPep) {
                                if (_Digitalizo) {
                                    var _PrimerPasoWizard = $("#PrimerPasoWizard").val();
                                    var UltimoPasoWizard = $("#UltimoPasoWizard").val();
                                    CxtWizard.AplicarWidthBolitasWizard("Progreso", "Padre", _PrimerPasoWizard, UltimoPasoWizard);
                                    var PasoActual = CxtWizard.ObtenerIdUbicacionActual();
                                    if (PasoActual == "DatosPersonales FirstRow") {
                                        CtxFuncionesPrincipales.ClickNext('.f1 .btn-next', false);
                                        //CxtWizard.showInactiveProgress("ProgresoAzul", "Padre", _PrimerPasoWizard, PasoActual);
                                    } else {
                                        if (PasoActual == "Documentos FirstRow") {
                                            CtxFuncionesPrincipales.ClickNext('.f1 .btn-next', false);
                                        } else {
                                            CxtWizard.EvaluarBtnNexBtnprevious(PasoActual);
                                            CxtWizard.PintarRecorridoWizard();
                                            CxtWizard.showInactiveProgress("ProgresoAzul", "Padre", _PrimerPasoWizard, PasoActual);
                                        }

                                    }
                                } else {
                                    var _PrimerPasoWizard = $("#PrimerPasoWizard").val();
                                    var UltimoPasoWizard = $("#UltimoPasoWizard").val();
                                    CxtWizard.AplicarWidthBolitasWizard("Progreso", "Padre", _PrimerPasoWizard, UltimoPasoWizard);
                                    var PasoActual = CxtWizard.ObtenerIdUbicacionActual();
                                    CxtWizard.EvaluarBtnNexBtnprevious(PasoActual);
                                    CxtWizard.showInactiveProgress("ProgresoAzul", "Padre", _PrimerPasoWizard, PasoActual);
                                    CxtWizard.PintarRecorridoWizard();
                                }
                            }
                        }
                       

                    });


            }

        });
    },

    PintarRecorridoWizard: function () {
        var Elementos = $("div[class*=Wizard-Registro-PN ]");
        $.each(Elementos, function () {
            var Clase = $("#" + this.id).attr('class');
            var ContieneActive = Clase.indexOf("active");
            if (ContieneActive < 0) {
                $("#" + this.id).addClass('activated');
            }
            else {
                return false;
            }

        });
    },

    //AplicarWidthBolitasWizard: function (idProgressBar, idContainer, Inicial, Final) {
    //    let variablee = document.getElementById('Padre');
    //    var Width = variablee.offsetWidth || 0;
    //    var Width1 = variablee.clientWidth || 0;

    //    var WidthDefinido = Width != 0 ? Width : (Width1 != 0 ? Width1 : 0);
    //    var NumeroDeBolitasWizard = $("#NumeroDeBolas").val();
    //    var WidthPorCadaBolita = (WidthDefinido / NumeroDeBolitasWizard) - 3;

    //    var idElemento = $("div[class*=Wizard-Registro-PN ]");

    //    if (idElemento.length > 0) {

    //        $.each(idElemento, function () {

    //            var _ID = $(this).attr("id") || "";

    //            $("#" + _ID).attr('style', 'width: ' + WidthPorCadaBolita + 'px');
    //        });

    //    }
    //    CargarSeccionWizarNavegacion.showInactiveProgress(idProgressBar, idContainer, Inicial, Final);
    //},

    AplicarEstilosWizardNavegacion: function (LugarDeLLamada) {

        CtxCargarPaginasForms.LoadPageByLink(LugarDeLLamada);

        //$('.f1 fieldset:first').fadeIn('slow');

        // next step
        $('.btn-next').on('click', function () { //boton de avanzar
            loadingMainRegistroNoCliente.Show();
            ValidacionesFormularios.ValidarFormularios();



        });

        // previous step
        $('.btn-previous').on('click', function () { //Click Btn Regresar
            loadingMainRegistroNoCliente.Show();
            CtxFuncionesPrincipales.ClickPrevius('.f1 .btn-previous');
        });
    },


    //showInactiveProgress: function (idProgressBar, idContainer, Inicial, Final) {
    //    let distancia = CargarSeccionWizarNavegacion.calcularDistacia(Inicial, Final);
    //    let puntoInicial = CargarSeccionWizarNavegacion.calcularPuntoInicio(idContainer, Inicial);

    //    //Posicionamiento de Progressbar
    //    let inactiveProgressBar = document.getElementById(idProgressBar);
    //    inactiveProgressBar.style.width = distancia + 'px';
    //    inactiveProgressBar.style.left = puntoInicial + 'px';



    //    //let distancia = CargarSeccionWizarNavegacion.calcularDistacia('DatosPersonales', 'Formulario'); //ID Primer punto y punto final wizard
    //    //let puntoInicial = CargarSeccionWizarNavegacion.calcularPuntoInicio('Padre', 'DatosPersonales');


    //},

    //Calcula punto de inicio
    calcularPuntoInicio: function (idContainer, idStartElement) {
        let contentElement = document.getElementById(idContainer);
        let positionContent = contentElement.getBoundingClientRect();
        let positionContentX = positionContent.left;
        let startElement = document.getElementById(idStartElement);
        let positionStartElement = startElement.getBoundingClientRect();
        let startPointCenterX = positionStartElement.left + (positionStartElement.width / 2);

        return startPointCenterX - positionContentX;
    },

    //Calcula la distancia entre dos puntos
    calcularDistacia: function (idStartElement, idEndElement) {
        //Se establece la posicion inicial
        let startElement = document.getElementById(idStartElement);
        let positionStartElement = startElement.getBoundingClientRect();
        let startPointCenterX = positionStartElement.left + (positionStartElement.width / 2);
        let startPointCenterY = positionStartElement.top + (positionStartElement.height / 2);

        //Se establece la posicion final
        let endElement = document.getElementById(idEndElement);
        let positionEndElement = endElement.getBoundingClientRect();
        let endPointCenterX = positionEndElement.left + (positionEndElement.width / 2);
        let endPointCenterY = positionEndElement.top + (positionEndElement.height / 2);

        let posX = startPointCenterX - endPointCenterX;
        let posY = startPointCenterY - endPointCenterY;

        return Math.sqrt(posX * posX + posY * posY)       
    },

    MostrarComboLocalidadAcesor: function () {
        $('#cmboLocalidadAcesor').attr('style', 'padding-right:0px; display:block;');
    },

    MostrarComboLocalidadAcesorRetomar: function (CodLocalidad) {
        if (CodLocalidad != null && CodLocalidad != "") {
            $('#cmboLocalidadAcesor').attr('style', 'padding-right:0px; display:block;');
        }
    }
};

var CxtWizard = {
    AplicarWidthBolitasWizard: function (idProgressBar, idContainer, Inicial, Final) {
        Inicial = Inicial || "";
        Final = Final || "";
        if (Final != "" && Inicial != "") {
            let variablee = document.getElementById('Padre');
            var Width = variablee.offsetWidth || 0;
            var Width1 = variablee.clientWidth || 0;

            var WidthDefinido = Width != 0 ? Width : (Width1 != 0 ? Width1 : 0);
            var NumeroDeBolitasWizard = $("#NumeroDeBolas").val();
            var WidthPorCadaBolita = 150;//(WidthDefinido / NumeroDeBolitasWizard) - 3;

            var idElemento = $("div[class*=Wizard-Registro-PN ]");

            if (idElemento.length > 0) {

                $.each(idElemento, function () {

                    var _ID = $(this).attr("id") || "";
                    var IdSplit = "div[id='" + _ID + "']"
                    $(IdSplit).attr('style', 'width: ' + WidthPorCadaBolita + 'px');
                });

            }
            CxtWizard.showInactiveProgress(idProgressBar, idContainer, Inicial, Final);
        }

    },

    showInactiveProgress: function (idProgressBar, idContainer, Inicial, Final) {
        Inicial = Inicial || "";
        Final = Final || "";
        if (Final != "" && Inicial != "") {
            let distancia = CxtWizard.calcularDistacia(Inicial, Final);
            let puntoInicial = CxtWizard.calcularPuntoInicio(idContainer, Inicial);

            //Posicionamiento de Progressbar
            let inactiveProgressBar = document.getElementById(idProgressBar);
            inactiveProgressBar.style.width = distancia + 'px';            
            inactiveProgressBar.style.left = puntoInicial + 'px';
        }
    },

    calcularDistacia: function (idStartElement, idEndElement) {
        //Se establece la posicion inicial
        let startElement = document.getElementById(idStartElement);
        let positionStartElement = startElement.getBoundingClientRect();
        let startPointCenterX = positionStartElement.left + (positionStartElement.width / 2);
        let startPointCenterY = positionStartElement.top + (positionStartElement.height / 2);

        //Se establece la posicion final
        let endElement = document.getElementById(idEndElement);
        let positionEndElement = endElement.getBoundingClientRect();
        let endPointCenterX = positionEndElement.left + (positionEndElement.width / 2);
        let endPointCenterY = positionEndElement.top + (positionEndElement.height / 2);

        let posX = startPointCenterX - endPointCenterX;
        let posY = startPointCenterY - endPointCenterY;

        return Math.sqrt(posX * posX + posY * posY)
    },

    calcularPuntoInicio: function (idContainer, idStartElement) {
        let contentElement = document.getElementById(idContainer);
        let positionContent = contentElement.getBoundingClientRect();
        let positionContentX = positionContent.left;
        let startElement = document.getElementById(idStartElement);
        let positionStartElement = startElement.getBoundingClientRect();
        let startPointCenterX = positionStartElement.left + (positionStartElement.width / 2);

        return startPointCenterX - positionContentX;
    },

    LoadPageWizard: function (uri) {
        loadingContentMainly.Show();
        $.ajax({
            cache: false,
            type: "POST",
            url: uri,
            datatype: 'html',
            success: function (data) {
                $("div#ContenWizard").empty().html(data);
                CtxInversiones.EvaluarMostrarBtnConfirmacionWizard();
                if (data != "") {
                    loadingContentMainly.Hide();
                }

            },
        });
    },


    ClickFlechaProgreso: function (Nex, Direccion) {

        var current_active_step = $(Nex).parents('.f1').find('.f1-step.active');
        return current_active_step;
    },

    PintarCirculoYProgress: function (current_active_step, DireccionBtnNexprevious) {
        if (DireccionBtnNexprevious == 'right') {
            current_active_step.removeClass('active').addClass('activated').next().addClass('active'); //pinta de azul el circulo
        } else {
            current_active_step.removeClass('active').prev().removeClass('activated').addClass('active'); // Le quita el color al circulo
        }

    },

    bar_progress: function (Direccion, current_active_step) {
        var PosicionActual = current_active_step.attr("ID") || "";
        var SiguientePosicion = "";
        var Controller = "";
        if (Direccion == "right") {
            SiguientePosicion = current_active_step.next().attr("ID") || "";
            Controller = current_active_step.next().attr("controller") || "";
        }
        if (Direccion == "left") {
            SiguientePosicion = current_active_step.prev().attr("ID") || "";
            Controller = current_active_step.prev().attr("controller") || "";
        }

        return SiguientePosicion;
    },

    ObtenerPrimerPasoWizard: function () {
        var PrimerPaso = $("#PrimerPasoWizard").val();
        return PrimerPaso;
    },

    ObtenerControlador: function (Direccion, current_active_step) {
        var Controller = "";
        if (Direccion == "right") {
            Controller = current_active_step.next().attr("controller") || "";
        }
        if (Direccion == "left") {
            Controller = current_active_step.prev().attr("controller") || "";
        }

        return Controller;
    },

    ObtenerUbicacion: function () {
        var Nex = '.f1 .btn-next';
        var current_active_step = $(Nex).parents('.f1').find('.f1-step.active');
        var _UriActual = current_active_step.attr("uri") || "";
        return _UriActual;
    },

    ObtenerUbicacionAnt: function () {
        var Nex = '.f1 .btn-next';
        var current_active_step = $(Nex).parents('.f1').find('.f1-step.active');
        var _UriActual = current_active_step.prev().attr("uri");
        return _UriActual;
    },

    PintarRecorridoWizard: function () {
        var Elementos = $("div[class*=Wizard-Registro-PN ]");
        $.each(Elementos, function () {
            var _ID = $(this).attr("id") || "";
            var IdSplit = "div[id='" + _ID + "']";
            var Clase = $(IdSplit).attr('class');
            var ContieneActive = Clase.indexOf("active");
            if (ContieneActive < 0) {
                $("#" + this.id).addClass('activated');
            }
            else {
                return false;
            }

        });
    },

    ObtenerIdUbicacionActual: function () {
        var Nex = '.f1 .btn-next';
        var current_active_step = $(Nex).parents('.f1').find('.f1-step.active');
        var _UriActual = current_active_step.attr("id") || "";
        return _UriActual;
    },


    EsPrimerPaso: function (PasoWizard) {
        var HddPrimerPasoWizard = $("#PrimerPasoWizard").val();
        var EsPrimerPaso = HddPrimerPasoWizard == PasoWizard;
        return EsPrimerPaso;
    },

    EsUltimoPaso: function (PasoWizard) {
        var HddUltimoPasoWizard = $("#UltimoPasoWizard").val();
        var EsUltimoPaso = HddUltimoPasoWizard == PasoWizard;
        return EsUltimoPaso;
    },

    EvaluarBtnNexBtnprevious: function (PasoWizard) {

        if (!CxtWizard.EsPrimerPaso(PasoWizard)) {
            $(".btn-previous").removeClass("Invisible");
            $(".btn-previous").addClass("Visible");
        } else {
            $(".btn-previous").addClass("Invisible");
            $(".btn-previous").removeClass("Visible");
        }

        if (CxtWizard.EsUltimoPaso(PasoWizard)) {
            $(".btn-next").removeClass("Visible");
            $(".btn-next").addClass("Invisible");
        }
        else {
            $(".btn-next").addClass("Visible");
            $(".btn-next").removeClass("Invisible");
        }
    },

};
/*
$(document).ready(function () {

    CargarSeccionWizarNavegacion.SeccionNavWizard();
    CtxWizard.init();
});
*/