<%@ Page Language="C#" MasterPageFile="~/Principal.Master" AutoEventWireup="true" CodeBehind="Inicio.aspx.cs" Inherits="Web_Tesis.Inicio" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Inicio</title>
    <!-- Barra de carga -->
    <link rel="stylesheet" href="App_Themes/Template/dist/css/BarStyle.css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderMain" runat="server">

    <script src="App_Themes/Template/dist/js/barra-carga.js"></script>

    <%--mensaje de bienvenida--%>
    <link rel="stylesheet" href="App_Themes/Template/dist/css/EstilosMsmBienvenida.css" />
    <script src="App_Themes/Template/dist/js/MsmBienvenida.js"></script>

</asp:Content>
