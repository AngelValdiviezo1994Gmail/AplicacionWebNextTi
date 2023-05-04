using AppWeb.models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace AppWeb
{
    public partial class frmVentaEntradas : System.Web.UI.Page
    {
        Consumo consu = new Consumo();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                FillGrid();
                GetEventos();
            }
        }

        public void FillGrid()
        {

            VentasTypeResponse dtEventos = consu.GetVentas();
            
            if (dtEventos.data.Count > 0)
            {
                //grdEventos.DataSource = dtEventos;
                DataTable llenaTabla = new DataTable();
                llenaTabla.Columns.AddRange(
                    new DataColumn[]
                    {
                        new DataColumn("idAcontecimiento",typeof(string)),
                        new DataColumn("nombreEvento",typeof(string)),
                        new DataColumn("Fecha",typeof(string)),
                        new DataColumn("Lugar",typeof(string)),
                        new DataColumn("NumeroEntrada",typeof(string)),
                        new DataColumn("Descripcion",typeof(string)),
                        new DataColumn("Precio",typeof(string)),
                    }
                    );
                foreach (VentasType dr in dtEventos.data)
                {
                    if(dr.Estado)
                    {
                        llenaTabla.Rows.Add(
                          dr.idAcontecimiento,
                          dr.nombreEvento,
                          dr.Fecha,
                          dr.Lugar,
                          dr.NumeroEntrada,
                          dr.Descripcion,
                          dr.Precio
                          );
                    }
                    
                }
                grdVentaEntradas.DataSource = llenaTabla;
                grdVentaEntradas.DataBind();
            }
            else
            {
                //dtEventos.Rows.Add(dtEventos.NewRow());
                grdVentaEntradas.DataSource = new DataTable();
                grdVentaEntradas.DataBind();

                int TotalColumns = grdVentaEntradas.Rows[0].Cells.Count;
                grdVentaEntradas.Rows[0].Cells.Clear();
                grdVentaEntradas.Rows[0].Cells.Add(new TableCell());
                grdVentaEntradas.Rows[0].Cells[0].ColumnSpan = TotalColumns;
                grdVentaEntradas.Rows[0].Cells[0].Text = "No Record Found";
            }
        }

        public void GetEventos()
        {
            EventosTypeResponse dtEventos = consu.GetEventos();
            cmbEvento.DataSource = dtEventos.data;
            cmbEvento.DataTextField= "nombreEvento";
            cmbEvento.DataValueField= "idEvento";
            cmbEvento.DataBind();
        }

        protected void grdEventos_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {
            TableCell cellIdAcontecimiento = grdVentaEntradas.Rows[e.RowIndex].Cells[0];
            TableCell cellNombreEvento = grdVentaEntradas.Rows[e.RowIndex].Cells[1];
            TableCell cellFecha = grdVentaEntradas.Rows[e.RowIndex].Cells[2];
            TableCell cellLugar = grdVentaEntradas.Rows[e.RowIndex].Cells[3];
            TableCell cellNumeroEntrada = grdVentaEntradas.Rows[e.RowIndex].Cells[4];
            TableCell cellDescripcion = grdVentaEntradas.Rows[e.RowIndex].Cells[5];
            TableCell cellPrecio = grdVentaEntradas.Rows[e.RowIndex].Cells[6];

            int idAcontecimiento = Convert.ToInt32(cellIdAcontecimiento.Text);
            string nombreEvento = cellNombreEvento.Text;
            DateTime fecha = Convert.ToDateTime(cellFecha.Text);
            string lugar = cellLugar.Text;
            int numeroEntrada = Convert.ToInt32(cellNumeroEntrada.Text);
            string descripcion = cellDescripcion.Text;
            int precio = Convert.ToInt32(cellPrecio.Text);

            int idEv = nombreEvento== "Cultura" ? 2 : 1;

            VentaEntradas objVentaEntradas = new VentaEntradas { 
                Descripcion= descripcion,
                Fecha= fecha,
                idAcontecimiento = idAcontecimiento,
                idEvento = idEv,
                Lugar= lugar,
                nombreEvento=nombreEvento,
                NumeroEntrada = numeroEntrada.ToString(),
                Precio = precio,
            };
            string dtEventos = consu.EliminaVentaEntrada(objVentaEntradas);
            FillGrid();
        }

        protected void grdEventos_RowCommand(object sender, GridViewCommandEventArgs e)
        {

        }

        protected void grdEventos_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {

        }

        protected void grdEventos_RowEditing(object sender, GridViewEditEventArgs e)
        {

        }

        protected void grdEventos_RowDataBound(object sender, GridViewRowEventArgs e)
        {

        }

        protected void grdEventos_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
        {

        }

        protected void btnGuardar_Click(object sender, EventArgs e)
        {
            VentaEntradas objVentaEntradas = new VentaEntradas();
            objVentaEntradas.idEvento = Convert.ToInt16(cmbEvento.SelectedValue);
            objVentaEntradas.nombreEvento = objVentaEntradas.idEvento == 1 ? "Deportes" : "Cultura";
            objVentaEntradas.Lugar = txtLugar.Text;
            objVentaEntradas.Descripcion = txtDescripcion.Text;
            objVentaEntradas.NumeroEntrada = txtNumEntrada.Text;
            objVentaEntradas.Precio = Convert.ToInt16(txtPrecio.Text);
            objVentaEntradas.Fecha = Convert.ToDateTime(calendarFecha.SelectedDate.ToString());
            consu.GuardarVentaEntrada(objVentaEntradas);
            txtLugar.Text = "";
            txtDescripcion.Text = "";
            txtNumEntrada.Text = "";
            txtPrecio.Text = "";
            FillGrid();
            //lblMensajeFinal.Text = "Datos ingresados correctamente";
        }

        protected void txtPrecio_TextChanged(object sender, EventArgs e)
        {
            lblMensajeFinal.Text = "";
        }

        protected void txtDescripcion_TextChanged(object sender, EventArgs e)
        {
            lblMensajeFinal.Text = "";
        }

        protected void txtNumEntrada_TextChanged(object sender, EventArgs e)
        {
            lblMensajeFinal.Text = "";
        }
    }
}