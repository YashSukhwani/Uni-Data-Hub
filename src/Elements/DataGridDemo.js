import * as React from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';

export default function DataGridDemo(props) {

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <DataGrid components={{ Toolbar: GridToolbar }} multiline columnBuffer={2} rows={props.rows} 
      columns={props.columns} pageSize={10} checkboxSelection onCellDoubleClick={e => { 
        // window.alert(e.value);
        props.toggleModal(e.value);
      }}/>
    </div>
  );
}