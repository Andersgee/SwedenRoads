import React from "react";
import { Box, Typography } from "@material-ui/core";
import { translate, translatekey, datestr } from "./translate";
import Svgcircle from "./Svgcircle";
import InfoDialog from "../InfoDialog";
import { descriptions } from "./descriptions";

function Row(props) {
  return (
    <Box
      py={1}
      px={2}
      bgcolor={props.colored ? "#F4F4F2" : "#ffffff"}
      display="flex"
      justifyContent="space-between"
    >
      <InfoDialog label={props.l} description={descriptions[props.name]} />
      <Typography variant="body1" component="span" align="right">
        {props.r}
      </Typography>
    </Box>
  );
}

const palette = ["#C40A3B", "#F2203E", "#FABF20", "#71C94B", "#20AC65", "#ccc"];

export default function Table({ p }) {
  console.log(p);
  return (
    <Box>
      <Row name="TllstnI" l="Tillstånd" r={`${p.TllstnI}%`} colored />
      <Row
        name="IndxKls"
        l={translatekey("IndxKls")}
        r={
          <Box display="flex">
            <Svgcircle color={palette[p.IndxKls - 1]} />
            {translate("IndxKls", p.IndxKls)}
          </Box>
        }
      />
      <Row
        name="IndK2030"
        l={translatekey("IndK2030")}
        r={
          <Box display="flex">
            <Svgcircle color={palette[p.IndK2030 - 1]} />
            {translate("IndxKls", p.IndK2030)}
          </Box>
        }
        colored
      />
      <Row
        name="IKls_2"
        l={translatekey("IKls_2")}
        r={
          <Box display="flex">
            <Svgcircle color={palette[p.IKls_2 - 1]} />
            {translate("IndxKls", p.IKls_2)}
          </Box>
        }
      />
      <Row
        name="IKls_3"
        l={translatekey("IKls_3")}
        r={
          <Box display="flex">
            <Svgcircle color={palette[p.IKls_3 - 1]} />
            {translate("IndxKls", p.IKls_3)}
          </Box>
        }
        colored
      />
      <Row name="Spårdjp" l="Spårdjup" r={`${p.Spårdjp} mm`} />
      <Row
        name="Sprdjp_"
        l="Spårdjup underhållsstandard"
        r={`${p.Sprdjp_}`}
        colored
      />
      <Row name="IRI" l="IRI" r={`${p.IRI} mm/m`} />
      <Row
        name="IRI_ndr"
        l="IRI underhållsstandard"
        r={`${p.IRI_ndr}`}
        colored
      />
      <Row name="Mätdatm" l="Mätdatum" r={datestr(p.Myear, p.Mmonth, p.Mday)} />
      <Row
        name="Blggnngst"
        l="Beläggning"
        r={translate("Blggnngst", p.Blggnngst)}
        colored
      />
      <Row
        name="Blggnngsd"
        l="Beläggningsdatum"
        r={datestr(p.Byear, p.Bmonth, p.Bday)}
      />
      <Row name="Ålder" l="Ålder (år 2020)" r={`${p.Ålder} år`} colored />
      <Row name="FrvntdL" l="Förväntad Livslängd" r={`${p.FrvntdL} år`} />
      <Row name="Län_nr" l="Län" r={translate("Län_nr", p.Län_nr)} colored />
      <Row name="Kmmn_nr" l="Kommun" r={translate("Kmmn_nr", p.Kmmn_nr)} />
      <Row name="Vägnmmr" l="Vägnummer" r={`${p.Vägnmmr}`} colored />
      <Row name="Vägktgr" l="Kategori" r={translate("Vägktgr", p.Vägktgr)} />
      <Row name="Vägtyp" l="Vägtyp" r={translate("Vägtyp", p.Vägtyp)} colored />
      <Row
        name="ÅDT_frd"
        l={`Alla fordon (år ${p.ÅDT_mtr})`}
        r={`${p.ÅDT_frd} fordon/dygn`}
      />
      <Row
        name="ÅDT_tng"
        l={`Tunga fordon (år ${p.ÅDT_mtr})`}
        r={`${p.ÅDT_tng} fordon/dygn`}
        colored
      />
      <Row name="Brghtsk" l="Bärighet" r={translate("Brghtsk", p.Brghtsk)} />
      <Row
        name="Hastght"
        l="Hastighetsbegränsning"
        r={`${p.Hastght} km/h`}
        colored
      />

      <Row
        name="DoU2017"
        l="Drift och underhållsklass"
        r={translate("DoU2017", p.DoU2017)}
      />
      <Row name="Vägbrdd" l="Vägbredd" r={`${p.Vägbrdd} m`} colored />

      <Row name="Längd" l="Längd vägsträcka" r={`${p.Längd} m`} />

      {/*
      <Row name="Trfkkls" l="Trafikklass" r={`${p.Trfkkls}`} />
      <Row name="ÅtrstnL" l="Återstående Livslängd" r={`${p.ÅtrstnL} år`} />
      <Row name="Region" l="Region" r={translate("Region", p.Region)} />
      */}
    </Box>
  );
}
