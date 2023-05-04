using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AppWeb.models
{
    public class VentaEntradas
    {
        public int idAcontecimiento { get; set; }
        public int idEvento { get; set; }
        public string nombreEvento { get; set; }
        public DateTime Fecha { get; set; }
        public string Lugar { get; set; }
        public string NumeroEntrada { get; set; }
        public string Descripcion { get; set; }
        public int Precio { get; set; }
    }
}