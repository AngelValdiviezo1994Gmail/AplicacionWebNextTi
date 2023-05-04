using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datos
{
    public class EventosTypeResponse
    {
        public bool succeded { get; set; }
        public string message { get; set; }

        public string statusCode { get; set; }

        public DataTable respuesta { get; set; }
    }
}
