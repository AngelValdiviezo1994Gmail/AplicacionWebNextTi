using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace AppWeb
{
    /*
     {"succeeded":true,
    "message":"Consulta generada exitosamente",
    "statusCode":"000","errors":{},
    "data":[{"idEvento":1,"nombreEvento":"Deportes"},{"idEvento":2,"nombreEvento":"Cultura"}]}
     */
    public class EventosTypeResponse
    {
        public bool succeded { get; set; }
        public string message { get; set; }

        public string statusCode { get; set; }

        public object errors { get; set; }

        public List<EventosType> data { get; set; }
    }

    public class EventosType
    {
        public int idEvento { get; set; }
        public string nombreEvento { get; set; }
    }
}