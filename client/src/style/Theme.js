import { createMuiTheme } from "@material-ui/core";
import { cyan } from "@material-ui/core/colors";

const Theme = createMuiTheme({
    palette: {
        primary: {
            main: cyan[300]
        }
    }
})

export default Theme