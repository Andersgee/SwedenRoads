import React from "react";
import { Container, Drawer, Typography, Box } from "@material-ui/core";
import MapillaryBox from "./MapillaryBox";
import {
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
} from "@material-ui/core";

import SvgCircle from "./SvgCircle";

function isnotempty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return true;
  }
  return false;
}

const palette = ["#C40A3B", "#F2203E", "#FABF20", "#71C94B", "#20AC65", "#ccc"];

const T = (props) => {
  return (
    <Typography variant="body1" {...props}>
      {props.children}
    </Typography>
  );
};

function Row(props) {
  return (
    <TableRow
      style={
        props.colored ? { background: "#F4F4F2" } : { background: "white" }
      }
    >
      <TableCell component="th" scope="row">
        <T>{props.l}</T>
      </TableCell>
      <TableCell align="right">
        <T>{props.r}</T>
      </TableCell>
    </TableRow>
  );
}

function datestr(y, m, d) {
  let month = m < 10 ? `0${m}` : `${m}`;
  let day = d < 10 ? `0${d}` : `${d}`;
  return `${y}-${month}-${day}`;
}

export default function InfoDrawer(props) {
  const road = props.roadproperties;
  const open = isnotempty(road);
  const imageexist = props.images.length > 0;
  const imagekey = imageexist && props.images[0].properties.key;
  const imagecapturedate = imageexist && props.images[0].properties.captured_at;

  return (
    <Drawer variant="persistent" anchor="left" open={open}>
      <Box my={2} style={{ width: "50vv" }}>
        <Container>
          <Box width="640px" height="480px">
            {imageexist ? (
              <>
                <MapillaryBox imagekey={imagekey} />
                <Typography variant="body2" align="center">
                  Image captured {imagecapturedate.slice(0, 10)}
                </Typography>
              </>
            ) : (
              <Typography align="center">
                No image at this location (150m radius).
              </Typography>
            )}
          </Box>
          <Box my={4}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Egenskap</TableCell>
                    <TableCell align="right">Klassifikation</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <Row
                    colored
                    l="Indexklass"
                    r={
                      <Box display="flex" justifyContent="flex-end">
                        <SvgCircle color={palette[road.IndxKls - 1]} />
                        {translate("IndxKls", road.IndxKls)}
                      </Box>
                    }
                  />
                  {/*<Row l="ID" r={road.id} />*/}
                  <Row
                    l="Bärighetsklass"
                    r={translate("Brghtsk", road.Brghtsk)}
                  />
                  <Row
                    colored
                    l="Drift och underhållsklass"
                    r={translate("DoU2017", road.DoU2017)}
                  />
                  <Row
                    l="Beläggningstyp"
                    r={translate("Blggnngst", road.Blggnngst)}
                  />
                  <Row
                    colored
                    l="Vägkategori"
                    r={translate("Vägktgr", road.Vägktgr)}
                  />
                  <Row l="Vägtyp" r={translate("Vägtyp", road.Vägtyp)} />
                  <Row
                    colored
                    l="Region"
                    r={translate("Region", road.Region)}
                  />
                  <Row l="Längd" r={`${road.Längd} m`} />
                  <Row colored l="Spårdjup" r={`${road.Spårdjp} mm`} />
                  <Row l="Spårdjup underhållsstandard" r={`${road.Sprdjp_}`} />
                  <Row colored l="IRI" r={`${road.IRI} mm/m`} />
                  <Row l="IRI underhållsstandard" r={`${road.IRI_ndr}`} />
                  <Row
                    colored
                    l="Mätdatum"
                    r={datestr(road.Myear, road.Mmonth, road.Mday)}
                  />
                  <Row
                    l="Beläggningsdatum"
                    r={datestr(road.Byear, road.Bmonth, road.Bday)}
                  />
                  <Row
                    colored
                    l="Ålder"
                    r={`${road.Ålder} år (mätt år 2020)`}
                  />
                  <Row l="Förväntad Livslängd" r={`${road.FrvntdL} år`} />
                  <Row
                    colored
                    l="Återstående Livslängd"
                    r={`${road.ÅtrstnL} år`}
                  />
                  <Row
                    l="Medeltrafik (alla fordon)"
                    r={`${road.ÅDT_frd} fordon/dygn (mätt år ${road.ÅDT_mtr})`}
                  />
                  <Row
                    colored
                    l="Medeltrafik (tunga fordon)"
                    r={`${road.ÅDT_tng} fordon/dygn (mätt år ${road.ÅDT_mtr})`}
                  />
                  <Row l="Hastighetsbegränsning" r={`${road.Hastght} km/h`} />
                  <Row colored l="Vägbredd" r={`${road.Vägbrdd} m`} />
                  <Row
                    l="Län"
                    r={`${translatelan[road.Län_nr] || road.Län_nr}`}
                  />
                  <Row
                    colored
                    l="Kommun"
                    r={`${translatekommun[road.Kmmn_nr] || road.Kmmn_nr}`}
                  />
                  <Row l="Väg nr" r={`${road.Vägnmmr}`} />
                  <Row colored l="Trafikklass" r={`${road.Trfkkls}`} />
                  <Row l="Tillstånd" r={`${road.TllstnI}%`} />
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </Box>
    </Drawer>
  );
}

function translate(name, x) {
  return translation[name][x] || x;
}

const translation = {
  Brghtsk: {
    1: "max bruttovikt 64 ton",
    2: "max bruttovikt 51.4 ton",
    3: "max bruttovikt 37.5 ton",
    4: "max bruttovikt 74 ton",
    5: "max bruttovikt 74 ton",
  },
  DoU2017: {
    1: "Vägar i storstadsområden",
    2: "Vägar som bildar större sammanhängande stråk",
    3: "Vägar för dagliga resor och arbetspendling",
    4: "Övriga för näringslivet viktiga vägar",
    5: "Vägar som är viktiga för landsbygden",
    6: "Lågtrafikerade vägar",
  },
  Blggnngst: {
    1: "Varm",
    2: "Försegling",
    3: "Halvvarm",
    4: "Indränkt i makadam",
    5: "Tunnskikt",
    6: "Varm stenrik",
    7: "Ytbehandling på bituminöst underlag",
    8: "Ytbehandling på grus",
    9: "Övrigt",
  },
  Vägktgr: {
    1: "Europaväg",
    2: "Riksväg",
    3: "Primär länsväg",
    4: "Sekundär länsväg",
  },
  Vägtyp: {
    1: "2+1 väg",
    2: "4-fälts väg",
    3: "Motorväg",
    4: "Vanlig väg",
    5: "Motortrafikled",
  },
  Region: {
    1: "Mitt",
    2: "Nord",
    3: "Öst",
    4: "Stockholm",
    5: "Syd",
    6: "Väst",
  },
  IndxKls: {
    1: "Mycket dålig",
    2: "Dålig",
    3: "Tillfredsställande",
    4: "Bra",
    5: "Mycket bra",
  },
};

const translatelan = {
  1: "Stockholms län",
  3: "Uppsala län",
  4: "Södermanlands län",
  5: "Östergötlands län",
  6: "Jönköpings län",
  7: "Kronobergs län",
  8: "Kalmar län",
  9: "Gotlands län",
  10: "Blekinge län",
  12: "Skåne län",
  13: "Hallands län",
  14: "Västra Götalands",
  17: "Värmlands län",
  18: "Örebro län",
  19: "Västmanlands län",
  20: "Dalarnas län",
  21: "Gävleborgs län",
  22: "Västernorrlands län",
  23: "Jämtlands län",
  24: "Västerbottens län",
  25: "Norrbottens län",
};

const translatekommun = {
  114: "Upplands Väsby",
  115: "Vallentuna",
  116: "Österåker",
  117: "Värmdö",
  118: "Järfälla",
  119: "Ekerö",
  120: "Huddinge",
  121: "Botkyrka",
  122: "Salem",
  123: "Haninge",
  124: "Tyresö",
  125: "Upplands-Bro",
  126: "Nykvarn",
  127: "Täby",
  128: "Danderyd",
  129: "Sollentuna",
  130: "Stockholm",
  131: "Södertälje",
  132: "Nacka",
  133: "Sundbyberg",
  134: "Solna",
  135: "Lidingö",
  136: "Vaxholm",
  137: "Norrtälje",
  138: "Sigtuna",
  139: "Nynäshamn",
  140: "Håbo",
  141: "Älvkarleby",
  142: "Knivsta",
  143: "Heby",
  144: "Tierp",
  145: "Uppsala",
  146: "Enköping",
  147: "Östhammar",
  148: "Vingåker",
  149: "Gnesta",
  150: "Nyköping",
  151: "Oxelösund",
  152: "Flen",
  153: "Katrineholm",
  154: "Eskilstuna",
  155: "Strängnäs",
  156: "Trosa",
  157: "Ödeshög",
  158: "Ydre",
  159: "Kinda",
  160: "Boxholm",
  161: "Åtvidaberg",
  162: "Finspång",
  163: "Valdemarsvik",
  164: "Linköping",
  165: "Norrköping",
  166: "Söderköping",
  167: "Motala",
  168: "Vadstena",
  169: "Mjölby",
  170: "Aneby",
  171: "Gnosjö",
  172: "Mullsjö",
  173: "Habo",
  174: "Gislaved",
  175: "Vaggeryd",
  176: "Jönköping",
  177: "Nässjö",
  178: "Värnamo",
  179: "Sävsjö",
  180: "Vetlanda",
  181: "Eksjö",
  182: "Tranås",
  760: "Uppvidinge",
  761: "Lessebo",
  763: "Tingsryd",
  764: "Alvesta",
  765: "Älmhult",
  767: "Markaryd",
  780: "Växjö",
  781: "Ljungby",
  821: "Högsby",
  834: "Torsås",
  840: "Mörbylånga",
  860: "Hultsfred",
  861: "Mönsterås",
  862: "Emmaboda",
  880: "Kalmar",
  881: "Nybro",
  882: "Oskarshamn",
  883: "Västervik",
  884: "Vimmerby",
  885: "Borgholm",
  980: "Gotland",
  1060: "Olofström",
  1080: "Karlskrona",
  1081: "Ronneby",
  1082: "Karlshamn",
  1083: "Sölvesborg",
  1214: "Svalöv",
  1230: "Staffanstorp",
  1231: "Burlöv",
  1233: "Vellinge",
  1256: "Östra Göinge",
  1257: "Örkelljunga",
  1260: "Bjuv",
  1261: "Kävlinge",
  1262: "Lomma",
  1263: "Svedala",
  1264: "Skurup",
  1265: "Sjöbo",
  1266: "Hörby",
  1267: "Höör",
  1270: "Tomelilla",
  1272: "Bromölla",
  1273: "Osby",
  1275: "Perstorp",
  1276: "Klippan",
  1277: "Åstorp",
  1278: "Båstad",
  1280: "Malmö",
  1281: "Lund",
  1282: "Landskrona",
  1283: "Helsingborg",
  1284: "Höganäs",
  1285: "Eslöv",
  1286: "Ystad",
  1287: "Trelleborg",
  1290: "Kristianstad",
  1291: "Simrishamn",
  1292: "Ängelholm",
  1293: "Hässleholm",
  1315: "Hylte",
  1380: "Halmstad",
  1381: "Laholm",
  1382: "Falkenberg",
  1383: "Varberg",
  1384: "Kungsbacka",
  1401: "Härryda",
  1402: "Partille",
  1407: "Öckerö",
  1415: "Stenungsund",
  1419: "Tjörn",
  1421: "Orust",
  1427: "Sotenäs",
  1430: "Munkedal",
  1435: "Tanum",
  1438: "Dals-Ed",
  1439: "Färgelanda",
  1440: "Ale",
  1441: "Lerum",
  1442: "Vårgårda",
  1443: "Bollebygd",
  1444: "Grästorp",
  1445: "Essunga",
  1446: "Karlsborg",
  1447: "Gullspång",
  1452: "Tranemo",
  1460: "Bengtsfors",
  1461: "Mellerud",
  1462: "Lilla Edet",
  1463: "Mark",
  1465: "Svenljunga",
  1466: "Herrljunga",
  1470: "Vara",
  1471: "Götene",
  1472: "Tibro",
  1473: "Töreboda",
  1480: "Göteborg",
  1481: "Mölndal",
  1482: "Kungälv",
  1484: "Lysekil",
  1485: "Uddevalla",
  1486: "Strömstad",
  1487: "Vänersborg",
  1488: "Trollhättan",
  1489: "Alingsås",
  1490: "Borås",
  1491: "Ulricehamn",
  1492: "Åmål",
  1493: "Mariestad",
  1494: "Lidköping",
  1495: "Skara",
  1496: "Skövde",
  1497: "Hjo",
  1498: "Tidaholm",
  1499: "Falköping",
  1715: "Kil",
  1730: "Eda",
  1737: "Torsby",
  1760: "Storfors",
  1761: "Hammarö",
  1762: "Munkfors",
  1763: "Forshaga",
  1764: "Grums",
  1765: "Årjäng",
  1766: "Sunne",
  1780: "Karlstad",
  1781: "Kristinehamn",
  1782: "Filipstad",
  1783: "Hagfors",
  1784: "Arvika",
  1785: "Säffle",
  1814: "Lekeberg",
  1860: "Laxå",
  1861: "Hallsberg",
  1862: "Degerfors",
  1863: "Hällefors",
  1864: "Ljusnarsberg",
  1880: "Örebro",
  1881: "Kumla",
  1882: "Askersund",
  1883: "Karlskoga",
  1884: "Nora",
  1885: "Lindesberg",
  1904: "Skinnskatteberg",
  1907: "Surahammar",
  1960: "Kungsör",
  1961: "Hallstahammar",
  1962: "Norberg",
  1980: "Västerås",
  1981: "Sala",
  1982: "Fagersta",
  1983: "Köping",
  1984: "Arboga",
  2021: "Vansbro",
  2023: "Malung-Sälen",
  2026: "Gagnef",
  2029: "Leksand",
  2031: "Rättvik",
  2034: "Orsa",
  2039: "Älvdalen",
  2061: "Smedjebacken",
  2062: "Mora",
  2080: "Falun",
  2081: "Borlänge",
  2082: "Säter",
  2083: "Hedemora",
  2084: "Avesta",
  2085: "Ludvika",
  2101: "Ockelbo",
  2104: "Hofors",
  2121: "Ovanåker",
  2132: "Nordanstig",
  2161: "Ljusdal",
  2180: "Gävle",
  2181: "Sandviken",
  2182: "Söderhamn",
  2183: "Bollnäs",
  2184: "Hudiksvall",
  2260: "Ånge",
  2262: "Timrå",
  2280: "Härnösand",
  2281: "Sundsvall",
  2282: "Kramfors",
  2283: "Sollefteå",
  2284: "Örnsköldsvik",
  2303: "Ragunda",
  2305: "Bräcke",
  2309: "Krokom",
  2313: "Strömsund",
  2321: "Åre",
  2326: "Berg",
  2361: "Härjedalen",
  2380: "Östersund",
  2401: "Nordmaling",
  2403: "Bjurholm",
  2404: "Vindeln",
  2409: "Robertsfors",
  2417: "Norsjö",
  2418: "Malå",
  2421: "Storuman",
  2422: "Sorsele",
  2425: "Dorotea",
  2460: "Vännäs",
  2462: "Vilhelmina",
  2463: "Åsele",
  2480: "Umeå",
  2481: "Lycksele",
  2482: "Skellefteå",
  2505: "Arvidsjaur",
  2506: "Arjeplog",
  2510: "Jokkmokk",
  2513: "Överkalix",
  2514: "Kalix",
  2518: "Övertorneå",
  2521: "Pajala",
  2523: "Gällivare",
  2560: "Älvsbyn",
  2580: "Luleå",
  2581: "Piteå",
  2582: "Boden",
  2583: "Haparanda",
  2584: "Kiruna",
};
