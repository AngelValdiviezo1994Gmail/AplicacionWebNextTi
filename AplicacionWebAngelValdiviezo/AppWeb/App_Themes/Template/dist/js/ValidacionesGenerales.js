var Validaciones = {

    ValidadorDinamico: function (seccion, Aplicahidden) {
        var Validador = false;

        //Se identifica los elementos a validar
        var ArgumentosInputsAValidar;
        var ArgumentosTextAreasAValidar;
        var ArgumentosRadioButtonsAValidar;

        if (seccion != null) {
            ArgumentosInputsAValidar = $("#" + seccion + " input[class*=Office2010Blue]");
            ArgumentosRadioButtonsAValidar = $("#" + seccion + " table[class*=dxeRadioButtonList_Office2010Blue]");
            ArgumentosTextAreasAValidar = $("#" + seccion + " textarea[class*=ValidaTexAreaWizard]");
        } else {
            ArgumentosInputsAValidar = $("input[class*=Office2010Blue]");
            ArgumentosRadioButtonsAValidar = $("table[class*=dxeRadioButtonList_Office2010Blue]");
            ArgumentosTextAreasAValidar = $("textarea[class*=ValidaTexAreaWizard]");
        }

        if (typeof Aplicahidden == 'undefined' || typeof Aplicahidden == 'null' || Aplicahidden == "") {
            Aplicahidden = 'aplicahidden';
        }

        $.each(ArgumentosInputsAValidar, function () {

            var IdDelElemeto = $(this).attr("id") || "";
            var NameDelElemento = $(this).attr("name") || "";

            //aplicahidden ->true [no valida]/false [si valida]
            //aplicahidden ->true [campo oculto]/false [campo visible]
            var aplicahidden = $("#" + NameDelElemento).attr(Aplicahidden) || "";
            var WidthIdElemento = $("#" + NameDelElemento).attr('style') || "";
            var StyleFatherInput = $("#" + IdDelElemeto).attr('style') || "";
            if (aplicahidden == "false" || aplicahidden == "") {
                var ValorQueContieneElElemento = $("#" + IdDelElemeto).val();
                if (ValorQueContieneElElemento == "- Seleccione -" ||
                    ValorQueContieneElElemento == "- Seleccione Tipo de Cheque -" ||
                    ValorQueContieneElElemento == "- Seleccione cuenta origen -" ||
                    ValorQueContieneElElemento == "- Seleccione origen de fondos -" ||
                    ValorQueContieneElElemento == "dd/MM/yyyy" ||
                    ValorQueContieneElElemento == "" ||
                    ValorQueContieneElElemento == "(____) _______" ||
                    ValorQueContieneElElemento == "(____)________" ||
                    ValorQueContieneElElemento == "$0.00" ||
                    ValorQueContieneElElemento == "0" ||
                    ValorQueContieneElElemento == "De 1 a 100" || //Controles de rango SpinEdit
                    ValorQueContieneElElemento == "YYYY-MM-DD" ||
                    ValorQueContieneElElemento == "Nombre" || //NullText
                    ValorQueContieneElElemento == "Apellido") {
                    document.getElementById(NameDelElemento).classList.add('styleControlrequired');
                    document.getElementById(IdDelElemeto).classList.add('styleControlrequired-input');
                    Validador = true;
                }
            }
        });

        $.each(ArgumentosRadioButtonsAValidar, function () {

            var idElementoPadre = $(this).attr("id") || "";
            var idElementoCustom = idElementoPadre + "_ValueInput";
            var aplicahidden = $("#" + idElementoPadre).attr(Aplicahidden) || "";
            if (aplicahidden == "false") {
                /*seleccionar elementos con atributo id que sea igual la palabra '_RbtnOtraNacionalidad_ValueInput'*/
                $(".radio input[type=hidden][id =" + idElementoCustom + "]").each(function () {

                    var _IdElement = $(this).attr("id") || "";
                    var _valueElement = $("#" + _IdElement).val();

                    if (_valueElement == " ") {
                        document.getElementById(idElementoPadre).classList.add('styleControlrequired-input');
                        Validador = true;
                    }
                });
            }
        });

        $.each(ArgumentosTextAreasAValidar, function () {

            var IdDelElemeto = $(this).attr("id") || "";
            var ValorQueContieneElElemento = $("#" + IdDelElemeto).val();
            if (ValorQueContieneElElemento == " " || ValorQueContieneElElemento == "") {
                document.getElementById(IdDelElemeto).classList.add('styleControlrequired');
                Validador = true;
            }
        });

        return Validador;
    },

    


    ObtenerEventKeyCode: function (s, e, theEvent) {
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);

        return key;
    },

    ReturnExpresionRegular: function (TipoDeCaracter) {
        var regex = "";
        switch (TipoDeCaracter) {
            case "Num": {
                return regex = /[0-9]/;
            } break;
            case "Letra": {
                try {
                    ValidarClinete.sinFocus();
                }
                catch (ex) { }

                return regex = /^[A-Za-zÑñáéíóúÁÉÍÓÚ ]+$/;
            } break;
            case "Alfanumerico": {
                return regex = /^[A-Za-z0-9]+$/;
            } break;
            case "Correo": {
                return regex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
            } break;
            case "Num2-7": {
                return regex = /[2-7]/;
            } break;
        }
    },

    ValidarExpresionRegular: function (regex, key) {
        return !regex.test(key);
    },

    ValidarCaracteresAlfabeticosGuionApostrofe: function (s, e, TipoDeCaracter) {
        //var cont = 0;
        var theEvent = e.htmlEvent || window.event;
        var regexCaracteresEspeciales = '/^[^$%&|<>#:;.,"[+*~(){}/?\]*$/';
        var regexCaracteresGuionApostrofe = '^[a-zA-Z??]([^\^$.*+?=_!:;|\\/"%#&\\()\[\]{}]{1,}|\D+)$';
        var key = Validaciones.ObtenerEventKeyCode(s, e, theEvent);

        //if (Validaciones.ValidarExpresionRegular(regexCaracteresEspeciales, key)) {
        //    theEvent.returnValue = false;
        //    if (theEvent.preventDefault) {
        //        theEvent.preventDefault();
        //        cont++;
        //    }
        //}
        if (Validaciones.ValidarExpresionRegular(regexCaracteresGuionApostrofe, key) && Validaciones.ValidarExpresionRegular(regexCaracteresEspeciales, key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) //{
                theEvent.preventDefault();
            //    cont++;
            //}
        }

    },

    ValidarDigitosIngresador: function (s, e, TipoDeCaracter) {
        var theEvent = e.htmlEvent || window.event;
        var key = Validaciones.ObtenerEventKeyCode(s, e, theEvent);
        var regex = Validaciones.ReturnExpresionRegular(TipoDeCaracter); 
        if (Validaciones.ValidarExpresionRegular(regex, key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault)
                theEvent.preventDefault();
        }
    },

    ValidacionPorCampos: function (listDeValidaciones) {    //Muestra validación por campos del registro de personas naturales
        //Validaciones.CamposEstiloNormal();      //Regresa el color de los campos al estado inicial y oculta el icono de error.
        var contentString = "Acciones: ";
        var contentStringTrab = "Acciones: ";
        var contDomicilio = 0;
        var contadorTrabajo = 0;

        if (listDeValidaciones != null) {
            if (listDeValidaciones.length > 0) {
                for (var i = 0; i < listDeValidaciones.length; i++) {
                    var descripcion = "" + listDeValidaciones[i].Descripcion + ". Sugerencia: " + listDeValidaciones[i].AyudaAccion;
                    var spanMostrarValidation = $("span[aplicaValidacion='" + listDeValidaciones[i].ParamAccion + "']");
                    spanMostrarValidation.attr("data-original-title", descripcion);
                    spanMostrarValidation.css("visibility", "visible");
                    spanMostrarValidation.tooltip("show");
                    $('.tooltip-inner').attr('style', 'max-width: ' + 70 + '% !important;' + 'background-color: #ffffff !important;' + 'border: 1px solid #d35555 !important;' + 'color: #d35555;' + 'font-size: 17px;' + ' box-shadow: 0px 3px 3px rgba(0,3,6,.3);');

                    $("#" + listDeValidaciones[i].ParamAccion + " input[class*=Office2010Blue]").each(function () {
                        var IdDelElemeto = $(this).attr("id") || "";
                        var NameDelElemento = $(this).attr("name") || "";
                        document.getElementById(NameDelElemento).classList.add('styleControlrequired');
                        document.getElementById(IdDelElemeto).classList.add('styleControlrequired-input');
                        //$("#" + NameDelElemento).css({ "border":"1px solid #ff0202", "background":"#f7e3e3"});
                        //$("#" + IdDelElemeto).css({ "background":"#f7e3e3"});
                    });

                    let IdTextAreaDireccion = document.getElementById(listDeValidaciones[i].ParamAccion);
                    if (IdTextAreaDireccion.localName == "textarea") {
                        IdTextAreaDireccion.classList.add('styleControlrequired');
                    }
                    if (listDeValidaciones[i].ParamAccion == '_TxtTefConven2' || listDeValidaciones[i].ParamAccion == '_TxtAreaConven2' || listDeValidaciones[i].ParamAccion == '_TxtTefConven' || listDeValidaciones[i].ParamAccion == '_TxtAreaConven') {
                        contentString = contentString + listDeValidaciones[i].AyudaAccion + ". \n";
                        contDomicilio++;
                    }
                    if (listDeValidaciones[i].ParamAccion == '_ExtencionTrabajo' || listDeValidaciones[i].ParamAccion == '_TxtTefConvenTrabajo' || listDeValidaciones[i].ParamAccion == '_TxtAreaConvenTrabajo') {
                        contentStringTrab = contentStringTrab + listDeValidaciones[i].AyudaAccion + ". \n";
                        contadorTrabajo++;
                    }
                }
                if (contDomicilio > 0) {
                    var spanErroresDomicilio = $("span[aplicaValidacion='_TxtErroresDomicilio']");
                    spanErroresDomicilio.attr("data-original-title", contentString);
                    spanErroresDomicilio.css("visibility", "visible");
                    spanErroresDomicilio.tooltip("show");
                    $('.tooltip-inner').attr('style', 'max-width: ' + 70 + '% !important;' + 'background-color: #ffffff !important;' + 'border: 1px solid #d35555 !important;' + 'color: #d35555;' + 'font-size: 17px;' + ' box-shadow: 0px 3px 3px rgba(0,3,6,.3);');

                }
                if (contadorTrabajo > 0) {
                    var spanErroresTrabajo = $("span[aplicaValidacion='_TxtErroresTrabajo']");
                    spanErroresTrabajo.attr("data-original-title", contentStringTrab);
                    spanErroresTrabajo.css("visibility", "visible");
                    spanErroresTrabajo.tooltip("show");
                    $('.tooltip-inner').attr('style', 'max-width: ' + 70 + '% !important;' + 'background-color: #ffffff !important;' + 'border: 1px solid #d35555 !important;' + 'color: #d35555;' + 'font-size: 17px;' + ' box-shadow: 0px 3px 3px rgba(0,3,6,.3);');

                }

                $("div[role='tooltip']").each(function () {
                    var IdDelElemetoTooltip = $(this).attr("id") || "";
                    $("#" + IdDelElemetoTooltip).attr('style', 'margin: -10px 0px 0px 400px;' + 'opacity: 1;');
                });
                $('.mostrarTooltip').tooltip("hide");
            } else {
                Validaciones.CamposEstiloNormal();
            }
        } else {
            Validaciones.CamposEstiloNormal();
        }
    },

    CamposEstiloNormal: function (seccion) {       //Regresa el color de los campos al estado inicial y oculta el icono de error.
        var spanOcultarValidation = $(".mostrarTooltip");
        spanOcultarValidation.css("visibility", "hidden");
        spanOcultarValidation.tooltip('hide');

        //Se identifica los elementos a validar
        var inputsAValidar;
        var textAreasAValidar;
        var RadioButton;
        if (seccion != null) {
            inputsAValidar = $("#" + seccion + " .validarXCampos input[class*=Office2010Blue]");
            textAreasAValidar = $("#" + seccion + " textarea[class*=ValidaTexAreaWizard]");
            RadioButton = $("#" + seccion + " table[class*=dxeRadioButtonList_Office2010Blue]");
        } else {
            inputsAValidar = $(".validarXCampos input[class*=Office2010Blue]");
            textAreasAValidar = $("textarea[class*=ValidaTexAreaWizard]");
            RadioButton = $("table[class*=dxeRadioButtonList_Office2010Blue]");
        }

        $.each(inputsAValidar, function () {
            Validaciones.RemoveStyleRequiredToInput(this);
        });

        $.each(textAreasAValidar, function () {
            Validaciones.RemoveStyleRequiredToTextArea(this);
        });

        $.each(RadioButton, function () {
            Validaciones.RemoveStyleRequiredToRadioButton(this);
        });
    },

    RemoveStyleRequiredToInput: function (element) {
        let elemetId = element.id;
        let elementoName = element.name;
        document.getElementById(elemetId).classList.remove('styleControlrequired-input');
        document.getElementById(elementoName).classList.remove('styleControlrequired');
    },

    RemoveStyleRequiredToTextArea: function (element) {
        let elemetId = element.id;
        document.getElementById(elemetId).classList.remove('styleControlrequired');
    },

    RemoveStyleRequiredToRadioButton: function (element) {
        let elemetId = element.id;
        document.getElementById(elemetId).classList.remove('styleControlrequired-input');
    },

};