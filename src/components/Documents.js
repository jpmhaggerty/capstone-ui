import PdfViewer from "../components/PdfViewer.js";
import Grid from '@mui/material/Grid'

function Documents() {
  return (
    <Grid
    container
    justifyContent='center'>
      <PdfViewer />
    </Grid>
  );
}

export default Documents;
