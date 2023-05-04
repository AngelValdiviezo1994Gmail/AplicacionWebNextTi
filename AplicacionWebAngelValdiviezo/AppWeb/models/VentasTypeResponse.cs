using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AppWeb.models
{
    public class VentasTypeResponse
    {
        public bool succeded { get; set; }
        public string message { get; set; }

        public string statusCode { get; set; }

        public object errors { get; set; }

        public List<VentasType> data { get; set; }
    }

    public class VentasType
    {
        public int idAcontecimiento { get; set; }
        public int idEvento { get; set; }
        public string nombreEvento { get; set; }
        public DateTime Fecha { get; set; }
        public string Lugar { get; set; }
        public int NumeroEntrada { get; set; }
        public string Descripcion { get; set; }
        public int Precio { get; set; }
        public bool Estado { get; set; }


    }
}