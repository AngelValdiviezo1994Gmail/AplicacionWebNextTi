
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using System.Web.Management;
using System.Text;
using System.Threading.Tasks;
using AppWeb.models;

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

        public EventosTypeResponse GetEventos()
        {
            EventosTypeResponse objRespuesta = new EventosTypeResponse();
            serviceUrl = string.Empty;
            serviceUrl = "https://localhost:7203/api/v1/ListaEventos/GetListadoEventos";//https://localhost:7203/api/v1/ListaEventos/GetListadoEventos
            try
            {
                using (HttpClient httpCliente = new HttpClient())
                {
                    httpCliente.BaseAddress = new Uri(serviceUrl);
                    httpCliente.Timeout = new TimeSpan(0, 2, 0);
                    var request = httpCliente.GetAsync(serviceUrl).Result;
                    if (request.IsSuccessStatusCode)
                    {
                        var response = request.Content.ReadAsStringAsync().Result;
                        objRespuesta = JsonConvert.DeserializeObject<EventosTypeResponse>(response);
                    }
                }
            }
            catch(Exception e)
            {
                objRespuesta = new EventosTypeResponse();
            }
            return objRespuesta;
        }

        public VentasTypeResponse GetVentas()
        {
            VentasTypeResponse objRespuesta = new VentasTypeResponse();
            serviceUrl = string.Empty;
            serviceUrl = "https://localhost:7203/api/v1/VentaEntradas/GetVentaEntradas";
            try
            {
                using (HttpClient httpCliente = new HttpClient())
                {
                    httpCliente.BaseAddress = new Uri(serviceUrl);
                    httpCliente.Timeout = new TimeSpan(0, 2, 0);
                    var request = httpCliente.GetAsync(serviceUrl).Result;
                    if (request.IsSuccessStatusCode)
                    {
                        var response = request.Content.ReadAsStringAsync().Result;
                        objRespuesta = JsonConvert.DeserializeObject<VentasTypeResponse>(response);
                    }
                }
            }
            catch (Exception e)
            {
                objRespuesta = new VentasTypeResponse();
            }
            return objRespuesta;
        }

        public string GuardarVentaEntrada(VentaEntradas nuevo)
        {
            string MnsRetorno = string.Empty;
            serviceUrl = string.Empty;
            serviceUrl = "https://localhost:7203/api/v1/VentaEntradas/";
            try
            {
                var request = JsonConvert.SerializeObject(nuevo);
                var content = new StringContent(request, Encoding.UTF8, "application/json");
                var client = new HttpClient();
                client.BaseAddress = new Uri(serviceUrl);
                var url = string.Format("{0}{1}", serviceUrl, "GenerarVentaEntrada");
                var response = Task.Run(async () => await client.PostAsync(url, content)).ConfigureAwait(false).GetAwaiter().GetResult();
            }
            catch (Exception ex)
            {
                MnsRetorno = ex.Message;
            }
            finally
            {
                MnsRetorno = "Se han realizado los cambios con éxito. Proceso finalizado.";
            }
            return MnsRetorno;
        }
        
        /*
        public string EliminaVentaEntrada(VentaEntradas nuevo)
        {
            string MnsRetorno = string.Empty;
            serviceUrl = string.Empty;
            serviceUrl = "https://localhost:7203/api/v1/VentaEntradas/";
            try
            {
                var request = JsonConvert.SerializeObject(nuevo);
                var content = new StringContent(request, Encoding.UTF8, "application/json");
                var client = new HttpClient();
                client.BaseAddress = new Uri(serviceUrl);
                var url = string.Format("{0}{1}", serviceUrl, "GenerarVentaEntrada");
                var response = Task.Run(async () => await client.PostAsync(url, content)).ConfigureAwait(false).GetAwaiter().GetResult();
            }
            catch (Exception ex)
            {
                MnsRetorno = ex.Message;
            }
            finally
            {
                MnsRetorno = "Se han realizado los cambios con éxito. Proceso finalizado.";
            }
            return MnsRetorno;
        }
        */
        
        public string EliminaVentaEntrada(VentaEntradas eliminarRegistro)
        {
            /*
            VentasTypeResponse objRespuesta = new VentasTypeResponse();
            serviceUrl = string.Empty;
            serviceUrl = "https://localhost:7203/api/v1/VentaEntradas/EliminaVentaEntrada?idAcontecimiento=" + eliminarRegistro.idAcontecimiento + "&idEvento="+ eliminarRegistro.idEvento + "&nombreEvento="+ eliminarRegistro.nombreEvento + "&Fecha="+ eliminarRegistro.Fecha + "&Lugar="+ eliminarRegistro.Lugar + "&NumeroEntrada="+ eliminarRegistro.NumeroEntrada + "&Descripcion="+ eliminarRegistro.Descripcion + "&Precio="+ eliminarRegistro.Precio + "";
            try
            {
                using (HttpClient httpCliente = new HttpClient())
                {
                    httpCliente.BaseAddress = new Uri(serviceUrl);
                    httpCliente.Timeout = new TimeSpan(0, 2, 0);
                    var request = httpCliente.GetAsync(serviceUrl).Result;
                    if (request.IsSuccessStatusCode)
                    {
                        var response = request.Content.ReadAsStringAsync().Result;
                        objRespuesta = JsonConvert.DeserializeObject<VentasTypeResponse>(response);
                    }
                }
            }
            catch (Exception e)
            {
                objRespuesta = new VentasTypeResponse();
            }
            return objRespuesta;
            */
            
            string MnsRetorno = string.Empty;
            serviceUrl = string.Empty;
            //serviceUrl = "https://localhost:7203/api/v1/VentaEntradas/";
            serviceUrl = "https://localhost:7203/api/v1/VentaEntradas/EliminaVentaEntrada?idAcontecimiento=" + eliminarRegistro.idAcontecimiento + "&idEvento=" + eliminarRegistro.idEvento + "&nombreEvento=" + eliminarRegistro.nombreEvento + "&Fecha=" + eliminarRegistro.Fecha + "&Lugar=" + eliminarRegistro.Lugar + "&NumeroEntrada=" + eliminarRegistro.NumeroEntrada + "&Descripcion=" + eliminarRegistro.Descripcion + "&Precio=" + eliminarRegistro.Precio + "";
            try
            {
                var request = JsonConvert.SerializeObject(eliminarRegistro);
                var content = new StringContent(request, Encoding.UTF8, "application/json");
                var client = new HttpClient();
                client.BaseAddress = new Uri(serviceUrl);
                var url = string.Format("{0}{1}", serviceUrl, "");
                var response = Task.Run(async () => await client.PutAsync(url, content)).ConfigureAwait(false).GetAwaiter().GetResult();
            }
            catch (Exception ex)
            {
                MnsRetorno = ex.Message;
            }
            finally
            {
                MnsRetorno = "Se han realizado los cambios con éxito. Proceso finalizado.";
            }
            return MnsRetorno;
        }

    }
}