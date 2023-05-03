
$(document).ready(function () {
    function adjustZoom() {
        var PrimerPasoWizard = $("#PrimerPasoWizard").val();
        var UltimoPasoWizard = $("#UltimoPasoWizard").val();
        CxtWizard.AplicarWidthBolitasWizard("Progreso", "Padre", PrimerPasoWizard, UltimoPasoWizard);
        var SiguientePosicion = CxtWizard.ObtenerIdUbicacionActual();
        CxtWizard.showInactiveProgress("ProgresoAzul", "Padre", PrimerPasoWizard, SiguientePosicion);
    }
    window.addEventListener('resize', function () {
        adjustZoom();
    });
    window.addEventListener('load', function () {
        adjustZoom();
    });
});