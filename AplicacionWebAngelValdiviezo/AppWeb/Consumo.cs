using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace AppWeb
{
    public class Consumo
    {
        string serviceUrl = string.Empty;
        private static Consumo consumo;
        public Consumo()
        {
        }
        public static Consumo CrearInstancia()
        {
            if (consumo == null) consumo = new Consumo();
            return consumo;
        }

        public DataTable ObtenerListado ()
        {
            DataTable objRespuesta = new DataTable();

            return objRespuesta;
        }
    }
}