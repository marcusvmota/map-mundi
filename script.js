// Inicializa o mapa com amCharts
am5.ready(function () {
  // Cria a instância do gráfico
  var root = am5.Root.new("chartdiv");

  // Define o tema animado do gráfico
  root.setThemes([am5themes_Animated.new(root)]);

  // Cria o gráfico de mapa
  var chart = root.container.children.push(
    am5map.MapChart.new(root, {
      panX: "none",
      panY: "none",
      wheelY: "none",
      projection: am5map.geoMercator(),
    })
  );

  // Carrega o mapa mundi
  var polygonSeries = chart.series.push(
    am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_worldLow,
    })
  );

  // Estilo ao passar o mouse sobre o continente
  polygonSeries.mapPolygons.template.setAll({
    tooltipText: "{name}",
    interactive: true,
    fill: am5.color(0x74b3ce),
    stroke: am5.color(0xffffff),
    strokeWidth: 1,
  });

  // Evento de clique em um continente
  polygonSeries.mapPolygons.template.events.on("click", function (ev) {
    var country = ev.target.dataItem.dataContext.name;
    showInfo(country);
  });

  // Função para mostrar informações do continente
  function showInfo(continent) {
    let infoText = "";

    switch (continent) {
      case "Africa":
        infoText =
          "África: É o segundo maior continente e o segundo mais populoso. Lar de uma enorme diversidade cultural e natural.";
        break;
      case "North America":
        infoText =
          "América do Norte: Composta por países como Estados Unidos, Canadá e México.";
        break;
      case "South America":
        infoText =
          "América do Sul: Conhecida por sua biodiversidade, inclui países como Brasil, Argentina e Peru.";
        break;
      case "Asia":
        infoText =
          "Ásia: O maior e mais populoso continente, lar de países como China, Índia e Japão.";
        break;
      case "Europe":
        infoText =
          "Europa: Um continente histórico e culturalmente rico, composto por diversos países.";
        break;
      case "Oceania":
        infoText =
          "Oceania: Composta por várias ilhas, incluindo a Austrália, Nova Zelândia e muitas ilhas do Pacífico.";
        break;
      default:
        infoText = "Clique em um continente para ver informações.";
    }

    document.getElementById("info").innerHTML = "<p>" + infoText + "</p>";
  }

  // Faz o mapa se ajustar ao tamanho da janela
  chart.appear(1000, 100);
}); // Fim do am5.ready()
