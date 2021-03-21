import { Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    boxShadow: theme.shadows[1],
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
    padding: "1px 10px 1px 10px",
    fontSize: 14,
    lineHeight: "1.25em",
    maxWidth: 300,
    wordWrap: "break-word",
    fontWeight: theme.typography.fontWeightMedium,
  },
}))(Tooltip);

export default LightTooltip;
