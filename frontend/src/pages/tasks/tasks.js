import React from "react";
import "devextreme/data/odata/store";
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  Editing,
} from "devextreme-react/data-grid";

/** === === = Added CRUD Operations = === === **/
import { createStore } from "devextreme-aspnet-data";

const url = "http://localhost:8000/api/todos/";

const dataSource = createStore({
  key: "id",
  loadUrl: url,
  insertUrl: url,
  updateUrl: url,
  deleteUrl: url,

  onBeforeSend: (method, ajaxOptions) => {
    ajaxOptions.xhrFields = { withCredentials: true };

    if (method === "delete" || method === "update") {
      ajaxOptions.url += ajaxOptions.data.key + "/";
    }

    if (method === "insert" || method === "update") {
      ajaxOptions.data = ajaxOptions.data.values;
      ajaxOptions.contentType = "application/json; charset=utf-8";
    }
  },
});

function getAllFieldsOnUpdate(options) {
  options.newData = { ...options.oldData, ...options.newData };
}
/** === === = --------------------- = === === **/

export default function Task() {
  return (
    <React.Fragment>
      <h2 className={"content-block"}>Tasks</h2>

      <DataGrid
        className={"dx-card wide-card"}
        dataSource={dataSource}
        showBorders={false}
        columnAutoWidth={true}
        columnHidingEnabled={true}
        onRowUpdating={getAllFieldsOnUpdate}
      >
        <Paging defaultPageSize={10} />
        <Pager showPageSizeSelector={true} showInfo={true} />
        <FilterRow visible={true} />
        <Editing
          mode="row"
          allowAdding={true}
          allowDeleting={true}
          allowUpdating={true}
        />

        <Column dataField={"id"} width={90} />
        <Column dataField={"title"} caption={"Title"} />
        <Column dataField={"description"} caption={"Description"} />
        <Column dataField={"completed"} caption={"Completed"} />
      </DataGrid>
    </React.Fragment>
  );
}
