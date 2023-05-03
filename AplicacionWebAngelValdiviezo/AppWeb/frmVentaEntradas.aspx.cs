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
            }
        }

        public void FillGrid()
        {
            DataTable dtEventos = consu.ObtenerListado();
            if (dtEventos.Rows.Count > 0)
            {
                grdEventos.DataSource = dtEventos;
                grdEventos.DataBind();
            }
            else
            {
                dtEventos.Rows.Add(dtEventos.NewRow());
                grdEventos.DataSource = dtEventos;
                grdEventos.DataBind();

                int TotalColumns = grdEventos.Rows[0].Cells.Count;
                grdEventos.Rows[0].Cells.Clear();
                grdEventos.Rows[0].Cells.Add(new TableCell());
                grdEventos.Rows[0].Cells[0].ColumnSpan = TotalColumns;
                grdEventos.Rows[0].Cells[0].Text = "No Record Found";
            }
        }



        protected void grdEventos_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {

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
    }
}